import { Prisma, UserRole, UserStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken';
import { paginationHelper } from '../../../helpers/paginationHelper';
import prisma from '../../../shared/prisma';
import { IPaginationOptions } from '../../interfaces/pagination';
import { TUser } from '../../interfaces/userInterface';
import { userSearchableFields } from './user.constant';

const createUserService = async (payload: TUser) => {
  const { name, email, password, ...profile } = payload;

  const hashedPassword: string = await bcrypt.hash(password, 12);

  const userData = {
    name,
    email,
    password: hashedPassword,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    const createdUserData = await transactionClient.user.create({
      data: userData,
    });
    if (Object.keys(profile).length !== 0) {
      const { bio, age } = profile.profile;
      await transactionClient.userProfile.create({
        data: {
          bio,
          age,
          userId: createdUserData?.id,
        },
      });
    }

    return createdUserData;
  });

  return {
    id: result.id,
    name: result.name,
    email: result.email,
    role: result.role,
    status: result.status,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
  };
};

const createAdminService = async (payload: TUser) => {
  const { name, email, password, ...profile } = payload;

  const hashedPassword: string = await bcrypt.hash(password, 12);

  const userData = {
    name,
    email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    const createdUserData = await transactionClient.user.create({
      data: userData,
    });
    if (Object.keys(profile).length !== 0) {
      const { bio, age } = profile.profile;
      await transactionClient.userProfile.create({
        data: {
          bio: bio,
          age: age,
          userId: createdUserData?.id,
        },
      });
    }

    return createdUserData;
  });

  return {
    id: result.id,
    name: result.name,
    email: result.email,
    role: result.role,
    status: result.status,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
  };
};

const getUserProfile = async (userInfo: JwtPayload) => {
  const { email } = userInfo;

  const result = await prisma.user.findUniqueOrThrow({
    where: {
      email,
      status: UserStatus.ACTIVE,
    },
    select: {
      id: true,
      name: true,
      role: true,
      status: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};
const getSingleUser = async (id: string) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id,
      status: UserStatus.ACTIVE,
    },
    select: {
      id: true,
      name: true,
      role: true,
      status: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const getBlockedUserService = async (
  params: any,
  options: IPaginationOptions,
) => {
  const { searchTerm, ...filterData } = params;

  const { page, limit, sortBy, sortOrder, skip } =
    paginationHelper.calculatePagination(options);

  const andConditions: Prisma.UserWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  andConditions.push({
    status: UserStatus.BLOCKED,
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

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? { [sortBy]: sortOrder }
        : {
            createdAt: 'desc',
          },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const total = await prisma.user.count({
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
const getAllUserService = async (params: any, options: IPaginationOptions) => {
  const { searchTerm, ...filterData } = params;

  const { page, limit, sortBy, sortOrder, skip } =
    paginationHelper.calculatePagination(options);

  const andConditions: Prisma.UserWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  andConditions.push({
    status: UserStatus.ACTIVE,
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

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? { [sortBy]: sortOrder }
        : {
            createdAt: 'desc',
          },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const total = await prisma.user.count({
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

const updateProfile = async (userInfo: JwtPayload, payload: any) => {
  const { name, ...profile } = payload;
  const { email } = userInfo;

  const userData = {
    name,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    const updatedUserData = await transactionClient.user.update({
      where: {
        email,
      },
      data: userData,
    });
    if (Object.keys(profile).length !== 0) {
      const { bio, age } = profile.profile;
      await transactionClient.userProfile.update({
        where: {
          userId: updatedUserData.id,
        },
        data: {
          bio,
          age,
        },
      });
    }

    return updatedUserData;
  });

  return {
    id: result.id,
    name: result.name,
    email: result.email,
    role: result.role,
    status: result.status,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
  };
};

const changeRoleServivce = async (payload: any) => {
  const { email, role } = payload;
  const existingUser = await prisma.user.findUniqueOrThrow({
    where: {
      email,
      status: UserStatus.ACTIVE,
    },
  });

  const updatedUser = await prisma.user.update({
    where: {
      email: existingUser.email,
    },
    data: {
      role,
    },
  });

  return updatedUser;
};

const blockUserServivce = async (payload: any) => {
  const { email } = payload;
  const existingUser = await prisma.user.findUniqueOrThrow({
    where: {
      email,
      status: UserStatus.ACTIVE,
    },
  });

  const updatedUser = await prisma.user.update({
    where: {
      email: existingUser.email,
    },
    data: {
      status: UserStatus.BLOCKED,
    },
  });

  return updatedUser;
};

const unblockUserServivce = async (payload: any) => {
  const { email } = payload;
  const existingUser = await prisma.user.findUniqueOrThrow({
    where: {
      email,
      status: UserStatus.BLOCKED,
    },
  });

  const updatedUser = await prisma.user.update({
    where: {
      email: existingUser.email,
    },
    data: {
      status: UserStatus.ACTIVE,
    },
  });

  return updatedUser;
};

export const userService = {
  createUserService,
  createAdminService,
  getUserProfile,
  updateProfile,
  getAllUserService,
  changeRoleServivce,
  blockUserServivce,
  unblockUserServivce,
  getBlockedUserService,
  getSingleUser,
};
