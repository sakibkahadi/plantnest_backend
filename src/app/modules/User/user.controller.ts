import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';

const createLocalUser = catchAsync(async (req, res) => {
  const { password, localUser: localUserData } = req.body;

  const result = await UserServices.createLocalUserIntoDB(
    req.file,
    password,
    localUserData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Local user created Successfully',
    data: result,
  });
});

export const UserControllers = {
  createLocalUser,
};
