import express from 'express';

import {
  authenticateUser,
  authorizePermissions
} from '../middleware/authentication';

import * as reviewController from '../controllers/reviewController';

const router = express.Router();

router
  .route('/')
  .get(
    [authenticateUser, authorizePermissions('admin')],
    reviewController.getAllReviews
  )
  .post(
    [authenticateUser, authorizePermissions('user')],
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getSingleReview)
  .patch(
    [authenticateUser, authorizePermissions('user')],
    reviewController.updateReview
  )
  .delete(authenticateUser, reviewController.deleteReview);

export default router;
