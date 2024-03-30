import express from 'express';
import auth from '../middlewares/auth';
import { travelBuddyController } from '../modules/TravelBuddy/travelBuddy.controller';
import { tripController } from '../modules/Trip/trip.controller';
import { userController } from '../modules/User/user.controller';

const router = express.Router();

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
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

export default router;
