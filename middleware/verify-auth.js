const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyAuth = (req,res,next) =>{

const token = req.cookies.jwtToken;
if(!token)
{
    return res.status(404).send('<h1>Not found</h1>');
}

try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    if(decoded.verified)
    {
        res.status(404).send('<h1>Not found</h1>');
    }
    else{
        req.user = decoded;
        next();
    }
} catch (error) {
    res.status(404).send('<h1>Not found</h1>');

}


}

module.exports = verifyAuth;