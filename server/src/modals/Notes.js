const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
    title:{
        type:String,
        default:'Title',
        trim:true
    },
    itemsCollections:[{
        item:{
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