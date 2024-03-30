import * as bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import { jwtHelper } from '../../../helpers/jwtHelper';
import prisma from '../../../shared/prisma';
import { config } from '../../config';
import ApiError from '../../errors/ApiError';
import { TUser } from '../../interfaces/userInterface';

const createUserService = async (payload: TUser) => {
  const { name, email, password, ...profile } = payload;

  const hashedPassword: string = await bcrypt.hash(password, 12);

  const userData = {
    name,
    email,
    password: hashedPassword,
  };

  const { bio, age } = profile.profile;

  const result = await prisma.$transaction(async (transactionClient) => {
    const createdUserData = await transactionClient.user.create({
      data: userData,
    });
    await transactionClient.userProfile.create({
      data: {
        bio,
        age,
        userId: createdUserData?.id,
      },
    });

    return createdUserData;
  });

  return {
    id: result.id,
    name: result.name,
    email: result.email,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
  };
};

const loginService = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
  });

  const isPasswordCorrect: boolean = await bcrypt.compare(
    password,
    userData.password,
  );

  if (!isPasswordCorrect) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password is incorrect!');
  }

  const accessToken = jwtHelper.generateToken(
    {
      email: userData.email,
      name: userData.name,
    },
    config.jwt_secret_key as Secret,
    config.jwt_expire_in as string,
  );

  const refreshToken = jwtHelper.generateToken(
    {
      email: userData.email,
      name: userData.name,
    },
    config.jwt_refresh_secret_key as Secret,
    config.jwt_refresh_expire_in as string,
  );

  return {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    token: accessToken,
    refreshToken,
  };
};

const getUserProfile = async (userInfo: JwtPayload) => {
  const { email } = userInfo;

  const result = await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

export const userService = {
  createUserService,
  loginService,
  getUserProfile,
};
