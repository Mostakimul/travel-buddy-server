import express from 'express';
import { authRoutes } from '../modules/Auth/auth.routes';
import { travelBuddyRoutes } from '../modules/TravelBuddy/travelBuddy.routes';
import { tripRoutes } from '../modules/Trip/trip.routes';
import { userRoutes } from '../modules/User/user.routes';

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
  {
    path: '/travel-buddy',
    route: travelBuddyRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
