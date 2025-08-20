const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    age :{
        type : Number
    },
    work : {
        type : String,
        enum : ['chef' , 'waiter' , 'manager'],
        required : true
    },
    mobile_no: {
        type : String,
        unique : true,
        required : true
    },
    email : {
        type : String,
        unique: true,
        required: true
    },
    address : {
        type : String
    },
    salary :{
        type : Number,
        required : true
    },
    username : {
        required : true,
        type : String
    },
    password : {
        required : true,
        type : String
    }
})

const person = mongoose.model('person' , personSchema);
module.exports = person;