## This is Day-08 of Learning Backend. Cohort-2.0

Today i focused on implementing complete **CRUD operations** using MongoDB and testing them through REST API requests.

## What I Learned Today

Today’s learning was about moving beyond just connecting a database and actually **working with data end-to-end**.

- Implemented full **CRUD operations** (Create, Read, Update, Delete)
- Used **REST APIs** to interact with MongoDB collections
- Created structured API routes using Express
- Learned how to pass and handle **dynamic route parameters (id)**
- Used **Mongoose methods** to perform database operations
- Tested all API endpoints using **Postman**
- Verified data changes directly in **MongoDB Compass**
- Improved understanding of how backend APIs communicate with databases

## API Operations Practiced (CRUD)

- **Create (POST)** - Creates a new note  
  Method used: `noteModel.create()`

- **Read (GET)** - Fetches all notes  
  Method used: `noteModel.find()`

- **Update (PATCH)** - Updates a note using its ID  
  Method used: `noteModel.findByIdAndUpdate()`

- **Delete (DELETE)** - Deletes a note using its ID  
  Method used: `noteModel.findByIdAndDelete()`

## Folder Structure

```bash
day-08/
│
├── src/
│   ├── config/
│   │   └── database.js        # MongoDB connection logic
│   │
│   ├── models/
│   │   └── notes.model.js     # Schema & model definition
│   │
│   └── app.js                 # API routes & middleware
│
├── server.js                  # Server entry point
├── .env                       # Environment variables
├── package.json
└── README.md
