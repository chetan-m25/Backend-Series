# This is Day-14 of Learning Backend.

* Today i focused on improving the authentication system by **securing user passwords** and implementing a proper **login validation flow**.  
* This day was about understanding how real world applications safely store credentials and verify users during login.

---

## 📘 What I Learned Today

- Why storing **plain text passwords is unsafe**
- How to **hash passwords** before saving them to the database
- Using Node.js **crypto module** for password hashing
- Storing only **hashed passwords** in the database
- Validating login credentials for existing users
- Checking whether a user exists before login
- Comparing hashed passwords during authentication
- Generating JWT tokens after successful login
- Using cookies to store authentication tokens
- Handling protected routes that read cookies

---

## 📈 Authentication Improvements Made

### Password Hashing
- User passwords are hashed before saving to the database
- The original password is never stored
- This improves security and protects user data

### Login Validation
During login:
- Email is checked to confirm user existence
- Entered password is hashed and compared with stored hash
- Login is allowed only if credentials are valid

---

## 🔐 Authentication Flow (Register & Login)

### Register
1. User sends name, email, and password
2. Backend checks if the user already exists
3. Password is hashed
4. User is saved with hashed password
5. JWT token is generated
6. Token is stored in cookies

### Login
1. User sends email and password
2. Backend verifies user existence
3. Password hash is compared
4. JWT token is generated on success
5. Token is stored in cookies

---

## Concepts Practiced

- **Password Hashing**  
  Used to securely store user credentials

- **JWT (JSON Web Token)**  
  Used to identify authenticated users

- **Cookies**  
  Used to store authentication tokens

- **Protected Routes**  
  Routes that rely on authentication cookies

- **Express Router & Middleware**  
  Clean separation of authentication logic

---

## 📁 Folder Structure (Day-14)

```bash
day-14/
│
├── src/
│   ├── config/
│   │   └── database.js         # Database connection
│   │
│   ├── models/
│   │   └── user.model.js       # User schema with hashed password
│   │
│   ├── routes/
│   │   └── auth.routes.js      # Register, Login, Protected routes
│   │
│   └── app.js                  # App configuration & middleware
│
├── public/
├── server.js                   # Server entry point
├── .env                        # Environment variables (JWT secret, DB URI)
├── jwt_hash_notes.md           # jwt & hashing notes
├── package.json
├── package-lock.json
├── README.md                   # Day-14 learning documentation
```
