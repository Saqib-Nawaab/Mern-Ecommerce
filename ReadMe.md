# 🛍️ MERN E-Commerce Platform


![structre](https://res.cloudinary.com/djfem14lf/image/upload/v1757400630/Screenshot_2025-09-08_234950_etbo4q.png)





[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)](https://socket.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> A full-featured, modern e-commerce platform built with the MERN stack, featuring real-time messaging, secure payments, multi-vendor support, and comprehensive admin/seller dashboards.

## 🌟 Features

### 🛒 **Customer Features**
- **User Authentication**: Secure registration, login, and email activation
- **Product Browsing**: Advanced search, filtering, and categorization
- **Shopping Cart**: Add to cart, quantity management, wishlist functionality
- **Secure Checkout**: Multiple payment options with Stripe integration
- **Order Management**: Order history, tracking, and status updates
- **User Profile**: Address management, password change, avatar upload
- **Reviews & Ratings**: Product review system with ratings
- **Real-time Chat**: Live messaging with sellers

### 🏪 **Seller Features**
- **Seller Dashboard**: Comprehensive analytics and sales insights
- **Product Management**: Create, update, delete products with image uploads
- **Inventory Management**: Stock tracking and management
- **Event Management**: Create special events and flash sales
- **Order Management**: Process orders, update status, manage refunds
- **Coupon System**: Create and manage discount coupons
- **Revenue Analytics**: Detailed sales reports and analytics
- **Profile Management**: Update seller information and avatar

### 👑 **Admin Features**
- **Admin Dashboard**: Platform-wide analytics and statistics
- **User Management**: View, manage, and delete user accounts
- **Seller Management**: Approve/reject sellers, manage seller accounts
- **Product Oversight**: Monitor and manage all products
- **Order Oversight**: View all orders across the platform
- **Platform Analytics**: Comprehensive business intelligence

### 💬 **Communication**
- **Real-time Messaging**: Powered by Socket.IO
- **Customer Support**: Direct communication between buyers and sellers
- **Notifications**: Real-time updates for orders and messages

## 🏗️ Architecture

```
📁 Project Structure
├── 📁 backend/           # Express.js API server
│   ├── 📁 config/        # Configuration files
│   ├── 📁 controllers/   # Route controllers
│   ├── 📁 models/        # MongoDB models
│   ├── 📁 routes/        # API routes
│   ├── 📁 middlewares/   # Custom middleware
│   └── 📁 utils/         # Utility functions
├── 📁 frontend/          # React.js application
│   ├── 📁 src/
│   │   ├── 📁 components/ # Reusable components
│   │   ├── 📁 pages/     # Page components
│   │   ├── 📁 redux/     # State management
│   │   └── 📁 Routes/    # Route configurations
└── 📁 socket/            # Socket.IO server
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB Atlas account or local MongoDB
- Cloudinary account (for image uploads)
- Stripe account (for payments)

### 1. Clone the Repository
```bash
git clone https://github.com/Saqib-Nawaab/Mern-Ecommerce.git
cd Mern-Ecommerce
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file with your configurations
cp .env.example .env
# Edit .env with your database and API keys

npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Socket Server Setup
```bash
cd socket
npm install
npm run dev
```

## 🔧 Environment Variables

### Backend (.env)
```env
# Database
MONGO_URL=your_mongodb_connection_string

# JWT Secrets
JWT_SECRET_KEY=your_jwt_secret
JWT_EXPIRES_TIME=7d

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_email_password

# Cloudinary
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLIC_KEY=your_stripe_public_key

# Server
PORT=2000
FRONTEND_URL=http://localhost:5173
```

### Socket (.env)
```env
PORT=4000
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:2000
```

## 📦 Tech Stack

### Frontend
- **React 19** - UI library
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Material-UI** - Component library
- **Axios** - HTTP client
- **Socket.IO Client** - Real-time communication
- **Stripe** - Payment processing
- **React Toastify** - Notifications
- **Lottie React** - Animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Image storage
- **Stripe** - Payment processing
- **Nodemailer** - Email service
- **Socket.IO** - Real-time communication

### DevOps & Deployment
- **Vercel** - Deployment platform
- **Git** - Version control
- **ESLint** - Code linting
- **Vite** - Build tool

## 📊 API Endpoints

### Authentication
```
POST /api/v1/user/create-user      # User registration
POST /api/v1/user/activation       # Account activation
POST /api/v1/user/login-user       # User login
GET  /api/v1/user/logout           # User logout
```

### Products
```
GET    /api/v1/product/all-products    # Get all products
POST   /api/v1/product/create-product  # Create product
PUT    /api/v1/product/update/:id      # Update product
DELETE /api/v1/product/delete/:id      # Delete product
```

### Orders
```
GET  /api/v1/order/user-orders/:id     # Get user orders
POST /api/v1/order/create-order        # Create new order
PUT  /api/v1/order/update-status/:id   # Update order status
```

### Payments
```
POST /api/v1/payment/create-payment-intent # Create Stripe payment
POST /api/v1/payment/get-stripe-key        # Get Stripe public key
```

## 🎨 UI Components

The application features a modern, responsive design with:
- **Responsive Layout** - Mobile-first design
- **Dark/Light Mode** - Theme switching capability
- **Loading Animations** - Lottie-powered loading screens
- **Interactive Elements** - Smooth hover effects and transitions
- **Form Validation** - Real-time form validation
- **Toast Notifications** - User-friendly notifications

## 🔐 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcryptjs encryption
- **CORS Protection** - Cross-origin request security
- **Input Validation** - Server-side validation
- **File Upload Security** - Secure file handling
- **Environment Variables** - Sensitive data protection

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Tablet Friendly** - Adapted for tablet screens
- **Desktop Optimized** - Full desktop experience
- **Cross-Browser** - Compatible across modern browsers

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Frontend Deployment**:
   ```bash
   cd frontend
   npm run build
   vercel --prod
   ```

2. **Backend Deployment**:
   ```bash
   cd backend
   vercel --prod
   ```

3. **Environment Variables**: Set up environment variables in Vercel dashboard

### Manual Deployment

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Start backend in production:
   ```bash
   cd backend
   npm start
   ```

## 🧪 Testing

```bash
# Run frontend tests
cd frontend
npm test

# Run backend tests
cd backend
npm test
```

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, email saqibnawaab@gmail.com or create an issue in this repository.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) for the amazing UI library
- [Express.js](https://expressjs.com/) for the robust backend framework
- [MongoDB](https://www.mongodb.com/) for the flexible database
- [Socket.IO](https://socket.io/) for real-time communication
- [Stripe](https://stripe.com/) for secure payment processing
- [Cloudinary](https://cloudinary.com/) for image management

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by [Saqib Nawaab](https://github.com/Saqib-Nawaab)

</div>