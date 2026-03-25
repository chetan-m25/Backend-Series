# This is Day-26 of Learning Backend.

* Today I explored **WebSockets using Socket.IO** and learned how real-time communication works between server and clients.
* Built a basic **real-time messaging system** where multiple users can connect and receive messages instantly.

---

## 📘 What I Learned

### 1. WebSockets & Socket.IO
* WebSockets allow **bi-directional communication** (client ↔ server).
* Unlike HTTP, connection stays open for real-time data exchange.
* **Socket.IO** makes WebSocket implementation simple and reliable.

---

### 2. Creating Server with HTTP + Socket.IO
* Created a raw HTTP server using:
  ```js
  createServer()
  ```
* Attached Socket.IO server:
  ```js
  const io = new Server(httpServer)
  ```

---

### 3. Handling Connections
* Used:
  ```js
  io.on("connection", (socket) => {}
  ```
* This runs whenever a new user connects.

---

### 4. Listening to Events
* Used:
  ```js
  socket.on("message", (msg) => {}
  ```
* This listens for messages sent from client.

---

### 5. Broadcasting Messages
* Used:
  ```js
  io.emit("message", msg)
  ```
* Sends message to **all connected clients** (real-time broadcast).

---
## Key Concepts

* `io` → Main Socket.IO server
* `socket` → Individual user connection
* `emit()` → Send event
* `on()` → Listen event

---

## Output

* When a user connects:
  ```
  new user connected
  ```

* When a message is sent:
  ```
  User fired message event
  <message content>
  ```
