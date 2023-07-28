const jwt = require('jsonwebtoken');
const unauthorizedError = require('../errors/unauthorizedError')
require('dotenv').config();
const Order = require('../models/order');

const homeAuth = async(req,res,next) =>{
    const token = req.cookies.jwtToken;
    if(!token)
    {
        return next(); 
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(decoded.isAdmin)
        {
            const orders = await Order.find({status:'Pending'});
            req.session.isAdmin = true;
            req.session.ordersLength = orders.length;
        }
        else{
            req.session.normalUser = true;
        }
    } catch (error) {
        return;
    }
   
    next();
}

module.exports = homeAuth