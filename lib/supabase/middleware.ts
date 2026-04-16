import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // SUPER SAFE CHECK: 
  // If keys are missing, empty, or placeholder 'mock' URL, bypass Supabase entirely to prevent site crash.
  const isSupabaseConfigured = 
    supabaseUrl && 
    supabaseKey && 
    supabaseUrl.startsWith('https://') && 
    !supabaseUrl.includes('mock');

  if (!isSupabaseConfigured) {
    // We log it only in dev or edge logs, but we return a normal response to keep the site alive.
    return supabaseResponse
  }

  try {
    const supabase = createServerClient(
      supabaseUrl,
      supabaseKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    // This will check if the user is logged in
    await supabase.auth.getUser()
    
    return supabaseResponse
  } catch (e) {
    console.error("Middleware Supabase Error:", e)
    return supabaseResponse
  }
}
