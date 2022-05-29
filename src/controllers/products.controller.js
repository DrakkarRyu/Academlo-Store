const { catchAsync } = require('../utils/catchAsync');
const { Product } = require('../models/product.model');

const getAllProducts = catchAsync(async (req, res, next) => {
  const product = await Product.findAll({
    where: { status: 'active' },
  });
  res.status(201).json({
    Product,
  });
});

const getProductById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findOne({
    where: { id },
  });
  res.status(200).json({
    product,
  });
});

const createProduct = catchAsync(async (req, res, next) => {
  const { title, description, price, quantity } = req.body;

  const newProduct = await Product.create({
    title,
    description,
    price,
    quantity,
  });
  res.status(201).json({
    newProduct,
  });
});

const updateProduct = catchAsync(async (req, res, next) => {
  const { product } = req;
  const { title, description, price, quantity } = req.body;
  await product.update({ title, description, price, quantity });
  res.status(200).json({ status: 'success' });
});

const deleteProduct = catchAsync(async (req, res, next) => {
  const { product } = req;
  await product.update({ status: 'deleted' });
  res.status(200).json({
    status: 'success',
  });
});

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
