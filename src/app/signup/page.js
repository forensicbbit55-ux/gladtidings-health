'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Signup() {
  const [isSignUp, setIsSignUp] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate login/signup process
    setTimeout(() => {
      if (isSignUp) {
        console.log('Signup attempt:', { name, email, password })
        alert('Account created successfully! Please sign in.')
        setIsSignUp(false)
      } else {
        console.log('Login attempt:', { email, password })
        alert('Login successful! Welcome back.')
        router.push('/')
      }
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex h-full">
          {/* Left Side - Form */}
          <div className="w-1/2 h-full flex items-center justify-center p-12">
            <div className="w-full max-w-sm">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                {isSignUp ? 'Create Account' : 'Sign In'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {isSignUp && (
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                )}
                
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    isSignUp ? 'Sign Up' : 'Sign In'
                  )}
                </button>
              </form>
              
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
                  >
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Animated Green Panel */}
          <div className="relative w-1/2 h-full bg-gradient-to-br from-emerald-500 to-teal-600 overflow-hidden">
            <div className={`absolute inset-0 flex items-center justify-center p-12 transition-transform duration-700 ease-in-out ${isSignUp ? 'translate-x-full' : 'translate-x-0'}`}>
              {/* Sign In Content */}
              <div className="text-white text-center">
                <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
                <p className="text-lg mb-8 opacity-90">
                  To keep connected with us please login with your personal info
                </p>
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className="bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            </div>
            
            <div className={`absolute inset-0 flex items-center justify-center p-12 transition-transform duration-700 ease-in-out ${isSignUp ? 'translate-x-0' : '-translate-x-full'}`}>
              {/* Sign Up Content */}
              <div className="text-white text-center">
                <h2 className="text-4xl font-bold mb-4">Hello, Friend!</h2>
                <p className="text-lg mb-8 opacity-90">
                  Enter your personal details and start your journey with us
                </p>
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className="bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Back to Home */}
      <div className="text-center mt-6">
        <Link href="/" className="inline-flex items-center text-gray-500 hover:text-gray-700 transition-colors">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  )
}
