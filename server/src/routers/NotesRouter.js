const express = require('express')
const Notes = require('../modals/Notes')
const router = new express.Router()

//Create a note
router.post('/notes', async(req,res)=>{
    const notes = new Notes(req.body)
    await notes.save()
    res.status(200).send(notes)
} )

//Get all the notes
router.get('/notes', async(req,res)=>{
    try{
        const notes = await Notes.find()
        res.status(200).send(notes)    
    }catch(e){

        res.sendStatus(400)
    }
    
} )

router.delete('/notes/:id', async (req, res)=>{
    const id = req.params.id
    try{
         const note = await Notes.findByIdAndDelete(id)
         if(note===null){
            return res.sendStatus(404)
         }
        res.status(200).send({})
    }
    catch(e){
        console.log(e);
        res.sendStatus(500)
    }
})



//Add a singular note to the notes
router.post('/notes/:id', async(req,res)=>{

    const _id = req.params.id
    try{
        const notes = await Notes.findById(_id)

        notes.notes = notes.notes.concat(req.body)
        await notes.save()
        res.status(200).send(notes)
    }
    catch(e){
        console.log(e);
        res.sendStatus(404)
    }
  
    
    } )

    //Delete a note from the notes
router.delete('/notes/:notesId/:noteId', async(req,res)=>{
    const notesId = req.params.notesId
    const noteId = req.params.noteId
    try{
        const notes = await Notes.findById(notesId)
        notes.notes = notes.notes.filter((note)=>{
            return note._id.toString()!== noteId
        })
        await notes.save()
        res.status(200).send(notes)

    }catch(e){
        res.sendStatus
    }
})


module.exports = router