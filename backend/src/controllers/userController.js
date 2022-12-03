import { StatusCodes } from 'http-status-codes';

import User from '../models/User';
import * as CustomError from '../errors';
import { attachCookiesToResponse } from '../utils/jwt';

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
  const {
    user: { id: userID }
  } = req;

  const { email, fullName, dateOfBirth } = req.body;
  if (!email || !fullName) {
    throw new CustomError.BadRequestError('Please provide Email & Full Name');
  }

  const validateNewEmail = await User.findOne({ email });

  if (!!validateNewEmail && validateNewEmail.id !== userID) {
    throw new CustomError.BadRequestError(
      'Another user with same email exist. Please provide another email.'
    );
  }
  const user = await User.findOneAndUpdate(
    { _id: userID },
    { email, fullName, dateOfBirth },
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

  if (!oldPassword || !newPassword) {
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

export {
  getAllUsers,
  getSingleUser,
  getCurrentUser,
  updateUser,
  updatePassword
};
