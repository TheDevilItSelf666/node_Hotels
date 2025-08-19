const mongoose = require('mongoose');
require('dotenv').config();

// URL 
const mongoURL = process.env.DBURL_local
//const mongoURL = process.env.DBURL;

mongoose.connect(mongoURL ,{
    useNewUrlParser: true,
    useUnifiedTopology:true
})

const db = mongoose.connection;

db.on('connected' , () => {
    console.log("Connedted to database");
})
db.on('disconnected' , () => {
    console.log("Disconnedted from database");
})
db.on('error' , () => {
    console.log("error while connecting to database");
})

module.exports = db;