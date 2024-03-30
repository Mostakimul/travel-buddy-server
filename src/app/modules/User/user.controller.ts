import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { config } from '../../config';
import { userService } from './user.service';

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await userService.createUserService(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await userService.loginService(req.body);

  const { refreshToken, ...rest } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.env === 'development' ? false : true,
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: rest,
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

const updateProfile: RequestHandler = catchAsync(async (req, res) => {
  const result = await userService.updateProfile(req.user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile updated successfully',
    data: result,
  });
});

export const userController = {
  createUser,
  loginUser,
  getProfile,
  updateProfile,
};
