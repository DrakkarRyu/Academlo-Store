const { catchAsync } = require('../utils/catchAsync');
//Models
const { Product } = require('../models/product.model');
const { Category } = require('../models/category.model');
const { User } = require('../models/user.model');

const getAllProducts = catchAsync(async (req, res, next) => {
  const product = await Product.findAll({
    where: { status: 'active' },
    include: [
      { model: Category, attributes: ['name'] },
      { model: User, attributes: ['username', 'email'] },
    ],
  });
  res.status(201).json({
    product,
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
  const { title, description, price, quantity, categoryId } = req.body;
  const { sessionUser } = req;
  const newProduct = await Product.create({
    title,
    description,
    price,
    quantity,
    categoryId,
    userId: sessionUser.id,
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
