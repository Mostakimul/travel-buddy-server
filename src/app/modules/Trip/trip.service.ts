import { Prisma } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import { paginationHelper } from '../../../helpers/paginationHelper';
import prisma from '../../../shared/prisma';
import { IPaginationOptions } from '../../interfaces/pagination';
import { tripSearchFields } from './trip.constant';

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

export const tripService = {
  createTripService,
  getAllTripsService,
};
