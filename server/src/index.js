const app = require("./app");
const http = require("http");
const socketio = require("socket.io");
const SocketUsers = require("./modals/socketUser");
const SocketRoom = require("./modals/socketRoom");
const mongoose = require("mongoose");
const User = mongoose.model("User");

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

    //Find the shared note in SocketRoom Document
    let room = await SocketRoom.find({ noteId: data.noteId });
    //If the note has not been shared, create a new SocketRoom
    if (room.length === 0) {
      room = new SocketRoom({ noteId: data.noteId });
      //Add the owner of the note to the room
      const owner = await SocketUsers.findOne({ socketId: socket.id });
      room.socketUsers.push({ user: owner.user, socketId: owner.socketId });
      await room.save();
    }

    //Join a socket room using the SocketRoom's id
    socket.join(room._id);

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
