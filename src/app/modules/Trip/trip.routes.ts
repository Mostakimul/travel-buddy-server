import { UserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { tripController } from './trip.controller';

const router = express.Router();

router.post(
  '/',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  tripController.createTrip,
);

router.get('/', tripController.getAllTrips);

router.post(
  '/trip/:tripId/request',
  auth(UserRole.USER),
  tripController.travelBuddyRequest,
);

export const tripRoutes = router;
