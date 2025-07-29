const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const productController = require('../controllers/productController')
const userController = require('../controllers/userController');
const { uploadImagesMiddleware } = require('../utils/imageHandler');

// test
router.get('/', (req, res) => {
    res.send('Hello World from backend !!!');
});

//user 
router.post('/register', userController.userRegister);
router.post('/login', userController.userLogin);

// products
router.get('/fetch-product-by-id/:id', productController.getProductById);
router.get('/fetch-all-products', productController.getAllProducts);
router.post('/add-product', uploadImagesMiddleware, productController.addProduct);
router.put('/update-product/:id', uploadImagesMiddleware, productController.updateProduct);
router.delete('/delete-product/:id', productController.deleteProduct);
router.put('/delete-product-images/:id', productController.deleteProductImages);

// orders
router.post('/create-order', orderController.createOrder);
router.get('/fetch-all-orders', orderController.getAllOrders);

module.exports = router;