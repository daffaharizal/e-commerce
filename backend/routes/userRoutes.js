const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getUser,
  getCurrentUser,
  updateUser,
  updatePassword,
} = require('../controllers/userController');
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

router.get('/', authenticateUser, authorizePermissions('admin'), getAllUsers);
router.get('/showme', authenticateUser, getCurrentUser);
router.post('/update-user', authenticateUser, updateUser);
router.post('/update-password', authenticateUser, updatePassword);
router.get('/:id', authenticateUser, authorizePermissions('admin'), getUser);

module.exports = router;
