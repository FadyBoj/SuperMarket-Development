const mongoose = require('mongoose');

const Person = mongoose.Schema({
    firstname:{
        type:String,
        required:[true,'firstname must be provided.']
    },
    lastname:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:[true,'email must be provided']
    },
    password:{
        type:String,
        required:false
    },
    phoneNumber:{
        type:String,
        required:false
    },
    google:{
        type:Boolean,
        default:false,
        required:true
    },
    address:{
        type:String,
        required:false
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        required:true
    },
    previousOrders:{
        type:Array,
        required:false
    },
    verified:{
        type:Boolean,
        default:false,
        required:true
    },
    orderHistory:{
        type:Array,
        required:false
    },
    Admin:{
        type:Boolean,
        required:true,
        default:false
    },
    verificationCode:{
        code:{
            type:Number,
            default:Math.floor((Math.random() * 9999999) + 1000)
        },
        creationDate:{
            type:Date,
            default:Date.now()
        }

    }
})

module.exports = mongoose.model('person',Person);