import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { travelBuddyService } from './travelBuddy.service';

const getTravelBuddyById: RequestHandler = catchAsync(async (req, res) => {
  const { tripId } = req.params;

  const result = await travelBuddyService.getTravelBuddyByTripId(tripId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Potential travel buddies retrieved successfully!',
    data: result,
  });
});

const updateTravelBuddy: RequestHandler = catchAsync(async (req, res) => {
  const { buddyId } = req.params;

  const result = await travelBuddyService.updateTravelBuddy(
    buddyId,
    req.body,
    req.user,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Travel buddy request responded successfully!',
    data: result,
  });
});

export const travelBuddyController = {
  getTravelBuddyById,
  updateTravelBuddy,
};
