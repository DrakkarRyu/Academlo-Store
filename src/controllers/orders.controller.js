const { catchAsync } = require('../utils/catchAsync');
const { Cart } = require('../models/cart.model');
const { ProductInCart } = require('../models/productInCart.model');
const { Product } = require('../models/product.model');
const { User } = require('../models/user.model');

const addProductToCart = catchAsync(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const { sessionUser } = req;

  const userHasCart = await Cart.findOne({
    where: { userId: sessionUser.id, status: 'active' },
    include: [
      {
        model: User,
        attributes: { exclude: ['password'] },
      },
    ],
  });

  if (!userHasCart) {
    const createCart = await Cart.create({ userId: sessionUser.id });

    res.status(200).json({
      status: 'Added',
      findProduct,
      createCart,
    });
  } else {
    const addProduct = await ProductInCart.create({
      cartId: userHasCart.id,
      productId,
      quantity,
    });

    const findProduct = await ProductInCart.findAll({
      where: { status: 'active' },
      include: [
        {
          model: Product,
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
    });

    res.status(200).json({
      status: 'Product added to cart',
      findProduct,
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
