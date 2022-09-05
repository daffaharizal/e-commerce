const { StatusCodes } = require('http-status-codes');

const User = require('../models/User');
const CustomError = require('../errors');
const { attachCookiesToResponse } = require('../utils/jwt');

const getAllUsers = async (req, res) => {
  const users = await User.find({}).select('-password');
  return res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select('-password');
  if (!user) {
    throw new CustomError.BadRequestError('User not found');
  }
  return res.status(StatusCodes.OK).json({ user });
};

const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.id }).select('-password');
  return res.status(StatusCodes.OK).json({ user });
};

const updateUser = async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    throw new CustomError.BadRequestError(
      'Please provide email and name values'
    );
  }
  const user = await User.findOneAndUpdate(
    { _id: req.user.id },
    { email, name },
    {
      new: true,
      runValidators: true
    }
  ).select('-password');

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
      'Please provide oldPassword and newPassword values'
    );
  }

  const user = await User.findOne({ _id: req.user.id });

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnAuthenticatedError('Invalid Credentials');
  }

  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.OK).json({ msg: 'Password Successfully Updated.' });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  getCurrentUser,
  updateUser,
  updatePassword
};
