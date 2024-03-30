import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { tripFilterableFields } from './trip.constant';
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

const getAllTrips: RequestHandler = catchAsync(async (req, res) => {
  const finalQuery = pick(req.query, tripFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await tripService.getAllTripsService(finalQuery, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trips retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const tripController = {
  createTrip,
  getAllTrips,
};
