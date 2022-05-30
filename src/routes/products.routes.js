const express = require('express');

// Controllers
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products.controller');

// Middlewares
const { protectToken } = require('../middlewares/users.middlewares');
const {
  createProductValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');
const {
  protectProductOwner,
  productExist,
} = require('../middlewares/products.middlewares');

const router = express.Router();

router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.use(protectToken);

router.post('/', createProductValidations, checkValidations, createProduct);

router
  .route('/:id')
  .patch(productExist, protectProductOwner, updateProduct)
  .delete(productExist, protectProductOwner, deleteProduct);

module.exports = { productsRouter: router };
