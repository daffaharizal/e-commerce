import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';

import Product from '../models/Product.js';
import ProductSku from '../models/ProductSku.js';
import Wishlist from '../models/Wishlist.js';

import * as CustomError from '../errors/index.js';

const addItem = async (req, res) => {
  const { folderName, folderId, productId, skuId } = req.body;

  const product = await Product.findOne({
    _id: productId
  });

  const sku = await ProductSku.findOne({
    _id: skuId,
    product: productId
  });

  if (!product || !sku) {
    throw new CustomError.BadRequestError('No such Product');
  }

  let msg = `${product.name} added to ${folderName}`;

  if (folderId) {
    const wishlist = await Wishlist.findOne({
      user: req.user.id,
      folders: { $elemMatch: { _id: folderId } }
    });

    if (!wishlist) {
      throw new CustomError.BadRequestError('Wishlist not found');
    }

    const folder = wishlist.folders.find((folder) => folder.id === folderId);
    if (!folder) {
      throw new CustomError.BadRequestError('No such folder!');
    }
    const itemAlreadyExist = folder.items.some(
      (item) =>
        item.product.toString() === productId && item.sku.toString() === skuId
    );

    if (itemAlreadyExist) {
      throw new CustomError.BadRequestError(
        'This product was already in the wishlist'
      );
    }

    folder.items.unshift({ product: productId, sku: skuId });
    wishlist.save();

    msg = `${product.name} added to ${folder.name}`;
  } else {
    if (!folderName.trim()) {
      throw new CustomError.BadRequestError('Please provide a folder name');
    }

    const wishlist = await Wishlist.findOneAndUpdate(
      {
        user: req.user.id
      },
      {},
      { new: true, upsert: true, runValidators: true }
    );

    const folderAlreadyExist = wishlist.folders.some(
      (folder) => folder.name === folderName.trim()
    );
    if (folderAlreadyExist) {
      throw new CustomError.BadRequestError('Folder already Exist');
    }

    wishlist.folders.unshift({
      name: folderName.trim(),
      items: [{ product: productId, sku: skuId }]
    });
    wishlist.save();
  }

  res.status(StatusCodes.CREATED).json({ msg });
};

const removeItem = async (req, res) => {
  const { folderId, productId, skuId } = req.body;

  const wishlist = await Wishlist.findOne({
    user: req.user.id
  });

  if (!wishlist) {
    throw new CustomError.BadRequestError('Wishlist not found');
  }

  const folder = wishlist.folders.find((folder) => folder.id === folderId);

  if (!folder) {
    throw new CustomError.BadRequestError('No such Folder');
  }

  const item = folder.items.some(
    (item) =>
      item.product.toString() === productId && item.sku.toString() === skuId
  );
  if (!item) {
    throw new CustomError.BadRequestError('No such Product');
  }

  folder.items.pull({ product: productId, sku: skuId });
  wishlist.save();

  res.status(StatusCodes.OK).json({ msg: 'Item removed successfully' });
};

const removeFolder = async (req, res) => {
  const { folderId } = req.params;

  const wishlist = await Wishlist.findOne({
    user: req.user.id
  });

  if (!wishlist) {
    throw new CustomError.BadRequestError('Wishlist not found');
  }

  const folder = wishlist.folders.find((folder) => folder.id === folderId);

  if (!folder) {
    throw new CustomError.BadRequestError('No such Folder');
  }

  wishlist.folders.pull({ _id: mongoose.Types.ObjectId(folderId) });
  wishlist.save();

  res.status(StatusCodes.OK).json({ msg: 'Folder removed successfully' });
};

const showFolders = async (req, res) => {
  const wishlist = (await Wishlist.findOne({ user: req.user.id })) || {};

  res.status(StatusCodes.OK).json({ wishlist });
};

const showFolderItems = async (req, res) => {
  const { folderId } = req.params;
  const wishlist = await Wishlist.findOne({ user: req.user.id });

  if (!wishlist) {
    throw new CustomError.NotFoundError('Wishlist not found');
  }

  const folder = wishlist.folders.find((folder) => folder.id === folderId);

  if (!folder) {
    throw new CustomError.BadRequestError('No such Folder');
  }
  res.status(StatusCodes.OK).json({ folder });
};

export { addItem, removeItem, removeFolder, showFolders, showFolderItems };
