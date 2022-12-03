import express from 'express';
const router = express.Router();

import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  uploadProductImage
} from '../controllers/productController.js';

import { getSingleProductReviews } from '../controllers/reviewController';

import {
  authenticateUser,
  authorizePermissions
} from '../middleware/authentication';

import { offsetPagination } from '../middleware/pagination';

router
  .route('/')
  .get([offsetPagination], getAllProducts)
  .post([authenticateUser, authorizePermissions('admin')], createProduct);

router.patch(
  '/update/:id',
  [authenticateUser, authorizePermissions('admin')],
  updateProduct
);
router.post(
  '/upload-image/:id',
  [authenticateUser, authorizePermissions('admin')],
  uploadProductImage
);

router.get('/:id', getSingleProduct);

router.get(
  '/:id/reviews',
  [authenticateUser, offsetPagination],
  getSingleProductReviews
);

export default router;
