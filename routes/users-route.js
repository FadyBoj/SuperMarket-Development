const express = require('express');
const router = express.Router();
const passportMiddleware = require('../middleware/passport')
const multer = require('multer');
const upload = multer({dest:'uploads'});

//middleware
const verifyAuth = require('../middleware/verify-auth');
const googleDataAuth = require('../middleware/google-data-auth');
const homeAuth = require('../middleware/home-auth')

const {
    registerPage,
    loginPage,
    login,
    logout,
    verifyPage,
    verify,
    customerService,
    createUser,
    getComplain,
    googleSignup,
    completeDataPage,
    getGoogleData
} = require('../controllers/users');

router.route('/customer-service').get(customerService).post(upload.single('image'),getComplain);
router.route('/login').get(loginPage).post(login);
router.route('/logout').get(logout);
router.route('/verify').get(verifyAuth,verifyPage)
router.route('/verify-user').post(verifyAuth,verify)
router.route('/register').get(registerPage)
router.get('/auth/google',passportMiddleware.authenticate('google',{ scope: ['profile', 'email'] }))
router.get('/auth/google/callback',passportMiddleware.authenticate('google',{failureRedirect:'/users/register'}),googleSignup)
router.route('/complete-data').get(homeAuth,googleDataAuth,completeDataPage).post(googleDataAuth,getGoogleData)

router.route('/register/createuser').post(createUser);

module.exports = router;