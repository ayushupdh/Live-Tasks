const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    }
})

const Users = mongoose.Model('User', userSchema)

module.exports = Users;