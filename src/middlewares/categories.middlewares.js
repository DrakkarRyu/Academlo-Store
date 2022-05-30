const { Category } = require('../models/category.model');

const categoryExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findOne({
    where: { id, status: 'active' },
  });

  if (!category) {
    return next(new AppError('Category do not exist with given Id', 404));
  }

  // Add user data to the req object
  req.user = user;
  next();
});

module.exports = { categoryExists };
