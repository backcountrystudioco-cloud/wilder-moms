-- =====================================================================
-- Wilder Index state: one durable state object per Clerk user.
-- Run this in the Supabase SQL editor (Database > SQL Editor).
--
-- After running this SQL, the service-role API endpoint at
-- api/wilder-index.js will persist and retrieve Wilder Index state.
-- =====================================================================

create table if not exists public.wilder_index_state (
  clerk_user_id text primary key,
  state jsonb not null,
  schema_version int not null default 1,
  -- Set to true the first time the row is inserted with data copied from
  -- the legacy Clerk `unsafeMetadata.wilderIndex` field. Never modified
  -- afterward, so the "migrated" signal survives subsequent PUTs.
  migrated_from_clerk_metadata boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Idempotent column add for instances that ran the original migration
-- before `migrated_from_clerk_metadata` existed. Safe to re-run.
alter table public.wilder_index_state
  add column if not exists migrated_from_clerk_metadata boolean not null default false;

create index if not exists wilder_index_state_updated_idx
  on public.wilder_index_state (updated_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_wilder_index_state_updated_at on public.wilder_index_state;
create trigger set_wilder_index_state_updated_at
  before update on public.wilder_index_state
  for each row execute function public.set_updated_at();

alter table public.wilder_index_state enable row level security;

drop policy if exists "Users can read own wilder index" on public.wilder_index_state;
create policy "Users can read own wilder index" on public.wilder_index_state
  for select using (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- No client-side writes; all writes happen via service role from /api/wilder-index.js.
