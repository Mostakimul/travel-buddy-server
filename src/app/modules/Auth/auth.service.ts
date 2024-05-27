import * as bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import { jwtHelper } from '../../../helpers/jwtHelper';
import prisma from '../../../shared/prisma';
import { config } from '../../config';
import ApiError from '../../errors/ApiError';

// * login service
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
      role: userData.role,
    },
    config.jwt_secret_key as Secret,
    config.jwt_expire_in as string,
  );

  const refreshToken = jwtHelper.generateToken(
    {
      email: userData.email,
      name: userData.name,
      role: userData.role,
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
    accessToken,
  };
};

// * refresh service
const refreshTokenService = async (token: string) => {
  const decodedData = jwtHelper.verifyToken(
    token,
    config.jwt_refresh_secret_key as Secret,
  );

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData?.email,
    },
  });

  const accessToken = jwtHelper.generateToken(
    {
      email: userData.email,
      name: userData.name,
      role: userData.role,
    },
    config.jwt_secret_key as Secret,
    config.jwt_expire_in as string,
  );

  return {
    accessToken,
  };
};

const changePassword = async (
  loginData: {
    oldPassword: string;
    newPassword: string;
  },
  user: JwtPayload,
) => {
  const { oldPassword, newPassword } = loginData;

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  if (!bcrypt.compare(oldPassword, userData?.password)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password is incorrect');
  }

  const hashedPassword: string = await bcrypt.hash(newPassword, 12);

  const result = await prisma.user.update({
    where: {
      email: user?.email,
    },
    data: {
      password: hashedPassword,
    },
  });

  return result;
};

export const authService = {
  loginService,
  refreshTokenService,
  changePassword,
};
