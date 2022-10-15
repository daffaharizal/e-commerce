const express = require('express');
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions
} = require('../middleware/authentication');

const {
  addItem,
  removeItem,
  removeFolder,
  showFolders,
  showFolderItems
} = require('../controllers/wishlistController');

router.post(
  '/add-item',
  [authenticateUser, authorizePermissions('user')],
  addItem
);

router.delete(
  '/remove-item',
  [authenticateUser, authorizePermissions('user')],
  removeItem
);

router.delete(
  '/remove-folder/:folderId',
  [authenticateUser, authorizePermissions('user')],
  removeFolder
);

router.get(
  '/show-folders/',
  [authenticateUser, authorizePermissions('user')],
  showFolders
);

router.get(
  '/:folderId/show-items/',
  [authenticateUser, authorizePermissions('user')],
  showFolderItems
);

module.exports = router;
