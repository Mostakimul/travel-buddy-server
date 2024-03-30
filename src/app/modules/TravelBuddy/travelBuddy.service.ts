import { JwtPayload } from 'jsonwebtoken';
import prisma from '../../../shared/prisma';

const getTravelBuddyByTripId = async (tripId: string, payload: JwtPayload) => {
  await prisma.trip.findUniqueOrThrow({
    where: {
      id: tripId,
    },
  });

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload?.email,
    },
  });

  const result = await prisma.buddyRequest.findMany({
    where: {
      AND: {
        tripId,
        userId: userData.id,
      },
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          id: true,
        },
      },
    },
  });

  return result;
};

const updateTravelBuddy = async (buddyId: string, reqBody: any) => {
  await prisma.buddyRequest.findUniqueOrThrow({
    where: {
      id: buddyId,
    },
  });

  const result = await prisma.buddyRequest.update({
    where: {
      id: buddyId,
    },
    data: reqBody,
  });

  return result;
};

export const travelBuddyService = {
  getTravelBuddyByTripId,
  updateTravelBuddy,
};
