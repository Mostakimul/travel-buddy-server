import { TripStatus } from '@prisma/client';
import { z } from 'zod';

const createTripSchema = z.object({
  body: z.object({
    destination: z.string({
      required_error: 'Destination is required',
    }),
    startDate: z.string({
      required_error: 'Start date is required',
    }),
    endDate: z.string({
      required_error: 'End date is required',
    }),
    budget: z.number().positive('Budget must be a positive number'),
    activities: z.array(z.string()).min(1, 'At least one activity is required'),
    description: z.string().min(1, 'Description is required'),
  }),
});

const updateTripSchema = z.object({
  body: z.object({
    destination: z
      .string({
        required_error: 'Destination is required',
      })
      .optional(),
    startDate: z
      .string({
        required_error: 'Start date is required',
      })
      .optional(),
    endDate: z
      .string({
        required_error: 'End date is required',
      })
      .optional(),
    tripStaus: z.enum([TripStatus.ACTIVE, TripStatus.DEACTIVE]).optional(),
    budget: z.number().positive('Budget must be a positive number').optional(),
    activities: z
      .array(z.string())
      .min(1, 'At least one activity is required')
      .optional(),
    description: z.string().min(1, 'Description is required').optional(),
  }),
});

export const tripValidation = {
  createTripSchema,
  updateTripSchema,
};
