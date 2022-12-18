import CryptoJS from 'crypto-js';
import { StatusCodes } from 'http-status-codes';

import Token from '../models/Token.js';
import User from '../models/User.js';

import * as CustomError from '../errors/index.js';

import ENV from '../utils/constants.js';
import { attachCookiesToResponse } from '../utils/jwt.js';
import Email from '../utils/mail.js';

const register = async (req, res) => {
  // will skip other datas
  const { email, fullName, password } = req.body;

  const emailAlreadyExists = await User.countDocuments({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
  }
  const user = await User.create({
    email,
    fullName,
    password,
    role: 'user'
  });

  const randomToken = CryptoJS.lib.WordArray.random(256 / 8);

  await Email({
    recipientAddress: email,
    recipientName: fullName,
    templateId: ENV.SG_USER_VERIFICATION_TEMPLATE_ID,
    templateData: {
      username: fullName,
      verifyUrl: `${ENV.SG_USER_VERIFICATION_URL}/${user.id}/${randomToken}`
    }
  }).sendMails();

  // const payload = { email, id: user._id, role: user.role };
  // attachCookiesToResponse({ res, payload });

  res
    .status(StatusCodes.OK)
    .json({ msg: 'Verification Email sent Successfully.' });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!(email || password)) {
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

  if (!user.isAccountVerified) {
    const randomToken = CryptoJS.lib.WordArray.random(256 / 8);

    await Email({
      recipientAddress: email,
      recipientName: user.fullName,
      templateId: ENV.SG_USER_VERIFICATION_TEMPLATE_ID,
      templateData: {
        username: user.fullName,
        verifyUrl: `${ENV.SG_USER_VERIFICATION_URL}/${user.id}/${randomToken}`
      }
    }).sendMails();

    throw new CustomError.UnAuthenticatedError(
      'Account is not verified. Please check your mail.'
    );
  }

  const payload = { email, id: user._id, role: user.role };
  attachCookiesToResponse({ res, payload });

  res.status(StatusCodes.OK).json({ user });
};

const logout = async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(Date.now()),
    secure: ENV.NODE_ENV === 'production',
    sameSite: ENV.NODE_ENV === 'production' ? 'none' : 'Lax'
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

  user.isAccountVerified = false;
  await user.save();

  res.status(StatusCodes.OK).json({ msg: 'Email sent Successfully.' });
};

const VerifyPasswordResetLink = async (req, res) => {
  const { code, userId } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    throw new CustomError.NotFoundError('Password Reset Link Expired.');
  }
  const token = await Token.find({ user, code });
  if (token.length === 0) {
    throw new CustomError.BadRequestError('Password Reset Link Expired.');
  }
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
  if (!user) {
    throw new CustomError.NotFoundError('Password Reset Link Expired.');
  }
  const token = await Token.find({ user, code });
  if (token.length === 0) {
    throw new CustomError.BadRequestError('Password Reset Link Expired.');
  }
  user.password = newPassword;
  user.isAccountVerified = true;
  await user.save();

  // delete token
  await Token.deleteOne({ user, code });

  res.status(StatusCodes.OK).json({ msg: 'Password Reset Successfully.' });
};

export {
  register,
  login,
  logout,
  forgotPassword,
  VerifyPasswordResetLink,
  passwordReset
};
