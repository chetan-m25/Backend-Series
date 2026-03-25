import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer(); // Create an HTTP server
// Create a Socket.IO server and attach it to the HTTP server
const io = new Server(httpServer, {/* options */}); 

// Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log("new user connected");

  // Listen for "message" events from the client
  socket.on("message",(msg)=>{
    console.log("User fired message event")
    console.log(msg)
    
    // Broadcast the message to all connected clients
    io.emit("message",msg)
  })
});

// Start the HTTP server
httpServer.listen(8000, () => {
  console.log("Server is running on port 8000 🏃");
});
