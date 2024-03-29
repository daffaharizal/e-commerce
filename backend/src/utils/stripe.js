import Stripe from 'stripe';

import ENV from './constants.js';

const stripe = new Stripe(ENV.STRIPE_SECRET_KEY);

// Create a PaymentIntent with the order amount and currency
const createPaymentIntent = async ({
  amount,
  currency = ENV.STRIPE_CURRENCY
}) =>
  stripe.paymentIntents.create({
    amount,
    currency,
    automatic_payment_methods: {
      enabled: true
    }
  });

const updatePaymentIntent = async ({ paymentIntentId, orderId }) =>
  stripe.paymentIntents.update(paymentIntentId, {
    metadata: { order_id: orderId }
  });

const stripeEventListener = ({ req, signature, endpointSecret }) =>
  stripe.webhooks.constructEvent(req.body, signature, endpointSecret);

export { createPaymentIntent, updatePaymentIntent, stripeEventListener };
