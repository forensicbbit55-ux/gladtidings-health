# Glad Tidings

A Next.js 14 application for medical missionary work, combining natural healing remedies with Gospel ministry.

## Features

- **Home Page**: Hero section, mission cards, and call-to-action
- **Services Page**: Browse products by category (Natural Remedies, E-books, Health Guidelines)
- **Devotional Page**: Verse of the day and devotional content
- **Contact Page**: Contact form and prayer request
- **Checkout**: Order processing with success confirmation
- **Shopping Cart**: Slide-out cart sidebar
- **Chat Widget**: Global floating chat button
- **Admin Dashboard**: Product management (login required)

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT tokens

## Getting Started

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend Setup

See [backend/README.md](./backend/README.md) for backend setup instructions.

1. Navigate to backend directory:
```bash
cd backend
npm install
```

2. Create `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gladtiding
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRE=7d
```

3. Make sure MongoDB is running, then start the backend:
```bash
npm run dev
```

## Project Structure

```
gladtiding/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── admin/        # Admin dashboard
│   │   ├── checkout/     # Checkout page
│   │   ├── contact/      # Contact page
│   │   ├── devotional/   # Devotional page
│   │   ├── services/     # Services/products page
│   │   ├── layout.js     # Root layout
│   │   └── page.js       # Home page
│   ├── components/       # React components
│   │   ├── CartSidebar.js
│   │   ├── ChatWidget.js
│   │   ├── Footer.js
│   │   └── Navbar.js
│   ├── context/          # React context providers
│   │   └── CartContext.js
│   └── lib/              # Utilities
│       └── api.js        # API client functions
├── backend/              # Express backend API
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Express middleware
│   └── server.js         # Entry point
├── public/               # Static assets
└── package.json
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders (admin)
- `GET /api/orders/:id` - Get single order (admin)
- `PUT /api/orders/:id/status` - Update order status (admin)

### Authentication
- `POST /api/auth/register` - Register admin user
- `POST /api/auth/login` - Login admin user
- `GET /api/auth/me` - Get current user (protected)

## Admin Access

1. Register an admin account via `/api/auth/register` or create one directly in MongoDB
2. Login at `/admin` page
3. Manage products, view orders

## Color Scheme

- **Primary**: `#1B4332` (Dark green)
- **Secondary**: `#2D6A4F` (Medium green)
- **Accent**: `#D4A373` (Gold/tan)

## Development

- Frontend runs on `http://localhost:3000`
- Backend API runs on `http://localhost:5000`
- MongoDB should be running locally or use MongoDB Atlas
