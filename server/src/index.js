const app = require("./app");
const http = require("http");
const socketio = require("socket.io");
const SocketUsers = require('./modals/socketUser');
const { Socket } = require("dgram");

const PORT = process.env.PORT || 3010;

const server = http.createServer(app);

const io = socketio(server);

io.on("connection", async(socket) => {

  console.log("One user has joined");

  socket.on("userIdentify", async(data) => {
    const   socketUser = await new SocketUsers({user:data.user._id, socketId:socket.id})
    await socketUser.save();
  });

  socket.on("disconnect", async() => {
    await  SocketUsers.findOneAndDelete({socketId:socket.id})
  });


  socket.on("editTitle", () => {
    console.log("title");
    io.emit("editTitle", "this is a test");
  });


});




server.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});
