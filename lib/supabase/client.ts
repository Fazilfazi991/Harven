import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If keys are missing or placeholders, return a mock-safe version that doesn't crash
  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('mock')) {
    return createBrowserClient(
      'https://mock.supabase.co',
      'mock_anon_key'
    )
  }

  return createBrowserClient(supabaseUrl, supabaseKey)
}
