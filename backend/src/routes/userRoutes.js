import express from 'express';
const router = express.Router();

import {
  getAllUsers,
  getSingleUser,
  getCurrentUser,
  updateUser,
  updatePassword
} from '../controllers/userController';

import { getSingleUserReviews } from '../controllers/reviewController';

import {
  authenticateUser,
  authorizePermissions
} from '../middleware/authentication';

router.get('/', [authenticateUser, authorizePermissions('admin')], getAllUsers);

router.get('/showme', authenticateUser, getCurrentUser);

router.post('/update-user', authenticateUser, updateUser);

router.post('/update-password', authenticateUser, updatePassword);

router.get(
  '/:id',
  [authenticateUser, authorizePermissions('admin')],
  getSingleUser
);

router.get(
  '/:id/product-reviews',
  [authenticateUser, authorizePermissions('admin', 'user')],
  getSingleUserReviews
);

export default router;
