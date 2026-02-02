'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddProduct() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category: 'Herbal Tea',
    in_stock: true
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const categories = [
    'Herbal Tea',
    'Essential Oil',
    'Supplements',
    'Natural Remedies'
  ]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price)
        })
      })

      const data = await response.json()

      if (data.success) {
        setSuccess('Product created successfully!')
        setFormData({
          name: '',
          description: '',
          price: '',
          image_url: '',
          category: 'Herbal Tea',
          in_stock: true
        })
        
        // Redirect after 2 seconds
        setTimeout(() => {
          router.push('/admin/products')
        }, 2000)
      } else {
        setError(data.error || 'Failed to create product')
      }
    } catch (err) {
      console.error('Error creating product:', err)
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
            <p className="mt-1 text-sm text-gray-600">Create a new product for your store</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-600">{success}</p>
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 px-3 py-2 border"
                  placeholder="Enter product name"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description *
                </label>
                <textarea
                  name="description"
                  id="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 px-3 py-2 border"
                  placeholder="Describe your product"
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price ($) *
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  required
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 px-3 py-2 border"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category *
                </label>
                <select
                  name="category"
                  id="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 px-3 py-2 border"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">
                  Image URL *
                </label>
                <input
                  type="url"
                  name="image_url"
                  id="image_url"
                  required
                  value={formData.image_url}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 px-3 py-2 border"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="sm:col-span-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="in_stock"
                    id="in_stock"
                    checked={formData.in_stock}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <label htmlFor="in_stock" className="ml-2 block text-sm text-gray-900">
                    In Stock
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
