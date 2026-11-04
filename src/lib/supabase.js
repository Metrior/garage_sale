import { createClient } from '@supabase/supabase-js'
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from '../config'

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  // Only email + password login is used, and the HashRouter's "#/..." URLs aren't auth redirects.
  auth: { detectSessionInUrl: false },
})
