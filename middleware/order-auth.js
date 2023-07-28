const jwt = require('jsonwebtoken');
const forbiddenError = require('../errors/forbidden');
const badRequestError = require('../errors/bad-request');
require('dotenv').config();

const orderAuth = (req,res,next) =>{
    const token = req.cookies.jwtToken;

    if(!token)
    {
        throw new badRequestError('Token must be provided.');
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded.address)
        {
            return res.status(404).json({msg:"Please provide your address"})
        }
        if(!decoded.verified)
        {
            return res.status(404).json({msg:"Not verified"})
        }
        req.user = decoded;
        next();
    } catch (error) {
        throw new forbiddenError('Token must be provided.')
    }
}

module.exports = orderAuth;