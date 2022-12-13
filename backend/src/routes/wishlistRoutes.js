import express from 'express';

import {
  authenticateUser,
  authorizePermissions
} from '../middleware/authentication.js';

import * as wishlistController from '../controllers/wishlistController.js';

const router = express.Router();

router.post(
  '/add-item',
  [authenticateUser, authorizePermissions('user')],
  wishlistController.addItem
);

router.delete(
  '/remove-item',
  [authenticateUser, authorizePermissions('user')],
  wishlistController.removeItem
);

router.delete(
  '/remove-folder/:folderId',
  [authenticateUser, authorizePermissions('user')],
  wishlistController.removeFolder
);

router.get(
  '/show-folders/',
  [authenticateUser, authorizePermissions('user')],
  wishlistController.showFolders
);

router.get(
  '/:folderId/show-items/',
  [authenticateUser, authorizePermissions('user')],
  wishlistController.showFolderItems
);

export default router;
