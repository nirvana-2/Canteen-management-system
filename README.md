# Hamro Canteen - Canteen Management System

**Hamro Canteen** is a modern, full-stack web application designed to streamline canteen operations for students, staff, and administrators. It provides a seamless dining experience with real-time stats, fast ordering, and efficient order management.

## 🌐 Live Demo

👉 **[https://canteen-management-system-rho.vercel.app](https://canteen-management-system-rho.vercel.app)**

| Role    | Email                  | Password    |
|---------|------------------------|-------------|
| Admin   | admin@canteen.com      | admin123    |
| Staff   | staff@canteen.com      | staff123    |
| Student | saman@canteen.com      | student123  |

---

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

---

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

### Deployment
- **Vercel**: Frontend hosting
- **Render**: Backend hosting
- **MongoDB Atlas**: Cloud database

---

## 📦 Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local or Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/nirvana-2/Canteen-management-system.git
cd Canteen-management-system
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
BASE_URL=http://localhost:3000
```
Start the backend server:
```bash
node server.js
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:3000
```

The application will be available at `http://localhost:5173`.

---

## 🎨 Theming
The application features a dedicated **Canteen Theme** with:
- Custom utensils-themed icons and branding.
- High-quality canteen background images for auth pages.
- Modern, clean, and responsive UI design using Tailwind CSS.

---

*Developed with ❤️ by Saman Shakya*