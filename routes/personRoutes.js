const express = require('express');
const router = express.Router();

const person = require('./../Models/person'); 


router.post('/' ,async (req , res) =>{
   try{
    const data = req.body;
    const newPerson = new person(data);
    const response = await newPerson.save();
    //const response = await person.insertMany(data);

    console.log("Data saved" , response);
    res.status(200).json(response);}
catch(err){
    console.log("Error while saving data " ,err);
    res.status(500).send("Internal Server Error");}
}) 

router.get('/' , async(req,res) =>{
    try{
        const Data = await person.find();
        console.log("Data fetched");
        res.status(200).send(Data);}
    catch(err){
        console.log("Internal Server error");
        res.status(500).send(err); 
    }
})

router.get('/:workType', async(req ,res) => {
    try{
         const workType =  req.params.workType;
        if(workType == 'chef' || workType == "manager" || workType == "waiter"){
            const response =  await person.find({work:workType});
            console.log("Data fectched ");
            res.status(200).json(response);}
        else{
            res.status(404).send("Invalid work type!");
        }
    }
    catch(err){
        console.log("Internal server error");
        res.status(404)
    }

})


router.put('/:id' , async(req , res) =>{
    try{
        const personId = req.params.id;
        const updatedData = req.body;
        const response = await person.findByIdAndUpdate(personId , updatedData , {
            new : true ,
            runValidators : true,
        })
        if(!response){
            res.status(404).send("Person not found");
        }

        console.log("data saved");
        res.status(200).json(response);
    }catch(err){
        console.log("Internal Server error");
        res.status(500).send(err);
    }
})

router.delete('/:id' , async(req ,res) => {
    try{
        const personId = req.params.id;
        const response = await person.findByIdAndDelete(personId);
        
        if(!response){
            res.status(404).send("Person not found");
        }
        console.log("Data deleted");
        res.status(200).json({message : "Data is deleted successfully"});
     }catch(err){
        console.log("Internal Server error");
        res.status(500).send(err);
    }
})

module .exports = router;