import express from 'express';

import {
  authenticateUser,
  authorizePermissions
} from '../middleware/authentication.js';

import * as reviewController from '../controllers/reviewController.js';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.get(
  '/',
  [authenticateUser, authorizePermissions('admin')],
  userController.getAllUsers
);

router.get('/showme', authenticateUser, userController.getCurrentUser);

router.post('/update-user', authenticateUser, userController.updateUser);

router.post(
  '/update-password',
  authenticateUser,
  userController.updatePassword
);

router.get(
  '/:id',
  [authenticateUser, authorizePermissions('admin')],
  userController.getSingleUser
);

router.get(
  '/:id/product-reviews',
  [authenticateUser, authorizePermissions('admin', 'user')],
  reviewController.getSingleUserReviews
);

// address endpoints
router.post(
  '/create-address',
  [authenticateUser, authorizePermissions('user')],
  userController.createAddress
);

router.post(
  '/update-address',
  [authenticateUser, authorizePermissions('user')],
  userController.updateAddress
);

export default router;
