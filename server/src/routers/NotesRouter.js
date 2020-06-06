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


//Get all the items in the notes
router.get('/notes/:id', async(req,res)=>{
    const noteId = req.params.id
    try{
        const notes = await Notes.findById(noteId)

        res.status(200).send(notes)    
    }catch(e){

        res.sendStatus(400)
    }
    
} )

//Add an item to the notes
router.post('/notes/:id', async(req,res)=>{

    const _id = req.params.id
    try{
        const notes = await Notes.findById(_id)

        const prevlastItemIndex = notes.itemsCollections.length
        notes.itemsCollections = notes.itemsCollections.concat(req.body)
        await notes.save()
        res.status(200).send(notes.itemsCollections[prevlastItemIndex])
    }
    catch(e){
        console.log(e);
        res.sendStatus(404)
    }
    } )

    //Update an item from the notes

router.patch('/notes/:notesId/:itemId', async(req, res)=>{
    const notesId= req.params.notesId
    const itemId = req.params.itemId
    const updates = Object.keys(req.body)
    try {
        const notes = await Notes.findById(notesId);

        //Throw 404 if supplied notes does not exists
        if(!notes){
            return res.sendStatus(404)
        }
    
    
        const itemIndex = notes.itemsCollections
                                .findIndex(item => item._id.toString()===itemId);
    
        //Throw 404 if supplied item does not exists in the itemsCollection
        if(itemIndex===-1){
            return res.sendStatus(404)
        }

        updates.forEach((update)=> {
            return notes.itemsCollections[itemIndex][update]=req.body[update]
        })
    
                
        await notes.save()
    
        res.status(200).send(notes.itemsCollections[itemIndex])
    
        
    } catch (error) {
        res.sendStatus(500)
    }
})


    //Delete a note from the notes
router.delete('/notes/:notesId/:itemId', async(req,res)=>{
    const notesId = req.params.notesId
    const itemId = req.params.itemId
    try{
        const notes = await Notes.findById(notesId)
        
        //check if the notes exists
        if(!notes){
            res.sendStatus(404)
        }

        const prevArrayLength = notes.itemsCollections.length

        notes.itemsCollections = notes.itemsCollections.filter((item)=>{
                return item._id.toString()!== itemId
        })
        
        //check if the item supplied exists in the notes collection
        if(notes.itemsCollections.length===prevArrayLength){
            return res.sendStatus(404)
        }
        await notes.save()
        res.status(200).send({})
    }catch(e){
        res.sendStatus(500)
    }
})




module.exports = router