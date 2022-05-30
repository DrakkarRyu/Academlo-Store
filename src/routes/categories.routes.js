const express = require('express');

const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories.controller');

//const { categoryExists } = require('../middlewares/categories.middlewares');

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', createCategory);

module.exports = { categoriesRouter: router };
