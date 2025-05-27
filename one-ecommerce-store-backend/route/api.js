const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const productController = require('../controllers/productController')
const userController = require('../controllers/userController');

// test
router.get('/', (req, res) => {
    res.send('Hello World from backend !!!');
});

//user 
router.post('/register', userController.userRegister);

// products
router.get('/fetch-all-products', productController.getAllProducts);

// orders
router.post('/create-order', orderController.createOrder);


module.exports = router;