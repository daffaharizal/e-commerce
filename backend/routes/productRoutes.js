const express = require('express');
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  uploadProductImage,
} = require('../controllers/productController.js');

const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

router
  .route('/')
  .get(getAllProducts)
  .post([authenticateUser, authorizePermissions('admin')], createProduct);

router.patch(
  '/update/:id',
  [authenticateUser, authorizePermissions('admin')],
  updateProduct,
);
router.post(
  '/upload-image/:id',
  [authenticateUser, authorizePermissions('admin')],
  uploadProductImage,
);

router.get('/:id', getProduct);

module.exports = router;
