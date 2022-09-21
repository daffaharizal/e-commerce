const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide product name'],
      maxlength: [100, 'Name can not be more than 100 characters']
    },
    price: {
      type: Number,
      required: [true, 'Please provide product price'],
      default: 0
    },
    description: {
      type: String,
      required: [true, 'Please provide product description'],
      maxlength: [1000, 'Description can not be more than 1000 characters']
    },
    images: [
      {
        name: {
          type: String,
          required: [true, 'Please provide image name'],
          maxlength: [16, 'Name can not be more than 16 characters']
        },
        url: {
          type: String,
          required: [true, 'Please provide image url']
        }
      }
    ],
    category: {
      type: String,
      required: [true, 'Please provide product category'],
      enum: ['office', 'kitchen', 'bedroom', 'living']
    },
    company: {
      type: String,
      required: [true, 'Please provide company'],
      enum: {
        values: ['damro', 'godrej india', 'usha'],
        message: '{VALUE} is not supported'
      }
    },
    colors: {
      type: [String],
      required: true
    },
    featured: {
      type: Boolean,
      default: false
    },
    freeShipping: {
      type: Boolean,
      default: false
    },
    inventory: {
      type: Number,
      required: true,
      default: 15
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
    toObject: { virtuals: true }
  }
);

ProductSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
  justOne: false
});

ProductSchema.pre(['find', 'findOne', 'findOneAndUpdate'], function () {
  this.populate({
    path: 'user',
    select: 'name'
  }).populate('reviews');
});

module.exports = mongoose.model('Product', ProductSchema);
