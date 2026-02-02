'use client'

import { useState, useEffect } from 'react'

export default function Blog() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Health & Wellness',
      subtitle: 'Natural Living',
      description: 'Discover the latest insights on natural health, wellness tips, and holistic living from our expert contributors'
    },
    {
      image: 'https://images.unsplash.com/photo-1515377905703-c478e6dab3a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Natural Remedies',
      subtitle: 'Herbal Wisdom',
      description: 'Explore traditional herbal remedies and natural healing methods that have stood the test of time'
    },
    {
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Spiritual Health',
      subtitle: 'Mind & Body',
      description: 'Connecting spiritual wellness with physical health through faith-based natural living'
    },
    {
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Organic Living',
      subtitle: 'Clean Eating',
      description: 'Learn about organic foods, clean eating habits, and natural lifestyle choices for optimal health'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const blogPosts = [
    {
      id: 1,
      title: "Review of Healthy Breakfast Meals for Energy Boost",
      excerpt: "Discover the most nutritious breakfast options that will keep you energized throughout the day. Learn about the perfect balance of proteins, carbs, and healthy fats.",
      author: "Dr. Sarah Johnson",
      date: "2 days ago",
      category: "Nutrition",
      image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Simple Kitchen Habits for a More Plant-Based Life",
      excerpt: "Transform your cooking routine with these easy-to-implement plant-based kitchen habits. Learn meal prep strategies and ingredient swaps.",
      author: "Michael Chen",
      date: "5 days ago", 
      category: "Lifestyle",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "The Healing Power of Natural Herbs",
      excerpt: "Explore traditional herbal remedies that have been used for centuries. Learn how to incorporate these powerful plants into your daily wellness routine.",
      author: "Rev. Mary Williams",
      date: "1 week ago",
      category: "Natural Remedies",
      image: "https://images.unsplash.com/photo-1515377905703-c478e6dab3a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      readTime: "10 min read"
    },
    {
      id: 4,
      title: "Mindful Eating: A Spiritual Approach to Nutrition",
      excerpt: "Discover how mindfulness can transform your relationship with food. Learn practical techniques for eating with intention and gratitude.",
      author: "Dr. Sarah Johnson",
      date: "2 weeks ago",
      category: "Spiritual Wellness",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      readTime: "6 min read"
    },
    {
      id: 5,
      title: "Detoxification: Natural Ways to Cleanse Your Body",
      excerpt: "Learn gentle and effective methods for supporting your body's natural detoxification processes. Discover foods and herbs that promote cleansing.",
      author: "Michael Chen",
      date: "3 weeks ago",
      category: "Natural Health",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      readTime: "8 min read"
    },
    {
      id: 6,
      title: "The Connection Between Faith and Healing",
      excerpt: "Explore the powerful relationship between spiritual faith and physical healing. Learn how prayer and meditation can support wellness.",
      author: "Rev. Mary Williams",
      date: "1 month ago",
      category: "Spiritual Wellness",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      readTime: "12 min read"
    }
  ]

  const categories = ["All", "Nutrition", "Lifestyle", "Natural Remedies", "Spiritual Wellness", "Natural Health"]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Carousel */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden border-b-4 border-emerald-600">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/40 to-gray-800/30"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">{slide.subtitle}</h2>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">{slide.description}</p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
              Discover insights on natural health, wellness, and spiritual living from our expert contributors
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === "All"
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>{post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-emerald-600 transition-colors cursor-pointer">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Read More */}
                  <button className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors flex items-center">
                    Read More
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            Get the latest health tips, natural remedies, and spiritual insights delivered to your inbox
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            />
            <button className="bg-amber-500 hover:bg-amber-600 text-emerald-900 px-6 py-3 rounded-lg font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
