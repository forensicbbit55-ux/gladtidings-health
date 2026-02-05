// Middleware for authentication and route protection
// Proper admin authentication using bcrypt and session tokens

import { NextResponse } from 'next/server'
import { verifySessionToken } from '../lib/auth.js'

export async function middleware(req) {
  const { pathname } = req.nextUrl
  
  // Log middleware behavior for debugging
  console.log(`[Middleware] Processing route: ${pathname}`)
  
  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    // Allow access to admin login page
    if (pathname === '/admin/login') {
      console.log(`[Middleware] Allowing admin login page`)
      return NextResponse.next()
    }
    
    // Check for admin session cookie
    const adminSession = req.cookies.get('admin_session')
    
    if (!adminSession) {
      console.log(`[Middleware] No admin session found, redirecting to login`)
      const loginUrl = new URL('/admin/login', req.url)
      return NextResponse.redirect(loginUrl)
    }
    
    // Verify session token
    const tokenData = verifySessionToken(adminSession.value)
    
    if (!tokenData) {
      console.log(`[Middleware] Invalid session token, redirecting to login`)
      const loginUrl = new URL('/admin/login', req.url)
      return NextResponse.redirect(loginUrl)
    }
    
    console.log(`[Middleware] Valid admin session, allowing access to: ${pathname}`)
    return NextResponse.next()
  }
  
  // Allow all other routes without authentication
  console.log(`[Middleware] Allowing public route: ${pathname}`)
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}
