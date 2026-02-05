import ProductsClient from './ProductsClient'

async function getCategories() {
  try {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_BASE_URL 
      : 'http://localhost:3001'
    
    const response = await fetch(`${baseUrl}/api/public/categories`)
    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }
    const data = await response.json()
    return data.success ? data.categories : []
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

async function getRemedies(categoryId = null) {
  try {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_BASE_URL 
      : 'http://localhost:3001'
    
    const url = new URL(`${baseUrl}/api/public/remedies`)
    if (categoryId) {
      url.searchParams.set('category_id', categoryId)
    }
    
    const response = await fetch(url.toString())
    if (!response.ok) {
      throw new Error('Failed to fetch remedies')
    }
    const data = await response.json()
    return data.success ? data.remedies : []
  } catch (error) {
    console.error('Error fetching remedies:', error)
    return []
  }
}

export default async function ProductsPage({ searchParams }) {
  const selectedCategory = searchParams.category || 'all'
  
  // Fetch data server-side
  const [categories, remedies] = await Promise.all([
    getCategories(),
    getRemedies(selectedCategory !== 'all' ? selectedCategory : null)
  ])

  return (
    <ProductsClient 
      categories={categories}
      remedies={remedies}
      initialCategory={selectedCategory}
    />
  )
}
