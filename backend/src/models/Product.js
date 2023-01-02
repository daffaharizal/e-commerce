import mongoose from 'mongoose';

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
    skuType: { type: String, required: true, trim: true },
    // skus: [ProductSkuSchema],
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

// ProductSchema.index({ name: 'text', category: 'text' });

// ProductSchema.methods.toJSON = function () {
//   const obj = this.toObject();
//   obj.id = obj._id;
//   delete obj._id;
//   return obj;
// };

ProductSchema.virtual('skus', {
  ref: 'ProductSku',
  localField: '_id',
  foreignField: 'product',
  justOne: false
});

ProductSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
  justOne: false
});

ProductSchema.pre(['find', 'findOne', 'findOneAndUpdate'], function () {
  // this.populate({
  //   path: 'user',
  //   select: 'fullName'
  // }).populate('reviews');
  this.populate('category');
});

export default mongoose.model('Product', ProductSchema);
