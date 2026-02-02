## This is Day-09 of Learning Backend. Cohort-2.0

Today I focused on connecting the backend with a frontend application and understanding how a full stack project works in practice.  
This day was mainly about learning how different parts of an application communicate with each other in a real development setup.

## What I Learned Today

- Organized the project into **separate Backend and Frontend folders**
- Connected backend APIs with a frontend application
- Learned why frontend and backend usually run on **different ports**
- Understood and implemented **CORS** to allow cross origin communication
- Installed and managed packages based on where they are actually needed
- Improved understanding of **real world full stack project structure**

## Backend Learnings

- Built REST APIs using Express and MongoDB
- Handled database connection in a dedicated config file
- Used Mongoose models to structure and manage data
- Added **CORS middleware** to allow frontend applications to access backend APIs
- Used environment variables to keep sensitive data secure

## Frontend Learnings

- Set up the frontend using Vite and React
- Created a small UI to display backend data on the frontend
- Understood how frontend applications send requests to backend APIs
- Maintained a clean separation between frontend and backend codebases

## About CORS

Since the frontend and backend run on different ports, the browser blocks requests by default for security reasons.  
**CORS (Cross Origin Resource Sharing)** is configured in the backend to explicitly allow the frontend to communicate with backend APIs.

## Package Installation Understanding

- Backend packages (Express, Mongoose, CORS, dotenv) are installed inside the **Backend directory**
```bash
npm install express mongoose dotenv cors
```
- Frontend packages (React, Vite, related tools) are installed inside the **Frontend directory**
```bash
npm create vite@latest .
#React
#JavaScript
```
- This separation avoids conflicts and keeps the project clean and scalable

## Folder Structure

```bash
day-09/
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── models/
│   │   │   └── notes.model.js
│   │   └── app.js
│   ├── server.js
│   ├── .env
│   ├── package.json
│   └── node_modules/
│
├── Frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── node_modules/
│
└── README.md
