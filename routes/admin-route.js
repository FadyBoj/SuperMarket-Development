const express = require('express');
const router = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({dest:'uploads/'})

//middleware
const adminAuth = require('../middleware/admin-auth');
const homeAuth = require('../middleware/home-auth'); 

router.use(bodyParser.json());


const {
    getProducts,
    getSingleProduct,
    addProduct,
    uploadProduct,
    ordersPage,
    singleOrder
} = require('../controllers/admin')

router.route('/productslist').get(getProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/addproduct').get(adminAuth,addProduct);
router.route('/orders').get(homeAuth,adminAuth,ordersPage)
router.route('/orders/:id').get(homeAuth,adminAuth,singleOrder)

router.route('/uploadproduct').post(upload.single('image'),uploadProduct);



module.exports = router;