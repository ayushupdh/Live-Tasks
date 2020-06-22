const app = require("./app");
const http = require("http");
const socketio = require("socket.io");
const SocketUsers = require("./modals/socketUser");
const { Socket } = require("dgram");

const PORT = process.env.PORT || 3010;

const server = http.createServer(app);

const io = socketio(server);

(async () => {
  await SocketUsers.deleteMany({});
})();

io.on("connection", async (socket) => {
  console.log("One user has joined");
  socket.on("userIdentify", async (data, cb) => {
    try {
      const socketUser = await new SocketUsers({
        user: data.user._id,
        socketId: socket.id,
        userEmail: data.user.email,
      });
      await socketUser.save();
      cb("User Identified");
    } catch (e) {
      cb("User Identify failed");
    }
  });

  socket.on("shareNotes", async (data, cb) => {
    // data:{ noteId: '5eee6d6e6afdc8fbc4be1193', userEmail: 'katie@go.com' }
    socket.join(data.noteId);
    const sharedUserPresent = await SocketUsers.findOne({
      userEmail: data.userEmail,
    });
    if (sharedUserPresent) {
      socket.broadcast
        .to(sharedUserPresent.socketId)
        .emit("sharedNote", data.noteId);
    }

    cb("Note Share Complete");
  });

  socket.on("joinNote", (data, callback) => {
    // data:{ noteId: '5eee6d6e6afdc8fbc4be1193', user: userID }
    socket.join(data.noteId);
    // io.in(data.noteId).emit("message", `${data.user} has joined`);
    callback("Joined note");
  });

  socket.on("removeNote", (noteId, cb) => {
    // data:{ noteId: '5eee6d6e6afdc8fbc4be1193'}
    io.in(noteId).emit("removedNote");
    cb("Sent remove note");
  });

  socket.on("disconnect", async () => {
    console.log("One user has left");
    await SocketUsers.findOneAndDelete({ socketId: socket.id });
  });

  // socket.on("editTitle", () => {
  //   console.log("title");
  //   io.emit("editTitle", "this is a test");
  // });
});

server.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});
