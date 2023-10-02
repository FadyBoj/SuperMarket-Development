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
    addOrder,
    previousPurchasesPage,
    singleProduct,
    buyNow
} = require('./../controllers/products');


router.route('/').get(homeAuth,productsPage);
router.route('/single/:id').get(singleProduct)
router.route('/cart').get(cartPage);
router.route('/cartitems').get(cartItems);
router.route('/add-to-cart').post(orderAuth,addToCart);
router.route('/modify-cart').put(modifyCart)
router.route('/modify-cart/:id').delete(deleteCartItem);
router.route('/previous-purchases').get(homeAuth,orderAuth,previousPurchasesPage);
router.route('/add-order').post(orderAuth,addOrder);
router.route('/buy-now').post(orderAuth,buyNow);




module.exports = router;