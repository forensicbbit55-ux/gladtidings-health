'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setTimeout(() => setIsSubscribed(false), 3000)
      setEmail('')
    }
  }

  return (
    <footer className="bg-primary text-white mt-20">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16">
          {/* About Section */}
          <div className="lg:col-span-1">
            <h3 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6 ui-text bg-gradient-to-r from-white to-gold-light bg-clip-text text-transparent">
              Glad Tidings
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
              Spreading hope and inspiration through faith and community. 
              Join us in bringing healing to both body and soul.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center hover:bg-gold hover:scale-110 transition-all duration-300 group"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 text-white group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center hover:bg-gold hover:scale-110 transition-all duration-300 group"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5 text-white group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center hover:bg-gold hover:scale-110 transition-all duration-300 group"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 text-white group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-base sm:text-lg font-black mb-4 sm:mb-6 ui-text">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/" 
                  className="text-gray-300 hover:text-gold transition-colors duration-300 transform hover:translate-x-2 inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-gray-300 hover:text-gold transition-colors duration-300 transform hover:translate-x-2 inline-block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/services" 
                  className="text-gray-300 hover:text-gold transition-colors duration-300 transform hover:translate-x-2 inline-block"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link 
                  href="/devotional" 
                  className="text-gray-300 hover:text-gold transition-colors duration-300 transform hover:translate-x-2 inline-block"
                >
                  Daily Devotional
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-gray-300 hover:text-gold transition-colors duration-300 transform hover:translate-x-2 inline-block"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-base sm:text-lg font-black mb-4 sm:mb-6 ui-text">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="#" 
                  className="text-gray-300 hover:text-gold transition-colors duration-300 transform hover:translate-x-2 inline-block"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="text-gray-300 hover:text-gold transition-colors duration-300 transform hover:translate-x-2 inline-block"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="text-gray-300 hover:text-gold transition-colors duration-300 transform hover:translate-x-2 inline-block"
                >
                  Prayer Requests
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="text-gray-300 hover:text-gold transition-colors duration-300 transform hover:translate-x-2 inline-block"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="text-gray-300 hover:text-gold transition-colors duration-300 transform hover:translate-x-2 inline-block"
                >
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-base sm:text-lg font-black mb-4 sm:mb-6 ui-text">Stay Connected</h4>
            <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              Subscribe to receive weekly devotionals, updates, and inspirational content.
            </p>
            
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 sm:px-4 py-3 rounded-xl bg-white/10 border border-gold/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all duration-300 text-sm sm:text-base"
                  required
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gold/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gold hover:bg-gold-dark text-primary px-4 sm:px-6 py-3 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 font-black ui-text relative overflow-hidden group text-sm sm:text-base"
              >
                <span className="relative z-10">
                  {isSubscribed ? '✓ Subscribed!' : 'Subscribe Now'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gold-light to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-secondary/30">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Glad Tidings. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link 
                href="#" 
                className="text-gray-400 hover:text-gold transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link 
                href="#" 
                className="text-gray-400 hover:text-gold transition-colors duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
