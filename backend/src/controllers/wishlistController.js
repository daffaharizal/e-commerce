const { StatusCodes } = require('http-status-codes');

const Product = require('../models/Product');
const Wishlist = require('../models/Wishlist');

const wishlistItem = async (req, res) => {
  let msg;

  const { product } = req.params;
  const { name: productName } = await Product.findById(product);

  let wishlist = await Wishlist.findOne({ user: req.user.id });
  if (wishlist) {
    const alreadyExist = wishlist.items.some(
      (item) => item.product.toString() === product
    );
    alreadyExist
      ? wishlist.items.remove({ product })
      : wishlist.items.push({ product });

    msg = `${productName} ${
      alreadyExist ? 'removed from' : 'added to'
    } wishlist`;
  } else {
    wishlist = await Wishlist.create({
      user: req.user.id
    });
    wishlist.items.push({ product });
    msg = `${productName} added to Wishlist`;
  }
  wishlist.save();

  res.status(StatusCodes.OK).json({ msg });
};

module.exports = {
  wishlistItem
};
