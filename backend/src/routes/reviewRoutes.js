import express from 'express';
const router = express.Router();

import {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview
} from '../controllers/reviewController';

import {
  authenticateUser,
  authorizePermissions
} from '../middleware/authentication';

router
  .route('/')
  .get([authenticateUser, authorizePermissions('admin')], getAllReviews)
  .post([authenticateUser, authorizePermissions('user')], createReview);

router
  .route('/:id')
  .get(getSingleReview)
  .patch([authenticateUser, authorizePermissions('user')], updateReview)
  .delete(authenticateUser, deleteReview);

export default router;
