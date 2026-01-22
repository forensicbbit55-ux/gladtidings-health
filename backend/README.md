# Glad Tidings Backend API

Node.js + Express backend with MongoDB for Glad Tidings application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from `.env.example`):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gladtiding
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRE=7d
```

3. Make sure MongoDB is running locally, or update `MONGODB_URI` to your MongoDB connection string.

4. Start the server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register admin user
- `POST /api/auth/login` - Login admin user
- `GET /api/auth/me` - Get current user (protected)

### Products
- `GET /api/products` - Get all products (query: `?category=Natural Remedies`)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders (admin only)
- `GET /api/orders/:id` - Get single order (admin only)
- `PUT /api/orders/:id/status` - Update order status (admin only)

## Authentication

Protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

Admin routes require the user to have `role: 'admin'`.
