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

router
  .route('/')
  .get(getAllProducts)
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

router.get('/:id/reviews', getSingleProductReviews);

module.exports = router;
