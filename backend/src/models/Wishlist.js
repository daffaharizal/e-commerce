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
    toObject: { virtuals: true },
    versionKey: false
  }
);

WishlistItemSchema.set('toJSON', {
  transform: function (doc, ret) {
    // ret.id = ret._id;
    delete ret._id;
  }
});

WishlistFolderSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  }
});

WishlistSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  }
});

WishlistSchema.pre(['find', 'findOne', 'findOneAndUpdate'], function () {
  this.populate({
    path: 'user',
    select: 'fullName'
  });
});

module.exports = mongoose.model('Wishlist', WishlistSchema);
