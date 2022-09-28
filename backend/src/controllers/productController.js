const { StatusCodes } = require('http-status-codes');

const { uploadFile } = require('../utils/functions');

const Product = require('../models/Product');
const CustomError = require('../errors');

const createProduct = async (req, res) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products, count: products.length });
};

const getSingleProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id }).populate({
    path: 'user',
    select: 'fullName role'
  });

  if (!product) {
    throw new CustomError.NotFoundError('No Product with given ID found');
  }
  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const product = await Product.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!product) {
    throw new CustomError.NotFoundError('No Product with given ID found');
  }
  res.status(StatusCodes.OK).json({ product });
};

const uploadProductImage = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError('No File Uploaded');
  }
  const productImages = [].concat(req.files.image);

  const maxSize = 1024 * 1024;

  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new CustomError.NotFoundError('No Product with given ID found');
  }

  productImages.map((image) => {
    if (!image.mimetype.startsWith('image')) {
      throw new CustomError.BadRequestError('Please Upload Image');
    }

    if (image.size > maxSize) {
      throw new CustomError.BadRequestError(
        'Please upload image smaller than 1MB'
      );
    }
  });

  productImages.map(async (image) => {
    const url = await uploadFile(image, 'products/');

    await Product.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { images: { name: image.name, url } } },
      { new: true, runValidators: true }
    );
  });

  res.status(StatusCodes.OK).json({ msg: 'Images Successfully Updated' });
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  uploadProductImage
};