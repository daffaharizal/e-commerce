const mongoose = require('mongoose');

const WishlistItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: true
  }
});

const WishlistFolderSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  items: [WishlistItemSchema]
});

const WishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    folders: [WishlistFolderSchema]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

module.exports = mongoose.model('Wishlist', WishlistSchema);
