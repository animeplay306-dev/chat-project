const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

let messages = [];

io.on("connection", (socket) => {
  console.log("User connected");

  // إرسال الرسائل القديمة
  socket.emit("loadMessages", messages);

  // استقبال رسالة جديدة
  socket.on("sendMessage", (data) => {
    messages.push(data);
    io.emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
