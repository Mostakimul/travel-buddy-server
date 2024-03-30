import { JwtPayload } from 'jsonwebtoken';
import prisma from '../../../shared/prisma';

const createTripService = async (payload: TTrip, user: JwtPayload) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  const result = await prisma.trip.create({
    data: {
      userId: userData?.id,
      ...payload,
    },
  });

  return result;
};
export const tripService = {
  createTripService,
};
