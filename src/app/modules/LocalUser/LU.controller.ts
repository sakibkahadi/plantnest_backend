import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { LocalUserServices } from './LU.service';
import httpStatus from 'http-status';
const getSingleLocalUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await LocalUserServices.getSingleUserFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Local User Retrieve Successfully',
    data: result,
  });
});
const getAllLocalUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await LocalUserServices.getAllLocalUsersFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Local User are Retrieve Successfully',
    meta: result?.meta,
    data: result?.result,
  });
});
const updateLocalUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { localUser } = req.body;
  const result = await LocalUserServices.updateLocalUserIntoDB(
    id,
    localUser,
    req.file,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Local User is updated Successfully',
    data: result,
  });
});
const deleteLocalUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await LocalUserServices.deleteLocalUserFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Local User is deleted Successfully',
    data: result,
  });
});

export const LocalUserControllers = {
  getAllLocalUser,
  getSingleLocalUser,
  updateLocalUser,
  deleteLocalUser,
};
