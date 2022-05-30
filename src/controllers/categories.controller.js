const { catchAsync } = require('../utils/catchAsync');
const { Category } = require('../models/category.model');

const getAllCategories = catchAsync(async (req, res, next) => {
  const category = await Category.findAll({
    where: { status: 'active' },
  });
  res.status(201).json({
    category,
  });
});

const getCategoryById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findOne({
    where: { id },
  });
  res.status(200).json({
    category,
  });
});

const createCategory = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const newCategory = await Category.create({
    name,
  });
  res.status(201).json({
    newCategory,
  });
});

const updateCategory = catchAsync(async (req, res, next) => {
  const { category } = req;
  const { name } = req.body;
  await Category.update({ name });
  res.status(200).json({ status: 'success' });
});

const deleteCategory = catchAsync(async (req, res, next) => {
  const { category } = req;
  await Category.update({ status: 'deleted' });
  res.status(200).json({
    status: 'success',
  });
});

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
