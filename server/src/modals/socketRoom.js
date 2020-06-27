const mongoose = require("mongoose");
const socketRoomSchema = new mongoose.Schema({
  noteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Notes",
    unique: true,
    required: "true",
  },
  socketUsers: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      socketId: {
        type: "String",
        unique: true,
      },
    },
  ],
});

const socketRoom = mongoose.model("SocketRoom", socketRoomSchema);

module.exports = socketRoom;
