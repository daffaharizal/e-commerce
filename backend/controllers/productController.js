const path = require('path');
const { StatusCodes } = require('http-status-codes');

const Product = require('../models/Product');
const CustomError = require('../errors');

const createProduct = async (req, res) => {
  req.body.user = req.user.id;
  const { image, ...rest } = req.body;
  const product = await Product.create(rest);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products, count: products.length });
};

const getSingleProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (!product) {
    throw new CustomError.NotFoundError('No Product with given ID found');
  }
  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const { image, ...rest } = req.body;
  const product = await Product.findOneAndUpdate({ _id: req.params.id }, rest, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new CustomError.NotFoundError('No Product with given ID found');
  }
  res.status(StatusCodes.OK).json({ product });
};

const uploadProductImage = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError('No File Uploaded');
  }
  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please Upload Image');
  }

  const maxSize = 1024 * 1024;

  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      'Please upload image smaller than 1MB',
    );
  }

  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new CustomError.NotFoundError('No Product with given ID found');
  }

  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`,
  );
  await productImage.mv(imagePath);

  product.image = `/uploads/${productImage.name}`;
  product.save();

  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  uploadProductImage,
};
