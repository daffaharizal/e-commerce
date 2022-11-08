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
          maxlength: [64, 'Name can not be more than 64 characters']
        },
        url: {
          type: String,
          required: [true, 'Please provide image url']
        },
        isPublicUrl: {
          type: Boolean,
          default: false
        }
      }
    ],
    category: {
      type: String,
      required: [true, 'Please provide product category'],
      enum: ['office', 'kitchen', 'bedroom', 'living']
    }, // TODO: Change to FK
    company: {
      type: String,
      required: [true, 'Please provide company'],
      enum: {
        values: ['damro', 'godrej india', 'usha'],
        message: '{VALUE} is not supported'
      } // TODO: Change to FK
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

module.exports = mongoose.model('Product', ProductSchema);
