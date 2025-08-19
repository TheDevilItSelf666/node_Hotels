const express = require('express');
const router = express.Router();

const item = require('./../Models/Menu');



router.post('/' , async(req , res) =>{
    try{
        const itemData = req.body;
        const response = await item.insertMany(itemData);
        console.log("Data saved" , response);
        res.status(200).json(response);
    }
    catch(err){
        console.log("Internal Server error");
        res.status(500).send(err);
    }
})

router.get('/' , async(req ,res) => {
    try{
        const data = await item.find();
        console.log("Data fetched");
        res.status(200).send(data);}
    catch(err){
        console.log("Internal server error");
        res.status(500).send(err);
    }
})

router.get('/:taste' , async(req , res) =>{
    try{
        const taste = req.params.taste;
        if(taste == 'sweet' || taste == 'spicy' || taste == 'sour' || taste == savory){
            const data = await item.find({taste:taste});
            console.log("data fectched");
            res.status(200).send(data);
        }
    }catch(err){
        console.log("Internal server error");
        res.status(500).send(err);
        }
})

router.put('/:Id' , async(req ,res) => {
    try{
        const itemId = req.params.Id;
        const updatedData = req.body;
        const response = await item.findByIdAndUpdate(itemId , updatedData , {
            new : true,
            runValidators : true,
        });

        if(!response){
            res.status(404).json({message : "Item not found "})
        }

        console.log("Item data updated");
        res.status(200).json(response);
    }catch(err){
        console.log("Internal server error");
        res.status(500).send(err);    }
})

router.delete('/:id' , async(req , res) => {
    try{
        const itemId = req.params.id;
        const response = await item.findByIdAndDelete(itemId);

        if(!response){
            res.status(404).json({message: 'Item not found '});
        }

        console.log("Item deleted");
        res.status(200).json({message : 'Item has been removed form menu successfully'});

    }catch(err){
        console.log("Internal server error");
        res.status(500).send(err);

    }
})

module.exports = router;