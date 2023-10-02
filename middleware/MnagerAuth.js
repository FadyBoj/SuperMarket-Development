const jwt = require('jsonwebtoken');
const forbiddenError = require('../errors/forbidden');
const badRequestError = require('../errors/bad-request');
require('dotenv').config();

const managerAuth = (req,res,next) =>{
    const token = req.cookies.jwtToken;

    if(!token)
    {
        throw new badRequestError('Token must be provided.');
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
   
        if(decoded.role !== 'manager')
        {
            return res.status(400).json({msg:"Only manager"})
        }
        req.user = decoded;
        next();
    } catch (error) {
        throw new forbiddenError('Token must be provided.')
    }
}

module.exports = managerAuth;