const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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


personSchema.pre('save' , async function(next) {
    const person = this;
    if(!person.isModified('password')) return next();
    try{
        // hash salt generation 
        const salt = await bcrypt.genSalt(10);

        // hash password 
        const hasedPass = await bcrypt.hash(person.password , salt);

        person.password = hasedPass;
        next();

    }catch(err){
        return next(err);
    }
})
// personSchema.pre('insertMany' , async function(next) {
//     const person = this;
//     if(!person.isModified('password')) return next();
//     try{
//         // hash salt generation 
//         const salt = await bcrypt.genSalt(10);

//         // hash password 
//         const hasedPass = await bcrypt.hash(person.password , salt);

//         person.password = hasedPass;
//         next();

//     }catch(err){
//         return next(err);
//     }
// })

personSchema.methods.comparePass = async function(candidatePass){
    try{
        const isMatch = await bcrypt.compare(candidatePass , this.password);
        return isMatch;
    }catch(err){
        throw(err);
    }
}

const person = mongoose.model('person' , personSchema);

module.exports = person;