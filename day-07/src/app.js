const express = require("express");
const app = express();
app.use(express.json());
const noteModel = require("./models/notes.model");

app.post("/notes", async (req, res) => {
  const { tittle, description } = req.body;

  const note = await noteModel.create({
    tittle,
    description,
  });

  res.status(201).json({
    message: "Note Created Successfully",
    note,
  });
});

app.get("/notes", async (req, res) => {
  const note = await noteModel.find();
  res.status(200).json({
    message: "Notes Fetched Successfully",
    note,
  });
});

module.exports = app;
