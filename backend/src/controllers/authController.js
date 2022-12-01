const CryptoJS = require('crypto-js');
const { StatusCodes } = require('http-status-codes');

const User = require('../models/User');
const Token = require('../models/Token');
const CustomError = require('../errors');
const { ENV } = require('../utils/constants');
const Email = require('../utils/mail');
const { attachCookiesToResponse } = require('../utils/jwt');

const register = async (req, res) => {
  const { email } = req.body;
  const emailAlreadyExists = await User.countDocuments({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
  }
  const user = await User.create({
    ...req.body,
    role: 'user'
  });
  const payload = { email, id: user._id, role: user.role };

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
  const payload = { email, id: user._id, role: user.role };
  attachCookiesToResponse({ res, payload });

  res.status(StatusCodes.OK).json({ user });
};

const logout = async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(Date.now())
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new CustomError.BadRequestError(
      'No account found with this email address'
    );
  }

  const randomToken = CryptoJS.lib.WordArray.random(256 / 8);

  await Token.create({
    user,
    code: randomToken
  });

  await Email({
    recipientAddress: user.email,
    recipientName: user.fullName,
    templateId: ENV.SG_PASSWORD_RESET_TEMPLATE_ID,
    templateData: {
      username: user.fullName,
      resetUrl: `${ENV.SG_PASSWORD_RESET_URL}/${user.id}/${randomToken}`
    }
  }).sendMails();

  user.isVerified = false;
  await user.save();

  res.status(StatusCodes.OK).json({ msg: 'Email sent Successfully.' });
};

const VerifyPasswordResetLink = async (req, res) => {
  const { code, userId } = req.body;

  const user = await User.findById(userId);
  if (!user)
    throw new CustomError.NotFoundError('Password Reset Link Expired.');

  const token = await Token.find({ user, code });
  if (token.length === 0)
    throw new CustomError.BadRequestError('Password Reset Link Expired.');

  res.status(StatusCodes.OK).json({ msg: 'Valid Password Reset Link.' });
};

const passwordReset = async (req, res) => {
  const { code, newPassword, userId } = req.body;

  if (newPassword.length < 6) {
    throw new CustomError.BadRequestError(
      'Password must contain atleast 6 letters.'
    );
  }

  const user = await User.findById(userId);
  if (!user)
    throw new CustomError.NotFoundError('Password Reset Link Expired.');

  const token = await Token.find({ user, code });
  if (token.length === 0)
    throw new CustomError.BadRequestError('Password Reset Link Expired.');

  user.password = newPassword;
  user.isVerified = true;
  await user.save();

  // delete token
  await Token.deleteOne({ user, code });

  res.status(StatusCodes.OK).json({ msg: 'Password Reset Successfully.' });
};

module.exports = {
  register,
  login,
  logout,
  forgotPassword,
  VerifyPasswordResetLink,
  passwordReset
};
