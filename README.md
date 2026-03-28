# 🚀 Full Stack Web Application (MERN)

A clean, modern, and simple full-stack web application built with the MERN stack (**MongoDB, Express, React, Node.js**). It features a secure authentication system (Login & Registration), a protected dashboard, and a stunning glassmorphism UI built entirely with Vanilla CSS.

---

## ✨ Features

- **Modern Glassmorphism UI:** Rich aesthetics with beautiful gradients, glass cards, and smooth micro-animations using pure Vanilla CSS.
- **Secure Authentication:** Complete Login & Signup flows powered by JWT (JSON Web Tokens) and passwords securely hashed with `bcryptjs`.
- **Protected Routes:** React Router setup ensuring that only authenticated users can access the dashboard.
- **RESTful API:** Robust Node.js & Express backend structured with modular routes and middleware.
- **Database Seeding:** Included script to automatically generate dummy data (Leads, Tasks, Team Members) to populate the dashboard immediately.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React.js 
- **Routing:** React Router 
- **HTTP Client:** Axios
- **Icons:** Lucide-React
- **Styling:** Vanilla CSS (CSS3 Variables, Flexbox, CSS Grid)

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB 
- **Authentication:** `jsonwebtoken` (JWT) & `bcryptjs`
- **Environment Management:** `dotenv`

---

## 💻 Getting Started

### Prerequisites
Make sure you have Node.js and MongoDB installed on your local machine, or a MongoDB connection string ready.

### 1. Clone & Install

Clone the repository and install dependencies for both the frontend and backend.

```bash
# Clone the repository (if applicable)
# Navigate to the project root
```

### 1. Backend Setup
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. *(Optional)* Provide your own `.env` file if you want to override the default hardcoded MongoDB connection, otherwise the defaults will work out of the box.
4. **Seed the Database:** Run the seed script to wipe the database clean and pre-populate it with dummy leads, tasks, team members, and a test user.
   ```bash
   node seed.js
   ```
5. **Start the Server:**
   ```bash
   node server.js
   ```
   > The backend server will run on **http://localhost:5001**. 

### 2. Frontend Setup
1. Open a new, separate terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   > The frontend application will run on **http://localhost:5173**.

---




## 📂 Folder Structure

```text
assignment/
├── backend/
│   ├── models/            # Mongoose Schemas (User, Data)
│   ├── routes/            # Express Routes (auth.js, dashboard.js)
│   ├── middleware/        # JWT Authentication Middleware
│   ├── server.js          # Main Express Server Entry
│   ├── seed.js            # DB Seeding Script
│   ├── .env               # Environment Variables configuration
│   └── package.json       
└── frontend/
    ├── public/            
    ├── src/
    │   ├── components/    # Reusable UI React Components
    │   ├── pages/         # Page Views (Login.jsx, Signup.jsx, Dashboard.jsx)
    │   ├── App.jsx        # App configuration & Router Setup
    │   ├── main.jsx       # React DOM root render
    │   └── index.css      # Core Vanilla CSS Glassmorphism logic
    ├── vite.config.js     
    └── package.json       
```

---


