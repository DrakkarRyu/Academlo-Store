const { catchAsync } = require('../utils/catchAsync');
const { Product } = require('../models/product.model');
const { AppError } = require('../utils/appError');

const protectProductOwner = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findOne({ where: { id } });

  if (!product) {
    return next(new AppError('Not exist a product with that id', 404));
  }
  req.product = product;
  next();
});

module.exports = { protectProductOwner };
