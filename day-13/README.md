# This is Day-13 of Learning Backend.

* Today I focused on learning the **basics of authentication** in a backend application.  
* This was my first step into understanding how users are registered and authenticated in real world backend systems.

---

## 📘 What I Learned Today

- How authentication works at a basic level in backend applications
- Creating a **User model** to store user information
- Implementing a **user registration API**
- Checking if a user already exists before creating a new account
- Using **JWT (JSON Web Token)** to generate authentication tokens
- Storing authentication tokens securely in **browser cookies**
- Using **cookie-parser** middleware to handle cookies
- Structuring authentication logic using **Express Router**
- Organizing authentication related code into routes and models

---

## 🔐 Authentication Flow

1. User sends **name, email, and password** from the client
2. Backend checks if the user already exists using email
3. If the user does not exist, a new user is created in the database
4. A **JWT token** is generated using user information
5. The token is stored in the browser as a cookie
6. Backend sends a success response with user details

This helped me understand how authentication data flows securely between client and server.

---

## Concepts Practiced

- **JWT (JSON Web Token)**  
  Used to create a secure token that represents a logged in user.

- **Cookies**  
  Used to store the JWT token on the client side.

- **Express Router**  
  Used to keep authentication routes separate and organized.

- **Middleware**  
  Used `express.json()` and `cookie-parser` to handle requests and cookies.

---

## Folder Structure (Day-13)

```bash
day-13/
│
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   │
│   ├── models/
│   │   └── user.model.js        # User schema for authentication
│   │
│   ├── routes/
│   │   └── auth.routes.js       # Authentication routes (register)
│   │
│   └── app.js                   # App configuration & middleware
│
├── server.js                    # Server entry point
├── .env                         # Environment variables (JWT secret, DB URI)
├── .gitignore
├── Auth_Notes.md                # Authentication notes
├── package.json
├── package-lock.json
└── README.md
```