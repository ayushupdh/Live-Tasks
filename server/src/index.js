const app = require("./app");
const http = require("http");
const socketio = require("socket.io");
const PORT = process.env.PORT || 3010;

const server = http.createServer(app);

const io = socketio(server);

io.on("connection", (socket) => {
  console.log("One user has joined");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("editTitle", () => {
    console.log("title");
    io.emit("editTitle", "this is a test");
  });
});

server.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});
