# This is Day-25 of Learning Backend.

* Today I focused on improving API reliability by implementing **centralized error handling** and **request validation**.
* This helped me understand how production backend systems validate incoming data and return structured error responses instead of crashing the server.

---

## 📘 What I Learned Today

- Implementing **centralized error handling middleware**
- Using **express validator** for validating request data
- Creating reusable **validation logic for routes**
- Returning structured error responses to the client
- Passing errors to middleware using **next()**
- Separating validation logic into a dedicated folder
- Understanding how middleware flows in Express

---

## Error Handling

Today I implemented a **global error handling middleware** that catches errors from controllers and sends a structured response.

### Key Idea

Instead of sending errors directly from controllers, the error is passed using `next(err)` and handled in a central middleware.

Example flow:

1. Controller throws an error
2. Error passed to `next(err)`
3. Express sends it to the error middleware
4. Middleware returns formatted response

Example structure:

```js
function handleError(err, req, res, next) {
  const response = {
    message: err.message,
  };

  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  res.status(err.status).json(response);
}
```

Benefits:

- Centralized error management
- Cleaner controllers
- Consistent error responses
- Better debugging in development

---

## Request Validation using Express Validator

Today I learned how to validate incoming request data using **express-validator**.

Validation is separated into its own file:

```
validation/auth.validator.js
```

### Example Validation Rules

```js
body("username").isString().withMessage("Username should be String")

body("email").isEmail().withMessage("Email should be valid")

body("password").custom((value) => {
  if (value.length < 6 || value.length > 12) {
    throw new Error("Password should be between 6 and 12 characters long")
  }
})
```

### Password Validation Includes

- Minimum and maximum length check
- At least one lowercase letter
- At least one uppercase letter
- At least one number
- At least one special character

This ensures **strong password security** before data reaches the controller.

---

## Validation Middleware Flow

1. Request reaches route
2. Validation rules run
3. `validationResult()` checks errors
4. If errors exist → return `400`
5. If valid → controller executes

Example:

```js
const validate = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }

  next()
}
```

---

## Route Integration

Validation middleware is attached directly to the route.

```js
authRouter.post("/register", registerValidator, registerUser);
```

Execution order:

1. Validator runs  
2. Validation errors checked  
3. Controller executes if valid  

---

## Key Backend Concepts Practiced

- Express Middleware
- Error Handling Middleware
- Request Validation
- Express Validator
- Middleware Execution Flow
- Structured API Error Responses

---

## 📁 Folder Structure (Day-25):

```bash
day-25/
│
├── src/
│   ├── controllers/
│   │   └── auth.controller.js
│   │
│   ├── middlewares/
│   │   └── error.middleware.js
│   │
│   ├── routes/
│   │   └── auth.routes.js
│   │
│   ├── validation/
│   │   └── auth.validator.js
│   │
│   └── app.js
│
├── server.js
├── .env
├── package.json
├── package-lock.json
└── README.md
```