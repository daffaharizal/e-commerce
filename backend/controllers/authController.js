const { StatusCodes } = require('http-status-codes');

const User = require('../models/User');
const CustomError = require('../errors');
const { attachCookiesToResponse } = require('../utils/jwt');

const register = async (req, res) => {
  const { email } = req.body;
  const emailAlreadyExists = await User.countDocuments({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
  }
  const user = await User.create(req.body);
  const payload = { email, id: user._id };

  attachCookiesToResponse({ res, payload });
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide email and password');
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnAuthenticatedError('Invalid Credentials');
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnAuthenticatedError('Invalid Credentials');
  }

  const payload = { email, id: user._id };
  attachCookiesToResponse({ res, payload });

  res.status(StatusCodes.OK).json({ user });
};

const logout = async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

module.exports = { register, login, logout };
