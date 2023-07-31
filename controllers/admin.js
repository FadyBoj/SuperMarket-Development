const Product = require('../models/product');
const Order = require('../models/order');
const notFoundError = require('../errors/notfoundError');
const unauthorizedError = require('../errors/unauthorizedError');
const jwt = require('jsonwebtoken');
const Path = require('path');
const fs = require('fs');
const invalidError = require('../errors/invalid');
const cloudinary = require('cloudinary');
const rootDirectory = Path.dirname(require.main.filename)
require('dotenv').config();
const axios = require('axios');
const { get } = require('http');

cloudinary.config({ 
    cloud_name: 'ddivi7f83', 
    api_key: '832124861562798', 
    api_secret: '9eB5ABXna6_1faM-rZY7dzT2LgY' 
  });


const productsPage = (req,res) =>{
  res.status(200).render(Path.join(rootDirectory,'public','product-list.ejs'),{
    req:req
  })
}

const getProducts = async(req,res) =>{
    const products = await Product.find({});
    res.status(200).json(products);
}



const getSingleProduct = async(req,res) =>{
    const {id} = req.params;
    console.log(id);
    res.json({msg:`Product id: ${id}`})
}

const deleteProduct = async(req,res) =>{
  const { id } = req.body;
  const product = await Product.findOneAndDelete({_id:id})
  res.status(200).json({msg:'ok'})
}

const addProduct = async(req,res) =>{

    res.status(200).sendFile(Path.join(rootDirectory,'public','addproduct.html'));
  }

const uploadProduct = async(req,res) =>{
    const {originalname,destination,filename,path} = req.file;
    const imagePath = Path.join(rootDirectory,'uploads',filename);
  
    try {
      const imageData = fs.readFileSync(imagePath);
  
      fs.writeFileSync(Path.join(rootDirectory,'uploads',originalname),imageData);
    
      fs.unlink(Path.join(rootDirectory,'uploads',filename),(err)=>{
        if(err)
        return console.log(err);
      })  
  
      let imageUrl;
  
    await cloudinary.v2.uploader.upload(Path.join(rootDirectory,`uploads/${originalname}`),
    { public_id:originalname }, 
    function(error, result) {imageUrl = result.url});
  
  
      const {id,title,price,description,category,rating,quantity} = req.body;
  
      const newProduct = new Product({
        id:id,
        title:title,
        price:price,
        description:description,
        category:category,
        image:imageUrl,
        rating:{rate:rating},
        quantity:quantity
      })
  
      await Product.create(newProduct);
  
      fs.unlink(Path.join(rootDirectory,`uploads/${originalname}`),(err) =>{
        if(err)
        return console.log(err);
      })
  
      console.log('Success');
  
    } catch (error) {
      console.log(error)
      throw new invalidError('failed to add product')
        }
  
  
    res.status(200).json({msg:"Success"})
  }

const updateProduct = async(req,res) =>{
    const {id,title,price,quantity,category} = req.body
    console.log(id,title,price,quantity,category)
    const queryObject = {};
    if(title)
    {
        queryObject.title = title
    }
    if(price)
    {
        queryObject.price = price
    }
    if(quantity)
    {
        queryObject.quantity = quantity
    }
    if(category)
    {
        queryObject.category = category
    }

    try {
       const product = await Product.find({_id:id});
       if(product.length > 0)
       {
        await Product.findOneAndUpdate({_id:id},queryObject);
        res.status(200).json({msg:"Success"});
       }
       else{
        res.status(404).json({msg:"Product not found"});
       }
    } catch (error) {
        throw new notFoundError('Syntax Error')
    }

}

const ordersPage = async(req,res) =>{
  const orders = await Order.find({status:'Pending'});
  console.log(orders)
  res.status(200).render(Path.join(rootDirectory,'public','orders.ejs'),{orders:orders,req:req});
}

const singleOrder = async(req,res) =>{
  const { id } = req.params;
  
  try {

    const order = await Order.find({_id:id});
    const cartItems = await Product.find({_id:{$in:order[0].cartItems}});

    res.status(200).render(Path.join(rootDirectory,'public','order.ejs'),{order:order,cartItems:cartItems});
  } catch (error) {
    return res.redirect('/')
  }


}

module.exports = {
    getProducts,
    deleteProduct,
    productsPage,
    getSingleProduct,
    uploadProduct,
    addProduct,
    updateProduct,
    ordersPage,
    singleOrder
  };