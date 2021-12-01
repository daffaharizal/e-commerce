const express = require('express');
const router = express.Router();

const {
  getStripeConfig,
  stripeWebhook,
} = require('../controllers/stripeController');

router.get('/config', getStripeConfig);

// Stripe requires the raw body to construct the event
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  stripeWebhook,
);

module.exports = router;
