const express = require("express");
const app = express();
const router = express.Router();
// var multer = require("multer")
// var mailer = require('express-mailer');

/*1. category*/ 
const category = require('./../Controllers/CategoryController');
router.route('/category').get(category.get);
router.route('/category/:id').get(category.getOne);
router.route('/category/create').post(category.create);
// router.route('/category/edit').post(category.edit);

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

/*5. product*/ 
const product = require('./../Controllers/ProductController');
router.route('/product').get(product.get);
router.route('/product/:id').get(product.getOne);
router.route('/product/create').post(product.create);
// router.route('/sale/edit').post(sale.edit);

module.exports = router