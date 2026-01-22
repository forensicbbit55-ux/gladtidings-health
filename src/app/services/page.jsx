'use client'

import { useMemo, useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { productsAPI } from '@/lib/api'

const CATEGORIES = ['Natural Remedies', 'E-books', 'Health Guidelines']

function formatMoney(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export default function ServicesPage() {
  const [active, setActive] = useState(CATEGORIES[0])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addItem } = useCart()

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        setError(null)
        const data = await productsAPI.getAll(active)
        setProducts(data)
      } catch (err) {
        console.error('Failed to fetch products:', err)
        setError('Failed to load products. Using fallback data.')
        // Fallback to placeholder products if API fails
        setProducts([
          {
            _id: 'nr-1',
            category: 'Natural Remedies',
            title: 'Herbal Immune Support Tea',
            price: 14.99,
            image: 'https://placehold.co/600x400?text=Natural+Remedies',
          },
          {
            _id: 'nr-2',
            category: 'Natural Remedies',
            title: 'Soothing Balm (Herbal)',
            price: 9.5,
            image: 'https://placehold.co/600x400?text=Natural+Remedies',
          },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [active])

  const visibleProducts = useMemo(() => {
    return products.filter((p) => p.category === active)
  }, [products, active])

  return (
    <main className="px-4 py-12">
      <div className="container mx-auto">
        <header className="max-w-3xl">
          <p className="text-secondary font-semibold tracking-wide uppercase text-sm">
            Services
          </p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold text-primary">
            Explore Resources for Health & Wholeness
          </h1>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Browse our collection of natural remedies, e-books, and health guidelines.
          </p>
        </header>

        {/* Category Tabs */}
        <div className="mt-10 flex flex-wrap gap-3">
          {CATEGORIES.map((c) => {
            const isActive = c === active
            return (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                className={[
                  'rounded-full px-5 py-2 font-semibold transition-colors',
                  isActive
                    ? 'bg-primary text-white'
                    : 'bg-white border border-primary/20 text-primary hover:bg-gray-50',
                ].join(' ')}
              >
                {c}
              </button>
            )
          })}
        </div>

        {/* Product Grid */}
        <section className="mt-10">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : error ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800">
              {error}
            </div>
          ) : visibleProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleProducts.map((p) => (
                <div
                  key={p._id || p.id}
                  className="bg-white border border-primary/10 rounded-xl overflow-hidden shadow-sm"
                >
                  <div className="h-44 bg-gray-100 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image || 'https://placehold.co/600x400?text=Product'}
                      alt={p.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-primary">{p.title}</h3>
                    <p className="mt-2 text-gray-700 font-semibold">
                      {formatMoney(p.price)}
                    </p>

                    <button
                      type="button"
                      onClick={() => addItem({
                        id: p._id || p.id,
                        title: p.title,
                        price: p.price,
                        image: p.image,
                      })}
                      className="mt-4 w-full rounded-lg bg-secondary text-white px-4 py-3 font-semibold hover:bg-secondary/90 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

