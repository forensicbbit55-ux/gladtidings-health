# 🏥 Glad Tidings Health - Medical Missionary Website

## 📋 Project Overview

A comprehensive medical missionary website built with Next.js 14, featuring:

### 🌟 **Key Features**
- **🏥 Medical Services**: Natural health consultations and remedies
- **🙏 Spiritual Care**: Faith-based counseling and support
- **🛒 E-commerce**: Product catalog with categories
- **👥 Admin Panel**: Complete content management system
- **📧 Contact Form**: With spam protection and email notifications
- **📱 Responsive Design**: Works on all devices

### 🛠️ **Technology Stack**
- **Frontend**: Next.js 14 (App Router)
- **Backend**: Node.js with PostgreSQL
- **Database**: Neon (PostgreSQL)
- **Authentication**: bcrypt password hashing
- **Email**: Nodemailer with SMTP
- **Styling**: Tailwind CSS
- **UI Components**: Custom responsive design

### 🔒 **Security Features**
- **Rate Limiting**: 5 requests/hour per IP
- **Spam Protection**: Keyword filtering and honeypot
- **Input Validation**: Comprehensive form validation
- **Admin Authentication**: Secure login system
- **Environment Security**: Variable validation

### 📊 **Database Schema**
- **Remedies**: Products with categories
- **Categories**: Hierarchical organization
- **Contact Messages**: With spam tracking
- **Admin Users**: Secure authentication

### 🌐 **Pages & Routes**
- **Home**: Landing page with carousel
- **Products**: E-commerce catalog
- **About**: Mission and team information
- **Services**: Health consultation offerings
- **Contact**: Form with spam protection
- **Admin**: Complete management system
- **404**: Custom error page

### 🚀 **Deployment Ready**
- **Environment Variables**: Configured for production
- **Build Optimized**: Next.js production build
- **Image Placeholders**: Dynamic placeholder system
- **Error Handling**: Comprehensive error pages

---

## 🛠️ **Installation & Setup**

### **Prerequisites**
- Node.js 18+ 
- PostgreSQL database
- SMTP email service

### **Environment Variables**
```bash
DATABASE_URL=postgresql://username:password@host:port/database
NEXT_PUBLIC_BASE_URL=https://your-domain.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM="Glad Tidings <your-email@gmail.com>"
ADMIN_EMAIL=admin@gladtidings.com
ADMIN_PASSWORD=secure-admin-password
```

### **Installation**
```bash
# Clone repository
git clone https://github.com/Eliazar-dev/Gladtidings-health2.git

# Install dependencies
npm install

# Set environment variables
cp .env.local.example .env.local

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

---

## 📱 **Features Overview**

### **Medical Services**
- Natural health consultations
- Herbal medicine workshops
- Nutritional planning
- Spiritual counseling
- Detoxification programs
- Family health packages

### **E-commerce**
- Product catalog with categories
- Shopping cart functionality
- Product search and filtering
- Admin product management

### **Admin Panel**
- User authentication
- Content management
- Order management
- Contact form responses
- Media management

### **Contact System**
- Spam-protected contact form
- Email notifications
- Rate limiting
- Message tracking

---

## 🎯 **Project Structure**

```
src/
├── app/
│   ├── admin/           # Admin panel
│   ├── api/            # API routes
│   ├── products/        # E-commerce pages
│   ├── contact/         # Contact form
│   └── (other pages)   # Public pages
├── components/          # Reusable components
├── lib/               # Utilities and database
└── scripts/           # Setup and validation
```

---

## 🔧 **Development**

### **Available Scripts**
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # Code linting
```

### **Database Setup**
```bash
# Run database setup
npm run setup:db

# Seed with sample data
npm run seed
```

---

## 📄 **License**

This project is licensed under the MIT License.

---

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📞 **Contact**

- **Website**: [Your Website URL]
- **Email**: eliazar.dev55@gmail.com
- **GitHub**: https://github.com/Eliazar-dev

---

## 🎠 **Built with ❤️ for Medical Missionary Work**

*Bringing healthcare and hope to communities worldwide through natural remedies and faith-based care.*
