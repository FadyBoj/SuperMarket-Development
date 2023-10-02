const Product = require("../models/product");
const Person = require("../models/person");
const Order = require("../models/order");
const notFoundError = require("../errors/notfoundError");
const unauthorizedError = require("../errors/unauthorizedError");
const badRequestError = require("../errors/bad-request");
const jwt = require("jsonwebtoken");
const Path = require("path");
const fs = require("fs");
const invalidError = require("../errors/invalid");
const cloudinary = require("cloudinary");
const rootDirectory = Path.dirname(require.main.filename);
require("dotenv").config();
const axios = require("axios");
const { get } = require("http");

cloudinary.config({
  cloud_name: "ddivi7f83",
  api_key: "832124861562798",
  api_secret: "9eB5ABXna6_1faM-rZY7dzT2LgY",
});

const productsPage = (req, res) => {
  res
    .status(200)
    .render(Path.join(rootDirectory, "public", "product-list.ejs"), {
      req: req,
    });
};

const modifyProductPage = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.find({ _id: id });
    res
    .status(200)
    .render(Path.join(rootDirectory, "public", "modify-product.ejs"),{product:product[0]});
  } catch (error) {
    throw new  badRequestError("Unexpected error !")
  }

  
};

const modifyProduct = async (req,res) =>{
  const { id, name, description, price, quantity, category } = req.body;

  let imageUrls = [];

  await Promise.all(req.files.map(async(item) =>{
    const {filename, originalname, path} = item
    const imagePath = Path.join(rootDirectory,'uploads',filename);
    const imageData = fs.readFileSync(imagePath);

    fs.writeFileSync(Path.join(rootDirectory,'uploads',originalname),imageData);
    fs.unlink(Path.join(rootDirectory,'uploads',filename),(err)=>{if(err){console.log(err)}});

    

    await cloudinary.v2.uploader.upload(
      Path.join(rootDirectory, `uploads/${originalname}`),
      { public_id: originalname },
      function (error, result) {
        imageUrls.push(result.url);
      }
    );


  })
  )

  const queryObject = {};
  if(name)
  queryObject.title = name;
  if(description)
  queryObject.description = description;
  if(price)
  queryObject.price = price;
  if(quantity)
  queryObject.quantity = quantity;
  if(category)
  queryObject.category = category;
  if(req.files.length > 0)
  queryObject.images = imageUrls;

  try {
    await Product.findOneAndUpdate({_id:id},queryObject)

    console.log("Successfully updated the product");
    res.status(200).json({msg:"Successfully updated the product"});

  } catch (error) {
    console.log("Error");
    throw new invalidError("Something wrong happend ");
  }
 
}



const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
};

const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.json({ msg: `Product id: ${id}` });
};

const deleteProduct = async (req, res) => {
  const { id } = req.body;
  const product = await Product.findOneAndDelete({ _id: id });
  res.status(200).json({ msg: "ok" });
};

const addProduct = async (req, res) => {
  res
    .status(200)
    .render(Path.join(rootDirectory, "public", "addproduct.ejs"),{req:req});
};

const uploadProduct = async (req, res) => {
  const { title, price, category, quantity, description } = req.body;
  let imageUrls = [];

   await Promise.all(req.files.map(async(item) =>{
    const {filename, originalname, path} = item
    const imagePath = Path.join(rootDirectory,'uploads',filename);
    const imageData = fs.readFileSync(imagePath);

    fs.writeFileSync(Path.join(rootDirectory,'uploads',originalname),imageData);
    fs.unlink(Path.join(rootDirectory,'uploads',filename),(err)=>{if(err){console.log(err)}});


    await cloudinary.v2.uploader.upload(
      Path.join(rootDirectory, `uploads/${originalname}`),
      { public_id: originalname },
      function (error, result) { 
        imageUrls.push(result.url) 
      }
    )

  }))

  if(imageUrls.length === 0)
  {
    throw new badRequestError("Image is required")
  }

  try {
    await Product.create({
      title:title,
      price:price,
      category:category,
      quantity:quantity,
      images:imageUrls
    })
  } catch (error) {
    console.log(error);
    throw new invalidError("Invalid inputs");
  }



  res.status(200).json({ msg: "Success" });
};

const addUserPage = (req, res) => {
  res.status(200).render(Path.join(rootDirectory, "public", "add-user.ejs"),{req:req});
};

const addUser = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    phonenumber,
    address,
    position,
    branch,
    password,
  } = req.body;

  try {
    const checkUser = await Person.find({ email: email.toLowerCase() });
    if (checkUser.length > 0) {
      console.log("existed");
      throw new badRequestError("User already exsist !");
    }
  } catch (error) {
    throw new badRequestError("User already exsist !");
  }

  const newUser = new Person({
    firstname: firstname,
    lastname: lastname,
    email: email.toLowerCase(),
    password: password,
    phoneNumber: phonenumber,
    address: address,
    role: position,
    branch: branch,
    Admin: true,
  });

  try {
    const createdUser = await Person.create(newUser);
    console.log("Success", createdUser);
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({ msg: "Account successfully created " });
};

const updateProduct = async (req, res) => {
  const { id, title, price, quantity, category } = req.body;
  console.log(id, title, price, quantity, category);
  const queryObject = {};
  if (title) {
    queryObject.title = title;
  }
  if (price) {
    queryObject.price = price;
  }
  if (quantity) {
    queryObject.quantity = quantity;
  }
  if (category) {
    queryObject.category = category;
  }

  try {
    const product = await Product.find({ _id: id });
    if (product.length > 0) {
      await Product.findOneAndUpdate({ _id: id }, queryObject);
      res.status(200).json({ msg: "Success" });
    } else {
      res.status(404).json({ msg: "Product not found" });
    }
  } catch (error) {
    throw new notFoundError("Syntax Error");
  }
};

const ordersPage = async (req, res) => {
  const orders = await Order.find({ status: "Pending" });
  console.log(orders);
  res.status(200).render(Path.join(rootDirectory, "public", "orders.ejs"), {
    orders: orders,
    req: req,
  });
};

const singleOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.find({ _id: id });
    const cartItems = await Product.find({ _id: { $in: order[0].cartItems } });

    res.status(200).render(Path.join(rootDirectory, "public", "order.ejs"), {
      order: order,
      cartItems: cartItems,
    });
  } catch (error) {
    return res.redirect("/");
  }
};

module.exports = {
  getProducts,
  deleteProduct,
  productsPage,
  getSingleProduct,
  uploadProduct,
  addProduct,
  updateProduct,
  addUserPage,
  addUser,
  ordersPage,
  singleOrder,
  modifyProductPage,
  modifyProduct
};

