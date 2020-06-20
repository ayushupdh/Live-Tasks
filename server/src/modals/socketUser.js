const mongoose = require("mongoose");

const socketUserSchema = new mongoose.Schema({
        user:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        socketId:{
          type:"String",
          required:true
        }

},
{
  strictQuery: true,
}
  
);

const SocketUsers = mongoose.model("SocketUsers", socketUserSchema);

module.exports = SocketUsers;
