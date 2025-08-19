const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        default : 3
    },
    ingregients : {
        type : [String],
        default : []

    },
    taste : {
        type : String,
        enum : ["sweet" , "spicy" , "sour" ,"savory"],
        required : true
    },
    is_drinkable :{
        type : Boolean,
        default : false
    },
    num_of_sales :{
        type : Number,
        default : 0
    }
})

const item = mongoose.model('item' , itemSchema);
module.exports  = item;