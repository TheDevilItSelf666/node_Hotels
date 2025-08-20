const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser')
app.use(bodyParser.json());
require('dotenv').config();
const passport = require('./auth');



const PORT = process.env.PORT || 3000; 

const logRequest = ( req  , res , next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
    next();
}
app.use(logRequest);


app.use(passport.initialize());
const localAuthStat = passport.authenticate('local',{session:false});
app.get('/',localAuthStat , function(req ,res ){
    res.send("hello and welcome to my hotel");
})


const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');
// comment for testing git 
app.use(localAuthStat);
app.use('/menu' , menuRoutes); 
app.use('/person' , personRoutes);
// comment added
app.listen(PORT , () => {
    console.log("Now the server is up ")
})















































































































































































































































































































































// var notes = require('./notes.js');

// console.log("Now server is running ");

// let age = notes.age ;

// console.log(age);

// let a = prompt("Pls enter first number : \n");
// let b = prompt("Pls enter second number : \n");


// let result = notes.add(a+age , b);

// console.log(result);
 

// let _ = require('lodash');

// let arr = ['person' , 'person' ,1,2,2,1, "234" , 4  ]

// let filter = _.uniq(arr);
// console.log(filter);

// let jsonSring = '{"Name":"Bharat" , "Age":23 , "City" : "Gurgaon"}';

// let jsonObject = JSON.parse(jsonSring);

// console.log(jsonObject.Name);

// console.log(typeof jsonObject);


// let objectToConvert = {Name:"Bharat" , Age : 23 , City : "gurgaon"};

// let json = JSON.stringify(objectToConvert);

// console.log(json);

// console.log(typeof json);