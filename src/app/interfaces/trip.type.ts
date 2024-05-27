import { TripStatus } from '@prisma/client';

export type TTrip = {
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  activities: string[];
  description: string;
  tripStatus: TripStatus;
};
