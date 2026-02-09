# Hamro Canteen - Canteen Management System

**Hamro Canteen** is a modern, full-stack web application designed to streamline canteen operations for students, staff, and administrators. It provides a seamless dining experience with real-time stats, fast ordering, and efficient order management.

## 🚀 Features

### For Students
- **Fresh Food Menu**: Browse a categorized list of available food items.
- **Detailed Product View**: View descriptions, prices, and stock availability.
- **Shopping Cart**: Add items to your cart and manage quantities.
- **Secure Ordering**: Place orders and track their status in real-time.
- **Order History**: View your previous orders and their payment status.

### For Staff
- **Order Processing**: Real-time view of pending orders.
- **Order History**: Track processed orders and historical data.

### For Admins
- **Interactive Dashboard**: Overview of total revenue, orders, users, and food items.
- **Food Management**: Add, update, or remove food items from the menu.
- **User Management**: Manage user accounts and roles.
- **Order Oversight**: Access to all orders across the system.

## 🛠️ Tech Stack

### Frontend
- **React**: Modern UI library for building interactive interfaces.
- **Vite**: Ultra-fast build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework for custom styling.
- **Lucide React**: Beautiful & consistent icon set.
- **React Router**: For seamless client-side navigation.
- **Axios**: For making API requests to the backend.

### Backend
- **Node.js & Express**: Robust server-side runtime and framework.
- **MongoDB & Mongoose**: Flexible NoSQL database with schema modeling.
- **JWT (JSON Web Tokens)**: Secure user authentication and authorization.
- **Bcrypt.js**: Industry-standard password hashing.
- **Multer**: Handling image uploads for food items.

## 📦 Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local or Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/canteen-management-system.git
cd canteen-management-system
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
The application will be available at `http://localhost:5173`.

## 🎨 Theming
The application features a dedicated **Canteen Theme** with:
- Custom utensils-themed icons and branding.
- High-quality canteen background images for auth pages.
- Modern, clean, and responsive UI design using Tailwind CSS.

## 📄 License
This project is licensed under the **ISC License**.

---
*Developed with ❤️ by Saman Shakya*
