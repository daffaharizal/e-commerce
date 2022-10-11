const express = require('express');
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions
} = require('../middleware/authentication');

const { wishlistItem } = require('../controllers/wishlistController');

router.post(
  '/:product',
  [authenticateUser, authorizePermissions('user')],
  wishlistItem
);

module.exports = router;
