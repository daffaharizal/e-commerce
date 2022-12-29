import mongoose from 'mongoose';

import AddressSchema from './Address.js';
import ImageSchema from './Image.js';

const OrderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  sku: {
    type: mongoose.Types.ObjectId,
    ref: 'Product.skus',
    required: true
  },
  varient: {
    type: mongoose.Types.ObjectId,
    ref: 'Product.skus.varients'
  },
  name: {
    type: String,
    required: true
  },
  image: ImageSchema,
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    required: true,
    default: 0
  },
  subTotal: {
    type: Number,
    required: true
  }
});

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'failed', 'paid', 'delivered', 'canceled'],
      default: 'pending'
    },
    orderItems: [OrderItemSchema],
    billingAddress: AddressSchema,
    shippingAddress: AddressSchema,
    shippingFee: {
      type: Number,
      required: true
    },
    tax: {
      type: Number,
      required: true
    },
    subTotal: {
      type: Number,
      required: true
    },
    discount: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      required: true
    },
    clientSecret: {
      type: String,
      required: true
    },
    paymentIntentId: {
      type: String,
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

export default mongoose.model('Order', OrderSchema);
