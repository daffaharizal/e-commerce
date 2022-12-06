import express from 'express';

import {
  authenticateUser,
  authorizePermissions
} from '../middleware/authentication';
import { offsetPagination } from '../middleware/pagination';

import * as productController from '../controllers/productController';
import * as reviewController from '../controllers/reviewController';

const router = express.Router();

router
  .route('/')
  .get([offsetPagination], productController.getAllProducts)
  .post(
    [authenticateUser, authorizePermissions('admin')],
    productController.createProduct
  );

router.patch(
  '/update/:id',
  [authenticateUser, authorizePermissions('admin')],
  productController.updateProduct
);
router.post(
  '/upload-image/:id',
  [authenticateUser, authorizePermissions('admin')],
  productController.uploadProductImage
);

router.get('/:id', productController.getSingleProduct);

router.get(
  '/:id/reviews',
  [authenticateUser, offsetPagination],
  reviewController.getSingleProductReviews
);

export default router;
