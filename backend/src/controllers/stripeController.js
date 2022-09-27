const { StatusCodes } = require('http-status-codes');

const CustomError = require('../errors');
const Order = require('../models/Order');
const { stripeEventListener } = require('../utils/stripe');

const getStripeConfig = (req, res) => {
  res
    .status(StatusCodes.OK)
    .json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
};

const stripeWebhook = async (req, res) => {
  let event = req.body;

  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  const endpointSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET;

  const NODE_ENV = process.env.NODE_ENV;

  if (endpointSecret && NODE_ENV === 'production') {
    // Get the signature sent by Stripe
    const signature = req.headers['stripe-signature'];
    try {
      event = stripeEventListener({ req, signature, endpointSecret });
    } catch (err) {
      console.log('⚠️  Webhook signature verification failed.', err.message);
      throw new CustomError.BadRequestError('Invalid Signature');
    }
  }
  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      const {
        metadata: { order_id: orderId }
      } = paymentIntent;

      // TODO - if orderId is undefined Send nofitications to admin or staffs

      const order = await Order.findOne({
        _id: orderId,
        paymentIntentId: paymentIntent.id
      });
      if (!order) {
        throw new CustomError.NotFoundError('No Order with given Id');
      }
      order.status = 'paid';
      await order.save();

      break;
    default:
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
};

module.exports = { getStripeConfig, stripeWebhook };
