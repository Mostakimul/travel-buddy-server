import { UserRole } from '@prisma/client';
import { z } from 'zod';

const profileSchema = z.object({
  bio: z.string(),
  age: z.number(),
});

const createUserSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    profile: profileSchema.optional(),
  }),
});

const updateUserSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

const changeRoleValidation = z.object({
  body: z.object({
    email: z.string().email(),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
  }),
});
export const userValidation = {
  createUserSchema,
  loginSchema,
  updateUserSchema,
  changeRoleValidation,
};
