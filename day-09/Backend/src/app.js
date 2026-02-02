const express = require("express");
const app = express();
const noteModel = require("./models/notes.model");
const cors = require("cors");
app.use(cors());
app.use(express.json());

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
  const readNotes = await noteModel.find();
  res.status(200).json({
    message: "Note Fetched Successfully",
    readNotes,
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

module.exports = app;
