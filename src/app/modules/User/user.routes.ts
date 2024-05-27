import { UserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { userController } from './user.controller';
import { userValidation } from './user.validation';

const router = express.Router();

router.post(
  '/register',
  validateRequest(userValidation.createUserSchema),
  userController.createUser,
);

router.post(
  '/create-admin',
  validateRequest(userValidation.createUserSchema),
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  userController.createAdmin,
);

router.get(
  '/profile',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  userController.getProfile,
);

router.put(
  '/profile',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  validateRequest(userValidation.updateUserSchema),
  userController.updateProfile,
);

router.put(
  '/change-role',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(userValidation.changeRoleValidation),
  userController.changeRole,
);

router.put(
  '/block-user',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  userController.blockUser,
);

router.put(
  '/unblock-user',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  userController.unblockUser,
);

router.get(
  '/',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  userController.getAllUsers,
);

export const userRoutes = router;
