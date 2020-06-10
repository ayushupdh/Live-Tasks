const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        minlength:6,
        required:true
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})



userSchema.pre('save', async function(next) {
    const user =this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password , 8)
    }
    next()
})

userSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()}, process.env.JWTSECRET)
    user.tokens = user.tokens.concat({token})

    return token
}
userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

const Users = mongoose.model('User', userSchema)

module.exports = Users;