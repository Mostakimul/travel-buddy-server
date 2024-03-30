import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { tripService } from './trip.service';

const createTrip: RequestHandler = catchAsync(async (req, res) => {
  const result = await tripService.createTripService(req.body, req.user);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Trip created successfully',
    data: result,
  });
});

export const tripController = {
  createTrip,
};
