const express = require('express');
const router = express.Router();

const {
  createOrder,
  getAllOrder,
  getSingleOrder,
  getCurrentUserOrders
} = require('../controllers/orderController');

const {
  authenticateUser,
  authorizePermissions
} = require('../middleware/authentication');

router
  .route('/')
  .post(authenticateUser, createOrder)
  .get([authenticateUser, authorizePermissions('admin')], getAllOrder);

router.route('/me').get(authenticateUser, getCurrentUserOrders);

router.route('/:id').get(authenticateUser, getSingleOrder);

module.exports = router;
