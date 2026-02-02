import { neon } from '@neondatabase/serverless'

if (!process.env.NEXT_PUBLIC_NEON_DATABASE_URL) {
  console.warn('Neon database URL not found. Please check your .env.local file.')
}

export const sql = neon(process.env.NEXT_PUBLIC_NEON_DATABASE_URL || '')
