import express from 'express';
import auth from '../middlewares/auth';
import { tripController } from '../modules/Trip/trip.controller';
import { userController } from '../modules/User/user.controller';

const router = express.Router();

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/trips', auth(), tripController.createTrip);

export default router;
