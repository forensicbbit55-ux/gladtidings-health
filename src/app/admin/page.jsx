'use client'

import { useState, useEffect } from 'react'
import { productsAPI, authAPI } from '@/lib/api'
import { useRouter } from 'next/navigation'

function formatMoney(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Natural Remedies',
    image: '',
    inStock: true,
    stockQuantity: 0,
  })
  const [loginData, setLoginData] = useState({ email: '', password: '' })

  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken')
    if (storedToken) {
      setToken(storedToken)
      setIsAuthenticated(true)
      fetchProducts(storedToken)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchProducts = async (authToken) => {
    try {
      setLoading(true)
      const data = await productsAPI.getAll()
      setProducts(data)
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await authAPI.login(loginData.email, loginData.password)
      if (response.role === 'admin') {
        setToken(response.token)
        setIsAuthenticated(true)
        localStorage.setItem('adminToken', response.token)
        fetchProducts(response.token)
      } else {
        alert('Access denied. Admin only.')
      }
    } catch (error) {
      alert(error.message || 'Login failed')
    }
  }

  const handleLogout = () => {
    setToken(null)
    setIsAuthenticated(false)
    localStorage.removeItem('adminToken')
    setProducts([])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stockQuantity: parseInt(formData.stockQuantity),
      }

      if (editingProduct) {
        await productsAPI.update(editingProduct._id, productData, token)
      } else {
        await productsAPI.create(productData, token)
      }

      setShowForm(false)
      setEditingProduct(null)
      setFormData({
        title: '',
        description: '',
        price: '',
        category: 'Natural Remedies',
        image: '',
        inStock: true,
        stockQuantity: 0,
      })
      fetchProducts(token)
    } catch (error) {
      alert(error.message || 'Failed to save product')
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      image: product.image || '',
      inStock: product.inStock,
      stockQuantity: product.stockQuantity || 0,
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    try {
      await productsAPI.delete(id, token)
      fetchProducts(token)
    } catch (error) {
      alert(error.message || 'Failed to delete product')
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="px-4 py-12">
        <div className="container mx-auto max-w-md">
          <div className="bg-white border border-primary/10 rounded-2xl p-8 shadow-sm">
            <h1 className="text-3xl font-bold text-primary mb-6">Admin Login</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                  className="w-full rounded-lg border border-primary/20 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                  className="w-full rounded-lg border border-primary/20 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-secondary text-white px-4 py-3 font-semibold hover:bg-secondary/90 transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="px-4 py-12">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary">Admin Dashboard</h1>
            <p className="mt-2 text-gray-700">Manage products and orders</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-primary/20 bg-white text-primary px-4 py-2 font-semibold hover:bg-gray-50 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="mb-6">
          <button
            onClick={() => {
              setShowForm(true)
              setEditingProduct(null)
              setFormData({
                title: '',
                description: '',
                price: '',
                category: 'Natural Remedies',
                image: '',
                inStock: true,
                stockQuantity: 0,
              })
            }}
            className="rounded-lg bg-secondary text-white px-6 py-3 font-semibold hover:bg-secondary/90 transition-colors"
          >
            Add New Product
          </button>
        </div>

        {showForm && (
          <div className="bg-white border border-primary/10 rounded-2xl p-6 shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">
              {editingProduct ? 'Edit Product' : 'New Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="w-full rounded-lg border border-primary/20 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Price *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    className="w-full rounded-lg border border-primary/20 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  className="w-full rounded-lg border border-primary/20 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary"
                >
                  <option>Natural Remedies</option>
                  <option>E-books</option>
                  <option>Health Guidelines</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={4}
                  className="w-full rounded-lg border border-primary/20 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full rounded-lg border border-primary/20 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="rounded-lg bg-secondary text-white px-6 py-3 font-semibold hover:bg-secondary/90 transition-colors"
                >
                  {editingProduct ? 'Update' : 'Create'} Product
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingProduct(null)
                  }}
                  className="rounded-lg border border-primary/20 bg-white text-primary px-6 py-3 font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <p className="text-gray-600">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white border border-primary/10 rounded-xl p-5 shadow-sm"
              >
                <h3 className="text-lg font-bold text-primary">{product.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{product.category}</p>
                <p className="text-xl font-semibold text-gray-800 mt-2">
                  {formatMoney(product.price)}
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 rounded-lg bg-secondary text-white px-4 py-2 font-semibold hover:bg-secondary/90 transition-colors text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex-1 rounded-lg bg-red-600 text-white px-4 py-2 font-semibold hover:bg-red-700 transition-colors text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
