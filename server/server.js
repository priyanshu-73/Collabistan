import dotenv from "dotenv";
import http from "http";
import app from "./app.js";
import { Server } from "socket.io";

dotenv.config();

const server = http.createServer(app);

const io = new Server(server);


io.on("connection", (socket) => {
  socket.on("event", (data) => {
    /* … */
  });
  socket.on("disconnect", () => {
    /* … */
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
