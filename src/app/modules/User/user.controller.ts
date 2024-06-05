import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { userFilterableFields } from './user.constant';
import { userService } from './user.service';

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await userService.createUserService(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully!',
    data: result,
  });
});

const createAdmin: RequestHandler = catchAsync(async (req, res) => {
  const result = await userService.createAdminService(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Admin created successfully!',
    data: result,
  });
});

const getProfile: RequestHandler = catchAsync(async (req, res) => {
  const result = await userService.getUserProfile(req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

const getSingleUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await userService.getSingleUser(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});

const updateProfile: RequestHandler = catchAsync(async (req, res) => {
  const result = await userService.updateProfile(req.user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile updated successfully',
    data: result,
  });
});

//** get all user controller */
const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
  const finalQuery = pick(req.query, userFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await userService.getAllUserService(finalQuery, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrived successfully!',
    meta: result.meta,
    data: result.data,
  });
});

//** get blocked user controller */
const getBlockUsers: RequestHandler = catchAsync(async (req, res) => {
  const finalQuery = pick(req.query, userFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await userService.getBlockedUserService(finalQuery, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blocked users retrived successfully!',
    meta: result.meta,
    data: result.data,
  });
});

//** change role controller */
const changeRole: RequestHandler = catchAsync(async (req, res) => {
  const result = await userService.changeRoleServivce(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User role changed successfully!',
    data: result,
  });
});

//** block user controller */
const blockUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await userService.blockUserServivce(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User blocked successfully!',
    data: result,
  });
});

//** unblock user controller */
const unblockUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await userService.unblockUserServivce(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User unblocked successfully!',
    data: result,
  });
});

export const userController = {
  createUser,
  getProfile,
  updateProfile,
  createAdmin,
  getAllUsers,
  changeRole,
  blockUser,
  unblockUser,
  getBlockUsers,
  getSingleUser,
};
