const mongoose = require('mongoose');

const Product = mongoose.Schema({

    title:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },

    description:{
        type:String,
        required:false
    },

    category:{
        type:String,
        required:true,
    },
    images:{
        type:Array
    },

    createdAt:{
        type:Date,
        default:Date.now()
    },
    quantity:{
        type:Number,
        required:[true,'quantity must be provided']
    },
});

module.exports = mongoose.model('product',Product);