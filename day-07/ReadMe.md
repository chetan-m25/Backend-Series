## This is Day-07 of Learning Backend. Cohort-2.0

I focused on connecting a backend server with MongoDB and structuring the project in a clean, scalable way. The main goal was to understand how real backend applications organize code and handle database operations.

## Today I Learned :

- How to structure a backend project using separate folders for configuration, models, and application logic.
- Connecting MongoDB Atlas to a Node.js server using **Mongoose**
- Managing sensitive data like database URLs using **environment variables (.env)**
- Creating MongoDB schemas and models for structured data storage.
- Writing basic **REST APIs** to create and fetch data from the database.
- Using **Postman** to test API endpoints.
- Using **MongoDB Compass** to visually inspect and verify stored data.
- Keeping database connection logic separate from server startup logic.

## Folder Structure :
```bash
day-07/
│
├── src/
│   ├── config/
│   │   └── database.js        # MongoDB connection logic
│   │
│   ├── models/
│   │   └── notes.model.js     # Mongoose schema & model
│   │
│   └── app.js                 # Express app & routes
│
├── server.js                  # Server entry point
├── .env                       # Environment variables
├── package.json
└── ReadMe.md
```
## Tech Used :
- Node.js
- Express.js
- MongoDB Atlas & Compass
- Mongoose
- Postman

> This day strengthened my understanding of clean backend architecture and real-world database integration practices.