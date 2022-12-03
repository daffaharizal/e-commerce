import express from 'express';
const router = express.Router();

import {
  authenticateUser,
  authorizePermissions
} from '../middleware/authentication';

import {
  addItem,
  removeItem,
  removeFolder,
  showFolders,
  showFolderItems
} from '../controllers/wishlistController';

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

export default router;
