import { StatusCodes } from 'http-status-codes';

import Category from '../models/Category';

import * as CustomError from '../errors';

const createCategory = async (req, res) => {
  const { name } = req.body;

  const category = await Category.create({ name });
  res.status(StatusCodes.CREATED).json({ category });
};

const getAllCategories = async (req, res) => {
  const { limit, page: currentPage } = req.query;

  const categories = await Category.find({})
    .skip((currentPage - 1) * limit)
    .limit(limit);
  const totalItems = await Category.find({}).count();
  const totalPages = Math.ceil(totalItems / limit);

  res.status(StatusCodes.OK).json({
    paging: {
      hasMore: currentPage < totalPages,
      currentPage,
      totalPages,
      currentItems: categories.length,
      totalItems: totalItems
    },
    categories
  });
};

const getSingleCategory = async (req, res) => {
  const category = await Category.findOne({ _id: req.params.id });

  if (!category) {
    throw new CustomError.NotFoundError('No Category with given ID found');
  }
  res.status(StatusCodes.OK).json({ category });
};

export { createCategory, getAllCategories, getSingleCategory };
