const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getSingleUser,
  getCurrentUser,
  updateUser,
  updatePassword
} = require('../controllers/userController');

const { getSingleUserReviews } = require('../controllers/reviewController');

const {
  authenticateUser,
  authorizePermissions
} = require('../middleware/authentication');

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

module.exports = router;
