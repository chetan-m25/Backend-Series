# This is Day-11 of Learning Backend.

* Today i focused on performing complete **CRUD operations from the frontend UI** and connecting them directly with backend APIs.
* Day-11 was to understand how **frontend UI interacts with backend CRUD APIs** and how a full stack application behaves after deployment in a real world setup.


## 📘 What I Learned Today

- Created a small Basic frontend UI for managing notes
- Implemented **Create, Read, Update, and Delete** operations from the UI
- Connected frontend actions with backend REST APIs (GET, POST, PATCH, DELETE)
- Allowed users to enter and update **title and description** fields
- Built the frontend for production using `npm run build`
- Moved the generated build files into the backend `public` folder
- Deployed the complete application from a single backend server

--------------------------------------------------

🔹 **Take reference from the inline code comments for better understanding of the flow, logic and implementation.**

--------------------------------------------------

🔹 Here is the Live link :  https://backend-notes-cm.onrender.com

--------------------------------------------------

## 📁 Folder Structure (Day-11)
```
day-11/
│
├── Backend/                          # Backend APIs, database logic
│   ├── node_modules/
│   │
│   ├── public/                       # Frontend production build served from backend
│   │   ├── assets/
│   │   │   ├── index-BVTDaU77.css    # Compiled frontend styles
│   │   │   └── index-DiWgpepL.js     # Compiled frontend JavaScript
│   │   └── index.html                # Main frontend entry served by backend
│   │
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js           # MongoDB connection setup
│   │   │
│   │   ├── models/
│   │   │   └── notes.model.js        # Notes schema for CRUD operations
│   │   │
│   │   └── app.js                    # API routes used by frontend UI
│   │
│   ├── .env                          # Environment variables
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── server.js                     # Backend server serving APIs + frontend build
│
├── Frontend/                         # Frontend UI for notes CRUD
│   ├── node_modules/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx                   # UI logic for Create, Read, Update, Delete notes
│   │   ├── index.css                 # UI styling
│   │   └── main.jsx                  # Frontend entry point
│   │
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   └── vite.config.js               # Vite config used to build frontend (npm run build)
│
└── README.md                        # Day-11 learning documentation

```
