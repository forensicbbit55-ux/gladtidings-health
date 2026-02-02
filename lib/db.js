// Database Connection Configuration
// This file handles the PostgreSQL connection to Neon database using connection pooling

import { Pool } from 'pg'

// Create a new connection pool for Neon PostgreSQL
// Connection pooling improves performance by reusing database connections
const pool = new Pool({
  // Use the DATABASE_URL from environment variables
  // This keeps credentials secure and out of source code
  connectionString: process.env.DATABASE_URL,
  
  // SSL configuration required for Neon PostgreSQL
  // Ensures encrypted communication with the database
  ssl: {
    rejectUnauthorized: false // Neon requires this for SSL connections
  },
  
  // Connection pool settings
  max: 20, // Maximum number of connections in the pool
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  connectionTimeoutMillis: 2000, // Return error after 2 seconds if connection fails
})

// Handle pool errors
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

// Export the pool for use in other parts of the application
// Use this for all database queries to benefit from connection pooling
export { pool }

// Helper function to execute queries with error handling
export async function query(text, params) {
  const start = Date.now()
  try {
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log('Executed query', { text, duration, rows: res.rowCount })
    return res
  } catch (error) {
    console.error('Database query error', { text, error })
    throw error
  }
}

// Export the query function as default for convenience
export default query
