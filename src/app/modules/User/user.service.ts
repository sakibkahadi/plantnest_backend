import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { TLocalUser } from '../LocalUser/LU.interface';
import { TUser } from './user.interface';
import config from '../../config';
import { generateUserId } from './user.utils';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import { LocalUser } from '../LocalUser/LU.model';

const createLocalUserIntoDB = async (
  file: any,
  password: string,
  payload: TLocalUser,
) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_pass as string);
  userData.role = 'user';
  userData.email = payload.email;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateUserId();
    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = file?.path;

      //send image to cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImg = secure_url as string;
    }
    const newUser = await User.create([userData], { session }); //array

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to create user');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    const newLocalUser = await LocalUser.create([payload], { session });
    if (!newLocalUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Local User');
    }
    await session.commitTransaction();
    await session.endSession();
    return newLocalUser;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const UserServices = {
  createLocalUserIntoDB,
};
