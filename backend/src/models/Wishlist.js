import mongoose from 'mongoose';

const WishlistItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  sku: {
    type: mongoose.Types.ObjectId,
    ref: 'ProductSku',
    required: true
  }
});

// unique together
WishlistItemSchema.index({ product: 1, sku: 1 }, { unique: true });

const WishlistFolderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
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

WishlistSchema.pre(
  ['find', 'findOne', 'findById', 'findOneAndUpdate'],
  function () {
    this.populate([
      {
        path: 'user',
        select: 'fullName'
      },
      {
        path: 'folders',
        populate: {
          path: 'items',
          populate: [
            {
              path: 'product',
              select:
                'id name description category skuType featured freeShipping averageRating numOfReviews'
            },
            {
              path: 'sku',
              select: 'id name price stock features varients images'
            }
          ]
        }
      }
    ]);
  }
);

export default mongoose.model('Wishlist', WishlistSchema);
