const express = require("express");
const cors = require("cors");
const noteModel = require("./models/notes.model");
const path = require("path"); // Import path module to work with file paths
const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.static("./public")); // Serve static files like HTML, CSS, JS from public folder


// Creating notes using POST method
app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;
  const createNote = await noteModel.create({
    title,
    description,
  });
  res.status(201).json({
    message: "Note Created Successfully",
    createNote,
  });
});

// Reading notes using GET method
app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();
  res.status(200).json({
    message: "Notes Fetched Successfully",
    notes,
  });
});

// Update notes using PATCH method
app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  await noteModel.findByIdAndUpdate(id, {
    title,
    description,
  });
  res.status(200).json({
    message: "Note Updated Successfully",
  });
});

// Delete notes using Patch method
app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  await noteModel.findByIdAndDelete(id);
  res.status(200).json({
    message: "Note Deleted Successfully",
  });
});


// Handle all routes and serve the main HTML file
app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});

module.exports = app;
