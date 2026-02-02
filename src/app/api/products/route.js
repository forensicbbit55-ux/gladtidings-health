// API endpoint for fetching all products
import { query } from '../../../../lib/db'

export async function GET() {
  try {
    // Fetch all products from database
    const result = await query('SELECT * FROM products ORDER BY created_at DESC')
    
    return Response.json({
      success: true,
      products: result.rows,
      count: result.rowCount
    })
    
  } catch (error) {
    console.error('Error fetching products:', error)
    return Response.json({
      success: false,
      error: error.message,
      message: 'Failed to fetch products'
    }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, description, price, image_url, category, in_stock = true } = body
    
    // Generate a simple ID
    const id = Date.now().toString()
    
    // Insert new product
    const result = await query(
      'INSERT INTO products (id, name, description, price, image_url, category, in_stock) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [id, name, description, price, image_url, category, in_stock]
    )
    
    return Response.json({
      success: true,
      product: result.rows[0],
      message: 'Product created successfully'
    })
    
  } catch (error) {
    console.error('Error creating product:', error)
    return Response.json({
      success: false,
      error: error.message,
      message: 'Failed to create product'
    }, { status: 500 })
  }
}
