const Person = require('../models/person');
const path = require('path');
const badRequestError = require('../errors/bad-request');
const unauthorizedError = require('../errors/unauthorizedError');
const checkPw = require('./password');
const zxcvbn = require('zxcvbn')
const sendemail = require('./email');
const rootDirectory = path.dirname(require.main.filename)
const jwt = require('jsonwebtoken');
const registerPage = (req,res)=>{
require('dotenv').config();

    res.status(200).sendFile(path.join(rootDirectory,'public/register.html'));
}

const loginPage = (req,res) =>{
    res.status(200).render(path.join(rootDirectory,'public','login.ejs'),{req:req});
}

const customerService = (req,res) =>{
    res.status(200).sendFile(path.join(rootDirectory,'public','CustomerService.html'))
}

const getComplain = (req,res) =>{
    const {name,email,message} = req.body
    const image = req.file
    console.log(name,email,message,image);
}

const login = async(req,res) =>{
    const {email,password} = req.body;
    if(!email || !password)
    {
        throw new badRequestError('Please provide email and password');
    }

    
    const checkUser = await Person.find({email:email});
   
    if(!checkUser)
    {
        throw new badRequestError('Invalid email or password');

    }

    if(checkUser.length === 0)
    {
        throw new badRequestError('Invalid email or password');
    }

    if(!checkUser[0].password)
    {
        throw new badRequestError('This accound is already registred with google');
    }

    if(checkUser[0].password != password)
    {
        throw new badRequestError('Invalid email or password');

    }

    

    const userInfo = {
        id:checkUser[0]._id,
        firstname:checkUser[0].firstname,
        lastname:checkUser[0].lastname,
        email:checkUser[0].email,
        verified:checkUser[0].verified,
        isAdmin:checkUser[0].Admin,
        address:checkUser[0].address,
        previousOrders:checkUser[0].previousOrders
    }


    const token = jwt.sign(userInfo,process.env.JWT_SECRET,{expiresIn:'1d'});
    res.cookie('jwtToken',token,{httpOnly:true,secure:true,maxAge:86400000});
    res.status(200).json({msg:"Successfully login",token});
}

const logout = async(req,res) =>{
    const token = req.cookies.jwtToken;
    if(token)
    {
        res.clearCookie('jwtToken');
        delete req.session.isAdmin;
        delete req.session.normalUser;
        res.redirect('/')
    }
    else{
        res.status(404).send('<h1>Not found</h1>')
    }
}


const verifyPage = (req,res) =>{
    const email = req.cookie
    
    res.render(path.join(rootDirectory,'public','verify.ejs'))
}

const verify = async (req,res) =>{
    const { verificationCode } = req.body;
    const email = req.user.email;
    
    if(!verificationCode)
    {
        throw new badRequestError('Please provide your verification code')
    }

    const user = await Person.find({email:email});
    const userVcode = user[0].verificationCode.code;

    if(userVcode === Number(verificationCode))
    {
        await Person.findOneAndUpdate({email:email},{verified:true});
        const userInfo = {
            id:user[0]._id,
            firstname:user[0].firstname,
            lastname:user[0].lastname,
            email:user[0].email,
            verified:true,
            isAdmin:user[0].Admin,
            address:user[0].address,
            previousOrders:user[0].previousOrders
        }
    
        const token = jwt.sign(userInfo,process.env.JWT_SECRET,{expiresIn:'1d'});
        res.cookie('jwtToken',token,{httpOnly:true,secure:true,maxAge:86400000});
        res.status(200).json({msg:"Verified successfully"});
    }
    else{
        throw new badRequestError('Invalid verification code')
    }
}


const createUser = async (req,res) =>{

    const {firstname,lastname,email,password,address} = req.body;
    const passwordStrength = zxcvbn(password);
    let errorMsg = [];
    let numbers = [0,1,2,3,4,5,6,7,8,9]

    if(!firstname || firstname.length < 4 || numbers.includes(Number(firstname[0])))
    {
        errorMsg.push('First name must be 4 characters or more.')
    }

    if(!lastname || lastname.length < 4 || numbers.includes(Number(lastname[0])))
    {
        errorMsg.push('Last name must be 4 characters or more.')
    }

    if(!address || address.length < 5)
    {
        errorMsg.push('Please enter a valid address.')
    }
   
    if(!email || email.length < 5 || !email.includes('@') || !email.endsWith('.com'))
    {
        errorMsg.push('email is not valid.')
    }

    if(!password || !checkPw(password) || passwordStrength.score < 4)
    {
        errorMsg.push('Weak password.')
    }

    const checkUser = await Person.find({email:email.toLowerCase()});

    if(checkUser.length > 0)
    {
        req.session.userExist= true
        return res.status(409).json({msg:"exsist."})

    }

    if(errorMsg.length > 0)
    throw new badRequestError(errorMsg);


    try {
        const newUser = new Person({
            firstname:firstname,
            lastname:lastname,
            email:email.toLowerCase(),
            password:password,
            address:address
        })

    
        const createdUser= await Person.create(newUser);
        console.log(createdUser)
    
        const user = await Person.find({email:email.toLowerCase()})
        sendemail(user[0].email,user[0].verificationCode.code);


        const userInfo = {
            id:createdUser._id,
            firstname:createdUser.firstname,
            lastname:createdUser.lastname,
            email:createdUser.email,
            verified:createdUser.verified,
            isAdmin:createdUser.Admin,
            address:createdUser.address,
            previousOrders:createdUser.previousOrders
        }
    
        const token = jwt.sign(userInfo,process.env.JWT_SECRET,{expiresIn:'1d'});
        res.cookie('jwtToken',token,{httpOnly:true,secure:true,maxAge:86400000});
        res.status(200).json({msg:"created"});

    } catch (error) {
        console.log(error);
    }
    

}

const googleSignup = async(req,res) =>{
    const email = req.user.emails[0].value.toLowerCase();
    const firstname = req.user.name.givenName;
    const lastname = req.user.name.familyName
    
    const checkUser = await Person.find({email:email});
    if(checkUser.length > 0){
        
        if(checkUser[0].google)
        {
            const userInfo = {
                id:checkUser[0]._id,
                firstname:checkUser[0].firstname,
                lastname:checkUser[0].lastname,
                email:checkUser[0].email,
                verified:checkUser[0].verified,
                isAdmin:checkUser[0].Admin,
                address:checkUser[0].address,
                previousOrders:checkUser[0].previousOrders
            }

            const token = jwt.sign(userInfo,process.env.JWT_SECRET,{expiresIn:'1d'});
            res.cookie('jwtToken',token,{httpOnly:true,secure:true,maxAge:86400000});
            return res.status(200).redirect('/')
        }
        req.session.userExist = true;
        return res.status(409).redirect('/login');

    }

    const newUser = Person({
        firstname:firstname,
        lastname:lastname,
        email:email.toLowerCase(),
        google:true
    })

    const createdUser = await Person.create(newUser);

    const user = await Person.find({email:email});
    sendemail(user[0].email,user[0].verificationCode.code);

    const userInfo = {
        id:createdUser._id,
        firstname:createdUser.firstname,
        lastname:createdUser.lastname,
        email:createdUser.email,
        verified:createdUser.verified,
        isAdmin:createdUser.Admin,
        address:createdUser.address,
        previousOrders:createdUser.previousOrders
    }

    const token = jwt.sign(userInfo,process.env.JWT_SECRET,{expiresIn:'1d'});
    res.cookie('jwtToken',token,{httpOnly:true,secure:true,maxAge:86400000});
    return res.status(200).redirect('/complete-data')


}

const completeDataPage = async(req,res) =>{
    const info = req.user;
    res.status(200).render(path.join(rootDirectory,'public','google-data.ejs'),{info:info,req:req})
}

const getGoogleData = async(req,res) =>{

 

    const {firstname,lastname,phonenumber,address} = req.body;
    let errorMsg = []

    if(!firstname || !lastname || !address || !phonenumber) 
    {
        errorMsg.push('Data are missing');
    }

    if(firstname.length < 3)
    {
        errorMsg.push('First name must be 3 characters or more');
    }

    if(lastname.length < 3)
    {
        errorMsg.push('Last name must be 3 characters or more');
    }

    if(address.length < 6)
    {
        errorMsg.push('Enter a valid adderss');
    }

    if(phonenumber.length < 11)
    {
        errorMsg.push('Enter a valid phone number');
    }

    if(errorMsg.length > 0)
    {
        throw new badRequestError(errorMsg[0])
    }

    const id = req.user.id;
    const queryObject = {}
    try {
        await Person.findOneAndUpdate({_id:id},
        {firstname:firstname,lastname:lastname,phoneNumber:phonenumber,address:address})
            
        const updatedUser = await Person.find({_id:id})
        console.log(updatedUser)
        const userInfo = {
            id:updatedUser[0]._id,
            firstname:updatedUser[0].firstname,
            lastname:updatedUser[0].lastname,
            email:updatedUser[0].email,
            verified:updatedUser[0].verified,
            isAdmin:updatedUser[0].Admin,
            address:updatedUser[0].address,
            previousOrders:updatedUser[0].previousOrders
        }

        const token = jwt.sign(userInfo,process.env.JWT_SECRET,{expiresIn:'1d'});
        res.cookie('jwtToken',token,{httpOnly:true,secure:true,maxAge:86400000});
        return res.status(200).json({msg:"Success",token});
    } catch (error) {
        console.log(error)
    }
}

module.exports = {registerPage,
                loginPage,
                login,
                logout,
                verifyPage,
                verify,
                createUser,
                customerService,
                getComplain
                ,googleSignup,
                getGoogleData,
                completeDataPage};