import express from 'express';

import {
  authenticateUser,
  authorizePermissions
} from '../middleware/authentication.js';

import * as orderController from '../controllers/orderController.js';

const router = express.Router();

router
  .route('/')
  .post(
    [authenticateUser, authorizePermissions('user')],
    orderController.createOrder
  )
  .get(
    [authenticateUser, authorizePermissions('admin')],
    orderController.getAllOrder
  );

router
  .route('/me')
  .get(
    [authenticateUser, authorizePermissions('user')],
    orderController.getCurrentUserOrders
  );

router.route('/:id').get(authenticateUser, orderController.getSingleOrder);

export default router;
