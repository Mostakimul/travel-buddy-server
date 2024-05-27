import { UserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { authController } from './auth.controller';

const router = express.Router();

router.post('/login', authController.loginUser);
router.post('/refresh-token', authController.refreshToken);
router.post(
  '/change-password',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  authController.changePassword,
);

export const authRoutes = router;
