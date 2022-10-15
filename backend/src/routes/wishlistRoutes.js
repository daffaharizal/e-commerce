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

router.post(
  '/remove-item',
  [authenticateUser, authorizePermissions('user')],
  removeItem
);

router.post(
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
