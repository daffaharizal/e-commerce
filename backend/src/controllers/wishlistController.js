const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const Product = require('../models/Product');
const Wishlist = require('../models/Wishlist');

const addItem = async (req, res) => {
  const { folderName, productId, folderId } = req.body;
  const { name: productName } = await Product.findById(productId);

  let msg = `${productName} added to ${folderName.trim()}`;

  if (folderId) {
    let wishlist = await Wishlist.findOne({
      user: req.user.id,
      folders: { $elemMatch: { id: folderId } }
    });
    if (!wishlist) {
      throw new CustomError.BadRequestError('Wishlist not found');
    }

    const folder = wishlist.folders.find((folder) => folder.id === folderId);
    if (!folder) {
      throw new CustomError.BadRequestError('No such folder!');
    }
    const itemAlreadyExist = folder.items.some(
      (item) => item.product.toString() === productId
    );

    if (itemAlreadyExist) {
      throw new CustomError.BadRequestError(
        'This item was already in the wishlist'
      );
    } else {
      folder.items.push({ product: productId });
    }
    wishlist.save();
    msg = `${productName} added to ${folder.name}`;
  } else {
    if (!folderName.trim()) {
      throw new CustomError.BadRequestError('Please provide a folder name');
    }
    let wishlist = await Wishlist.findOneAndUpdate(
      {
        user: req.user.id
      },
      {},
      { new: true, upsert: true, runValidators: true }
    );

    const folderalreadyExist = wishlist.folders.some(
      (folder) => folder.name === folderName.trim()
    );
    if (folderalreadyExist) {
      throw new CustomError.BadRequestError('Folder already Exist');
    }

    wishlist.folders.push({
      name: folderName.trim(),
      items: [{ product: productId }]
    });
    wishlist.save();
  }

  res.status(StatusCodes.CREATED).json({ msg });
};

// const removeItem = async (req, res) => {
//   const { folderId, productId } = req.body;
// };

// const removeFolder = async (req, res) => {
//   const { folderId } = req.params;
// };

// const showFolders = async (req, res) => {};

// const showFolderItems = async (req, res) => {
//   const { folderId } = req.params;
// };

module.exports = {
  addItem
  // removeItem,
  // removeFolder,
  // showFolders,
  // showFolderItems
};
