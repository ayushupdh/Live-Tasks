const express = require('express')
const Notes = require('../modals/Notes')
const router = new express.Router()

router.post('/notes', async(req,res)=>{
        console.log(req.body);
    const notes = new Notes(req.body)
    await notes.save()

    res.status(200).send(notes)

} )

router.get('/notes', async(req,res)=>{

const notes = await Notes.find({})

res.status(200).send(notes)

} )

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