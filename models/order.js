const mongoose = require('mongoose');

const Order = mongoose.Schema({
    senderInfo:{
        id:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        }
    },
    cartItems:{
        type:Array,
        required:true
    },
    quantity:{
        type:Array,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        default:'Pending'
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now()
    }
})

module.exports = mongoose.model('order',Order);
