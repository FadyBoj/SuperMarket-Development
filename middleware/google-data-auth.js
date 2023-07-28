const jwt = require('jsonwebtoken');
const unauthorizedError = require('../errors/unauthorizedError')
require('dotenv').config();
const Order = require('../models/order');


const googleDataAuth = (req,res,next) =>{

    const token = req.cookies.jwtToken;
    if(!token)
    {
        return res.status(404).send('<h1>Not found</h1>')
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(decoded.address)
        {
            return res.status(404).send('<h1>Not found</h1>')
        }
        req.user = decoded
        next();
    } catch (error) {
        console.log(error)
    }
}


module.exports = googleDataAuth;