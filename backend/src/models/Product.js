import mongoose from 'mongoose';

import ImageSchema from './Image';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide product name'],
      maxlength: [100, 'Name can not be more than 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Please provide product description'],
      maxlength: [1000, 'Description can not be more than 1000 characters']
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'Category'
    },
    skus: [
      new mongoose.Schema({
        sku: {
          type: String,
          required: [true, 'Please provide sku']
        },
        type: { type: String, required: true },
        price: {
          type: Number,
          required: [true, 'Please provide product price'],
          default: 0
        },
        stock: {
          type: Number,
          required: true,
          default: 5
        },
        features: [{ type: String }],
        varients: [{ type: String }],
        images: [ImageSchema]
      })
    ],
    featured: {
      type: Boolean,
      default: false
    },
    freeShipping: {
      type: Boolean,
      default: false
    },
    averageRating: {
      type: Number,
      default: 0
    },
    numOfReviews: {
      type: Number,
      default: 0
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false
  }
);

ProductSchema.index({ name: 'text', category: 'text', company: 'text' });

ProductSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.id = obj._id;
  delete obj._id;
  return obj;
};

ProductSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
  justOne: false
});

// ProductSchema.pre(['find', 'findOne', 'findOneAndUpdate'], function () {
//   this.populate({
//     path: 'user',
//     select: 'fullName'
//   }).populate('reviews');
// });

export default mongoose.model('Product', ProductSchema);
