import { BuddyRequest, UserRole } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import prisma from '../../../shared/prisma';
import ApiError from '../../errors/ApiError';

const getTravelBuddyByTripId = async (tripId: string) => {
  await prisma.trip.findUniqueOrThrow({
    where: {
      id: tripId,
    },
  });

  const result = await prisma.buddyRequest.findMany({
    where: {
      tripId,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          id: true,
        },
      },
      trip: {
        include: {
          user: true,
        },
      },
    },
  });

  return result;
};

const updateTravelBuddy = async (
  buddyId: string,
  reqBody: Partial<BuddyRequest>,
  user: JwtPayload,
) => {
  const buddyData = await prisma.buddyRequest.findUniqueOrThrow({
    where: {
      id: buddyId,
    },
    include: {
      trip: true,
    },
  });

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  if (buddyData.trip.userId !== userData.id && user.role === UserRole.USER) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Your are not the trip creator or admin!',
    );
  }

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
