# insta-project   
A Backend Social Media System (Built After 15 Days of Backend Learning)

insta-project is a structured backend application built as part of my **Backend-Series journey**.  
After 15 days of consistently learning core backend concepts, I combined everything into this complete social media backend system.

This project represents the practical implementation of authentication, post management, user interactions, and scalable architecture.

---

## 📌 About This Project

This is a backend only implementation of a social media platform that includes:

- Secure User Authentication
- Post Creation & Management
- Follow System
- Like & Save Features
- Protected Routes
- Middleware based Architecture
- Scalable Folder Structure

It is built using all the concepts learned throughout my 15-day backend learning series.

---

# 🧠 What This Project Demonstrates

After learning backend fundamentals step by step, this project integrates:

- Express server setup
- MongoDB & Mongoose schema modeling
- Controller based architecture
- JWT Authentication
- Password hashing (SHA-256)
- Cookie based session handling
- Route protection via middleware
- Relationship modeling (Follow, Like, Save)
- Error handling middleware
- Clean and scalable folder structure

---

# 🔐 Authentication System

Implemented Features:

- User Registration
- Login with credential validation
- Password hashing using SHA-256
- JWT token generation
- Token stored in cookies
- Auth middleware to verify logged-in users

Security Highlights:

- No plain text password storage
- Token expiration handling
- Middleware based protection for private routes

---

# Core Functional Modules

## 1️⃣ User Module
- Register
- Login
- Protected user routes
- Secure password storage

## 2️⃣ Post Module
- Create Post
- Fetch Posts
- Structured post schema
- Image handling (with upload middleware support)

## 3️⃣ Follow System
- Follow users
- Unfollow users
- Relationship stored in Follow model

## 4️⃣ Like System
- Like posts
- Track user-post interactions

## 5️⃣ Save System
- Save posts
- Retrieve saved posts

---

# 🏗️ Project Architecture

The project follows a clean controller based architecture.
```
insta-project/
│
├── src/
│ ├── config/
│ │ └── database.js
│ │
│ ├── controllers/
│ │ ├── auth.controller.js          # Authentication logic
│ │ ├── post.controller.js          # Post CRUD logic
│ │ └── follow.controller.js        # Follow/unfollow logic
│ │
│ ├── middlewares/
│ │ ├── auth.middleware.js          # JWT verification
│ │ └── uploadError.middleware.js   # Upload error handling
│ │
│ ├── models/
│ │ ├── user.model.js               |
│ │ ├── post.model.js               |
│ │ ├── follow.model.js             # All Models
│ │ ├── like.model.js               |
│ │ └── save.model.js               |
│ │
│ ├── routes/
│ │ ├── auth.routes.js              |
│ │ ├── post.routes.js              # All Routes
│ │ └── follow.routes.js            |
│ │
│ └── app.js                      
│
├── server.js 
├── .env 
├── package.json
└── README.md
```

---

# 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- Crypto (SHA-256 hashing)
- Cookie-parser
- Middleware based architecture

---

# 🔄 Request Flow Example

### Register Flow
1. Receive user data
2. Check if email exists
3. Hash password
4. Save user
5. Generate JWT
6. Store token in cookie

### Protected Route Flow
1. Read token from cookies
2. Verify JWT
3. Extract user ID
4. Allow access if valid

---

# 🎯 Why This Project Matters

This project is not just a CRUD app.  
It represents:

- 15 days of backend fundamentals
- Structured coding practices
- Understanding of real world backend systems
- Implementation of authentication & relational modeling
- Writing scalable backend architecture

It marks the transition from learning concepts individually to building a structured backend system.

---

# Final Note

insta-project is a consolidation project built after 15 days of consistent backend learning.  
It combines authentication, relationships, middleware, and scalable architecture into a structured backend application.

This project reflects practical backend growth and foundational understanding of modern server side development.