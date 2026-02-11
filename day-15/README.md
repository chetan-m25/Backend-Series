# This is Day-15 of Learning Backend.

* Today I focused on improving the authentication system by restructuring and refining the login flow.  
* This day was about organizing the backend properly and strengthening token based authentication.

---

## 📘 What I Learned Today

- Separating authentication logic into **controllers**
- Keeping routes clean and delegating logic properly
- Improving password hashing using **SHA-256**
- Adding JWT expiration (`expiresIn`)
- Creating a **Get Me** route to fetch logged-in user details
- Verifying JWT tokens to identify authenticated users
- Returning only necessary user data in responses
- Structuring backend code in a more scalable way

---

## 📈 Authentication Improvements Made

### Controller Based Structure
Authentication logic is now moved to a dedicated controller file:
- Routes only define endpoints
- Controllers handle business logic
- Code becomes cleaner and maintainable

### Stronger Password Hashing
- Passwords are hashed using **SHA-256**
- Plain text passwords are never stored
- Login compares hashed values for validation

### JWT with Expiration
- Tokens are generated with `expiresIn: "1d"`
- Improves security by limiting token validity

---

## 🔐 Authentication Flow (Updated)

### Register
1. Receive user details
2. Check if user already exists
3. Hash password using SHA-256
4. Save user in database
5. Generate JWT with expiration
6. Store token in cookies

### Login
1. Validate user existence
2. Hash entered password
3. Compare with stored hash
4. Generate new JWT
5. Store token in cookies

### Get Me
1. Read token from cookies
2. Verify JWT
3. Extract user ID
4. Fetch and return logged-in user details

---

## Concepts Practiced

- **Controllers**
- **SHA-256 Password Hashing**
- **JWT with Expiration**
- **Cookie based Authentication**
- **Token Verification**
- **Clean Project Structure**

---

##  📁 Folder Structure (Day-15) :

```bash
day-15/
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   └── auth.controller.js    # Authentication logic (register, login, get-me)
│   │
│   ├── models/
│   │   └── user.model.js         # User schema with hashed password
│   │
│   ├── routes/
│   │   └── auth.routes.js        # Authentication route definitions
│   │
│   └── app.js                    # App configuration & middleware
│
├── server.js                     # Server entry point
├── .gitignore
├── .env                          # Environment variables (JWT secret, DB URI)
├── package.json
├── package-lock.json
└── README.md                     # Day-15 learning documentation
```
