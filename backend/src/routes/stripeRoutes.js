import express from 'express';

import * as stripeController from '../controllers/stripeController';

const router = express.Router();

router.get('/config', stripeController.getStripeConfig);

// Stripe requires the raw body to construct the event
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  stripeController.stripeWebhook
);

export default router;
