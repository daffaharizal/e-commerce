import express from 'express';
const router = express.Router();

import {
  createOrder,
  getAllOrder,
  getSingleOrder,
  getCurrentUserOrders
} from '../controllers/orderController';

import {
  authenticateUser,
  authorizePermissions
} from '../middleware/authentication';

router
  .route('/')
  .post(authenticateUser, createOrder)
  .get([authenticateUser, authorizePermissions('admin')], getAllOrder);

router.route('/me').get(authenticateUser, getCurrentUserOrders);

router.route('/:id').get(authenticateUser, getSingleOrder);

export default router;
