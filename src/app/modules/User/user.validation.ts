import { z } from 'zod';

const profileSchema = z.object({
  bio: z.string(),
  age: z.number(),
});

const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  profile: profileSchema,
});

const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export const userValidation = {
  createUserSchema,
  loginSchema,
  updateUserSchema,
};
