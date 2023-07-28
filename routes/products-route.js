const express = require('express');
const router = express.Router();
const orderAuth = require('../middleware/order-auth');

const homeAuth = require('../middleware/home-auth')

const 
{   productsPage,
    cartPage,
    addToCart,
    modifyCart,
    deleteCartItem,
    cartItems,
    addOrder
} = require('./../controllers/products');


router.route('/').get(homeAuth,productsPage);
router.route('/cart').get(homeAuth,cartPage);
router.route('/cartitems').get(cartItems);
router.route('/add-to-cart').post(addToCart);
router.route('/modify-cart').put(modifyCart)
router.route('/modify-cart/:id').delete(deleteCartItem);

router.route('/add-order').post(orderAuth,addOrder);



module.exports = router;