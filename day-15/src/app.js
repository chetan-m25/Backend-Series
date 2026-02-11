const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");   // Import cookie parser to read cookies
const authRouter = require("./routes/auth.routes");   // Import auth routes

app.use(express.json());
app.use(cookieParser());   // Use cookie parser middleware
app.use("/api/auth", authRouter);   // Use auth routes with /api/auth prefix

module.exports = app;
