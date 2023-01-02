import { StatusCodes } from 'http-status-codes';

import Category from '../models/Category.js';
import Product from '../models/Product.js';
import ProductSku from '../models/ProductSku.js';

import * as CustomError from '../errors/index.js';

import { uploadToCloudinary } from '../utils/cloudinary.js';

// import { uploadFile } from '../utils/helpers.js';

const createProduct = async (req, res) => {
  // any other values in the body not needed
  const { name, description, category, skuType, skus, featured, freeShipping } =
    req.body;

  if (!skus.length) {
    throw new CustomError.BadRequestError('No SKU added');
  }

  const categoryExist = await Category.countDocuments({ _id: category });
  if (!categoryExist) {
    throw new CustomError.NotFoundError('No Category with given ID found');
  }

  const product = await Product.create({
    name,
    description,
    category,
    skuType,
    featured,
    freeShipping,
    user: req.user.id
  });

  skus.map(async (sku) => {
    await ProductSku.create({ ...sku, product: product._id });
  });

  res
    .status(StatusCodes.CREATED)
    .json({ product: await Product.findById(product._id).populate('skus') });
};

const getAllProducts = async (req, res) => {
  const { search, limit, page: currentPage } = req.query;
  const queryParam = search ? { $text: { $search: search } } : {};

  const products = await Product.find(queryParam)
    .populate('skus')
    .skip((currentPage - 1) * limit)
    .limit(limit);

  const totalItems = await Product.find(queryParam).count();
  const totalPages = Math.ceil(totalItems / limit);

  res.status(StatusCodes.OK).json({
    paging: {
      hasMore: currentPage < totalPages,
      currentPage,
      totalPages,
      currentItems: products.length,
      totalItems: totalItems
    },
    products
  });
};

const getSingleProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id }).populate(
    'skus'
  );

  if (!product) {
    throw new CustomError.NotFoundError('No Product with given ID found');
  }
  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const {
    name,
    description,
    category,
    skuType,
    skus = [],
    newSkus = [],
    featured,
    freeShipping
  } = req.body;

  // Updating existing Sku's
  skus.map(async (sku) => {
    await Product.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { 'skus.$[elem]': sku } },
      {
        arrayFilters: [{ 'elem._id': sku._id }]
        // new: true,
        // runValidators: true
      }
    );
  });

  // Adding new Sku's
  newSkus.map(async (sku) => {
    await Product.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { skus: sku } }
    );
  });

  const product = await Product.findOneAndUpdate(
    { _id: req.params.id },
    { name, description, category, skuType, featured, freeShipping },
    { new: true, runValidators: true }
  );

  if (!product) {
    throw new CustomError.NotFoundError('No Product with given ID found');
  }

  res.status(StatusCodes.OK).json({ product });
};

const uploadProductImage = async (req, res) => {
  const { productId, skuId } = req.params;

  if (!req.files) {
    throw new CustomError.BadRequestError('No File Uploaded');
  }
  const productImages = [].concat(req.files.image);

  const maxSize = 1024 * 1024;

  const productsku = await ProductSku.findOne({
    _id: skuId,
    product: productId
  });

  if (!productsku) {
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
    // const url = await uploadFile(image, 'products/');
    const cloudFile = await uploadToCloudinary({
      file: image,
      path: 'products'
    });

    await ProductSku.findOneAndUpdate(
      { _id: skuId, product: productId },
      {
        $push: {
          images: {
            name: image.name,
            url: cloudFile.secure_url,
            isPublicUrl: true
          }
        }
      },
      {
        new: true,
        runValidators: true
      }
    );
  });

  res.status(StatusCodes.OK).json({ msg: 'Images Successfully Updated' });
};

export {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  uploadProductImage
};
