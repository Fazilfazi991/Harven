import { createClient } from '@supabase/supabase-js'

export function createPublicClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('mock')) {
    return createClient(
      'https://mock.supabase.co',
      'mock_anon_key'
    )
  }

  return createClient(supabaseUrl, supabaseKey)
}
