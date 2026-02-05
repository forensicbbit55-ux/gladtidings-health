'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [cartItems, setCartItems] = useState(3)

  return (
    <>
      <nav className="bg-gradient-to-r from-cyan-50/90 to-blue-50/90 shadow-lg sticky top-0 z-40 border-b border-cyan-200/50 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="py-2">
            <div className="flex items-center justify-between">
              {/* Logo - Left side */}
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border-2 border-cyan-400 shadow-lg backdrop-blur-sm overflow-hidden">
                    {/* WhatsApp Logo Image */}
                    <img src="/logo.png" alt="Glad Tidings Logo" className="w-8 h-8 object-contain" />
                  </div>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-800">Glad Tidings</h1>
                  <p className="text-xs text-gray-600">Natural Remedies</p>
                </div>
              </div>

              {/* Right - Action Buttons */}
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => window.location.href = '/login'}
                  className="hidden md:flex items-center space-x-1 bg-emerald-600 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition-colors shadow-lg text-xs"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span className="font-medium">Login</span>
                </button>
                
                <button onClick={() => setIsCartOpen(true)} className="relative p-1.5 text-gray-700 hover:bg-cyan-100/50 rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {cartItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center">
                      {cartItems}
                    </span>
                  )}
                </button>

                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-1.5 text-gray-700 hover:bg-cyan-100/50 rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center justify-center py-1 border-t border-emerald-200/30">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors text-xs">Home</Link>
              <Link href="/products" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors text-xs">Shop</Link>
              <Link href="/about" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors text-xs">About</Link>
              <Link href="/blog" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors text-xs">Blog</Link>
              <Link href="/contact" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors text-xs">Contact</Link>
              <Link href="/consultation" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors text-xs">Consultation</Link>
              <Link href="/services" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors text-xs">Services</Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="container mx-auto px-4 py-4 space-y-3">
              <Link href="/" className="block text-gray-700 hover:text-emerald-600 font-medium transition-colors">Home</Link>
              <Link href="/products" className="block text-gray-700 hover:text-emerald-600 font-medium transition-colors">Shop</Link>
              <Link href="/about" className="block text-gray-700 hover:text-emerald-600 font-medium transition-colors">About</Link>
              <Link href="/blog" className="block text-gray-700 hover:text-emerald-600 font-medium transition-colors">Blog</Link>
              <Link href="/contact" className="block text-gray-700 hover:text-emerald-600 font-medium transition-colors">Contact</Link>
              <Link href="/consultation" className="block text-gray-700 hover:text-emerald-600 font-medium transition-colors">Consultation</Link>
              <Link href="/services" className="block text-gray-700 hover:text-emerald-600 font-medium transition-colors">Services</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Login/Signup Sidebar */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsLoginOpen(false)}></div>
          <div className="absolute left-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Account</h2>
                <button 
                  onClick={() => setIsLoginOpen(false)}
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                {/* Login Form */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Sign In</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-gray-600">Remember me</span>
                    </label>
                    <a href="#" className="text-sm text-emerald-600 hover:text-emerald-700">Forgot password?</a>
                  </div>
                  
                  <button className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                    Sign In
                  </button>
                  
                  <div className="text-center">
                    <span className="text-gray-600">Don't have an account? </span>
                    <Link href="/signup" className="text-emerald-600 hover:text-emerald-700 font-medium">Sign Up</Link>
                  </div>
                  
                  <div className="text-center mt-4">
                    <Link 
                      href="/login" 
                      className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                      onClick={() => setIsLoginOpen(false)}
                    >
                      Go to full login page →
                    </Link>
                  </div>
                  
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </button>
                    
                    <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Shopping Cart ({cartItems})</h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                {/* Cart Items */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <img src="/api/placeholder/60/60" alt="Product" className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="font-medium">European Lemon Zest</h3>
                      <p className="text-sm text-gray-600">$12.99</p>
                    </div>
                    <button className="text-red-500 hover:text-red-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="border-t p-4">
                <div className="flex justify-between mb-4">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-lg">$38.97</span>
                </div>
                <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
