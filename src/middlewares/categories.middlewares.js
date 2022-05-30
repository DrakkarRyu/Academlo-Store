const { Category } = require('../models/category.model');
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const categoryExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findOne({
    where: { id, status: 'active' },
  });

  if (!category) {
    return next(new AppError('Category do not exist with given Id', 404));
  }

  // Add user data to the req object
  req.category = category;
  next();
});

module.exports = { categoryExists };
