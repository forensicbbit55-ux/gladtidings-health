'use client'

import Link from 'next/link'
import CartButton from '@/components/CartButton'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-primary/90 backdrop-blur-md shadow-lg' 
        : 'bg-primary'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl sm:text-2xl font-black ui-text hover:scale-105 transition-transform duration-300">
            Glad Tidings
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6 sm:space-x-8">
            <Link 
              href="/" 
              className="relative text-white hover:text-gold transition-colors duration-300 transform hover:scale-105 group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/about" 
              className="relative text-white hover:text-gold transition-colors duration-300 transform hover:scale-105 group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/services" 
              className="relative text-white hover:text-gold transition-colors duration-300 transform hover:scale-105 group"
            >
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/devotional" 
              className="relative text-white hover:text-gold transition-colors duration-300 transform hover:scale-105 group"
            >
              Devotional
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/contact" 
              className="relative text-white hover:text-gold transition-colors duration-300 transform hover:scale-105 group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <CartButton />

            {/* Mobile Menu Button (placeholder) */}
            <button className="md:hidden text-white focus:outline-none ui-text hover:text-gold transition-colors duration-300 transform hover:scale-105" type="button" aria-label="Menu">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
