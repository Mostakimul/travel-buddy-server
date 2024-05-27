import { UserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { tripController } from './trip.controller';
import { tripValidation } from './trip.validation';

const router = express.Router();

router.post(
  '/',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  validateRequest(tripValidation.createTripSchema),
  tripController.createTrip,
);

router.get('/', tripController.getAllTrips);
router.get('/:tripId', tripController.getSingleTrip);

router.post(
  '/join-trip/:tripId',
  auth(UserRole.USER),
  tripController.travelBuddyRequest,
);

router.put(
  '/:tripId',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  validateRequest(tripValidation.updateTripSchema),
  tripController.updateTrip,
);

export const tripRoutes = router;
