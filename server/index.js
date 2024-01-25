import express from "express";
import http from "http";
import cors from "cors";
import initializeSocket from "./socket.js";

const PORT = 3000;
const app = express();

app.use(cors({ origin: "*" }));

const server = http.createServer(app);

initializeSocket(server);

server.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
