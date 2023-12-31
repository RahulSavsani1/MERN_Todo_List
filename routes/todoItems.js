const router = require('express').Router()

const todoItemsModel = require('../models/todoItems')

//router
router.post('/api/item', async(req,res) => {
    try{
        const newItem = new todoItemsModel({
            item: req.body.item
        })
        //save item to database
        const saveItem = await newItem.save()
        res.status(200).json(saveItem)
    }catch(err){
        res.json(err)
    }
})

//get data from database
router.get('/api/items', async(req,res)=>{
    try{
        const allTodoItems = await todoItemsModel.find({})
        res.status(200).json(allTodoItems)
    }catch(err){
        res.json(err)
    }
})

//update item
router.put('/api/item/:id', async(req,res)=>{
    try{
        const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {$set: req.body})
        res.status(200).json("Item Updated")
    }catch(err){
        res.json(err);
    }
})

//delete item
router.delete('/api/item/:id', async(req,res)=> {
    try{
        const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id)
        res.status(200).json('Item Deleted')
    }catch(err){
        res.json(err)
    }
})

//export router
module.exports = router;