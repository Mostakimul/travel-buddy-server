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

const getAllDeactiveTrips: RequestHandler = catchAsync(async (req, res) => {
  const finalQuery = pick(req.query, tripFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await tripService.getAllDeactiveTripsService(
    finalQuery,
    options,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trips retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const travelBuddyRequest: RequestHandler = catchAsync(async (req, res) => {
  const { tripId } = req.params;

  const result = await tripService.travelBuddyRequestService(tripId, req.user);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Travel buddy request sent successfully',
    data: result,
  });
});

const updateTrip: RequestHandler = catchAsync(async (req, res) => {
  const { tripId } = req.params;

  const result = await tripService.updateTripService(
    tripId,
    req.body,
    req.user,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Trip updated successfully',
    data: result,
  });
});

const getSingleTrip: RequestHandler = catchAsync(async (req, res) => {
  const { tripId } = req.params;

  const result = await tripService.getSingleTripService(tripId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Trip retrived successfully',
    data: result,
  });
});

export const tripController = {
  createTrip,
  getAllTrips,
  travelBuddyRequest,
  updateTrip,
  getSingleTrip,
  getAllDeactiveTrips,
};
