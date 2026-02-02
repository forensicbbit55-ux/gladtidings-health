'use client'

import { useState, useEffect, useRef } from 'react'

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=600&fit=crop',
      alt: 'Medical missionary work',
      title: 'Healing Communities',
      subtitle: 'Bringing hope through medical care'
    },
    {
      url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=600&fit=crop',
      alt: 'Natural remedies',
      title: 'Natural Health Solutions',
      subtitle: 'Discover the power of natural healing'
    },
    {
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
      alt: 'Spiritual guidance',
      title: 'Spiritual Wellness',
      subtitle: 'Nurturing body, mind, and spirit'
    },
    {
      url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=600&fit=crop',
      alt: 'Community support',
      title: 'Community Care',
      subtitle: 'Together we make a difference'
    }
  ]

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const goToSlide = (index) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex(index)
    setTimeout(() => setIsTransitioning(false), 300)
  }

  // Touch handlers for swipe functionality
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    const swipeThreshold = 50
    const diff = touchStartX.current - touchEndX.current
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide() // Swipe left - next slide
      } else {
        prevSlide() // Swipe right - previous slide
      }
    }
  }

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div 
      className="relative w-full h-[600px] overflow-hidden bg-gray-900"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Main Image */}
      <div className="relative w-full h-full">
        <div
          className={`flex transition-transform duration-500 ease-in-out h-full ${
            isTransitioning ? '' : ''
          }`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 relative">
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              {/* Enhanced overlay for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/60"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-4 max-w-4xl mx-auto">
                  <h1 className="text-5xl md:text-7xl font-black mb-4 text-white drop-shadow-2xl">
                    {image.title}
                  </h1>
                  <p className="text-2xl md:text-3xl text-gray-100 mb-8 font-medium drop-shadow-lg">
                    {image.subtitle}
                  </p>
                  <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl mx-auto drop-shadow-md">
                    We are dedicated to medical missionary work that combines natural healing remedies 
                    with the transformative power of the Gospel, bringing wholeness to both physical 
                    health and spiritual well-being.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105">
                      Learn More
                    </button>
                    <button className="bg-white/20 backdrop-blur-md text-white px-10 py-4 rounded-xl font-bold text-lg border-2 border-white/30 hover:bg-white/30 transition-all duration-300 shadow-xl hover:shadow-2xl">
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md text-white p-4 rounded-full hover:bg-white/30 transition-all duration-300 z-10 shadow-xl hover:shadow-2xl transform hover:scale-110"
        aria-label="Previous slide"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md text-white p-4 rounded-full hover:bg-white/30 transition-all duration-300 z-10 shadow-xl hover:shadow-2xl transform hover:scale-110"
        aria-label="Next slide"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Enhanced Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white w-12 shadow-lg' 
                : 'bg-white/50 hover:bg-white/75 w-3'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Enhanced Swipe hint for mobile */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm lg:hidden z-10 bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
        ← Swipe to navigate →
      </div>
    </div>
  )
}
