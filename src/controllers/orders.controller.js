const { catchAsync } = require('../utils/catchAsync');
const { Cart } = require('../models/cart.model');
const { ProductInCart } = require('../models/productInCart.model');
const { Product } = require('../models/product.model');
const { User } = require('../models/user.model');

const getUserCart = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const cart = await Cart.findOne({
    where: { userId: sessionUser.id, status: 'active' },
    include: [{ model: ProductInCart, include: [{ model: Product }] }],
  });

  res.status(200).json({ status: 'success', cart });
});

const addProductToCart = catchAsync(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const { sessionUser } = req;

  // Validating that the product has enough stock for the cart
  const product = await Product.findOne({ where: { id: productId } });

  if (!product) {
    return next(new AppError('Invalid product', 404));
  } else if (quantity > product.quantity) {
    return next(
      new AppError(
        `This product only has ${product.quantity} items available`,
        400
      )
    );
  }

  // Finding a current active cart, if it doesn't exist, we'll create a new one
  const cart = await Cart.findOne({
    where: { userId: sessionUser.id, status: 'active' },
  });

  // Creating a new cart if it doesn't exist
  if (!cart) {
    const newCart = await Cart.create({ userId: sessionUser.id });

    // Adding a product to the cart
    await ProductInCart.create({ cartId: newCart.id, productId, quantity });
  } else {
    // In this point i know that the user already has a cart
    // Validating if product already exists in the cart
    const productInCart = await ProductInCart.findOne({
      where: { cartId: cart.id, productId, status: 'active' },
    });

    // Sending an error if it exists
    if (productInCart) {
      return next(
        new AppError('You already have that product in your cart', 400)
      );
    }

    // Adding a  product to current cart
    await ProductInCart.create({ cartId: cart.id, productId, quantity });
  }

  res.status(200).json({ status: 'success' });
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
  getUserCart,
};
