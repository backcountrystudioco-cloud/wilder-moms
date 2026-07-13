// Single source of truth for build catalog metadata used by server-side
// code. Mirrors entries in src/wilder-builds/buildsLibrary.js — keep in
// sync until we move the catalog into a Supabase table.
//
// Used by:
//   - api/my-guides.js (decorate acquired guides for the user library)
//   - api/cron/send-drop.js (look up metadata when sending a drop email)
//
// Each entry:
//   id, slug, title, subtitle, cover (Tailwind gradient), type
//   ('architect' | 'lab'), typeLabel, dropMonth, dropYear, pages

export const BUILD_CATALOG = {
  'fairy-apothecary': {
    slug: 'fairy-apothecary',
    title: 'The Fairy Apothecary',
    subtitle: 'A backyard potions garden for tiny herbalists',
    cover: 'from-[#F2A57B] via-[#D2961E] to-[#8C4A14]',
    type: 'architect',
    typeLabel: 'Architect Blueprint',
    dropMonth: 'Launch',
    dropYear: 2026,
    pages: 38,
  },
  'mycelium-donuts': {
    slug: 'mycelium-donuts',
    title: 'Mycelium Donuts',
    subtitle: 'Grow a kid-sized mushroom farm in the shape of donuts',
    cover: 'from-[#F0D2B4] via-[#96963C] to-[#5A6428]',
    type: 'lab',
    typeLabel: 'Lab Activity',
    dropMonth: 'Launch',
    dropYear: 2026,
    pages: 32,
  },
}

export function getCatalogEntry(buildId) {
  return BUILD_CATALOG[buildId] || null
}

export function decorateGuide(row) {
  const meta = BUILD_CATALOG[row.build_id] || {}
  return {
    id: row.build_id,
    slug: row.build_id,
    title: meta.title || row.build_id,
    subtitle: meta.subtitle || '',
    cover: meta.cover || 'from-ember via-terra to-gold',
    type: meta.type || 'architect',
    typeLabel: meta.typeLabel || 'Premium PDF',
    dropMonth: meta.dropMonth || 'Premium',
    dropYear: meta.dropYear || '',
    dropId: row.drop_id,
    acquiredAt: row.acquired_at,
  }
}
