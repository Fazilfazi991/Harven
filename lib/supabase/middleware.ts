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
          setAll(cookiesToSet: any[]) {
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

    // Only check user session if we are in admin area or specifically checking login
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
    
    if (isAdminRoute) {
      const { data: { user } } = await supabase.auth.getUser()
      
      // Protect /admin routes
      if (request.nextUrl.pathname !== '/admin/login') {
        if (!user) {
          return NextResponse.redirect(new URL('/admin/login', request.url))
        }
      }
      
      // Redirect logged-in users away from login page
      if (request.nextUrl.pathname === '/admin/login' && user) {
        return NextResponse.redirect(new URL('/admin', request.url))
      }
    }
    return supabaseResponse
  } catch (e) {
    console.error("Middleware Supabase Error:", e)
    return supabaseResponse
  }
}
