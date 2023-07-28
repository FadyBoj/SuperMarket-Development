const jwt = require('jsonwebtoken');
const unauthorizedError = require('../errors/unauthorizedError')
require('dotenv').config();

const adminAuth = (req,res,next) =>{
    const token = req.cookies.jwtToken;
    
    if(!token)
    {
        throw new unauthorizedError('No token provided')
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(decoded.isAdmin)
        {
            req.user = decoded;
            next();
        }
        else{
            throw new unauthorizedError('You\'re not authorized to access this route')
        }
    } catch (error) {

        throw new unauthorizedError('You\'re not authorized to access this route')
    }
}

module.exports = adminAuth;