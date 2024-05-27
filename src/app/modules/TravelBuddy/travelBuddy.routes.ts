import { UserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { travelBuddyController } from './travelBuddy.controller';

const router = express.Router();

router.get(
  '/:tripId',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  travelBuddyController.getTravelBuddyById,
);

router.put(
  '/respond/:buddyId',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  travelBuddyController.updateTravelBuddy,
);

export const travelBuddyRoutes = router;
