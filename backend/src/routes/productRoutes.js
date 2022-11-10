const express = require('express');
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  uploadProductImage
} = require('../controllers/productController.js');

const { getSingleProductReviews } = require('../controllers/reviewController');

const {
  authenticateUser,
  authorizePermissions
} = require('../middleware/authentication');

const { offsetPagination } = require('../middleware/pagination');

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

module.exports = router;
