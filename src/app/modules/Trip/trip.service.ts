import {
  Prisma,
  RequestStatus,
  Trip,
  TripStatus,
  UserRole,
} from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { paginationHelper } from '../../../helpers/paginationHelper';
import prisma from '../../../shared/prisma';
import ApiError from '../../errors/ApiError';
import { IPaginationOptions } from '../../interfaces/pagination';
import { TTrip } from '../../interfaces/trip.type';
import { tripSearchFields } from './trip.constant';

const createTripService = async (payload: TTrip, user: JwtPayload) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  const result = await prisma.trip.create({
    data: {
      userId: userData.id,
      ...payload,
    },
    include: {
      user: true,
    },
  });

  return result;
};

const getAllTripsService = async (params: any, options: IPaginationOptions) => {
  const { searchTerm, ...filterData } = params;

  const { page, limit, sortBy, sortOrder, skip } =
    paginationHelper.calculatePagination(options);

  const andConditions: Prisma.TripWhereInput[] = [];

  // coverting budget into int
  if ('budget' in filterData) {
    filterData.budget = parseInt(filterData.budget);
  }

  if (searchTerm) {
    andConditions.push({
      OR: tripSearchFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  andConditions.push({
    tripStatus: TripStatus.ACTIVE,
  });

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.TripWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.trip.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? { [sortBy]: sortOrder }
        : {
            createdAt: 'desc',
          },
    include: {
      user: true,
      buddyRequest: true,
    },
  });

  const total = await prisma.trip.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const travelBuddyRequestService = async (tripId: string, user: JwtPayload) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const result = await prisma.buddyRequest.create({
    data: {
      userId: userData.id,
      tripId,
      status: RequestStatus.PENDING,
    },
    include: {
      trip: {
        include: {
          user: true,
        },
      },
      user: true,
    },
  });

  return result;
};

const updateTripService = async (
  tripId: string,
  payload: Partial<Trip>,
  user: JwtPayload,
) => {
  const tripData = await prisma.trip.findUniqueOrThrow({
    where: {
      id: tripId,
    },
    include: {
      user: true,
    },
  });

  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: user.email,
    },
  });

  if (tripData.userId !== userData.id && user.role === UserRole.USER) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You are not authorized to update!',
    );
  }

  const result = await prisma.trip.update({
    where: {
      id: tripId,
    },
    data: {
      ...payload,
    },
    include: {
      user: true,
      buddyRequest: true,
    },
  });

  return result;
};

const getSingleTripService = async (tripId: string) => {
  const result = await prisma.trip.findUniqueOrThrow({
    where: {
      id: tripId,
      tripStatus: TripStatus.ACTIVE,
    },
    include: {
      user: true,
      buddyRequest: true,
    },
  });

  return result;
};

export const tripService = {
  createTripService,
  getAllTripsService,
  travelBuddyRequestService,
  updateTripService,
  getSingleTripService,
};
