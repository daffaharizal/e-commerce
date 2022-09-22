const { StatusCodes } = require('http-status-codes');

const CustomError = require('../errors');
const Product = require('../models/Product');
const Review = require('../models/Review');
const User = require('../models/User');
const checkPermission = require('../utils/permissions');

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
    throw new CustomError.NotFoundError(
      'Already submitted review for this product'
    );
  }

  req.body.user = userId;
  const review = await Review.create(req.body);
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

  const review = await Review.findOne({ _id: reviewId })
    .populate({
      path: 'product',
      select: 'name'
    })
    .populate({
      path: 'user',
      select: 'fullName role'
    });
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

  const reviews = await Review.find({ product: productId }).populate({
    path: 'user',
    select: 'fullName'
  });

  res.status(StatusCodes.OK).json({ reviews });
};

const getSingleUserReviews = async (req, res) => {
  const { id: userId } = req.params;

  // Admin or current logged-in user can see all reviews.
  checkPermission({ requestUser: req.user, resourceUser: req.params });

  const user = await User.findById(userId);
  if (!user) {
    throw new CustomError.NotFoundError(`No User with such id - ${userId}`);
  }

  const reviews = await Review.find({ user: userId }).populate({
    path: 'user',
    select: 'fullName'
  });

  res.status(StatusCodes.OK).json({ reviews });
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReviews,
  getSingleUserReviews
};
