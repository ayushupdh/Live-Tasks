const app = require("./app");
const http = require("http");
const socketio = require("socket.io");
const SocketUsers = require('./modals/socketUser');
const { Socket } = require("dgram");

const PORT = process.env.PORT || 3010;

const server = http.createServer(app);

const io = socketio(server);

(async ()=>{
  await SocketUsers.deleteMany({})

})()


io.on("connection", async(socket) => {

  console.log("One user has joined");
  socket.on("userIdentify", async(data) => {

    const   socketUser = await new SocketUsers({user:data.user._id, socketId:socket.id, userEmail:data.user.email})
    await socketUser.save();
  });

  socket.on("shareNotes", async(data) => {
    // data:{ noteId: '5eee6d6e6afdc8fbc4be1193', userEmail: 'katie@go.com' }

    socket.join(data.noteId);
    const sharedUserPresent  = await SocketUsers.findOne({userEmail:data.userEmail})

    socket.broadcast.to(sharedUserPresent.socketId).emit('sharedNote', data.noteId);

  });

  socket.on("joinNote", async(data) => {
    // data:{ noteId: '5eee6d6e6afdc8fbc4be1193', user: userID }
    console.log(socket.id);
    console.log(data);
    socket.join(data.noteId);

    var room = io.sockets.adapter.rooms[data.noteId].length

console.log(room);
    io.in(data.noteId).emit('message', `${data.user} has joined`);
  });


  socket.on("disconnect", async() => {
    console.log("One user has left");
    await  SocketUsers.findOneAndDelete({socketId:socket.id})
  });


  // socket.on("editTitle", () => {
  //   console.log("title");
  //   io.emit("editTitle", "this is a test");
  // });


});






































server.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});
