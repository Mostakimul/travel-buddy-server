import express from 'express';
import { authRoutes } from '../modules/Auth/auth.routes';
import { tripRoutes } from '../modules/Trip/trip.routes';
import { userRoutes } from '../modules/User/user.routes';

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
  {
    path: '/trip',
    route: tripRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
