import Link from 'next/link'
import CartButton from '@/components/CartButton'

export default function Navbar() {
  return (
    <nav className="bg-primary text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            Glad Tidings
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <Link 
              href="/" 
              className="hover:text-accent transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="hover:text-accent transition-colors duration-200"
            >
              About
            </Link>
            <Link 
              href="/services" 
              className="hover:text-accent transition-colors duration-200"
            >
              Services
            </Link>
            <Link 
              href="/devotional" 
              className="hover:text-accent transition-colors duration-200"
            >
              Devotional
            </Link>
            <Link 
              href="/contact" 
              className="hover:text-accent transition-colors duration-200"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <CartButton />

            {/* Mobile Menu Button (placeholder) */}
            <button className="md:hidden text-white focus:outline-none" type="button" aria-label="Menu">
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
