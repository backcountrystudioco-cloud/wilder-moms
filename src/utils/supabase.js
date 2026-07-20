import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

// createClient throws synchronously if URL or key is missing. That crashes
// the entire React tree on first import, which silently blanks the page.
// Lazily initialize only when both are present, and expose a null client
// otherwise so feature code can degrade gracefully.
export const supabase =
  supabaseUrl && supabasePublishableKey
    ? createClient(supabaseUrl, supabasePublishableKey)
    : null
