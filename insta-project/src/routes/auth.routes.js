const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller");

// Route for user registration (calls registerController)
authRouter.post("/register", authController.registerController);

// Route for user login (calls loginController)
authRouter.post("/login", authController.loginController);

module.exports = authRouter;
