const { Cart } = require('../models/cart.model');
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const cartExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const cart = await Cart.findOne({
    where: { id, status: 'active' },
  });

  if (!cart) {
    return next(new AppError('Cart do not exist with given Id', 404));
  }

  // Add user data to the req object
  req.cart = cart;
  next();
});

module.exports = { cartExist };
