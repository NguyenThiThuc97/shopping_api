const express = require("express");
// const app = express();
const router = express.Router();
var multer = require("multer")
// var mailer = require('express-mailer');
const auth = require('../middleware/auth');

/*1. category*/ 
const category = require('./../Controllers/CategoryController');
router.route('/category').get(category.get);
router.route('/category/:id').get(category.getOne);
router.route('/category/create').post(category.create);
router.route('/category/edit').post(category.edit);
router.route('/category/delete/:id').get(category.delete)
router.route("/find/:key_word").get(category.findCategory)

/*2. customer*/ 
var storageUser = multer.diskStorage({
    destination : function (req, file, cb){
        cb(null, 'images/Users')
    },
    filename : function (req, file, cb) {
        if(file){
            cb(null, file.originalname)
        }
      }
})
var uploadUser = multer({ storage: storageUser })

const customer = require('./../Controllers/CustomerController');
router.route('/customer/login').post(customer.login)
router.route('/customer').get(customer.get);
router.route('/customer/:id').get(customer.getOne);
router.route('/customer/create').post(uploadUser.single("image"), customer.create);
router.route('/customer/edit').post(customer.edit);
router.route('/customer/change_password').post(customer.changePwd);
router.route('/customer/delete/:id').get(customer.getOne);
router.route('/customer/profile/:id').get(customer.getProfile);

/*3. employee*/ 
const employee = require('./../Controllers/EmployeeController');
router.route('/employee/login').post(employee.login)
router.route('/employee').get(employee.get);
router.route('/employee/:id').get(employee.getOne);
router.route('/employee/create').post(uploadUser.single("image"), employee.create);
router.route('/employee/edit').post(employee.edit);
router.route('/employee/change_password').post(employee.changePwd);
router.route('/employee/delete/:id').get(employee.delete);
router.route('/employee/profile/:id').get(employee.getProfile);

/*4. sale*/ 
const sale = require('./../Controllers/SaleController');
router.route('/sale').get(sale.get);
router.route('/sale/:id').get(sale.getOne);
router.route('/sale/create').post(sale.create);
router.route('/sale/edit').post(sale.edit);
router.route('/sale/delete/:id').get(sale.delete)

/*5. product*/ 

var storageProduct = multer.diskStorage({
    destination : function (req, file, cb){
        cb(null, 'images/Products')
    },
    filename : function (req, file, cb) {
        if(file){
            cb(null, file.originalname)
        }
      }
})
var uploadProduct = multer({ storage: storageProduct })

const product = require('./../Controllers/ProductController');
router.route('/product').get(product.get);
router.route('/product/:id').get(product.getOne);
router.route('/product/create').post(uploadProduct.single("images"), product.create);
router.route('/product/edit').post(uploadProduct.single("images"), product.edit);
router.route('/product/delete/:id').get(product.delete);
router.route('/find-sale').get(product.findSale);
router.route('/find-arrival').get(product.findArrival);
//product detail 
router.route('/product-detail/:id').get(product.getAllProductDetail);
router.route('/product-detail/:id/:size/:color').get(product.getProductDetail);
router.route('/product-detail/create').post(product.addProductDetail);
router.route('/product-detail/delete/:id/:size/:color').get(product.deleteProductDetail);
router.route('/product-detail/edit').post(product.updateProductDetail)
router.route('/sum-money').post(product.sumMoney)

//orders
const orders = require('./../Controllers/OrdersController');
router.route('/orders').get(orders.get)
router.route('/orders/:id').get(orders.getOne)
router.route('/orders/create').post(orders.create)
router.route('/orders/edit').post(orders.edit)
router.route('/orders/delete/:id').get(orders.delete)//not using delete method, only change this status
router.route('/orders/customer/:id').get(orders.getOrdersOfCutomer)

module.exports = router