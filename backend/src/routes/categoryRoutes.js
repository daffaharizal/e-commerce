import express from 'express';

import {
  authenticateUser,
  authorizePermissions
} from '../middleware/authentication';
import { offsetPagination } from '../middleware/pagination';

import * as categoryController from '../controllers/categoryController';

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
