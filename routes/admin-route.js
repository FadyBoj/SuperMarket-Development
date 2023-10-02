const express = require("express");
const router = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });



//middleware
const adminAuth = require("../middleware/admin-auth");
const homeAuth = require("../middleware/home-auth");
const managerAuth = require('../middleware/MnagerAuth');

router.use(bodyParser.json());

const {
  getProducts,
  getSingleProduct,
  addProduct,
  uploadProduct,
  addUserPage,
  addUser,
  updateProduct,
  ordersPage,
  singleOrder,
  productsPage,
  deleteProduct,
  modifyProductPage,
  modifyProduct
} = require("../controllers/admin");

router.route("/productslist").get(getProducts);
router.route("/product/:id").get(getSingleProduct);
router.route("/addproduct").get(homeAuth,addProduct);
router.route("/orders").get(homeAuth, adminAuth, ordersPage);
router.route("/orders/:id").get(homeAuth, adminAuth, singleOrder);
router.route("/product-list").get(productsPage);
router.route("/uploadproduct").post(upload.array("images"), uploadProduct);
router.route("/delete-product").post(deleteProduct);
router.route("/add-user").get(managerAuth,addUserPage).post(upload.none(), addUser);
router.route("/modify-product/:id").get(modifyProductPage)
router.route('/modify-product').post(upload.array('images'),modifyProduct);


module.exports = router;
