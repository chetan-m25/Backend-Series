const express = require("express"); // Importing express module

const app = express(); // serever instance created
app.use(express.json()); // Middleware

const notes = []; // Empty array to store notes

app.post("/notes", (req, res) => {
  console.log(req.body); // prints data received in request body
  notes.push(req.body); // pushes data to notes array
  console.log(notes); // prints updated notes array
  res.send("Note Created"); // sends success message
}); // Endpoint to create a new note using POST method

app.get("/notes", (req, res) => {
  res.json(notes); // sends notes array as JSON response
}); // Endpoint to get all notes using GET method

app.delete("/notes/:index", (req, res) => {
  delete notes[req.params.index]; // deletes note at specified index
  res.send("Note Deleted Successfully"); // sends success message
}); // Endpoint to delete a note by index using DELETE method
// To delete 2 indexed note send request URL should be like: http://localhost:8000/notes/2

app.patch("/notes/:index", (req, res) => {
  notes[req.params.index].description = req.body.description; // updates description of note at specified index
  notes[req.params.index].tittle = req.body.tittle; // updates title of note at specified index
  res.send("Note Updated Successfully"); // sends success message
}); // Endpoint to update a note's description by index using PATCH method

module.exports = app; // Exports app to use in other files
