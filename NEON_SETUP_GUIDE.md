# Neon Database Setup Guide

## 🚀 Quick Setup

### 1. Create Neon Account
- Go to [https://neon.tech](https://neon.tech)
- Sign up for a free account
- Create a new project

### 2. Get Database URL
- In your Neon dashboard, go to your project
- Copy the connection string from the Connection Details
- It should look like: `postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require`

### 3. Set Environment Variables
Create or update your `.env.local` file:
```env
NEXT_PUBLIC_NEON_DATABASE_URL=your_neon_database_url_here
```

### 4. Test Connection
- Restart your dev server: `npm run dev`
- Visit: `http://localhost:3001/test-neon`
- You should see a green success message

## 🗄️ Database Schema

### Create Tables
Run this SQL in your Neon dashboard SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC,
    image_url TEXT NOT NULL,
    category TEXT,
    in_stock BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_name TEXT,
    phone TEXT,
    email TEXT,
    total NUMERIC,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    quantity INTEGER,
    price NUMERIC,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🧪 Testing

### Test Page Features
- Database connection test
- Products data display
- Error handling
- Real-time status updates

### URL
- Test connection: `http://localhost:3001/test-neon`

## 🔧 Usage

### Import Neon Client
```javascript
import { sql } from '../../../lib/neonClient'
```

### Query Examples
```javascript
// Get all products
const products = await sql`SELECT * FROM products ORDER BY created_at DESC`

// Insert product
const result = await sql`
  INSERT INTO products (name, description, price, image_url, category)
  VALUES (${name}, ${description}, ${price}, ${image_url}, ${category})
  RETURNING *
`

// Update product
const result = await sql`
  UPDATE products 
  SET name = ${name}, price = ${price}
  WHERE id = ${id}
  RETURNING *
`
```

## 🎯 Next Steps

1. ✅ Set up Neon database
2. ✅ Create tables with SQL
3. ✅ Test connection
4. 🔄 Build e-commerce features
5. 🔄 Add admin panel integration

## 🎠 Ready to Build!

Your Neon database is now ready for development!
