import express from 'express';

import {
  authenticateUser,
  authorizePermissions
} from '../middleware/authentication';

import * as reviewController from '../controllers/reviewController';
import * as userController from '../controllers/userController';

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

export default router;
