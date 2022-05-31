const { catchAsync } = require('../utils/catchAsync');
const { Cart } = require('../models/cart.model');
const { ProductInCart } = require('../models/productInCart.model');
const { Product } = require('../models/product.model');
const { User } = require('../models/user.model');

const addProductToCart = catchAsync(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const { sessionUser } = req;

  const cart = await Cart.findOne({
    where: { status: 'active' },
  });
  if (!cart) {
    const newCart = await Cart.create({
      userId: sessionUser.id,
    });
  } else {
    const newProductInCart = await ProductInCart.create({
      include: [{ model: Product }],

      cartId: cart.id,
      productId,
      quantity,
    });
  }
});

const updateProductInCart = catchAsync(async (req, res, next) => {
  res.status(200).json({ status: 'success' });
});

const purchaseCart = catchAsync(async (req, res, next) => {
  res.status(200).json({ status: 'success' });
});

const removeProductFromCart = catchAsync(async (req, res, next) => {
  res.status(200).json({ status: 'success' });
});

module.exports = {
  addProductToCart,
  updateProductInCart,
  purchaseCart,
  removeProductFromCart,
};
