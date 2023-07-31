const Product = require('./../models/product');
const Person = require('../models/person')
const Order = require('../models/order');
const Path = require('path');
const fs = require('fs');
const badRequestError = require('../errors/bad-request');
const path = require('path')
const rootDirectory = path.dirname(require.main.filename);

const productsPage = async(req,res) =>{
    res.status(200).render(path.join(rootDirectory,'public','products.ejs'),{req:req})

}

const cartPage = async(req,res) =>{
    try {
        const ids = req.session.productId.map((item)=>{
            return item.id  
        })
        const qty = req.session.productId.map((item)=>{
            return item.qty
        })

        let cartProducts = await Product.find( { _id: { $in: ids } } ).sort('price');
        let totalPrice = 0
        cartProducts.forEach((product) =>{
            totalPrice += product.price;
        })  
    
        return res.status(200).render(path.join(rootDirectory,'public','cart.ejs'),{cartProducts,totalPrice,req:req,qty:qty})
    } catch (error) {
        cartProducts =  await Product.find({_id:{$in:[]}});
        totalPrice = 0
       return res.status(200).render(path.join(rootDirectory,'public','cart.ejs'),{cartProducts,totalPrice,req:req})

    }
    
}

const modifyCart = async(req,res) =>{
    const { id,qty } = req.body;
    const price = req.session.productId.filter(item => item.id === id)[0].price;

    const prevProducts = req.session.productId
    
    const newSession = prevProducts.map((item) =>{
        return item.id != id ? item : {...item,qty:Number(qty)} 
    })

    console.log(newSession)

    req.session.productId = newSession;

    res.status(200).json({msg:'Success'})
}


const deleteCartItem = async(req,res) =>{
    const { id } = req.params;

    const prevSession = req.session.productId;
    const newSession = prevSession.filter(item=> item.id != id);

    req.session.productId = newSession;
    res.status(200).json({msg:'Success'})
}

const getAllProducts = async(req,res) =>{
    const {search,category} = req.query;
    const queryObject = {};

    if(search)
    {
        queryObject.title = {$regex:search,$options:'i'};
    }

    if(category)
    {
        queryObject.category = category;
    }

    const prodcucts = await Product.find(queryObject);
    res.status(200).json(prodcucts);
   
}

const cartItems = (req,res) =>{
    const isXhrRequest = req.headers['x-requested-with'] === 'XMLHttpRequest';

    if(isXhrRequest){
    res.status(200).json({products:req.session.productId})
    }
    else{
        res.status(403).send('Forbidden.')
    }
}

const addToCart = async(req,res) =>{
    const {id} = req.body;
    const productId = req.session.productId || []
    let price = 0;
    try{
    const checkproduct = await Product.find({_id:id})
    price = checkproduct[0].price;
    if(checkproduct.length === 0){
    throw new badRequestError('You\'re trying to hack our website')
    }
    }
    catch(error)
    {
        throw new badRequestError('You\'re trying to hack our website')
    }
       

    productId.forEach((item)=>{
        if(item.id === id)
        {
            throw new badRequestError('Already in the cart ')
        }
    })


    productId.push({id:id,qty:1,price:price})
    productId.sort((a,b)=> a.price - b.price)
    req.session.productId = productId;
    
    res.status(200).json({msg:'Success'})
}

const addOrder = async(req,res) =>{
    let quantity
    try {
        
        quantity = req.session.productId.map((item)=>{
           return item.qty
       })
    } catch (error) {
        throw new badRequestError('Cart is empty.');

    }
    
    let products;
    try {
        products = req.session.productId.map((item)=>{return item.id})
    } catch (error) {
        delete req.session.productId;
    }

    
    if(!products)
    {
        throw new badRequestError('Cart is empty.');
    }

    const cartProducts = await Product.find({_id:{$in:products}});
    
    let totalPrice = 0;
    cartProducts.forEach((product,index) =>{
        totalPrice += product.price * quantity[index];
    })

    
    const newOrder = new Order({
        senderInfo:{id:req.user.id,name:req.user.firstname + ' ' + req.user.lastname,address:req.user.address},
        cartItems:products,
        totalPrice:totalPrice,
        quantity:quantity
    })
    

    const createdOrder = await Order.create(newOrder);

    try {
        const newOrderToClient =
        {
            id:createdOrder._id,
            cartItems:products,
            totalPrice:totalPrice,
            quantity:quantity,
            orderDate:createdOrder.createdAt
        }
        const prevOrders = await Person.find({_id:req.user.id})
        await Person.findOneAndUpdate({_id:req.user.id},{previousOrders:[...prevOrders[0].previousOrders,newOrderToClient]});
    } catch (error) {   
        console.log(error)
    }
    
    delete req.session.productId;
    res.status(200).json({msg:'Successfully sent the order'});
}

const previousPurchasesPage = async(req,res) =>{
    const { id } = req.user;
   
    const user = await Person.find({_id:id});
    const previousOrders = user[0].previousOrders

    let result = [];

    const setResult = async ()=>{
        await Promise.all(previousOrders.map(async(item)=>{
            const ids = item.cartItems.map((cartItem)=>{
                return cartItem;
            })
            const products = await Product.find({_id:{$in:ids}});
            result.push({products,orderDate:item.orderDate})
        }));
    }

    await setResult();

    res.status(200).render(path.join(rootDirectory,'public','previous.ejs'),{
        req:req,
        result:result
    })
}


module.exports = {getAllProducts,
                  productsPage,
                  cartPage,
                  addToCart,
                  modifyCart,
                  deleteCartItem,
                  cartItems,
                  addOrder,
                  previousPurchasesPage
                 };