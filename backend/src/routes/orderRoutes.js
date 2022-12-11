import express from 'express';

import {
  authenticateUser,
  authorizePermissions
} from '../middleware/authentication';

import * as orderController from '../controllers/orderController';

const router = express.Router();

router
  .route('/')
  .post(authenticateUser, orderController.createOrder)
  .get(
    [authenticateUser, authorizePermissions('admin')],
    orderController.getAllOrder
  );

router.route('/me').get(authenticateUser, orderController.getCurrentUserOrders);

router.route('/:id').get(authenticateUser, orderController.getSingleOrder);

export default router;
