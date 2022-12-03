import { StatusCodes } from 'http-status-codes';

import * as CustomError from '../errors';
import Product from '../models/Product';
import Review from '../models/Review';
import User from '../models/User';
import checkPermission from '../utils/permissions';

const createReview = async (req, res) => {
  const { product: productId } = req.body;
  const { id: userId } = req.user;

  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new CustomError.NotFoundError(
      `No Product with given ID: ${productId}`
    );
  }

  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: userId
  });

  if (alreadySubmitted) {
    throw new CustomError.BadRequestError(
      'Already submitted review for this product'
    );
  }

  req.body.user = userId;
  let review = await Review.create(req.body);
  review = await review.populate({
    path: 'user',
    select: 'fullName'
  });
  res.status(StatusCodes.CREATED).json({ review });
};

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({});

  res.status(StatusCodes.OK).json({ reviews });
};

const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new CustomError.NotFoundError(`No Review with such id - ${reviewId}`);
  }

  res.status(StatusCodes.OK).json({ review });
};

const updateReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const { rating, title, comment } = req.body;

  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new CustomError.NotFoundError(`No Review with such id - ${reviewId}`);
  }

  // Only created user can edit this Object.
  checkPermission({
    requestUser: req.user,
    resourceUser: review.user,
    isAdminAuthorized: false
  });

  review.rating = rating;
  review.title = title;
  review.comment = comment;
  await review.save();

  res.status(StatusCodes.OK).json({ review });
};

const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new CustomError.NotFoundError(`No Review with such id - ${reviewId}`);
  }

  // Admin or created user can delete this Object.
  checkPermission({ requestUser: req.user, resourceUser: review.user });

  await review.remove();
  res.status(StatusCodes.OK).json({ msg: 'Review Deleted' });
};

const getSingleProductReviews = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findById(productId);
  if (!product) {
    throw new CustomError.NotFoundError(
      `No Product with such id - ${productId}`
    );
  }

  const { limit, page: currentPage } = req.query;
  const reviews = await Review.find({ product: productId })
    .skip((currentPage - 1) * limit)
    .limit(limit);

  // const userReviewed = await Review.findOne({
  //   product: productId,
  //   user: req.user.id
  // });

  const totalItems = await Review.find({ product: productId }).count();
  const totalPages = Math.ceil(totalItems / limit);

  res.status(StatusCodes.OK).json({
    paging: {
      hasMore: currentPage < totalPages,
      currentPage,
      totalPages,
      currentItems: reviews.length,
      totalItems: totalItems
    },
    // userReviewed: Boolean(userReviewed),
    reviews
  });
};

const getSingleUserReviews = async (req, res) => {
  const { id: userId } = req.params;

  // Admin or current logged-in user can see all reviews.
  checkPermission({ requestUser: req.user, resourceUser: req.params });

  const user = await User.findById(userId);
  if (!user) {
    throw new CustomError.NotFoundError(`No User with such id - ${userId}`);
  }

  const reviews = await Review.find({ user: userId });

  res.status(StatusCodes.OK).json({ reviews });
};

export {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReviews,
  getSingleUserReviews
};
