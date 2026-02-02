import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function middleware(req) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  
  // Only protect admin routes
  if (req.nextUrl.pathname.startsWith('/admin')) {
    try {
      // Get current session
      const { data: { session } } = await supabase.auth.getSession()
      
      // No session - redirect to login
      if (!session) {
        const loginUrl = new URL('/login', req.url)
        return NextResponse.redirect(loginUrl)
      }
      
      // Fetch user profile
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()
      
      // Profile not found or error - redirect to login
      if (error || !profile) {
        console.error('Profile fetch error:', error)
        const loginUrl = new URL('/login', req.url)
        return NextResponse.redirect(loginUrl)
      }
      
      // Not admin - redirect to home
      if (profile.role !== 'admin') {
        const homeUrl = new URL('/', req.url)
        return NextResponse.redirect(homeUrl)
      }
      
      // Admin confirmed - continue
      return res
      
    } catch (error) {
      console.error('Middleware auth error:', error)
      const loginUrl = new URL('/login', req.url)
      return NextResponse.redirect(loginUrl)
    }
  }
  
  // Non-admin routes - continue
  return res
}

export const config = {
  matcher: ['/admin/:path*']
}
