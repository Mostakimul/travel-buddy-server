import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { travelBuddyService } from './travelBuddy.service';

const getTravelBuddyById: RequestHandler = catchAsync(async (req, res) => {
  const { tripId } = req.params;

  const result = await travelBuddyService.getTravelBuddyByTripId(
    tripId,
    req.user,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Potential travel buddies retrieved successfully',
    data: result,
  });
});

export const travelBuddyController = {
  getTravelBuddyById,
};
