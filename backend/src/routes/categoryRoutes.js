import express from 'express';

import {
  authenticateUser,
  authorizePermissions
} from '../middleware/authentication.js';
import { offsetPagination } from '../middleware/pagination.js';

import * as categoryController from '../controllers/categoryController.js';

const router = express.Router();

router
  .route('/')
  .get([offsetPagination], categoryController.getAllCategories)
  .post(
    [authenticateUser, authorizePermissions('admin')],
    categoryController.createCategory
  );

router.route('/:id').get(categoryController.getSingleCategory);

export default router;
