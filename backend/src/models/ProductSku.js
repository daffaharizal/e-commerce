import mongoose from 'mongoose';

import ImageSchema from './Image.js';

const ProductSkuSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      ref: 'Product',
      required: true,
      index: true
    },
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide sku']
    },
    price: {
      type: Number,
      required: [true, 'Please provide product price'],
      default: 0,
      validate: {
        validator: (v) => {
          return v > 0;
        },
        message: '{VALUE} is not a positive number'
      }
    },
    stock: {
      type: Number,
      required: true,
      default: 5,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value'
      }
    },
    features: [{ type: String }],
    // varients: [{ type: String }],
    varients: [
      new mongoose.Schema({
        name: { type: String, required: [true, 'Please provide varient name'] }
      })
    ],
    images: [ImageSchema]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false
  }
);

export default mongoose.model('ProductSku', ProductSkuSchema);
