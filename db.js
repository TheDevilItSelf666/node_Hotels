const mongoose = require('mongoose');

// URL 
const mongoURL = 'mongodb://localhost:27017/Hotels';

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