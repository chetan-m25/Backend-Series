import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  // stores all notes fetched from backend
  const [notes, setNotes] = useState([]);

  // controls edit modal visibility
  const [isEditOpen, setIsEditOpen] = useState(false);

  // stores currently editing note id
  const [editId, setEditId] = useState(null);

  // controlled input state for edit title
  const [editTitle, setEditTitle] = useState("");

  // controlled input state for edit description
  const [editDescription, setEditDescription] = useState("");

  // Fetch all notes from backend
  function fetchNotes() {
    axios.get("https://backend-notes-cm.onrender.com").then((res) => {
      setNotes(res.data.notes);
    });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  // Create a new note
  function handleSubmit(e) {
    e.preventDefault();
    const { title, description } = e.target.elements;

    axios
      .post("https://backend-notes-cm.onrender.com", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        setNotes((prevNotes) => [res.data.note, ...prevNotes]);
      });

    e.target.reset(); // clear form inputs
  }

  // Open edit modal for selected note
  function openEditModal(note) {
    setEditId(note._id); // store note id for update
    setEditTitle("");
    setEditDescription("");
    setIsEditOpen(true); // show modal
  }

  // Update note using patch
  function handleUpdate() {
    axios
      .patch(`https://backend-notes-cm.onrender.com/${editId}`, {
        title: editTitle,
        description: editDescription,
      })
      .then(() => {
        fetchNotes();
        setIsEditOpen(false); // close modal after success
      });
  }

  // Delete note by id
  function handleDelete(noteId) {
    axios.delete(`https://backend-notes-cm.onrender.com/${noteId}`).then(() => {
      fetchNotes();
    });
  }

  return (
    <>
      {/* create note form */}
      <form className="note-create-form" onSubmit={handleSubmit}>
        <input name="title" type="text" placeholder="Enter title" required />
        <input
          name="description"
          type="text"
          placeholder="Enter description"
          required
        />
        <button>Create Note</button>
      </form>

      {/* notes list */}
      <div className="notes">
        {notes.map((note) => (
          <div className="note" key={note._id}>
            <h1>{note.title}</h1>
            <p>{note.description}</p>

            {/* edit & delete actions */}
            <div className="note-actions">
              <button className="edit-btn" onClick={() => openEditModal(note)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(note._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* edit note modal */}
      {isEditOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Note</h2>

            {/* controlled input for new title */}
            <input
              type="text"
              placeholder="Enter title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />

            {/* controlled input for new description */}
            <input
              type="text"
              placeholder="Enter description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />

            <div className="modal-actions">
              {/* close modal without updating */}
              <button className="cancel" onClick={() => setIsEditOpen(false)}>
                Cancel
              </button>

              {/* update note (disabled if inputs empty) */}
              <button
                className="update"
                onClick={handleUpdate}
                disabled={!editTitle || !editDescription}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
