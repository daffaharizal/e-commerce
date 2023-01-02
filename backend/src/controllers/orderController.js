import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';

import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

import * as CustomError from '../errors/index.js';

import { calculateOrderAmount } from '../utils/helpers.js';
import checkPermission from '../utils/permissions.js';
import * as stripe from '../utils/stripe.js';

const createOrder = async (req, res) => {
  const {
    items: cartItems,
    billingAddressId,
    shippingAddressId,
    shippingFee,
    tax
  } = req.body;

  const user = await User.findById(req.user.id);

  const billingAddress = user.billingAddress.find(
    (address) => address.id === billingAddressId
  );

  const shippingAddress = user.shippingAddress.find(
    (address) => address.id === shippingAddressId
  );

  if (!(billingAddress || shippingAddress)) {
    throw new CustomError.BadRequestError(
      'Please provide billing and shipping addresses'
    );
  }

  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError('No line items found');
  }

  if (!(tax || shippingFee)) {
    throw new CustomError.BadRequestError(
      'Please provide tax and shipping fee'
    );
  }

  let orderItems = [];
  let subTotal = 0;

  for (const item of cartItems) {
    const { productId, skuId, varientId, quantity } = item;

    if (!(productId || skuId || quantity)) {
      throw new CustomError.BadRequestError('Please add valid line items');
    }

    if (isNaN(quantity)) {
      throw new CustomError.BadRequestError(`Invalid line item quantity`);
    }

    const product = await Product.findById(productId);

    const sku = product.skus.find((sku) => sku.id === skuId);

    if (!product || !sku) {
      throw new CustomError.BadRequestError(`Please add valid line items`);
    }
    // TODO - Check duplicate products in orderItems

    const varient = sku.varients.find((varient) => varient.id === varientId);

    if (sku.varients.length !== 0 && !varient) {
      throw new CustomError.BadRequestError(`Please add valid line items`);
    }
    const orderName = varient
      ? `${product.name} - ${sku.sku} - ${varient.name}`
      : `${product.name} - ${sku.sku}`;

    // add item to order
    orderItems = [
      ...orderItems,
      {
        product,
        sku,
        ...(varient && { varient }),
        name: orderName,
        ...(sku.images.length !== 0 && { image: sku.images[0] }),
        quantity: +quantity,
        price: sku.price,
        discount: 0,
        subTotal: +quantity * sku.price
      }
    ];

    // calculate subtotal
    subTotal += +quantity * sku.price;
  }

  if (orderItems.length < 1) {
    throw new CustomError.BadRequestError('Please add valid products');
  }
  const amount = calculateOrderAmount({ subTotal, shippingFee, tax });

  const { id: paymentIntentId, client_secret: clientSecret } =
    await stripe.createPaymentIntent({
      amount,
      currency: 'usd'
    });

  // TODO: Discount

  const order = await Order.create({
    orderItems,
    billingAddress,
    shippingAddress,
    shippingFee,
    tax,
    subTotal,
    discount: 0,
    total: amount,
    user: req.user.id,
    clientSecret,
    paymentIntentId
  });

  if (!order) {
    throw new CustomError.BadRequest('Something went wrong!');
  }

  // add OrderId to stripe payment intent
  await stripe.updatePaymentIntent({ paymentIntentId, orderId: order.id });

  res.status(StatusCodes.CREATED).json({ order });
};

const getAllOrder = async (req, res) => {
  const orders = await Order.find().populate({
    path: 'user',
    select: 'fullName role'
  });
  res.status(StatusCodes.OK).json({ count: orders.length, orders });
};

const getSingleOrder = async (req, res) => {
  const { id: OrderID } = req.params;
  const order = await Order.findOne({ _id: OrderID }).populate({
    path: 'user',
    select: 'fullName role'
  });
  if (!order) {
    throw new CustomError.NotFoundError(`No Order with ID: ${OrderID}`);
  }

  // Admin or created user can view this Order.
  checkPermission({ requestUser: req.user, resourceUser: order.user });

  res.status(StatusCodes.OK).json({ order });
};

const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({
    user: req.user.id
  }).populate({
    path: 'user',
    select: 'fullName role'
  });
  res.status(StatusCodes.OK).json({ count: orders.length, orders });
};

export { createOrder, getAllOrder, getSingleOrder, getCurrentUserOrders };
