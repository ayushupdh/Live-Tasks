const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
    title:{
        type:String,
        default:'Title',
        trim:true
    },
    notes:[{
        note:{
            type:String,
        },
        completed:{
            type:Boolean,
            default:false
        }
    }],
})


const Notes = mongoose.model('Notes', notesSchema)

module.exports= Notes