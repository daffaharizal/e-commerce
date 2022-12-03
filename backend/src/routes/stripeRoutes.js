import express from 'express';
const router = express.Router();

import {
  getStripeConfig,
  stripeWebhook
} from '../controllers/stripeController';

router.get('/config', getStripeConfig);

// Stripe requires the raw body to construct the event
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  stripeWebhook
);

export default router;
