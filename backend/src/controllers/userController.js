import { StatusCodes } from 'http-status-codes';

import User from '../models/User.js';

import * as CustomError from '../errors/index.js';

import { uploadToCloudinary } from '../utils/cloudinary.js';
import { attachCookiesToResponse } from '../utils/jwt.js';

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  const count = await User.count();
  return res.status(StatusCodes.OK).json({ count, users });
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    throw new CustomError.BadRequestError('User not found');
  }
  return res.status(StatusCodes.OK).json({ user });
};

const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.id });
  return res.status(StatusCodes.OK).json({ user });
};

const updateUser = async (req, res) => {
  const { email, fullName, dateOfBirth } = req.body;
  const { avatar } = req.files || {};

  if (!(email || fullName)) {
    throw new CustomError.BadRequestError('Please provide Email & Full Name');
  }

  const validateNewEmail = await User.findOne({ email });

  if (!!validateNewEmail && validateNewEmail.id !== req.user.id) {
    throw new CustomError.BadRequestError(
      'Another user with same email exist. Please provide another email.'
    );
  }

  let cloudFile;
  if (avatar) {
    // call below func after passing all validation
    cloudFile = await uploadToCloudinary({
      file: avatar.tempFilePath,
      path: 'avatar'
    });
  }
  const user = await User.findOneAndUpdate(
    { _id: req.user.id },
    {
      email,
      fullName,
      dateOfBirth,
      ...(avatar && {
        avatar: { name: avatar.name, url: cloudFile.url, isPublicUrl: true }
      })
    },
    {
      new: true,
      runValidators: true
    }
  );

  const payload = { email, id: user._id, role: user.role };
  attachCookiesToResponse({ res, payload });

  res.status(StatusCodes.OK).json({ user });
};

const updatePassword = async (req, res) => {
  let { oldPassword, newPassword } = req.body;
  oldPassword = oldPassword.trim();
  newPassword = newPassword.trim();

  if (!(oldPassword || newPassword)) {
    throw new CustomError.BadRequestError(
      'Please provide Old Password & New Password values'
    );
  }

  if (newPassword.length < 6) {
    throw new CustomError.BadRequestError(
      'Password must contain atleast 6 letters.'
    );
  }

  const user = await User.findOne({ _id: req.user.id });

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnAuthenticatedError('Invalid Old Password');
  }

  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.OK).json({ msg: 'Password Successfully Updated.' });
};

// Address API's
const createAddress = async (req, res) => {
  const {
    country,
    province,
    city,
    street1,
    street2,
    zip,
    isBilling,
    isShipping
  } = req.body;

  if (!(isBilling || isShipping)) {
    throw new CustomError.BadRequestError('Invalid Request');
  }
  let user;

  if (isBilling) {
    user = await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $push: {
          billingAddress: { country, province, city, street1, street2, zip }
        }
      },
      {
        new: true,
        runValidators: true
      }
    );
  }

  if (isShipping) {
    user = await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $push: {
          shippingAddress: { country, province, city, street1, street2, zip }
        }
      },
      {
        new: true,
        runValidators: true
      }
    );
  }
  res.status(StatusCodes.OK).json({ user });
};

const updateAddress = async (req, res) => {
  const {
    country,
    province,
    city,
    street1,
    street2,
    zip,
    id: addressId
  } = req.body;

  if (!addressId) {
    throw new CustomError.BadRequestError('Invalid Request');
  }

  let user = await User.findOneAndUpdate(
    { _id: req.user.id },
    {
      $set: {
        'billingAddress.$[elem]': {
          _id: addressId,
          country,
          province,
          city,
          street1,
          street2,
          zip
        }
      }
    },
    {
      arrayFilters: [{ 'elem._id': addressId }],
      new: true,
      runValidators: true
    }
  );

  user = await User.findOneAndUpdate(
    { _id: req.user.id },
    {
      $set: {
        'shippingAddress.$[elem]': {
          _id: addressId,
          country,
          province,
          city,
          street1,
          street2,
          zip
        }
      }
    },
    {
      arrayFilters: [{ 'elem._id': addressId }],
      new: true,
      runValidators: true
    }
  );

  res.status(StatusCodes.OK).json({ user });
};

export {
  getAllUsers,
  getSingleUser,
  getCurrentUser,
  updateUser,
  updatePassword,
  createAddress,
  updateAddress
};
