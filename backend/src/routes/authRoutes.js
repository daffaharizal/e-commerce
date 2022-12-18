import express from 'express';

import * as authController from '../controllers/authController.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/verify-user', authController.verifyUserAccount);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgot-password', authController.forgotPassword);
router.post(
  '/verify-password-reset-link',
  authController.verifyPasswordResetLink
);
router.post('/password-reset', authController.passwordReset);

export default router;
