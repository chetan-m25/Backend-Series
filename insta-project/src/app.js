const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json()); // Middleware to convert JSON data into JS object
app.use(cookieParser()); // Middleware to parse cookies

// Importing route handlers
const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes");
const followRouter = require("./routes/follow.routes");

// Use route handlers with appropriate prefixes
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/follow", followRouter);

module.exports = app;
