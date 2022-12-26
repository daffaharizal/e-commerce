import express from 'express';

import {
  authenticateUser,
  authorizePermissions
} from '../middleware/authentication.js';
import { offsetPagination } from '../middleware/pagination.js';

import * as productController from '../controllers/productController.js';
import * as reviewController from '../controllers/reviewController.js';

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
  '/upload-image/:productId/sku/:skuId',
  [authenticateUser, authorizePermissions('admin')],
  productController.uploadProductImage
);

router.get('/:id', productController.getSingleProduct);

router.get(
  '/:id/reviews',
  // [authenticateUser, offsetPagination],
  [offsetPagination],
  reviewController.getSingleProductReviews
);

export default router;
