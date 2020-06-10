const express = require('express')
const Users = require('../modals/Users')
const router = new express.Router()


router.post('/users',async(req,res)=>{
    try {
        const user = new Users(req.body)
        const token = await user.generateToken()
        await user.save()

        res.send({user, token})
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

router.get('/users', async(req,res)=>{
    try{
        const users = await Users.find()
        res.status(200).send(users)
    }catch (error) {
        res.sendStatus(500) 
    }
})

router.delete('/users/:id' , async(req,res)=>{
        try{
            const id = req.params.id
        await Users.findByIdAndDelete(id)
        res.status(200).send({})
        }catch(e){
            res.sendStatus(500)
        }

})
router.delete('/users' , async(req,res)=>{
    try{
    await Users.deleteMany()
    res.status(200).send({})
    }catch(e){
        res.sendStatus(500)
    }

})


module.exports = router