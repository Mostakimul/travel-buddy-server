import * as bcrypt from 'bcrypt';
import prisma from '../../../shared/prisma';
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

export const userService = {
  createUserService,
};
