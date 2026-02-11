const express = require("express");
const authRouter = express.Router(); // Create a new router for authentication routes
const authController = require("../controllers/auth.controller"); // Import all authentication controller functions


// Route to register a new user
authRouter.post("/register", authController.registerController);

// Route to get currently logged-in user details
authRouter.get("/get-me", authController.getmeController);

// Route to login an existing user
authRouter.post("/login", authController.loginController);


module.exports = authRouter;
