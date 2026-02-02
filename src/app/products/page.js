'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    'all',
    'Herbal Tea',
    'Essential Oil',
    'Supplements',
    'Natural Remedies'
  ]

  useEffect(() => {
    fetchProducts()
  }, [selectedCategory])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/products')
      const data = await response.json()
      
      if (data.success) {
        let filteredProducts = data.products
        
        if (selectedCategory !== 'all') {
          filteredProducts = data.products.filter(product => product.category === selectedCategory)
        }
        
        setProducts(filteredProducts)
      } else {
        setError(data.error)
      }
    } catch (err) {
      console.error('Error fetching products:', err)
      setError('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  const getCategoryBadge = (category) => {
    const colors = {
      'Herbal Tea': 'bg-green-100 text-green-800',
      'Essential Oil': 'bg-purple-100 text-purple-800',
      'Supplements': 'bg-blue-100 text-blue-800',
      'Natural Remedies': 'bg-orange-100 text-orange-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        <span className="ml-3 text-gray-600">Loading products...</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Natural Products</h1>
            <p className="mt-2 text-gray-600">Discover our selection of natural health products</p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {category === 'all' ? 'All' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {products.length === 0 && !error ? (
          <div className="text-center py-12">
            <div className="text-gray-500">
              {selectedCategory === 'all' 
                ? 'No products available yet.' 
                : `No products found in ${selectedCategory}.`}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {product.image_url && (
                  <div className="h-48 bg-gray-200">
                    <img 
                      src={product.image_url} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryBadge(product.category)}`}>
                      {product.category}
                    </span>
                    <span className={`text-xs font-medium ${product.in_stock ? 'text-green-600' : 'text-red-600'}`}>
                      {product.in_stock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-emerald-600">${product.price}</span>
                    <button 
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!product.in_stock}
                    >
                      {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
