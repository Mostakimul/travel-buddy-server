import express from 'express';
import { authRoutes } from '../modules/Auth/auth.routes';
import { userRoutes } from '../modules/User/user.routes';

// router.post('/trips', auth(), tripController.createTrip);

// router.get('/trips', tripController.getAllTrips);
// router.post('/trip/:tripId/request', auth(), tripController.travelBuddyRequest);
// router.get(
//   '/travel-buddies/:tripId',
//   auth(),
//   travelBuddyController.getTravelBuddyById,
// );

// router.put(
//   '/travel-buddies/:buddyId/respond',
//   auth(),
//   travelBuddyController.updateTravelBuddy,
// );

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
