import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

/**
 * Server-side admin authentication check
 * Must be used in Server Components or Route Handlers
 */
export async function requireAdmin() {
  const supabase = createServerComponentClient({ cookies })
  
  try {
    // Get current session
    const { data: { session } } = await supabase.auth.getSession()
    
    // No session - redirect to login
    if (!session) {
      redirect('/login')
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
      redirect('/login')
    }
    
    // Not admin - redirect to home
    if (profile.role !== 'admin') {
      redirect('/')
    }
    
    // Admin confirmed - return user and profile
    return {
      user: session.user,
      profile
    }
    
  } catch (error) {
    console.error('Auth check error:', error)
    redirect('/login')
  }
}

/**
 * Client-side admin authentication check
 * For use in Client Components
 */
export async function requireAdminClient() {
  const { supabase } = await import('../../lib/supabaseClient')
  
  try {
    // Get current session
    const { data: { session } } = await supabase.auth.getSession()
    
    // No session - redirect to login
    if (!session) {
      window.location.href = '/login'
      return null
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
      window.location.href = '/login'
      return null
    }
    
    // Not admin - redirect to home
    if (profile.role !== 'admin') {
      window.location.href = '/'
      return null
    }
    
    // Admin confirmed - return user and profile
    return {
      user: session.user,
      profile
    }
    
  } catch (error) {
    console.error('Auth check error:', error)
    window.location.href = '/login'
    return null
  }
}

/**
 * Server-side middleware for admin protection
 */
export function withAdminAuth(Component) {
  return async function AdminProtectedComponent(props) {
    const auth = await requireAdmin()
    
    return <Component {...props} auth={auth} />
  }
}
