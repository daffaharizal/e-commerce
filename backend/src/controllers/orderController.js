import { StatusCodes } from 'http-status-codes';
import Product from '../models/Product';
import Order from '../models/Order';
import * as CustomError from '../errors';
import checkPermission from '../utils/permissions';

import * as stripe from '../utils/stripe';

const calculateOrderAmount = ({ subTotal, shippingFee, tax }) =>
  subTotal + tax + shippingFee;

const createOrder = async (req, res) => {
  const { items: cartItems, shippingFee, tax } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.NotFoundError('No Products Found');
  }

  if (!tax || !shippingFee) {
    throw new CustomError.BadRequestError(
      'Please provide tax and shipping fee'
    );
  }

  let orderItems = [];
  let subTotal = 0;

  for (const item of cartItems) {
    const { productId, quantity } = item;

    if (!productId || !quantity) {
      throw new CustomError.BadRequestError('Please add valid products');
    }

    const product = await Product.findOne({ _id: productId });
    if (!product) {
      throw new CustomError.NotFoundError(`No Product with ID - ${productId}`);
    }
    // TODO - Check duplicate products in orderItems

    if (isNaN(quantity)) {
      throw new CustomError.BadRequestError(
        `Invalid Quantity for item name - ${product.name}`
      );
    }

    // add item to order
    orderItems = [
      ...orderItems,
      {
        product,
        name: product.name,
        price: product.price,
        quantity: +quantity,
        // TODO: Discount
        subTotal: +quantity * product.price
      }
    ];

    // calculate subtotal
    subTotal += +quantity * product.price;
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
    shippingFee,
    tax,
    subTotal,
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
