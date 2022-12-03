import express from 'express';
const router = express.Router();

import * as authController from '../controllers/authController';

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgot-password', authController.forgotPassword);
router.post(
  '/verify-password-reset-link',
  authController.VerifyPasswordResetLink
);
router.post('/password-reset', authController.passwordReset);

export default router;
