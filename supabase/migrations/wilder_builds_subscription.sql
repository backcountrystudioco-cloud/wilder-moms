-- =====================================================================
-- Wilder Builds subscription tables + storage bucket
-- Run this in the Supabase SQL editor (Database > SQL Editor).
-- =====================================================================

-- 1) subscriptions: one row per Clerk user with an active Wilder Builds sub
create table if not exists public.subscriptions (
  clerk_user_id text primary key,
  lemon_customer_id text,
  lemon_subscription_id text unique,
  lemon_variant_id text,
  customer_email text,
  status text not null check (status in ('active','cancelled','expired','paused')),
  current_period_end timestamptz,
  updated_at timestamptz not null default now()
);
create index if not exists subscriptions_status_idx on public.subscriptions (status);
create index if not exists subscriptions_lemon_sub_idx on public.subscriptions (lemon_subscription_id);

-- 2) subscription_events: webhook event log + dedup
create table if not exists public.subscription_events (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text,
  lemon_event_key text unique,
  event_type text not null,
  source text,
  metadata jsonb,
  created_at timestamptz not null default now()
);
create index if not exists subscription_events_user_idx on public.subscription_events (clerk_user_id);
create index if not exists subscription_events_created_idx on public.subscription_events (created_at desc);

-- 3) build_downloads: audit log for every PDF download
create table if not exists public.build_downloads (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text not null,
  build_id text not null,
  lemon_subscription_id text,
  ip text,
  user_agent text,
  created_at timestamptz not null default now()
);
create index if not exists build_downloads_user_idx on public.build_downloads (clerk_user_id, created_at desc);

-- =====================================================================
-- RLS: enable read for the matching Clerk user, write only via service role.
-- The API endpoints use SUPABASE_SERVICE_ROLE_KEY which bypasses RLS.
-- =====================================================================
alter table public.subscriptions enable row level security;
alter table public.subscription_events enable row level security;
alter table public.build_downloads enable row level security;

-- Users can read their own subscription row. The check is permissive here —
-- the API endpoints do the authoritative entitlement check. Tighten as needed.
drop policy if exists "read own subscription" on public.subscriptions;
create policy "read own subscription" on public.subscriptions
  for select using (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

drop policy if exists "read own download history" on public.build_downloads;
create policy "read own download history" on public.build_downloads
  for select using (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- No client-side writes; all writes happen via service role from the API.

-- =====================================================================
-- Storage bucket for the PDFs. Private bucket, accessed only via signed URLs.
-- The /api/builds-pdf endpoint generates a 60-second signed URL on demand.
-- =====================================================================
insert into storage.buckets (id, name, public)
  values ('builds-pdfs', 'builds-pdfs', false)
  on conflict (id) do nothing;

-- After running this SQL, upload the PDFs to the bucket:
--   fairy-apothecary.pdf
--   mycelium-donuts.pdf
-- (Dashboard: Storage > builds-pdfs > Upload)

-- =====================================================================
-- drops: monthly themed releases. The Vercel cron (/api/cron/send-drop)
-- picks up rows with status = 'scheduled' AND scheduled_for <= today and
-- sends a Resend broadcast to active subscribers.
-- =====================================================================
create table if not exists public.drops (
  id text primary key,                                   -- e.g. '2026-08'
  month text not null,                                   -- e.g. 'August'
  year int not null,
  release_date date not null,                            -- when it goes live (1st of month)
  title text not null,                                   -- 'The August Drop'
  subtitle text,                                         -- 'Bugs + Water Play'
  theme text,                                            -- displayed on the drop card
  build_ids text[] not null default '{}',                -- references builds.id
  cover_gradient text,                                   -- CSS gradient for the cover
  email_subject text,
  email_intro text,                                      -- 2-3 sentences for the email
  status text not null default 'scheduled' check (status in ('scheduled','sending','sent','failed')),
  sent_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists drops_status_idx on public.drops (status, release_date);
create index if not exists drops_release_idx on public.drops (release_date desc);

-- Only service role writes; reads allowed for the public library page
alter table public.drops enable row level security;
drop policy if exists "drops are publicly readable" on public.drops;
create policy "drops are publicly readable" on public.drops
  for select using (true);

-- =====================================================================
-- email_sends: audit log for every broadcast (so we can re-send safely)
-- =====================================================================
create table if not exists public.email_sends (
  id uuid primary key default gen_random_uuid(),
  drop_id text references public.drops(id),
  kind text not null,                                    -- 'broadcast' | 'welcome' | 'reminder'
  recipients int,
  resend_id text,
  sent_by text,                                          -- 'cron' | 'manual'
  metadata jsonb,
  created_at timestamptz not null default now()
);
create index if not exists email_sends_drop_idx on public.email_sends (drop_id, created_at desc);

-- =====================================================================
-- saved_builds: user-saved free builds (any build they heart)
-- =====================================================================
create table if not exists public.saved_builds (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,             -- Clerk user id
  build_id text not null,            -- build slug
  build_type text not null default 'build',  -- 'build' | 'craft' | 'hike'
  created_at timestamptz default now(),
  unique (user_id, build_id)
);
create index if not exists saved_builds_user_idx on public.saved_builds (user_id);

alter table public.saved_builds enable row level security;
drop policy if exists "Users can read own saves" on public.saved_builds;
create policy "Users can read own saves" on public.saved_builds
  for select using (user_id = current_setting('request.jwt.claims', true)::json->>'sub');
drop policy if exists "Users can insert own saves" on public.saved_builds;
create policy "Users can insert own saves" on public.saved_builds
  for insert with check (user_id = current_setting('request.jwt.claims', true)::json->>'sub');
drop policy if exists "Users can delete own saves" on public.saved_builds;
create policy "Users can delete own saves" on public.saved_builds
  for delete using (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- =====================================================================
-- acquired_guides: monthly PDFs the user has access to via subscription
-- Populated by lemon-webhook on subscription_created; cleared on
-- subscription_cancelled (no — see webhook: kept as historical record;
-- access checks live on subscriptions.status).
-- =====================================================================
create table if not exists public.acquired_guides (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,             -- Clerk user id
  build_id text not null,            -- premium build slug (e.g. 'fairy-apothecary')
  drop_id text not null,             -- drop slug (e.g. 'launch-drop')
  acquired_at timestamptz default now(),
  acquisition_source text default 'subscription', -- 'subscription' | 'admin_grant' | 'comp'
  unique (user_id, build_id)
);
create index if not exists acquired_guides_user_idx on public.acquired_guides (user_id);

alter table public.acquired_guides enable row level security;
drop policy if exists "Users can read own acquired guides" on public.acquired_guides;
create policy "Users can read own acquired guides" on public.acquired_guides
  for select using (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- No client-side writes; all writes happen via service role from the API.
