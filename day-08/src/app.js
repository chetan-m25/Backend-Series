const express = require("express");
const app = express();
app.use(express.json());
const noteModel = require("./models/notes.model");

// POST: to Create note
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

// GET: to Read all notes
app.get("/api/notes", async (req, res) => {
  const readNotes = await noteModel.find();

  res.status(200).json({
    message: "Note Fetched Successfully",
    readNotes,
  });
});

// PATCH: to Update note with id
app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  await noteModel.findByIdAndUpdate(id, {
    title,
    description,
  });

  res.status(200).json({
    message: "Note Updated Scuccessfully",
  });
});

// DELETE: to Delete note with id
app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Note Deleted Successfully",
  });
});

module.exports = app;
