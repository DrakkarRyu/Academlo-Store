const express = require('express');

// Controllers
const {
  addProductToCart,
  updateProductInCart,
  purchaseCart,
  removeProductFromCart,
  getUserCart,
} = require('../controllers/orders.controller');

// Middlewares
const { protectToken } = require('../middlewares/users.middlewares');

const router = express.Router();

router.use(protectToken);

router.get('/', getUserCart);

router.post('/add-product', addProductToCart);

router.patch('/update-cart', updateProductInCart);

router.post('/purchase', purchaseCart);

router.delete('/:productId', removeProductFromCart);

module.exports = { cartRouter: router };
