import express from 'express';
import auth from '../middlewares/auth';
import validateRequest from '../middlewares/validateRequest';
import { travelBuddyController } from '../modules/TravelBuddy/travelBuddy.controller';
import { tripController } from '../modules/Trip/trip.controller';
import { userController } from '../modules/User/user.controller';
import { userValidation } from '../modules/User/user.validation';

const router = express.Router();

router.post(
  '/register',
  validateRequest(userValidation.createUserSchema),
  userController.createUser,
);
router.post(
  '/login',
  validateRequest(userValidation.loginSchema),
  userController.loginUser,
);
router.post('/trips', auth(), tripController.createTrip);

router.get('/trips', tripController.getAllTrips);
router.post('/trip/:tripId/request', auth(), tripController.travelBuddyRequest);
router.get(
  '/travel-buddies/:tripId',
  auth(),
  travelBuddyController.getTravelBuddyById,
);

router.put(
  '/travel-buddies/:buddyId/respond',
  auth(),
  travelBuddyController.updateTravelBuddy,
);

router.get('/profile', auth(), userController.getProfile);

router.put(
  '/profile',
  auth(),
  validateRequest(userValidation.updateUserSchema),
  userController.updateProfile,
);
export default router;
