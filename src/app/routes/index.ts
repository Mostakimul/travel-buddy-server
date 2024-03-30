import express from 'express';
import { userController } from '../modules/User/user.controller';

const router = express.Router();

router.post('/register', userController.createUser);

export default router;
