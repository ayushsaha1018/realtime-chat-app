const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db/connectDB");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messagesRoutes");

const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

connectDB();
const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}...`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
