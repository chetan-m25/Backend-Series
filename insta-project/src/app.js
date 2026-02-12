const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes");

app.use(express.json()); // Middleware to convert JSON data into JS object
app.use(cookieParser()); // Middleware to parse cookies

app.use("/api/auth", authRouter); // Use auth routes with /api/auth prefix
app.use("/api/posts", postRouter); // Use post routes with /api/posts prefix

module.exports = app;
