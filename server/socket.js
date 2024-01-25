import { Server } from "socket.io";

function formatMessage(messageText, room) {
  return { text: messageText, sender: "Channel", room, timestamp: new Date() };
}

export default function initializeSocket(httpServer) {
  const io = new Server(httpServer, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    socket.on("joinRoom", (data) => {
      const { user, room } = data;
      socket.user = user;
      socket.room = room;
      socket.join(room);
      const message = formatMessage(`${user} joined`, room);
      io.to(room).emit("receiveMessage", message);
    });

    socket.on("sendMessage", (message) => {
      io.to(message.room).emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
      const { user, room } = socket;
      const message = formatMessage(`${user} disconnected`, room);
      io.to(socket.room).emit("receiveMessage", message);
    });
  });
}
