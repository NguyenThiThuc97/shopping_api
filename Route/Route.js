const express = require("express");
const app = express();
const router = express.Router();
var multer = require("multer")
// var mailer = require('express-mailer');

/*1. category*/ 
const category = require('./../Controllers/CategoryController');
router.route('/category').get(category.get);
router.route('/category/:id').get(category.getOne);
router.route('/category/create').post(category.create);
// router.route('/category/edit').post(category.edit);
router.route('/category/delete/:id').get(category.delete)

/*2. customer*/ 
const customer = require('./../Controllers/CustomerController');
router.route('/customer').get(customer.get);
router.route('/customer/:id').get(customer.getOne);
router.route('/customer/create').post(customer.create);
// router.route('/customer/edit').post(customer.edit);

/*3. employee*/ 
const employee = require('./../Controllers/EmployeeController');
router.route('/employee').get(employee.get);
router.route('/employee/:id').get(employee.getOne);
router.route('/employee/create').post(employee.create);
// router.route('/employee/edit').post(employee.edit);

/*4. sale*/ 
const sale = require('./../Controllers/SaleController');
router.route('/sale').get(sale.get);
router.route('/sale/:id').get(sale.getOne);
router.route('/sale/create').post(sale.create);
// router.route('/sale/edit').post(sale.edit);
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

module.exports = router