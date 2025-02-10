import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { localUserSearchableFields } from './LU.constant';
import { TLocalUser } from './LU.interface';
import { LocalUser } from './LU.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../User/user.model';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
const getAllLocalUsersFromDB = async (query: Record<string, unknown>) => {
  const localUserQuery = new QueryBuilder(
    LocalUser.find().populate('user'),
    query,
  )
    .search(localUserSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await localUserQuery.countTotal();
  console.log(meta);
  const result = await localUserQuery.modelQuery;
  return {
    meta,
    result,
  };
};

const getSingleUserFromDB = async (id: string) => {
  const result = await LocalUser.findById(id).populate('user');
  return result;
};
const updateLocalUserIntoDB = async (
  id: string,
  payload: Partial<TLocalUser>,
  file?: any, // Add file parameter
) => {
  const { name, ...remainingLocalUserData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingLocalUserData,
  };

  // Handle name fields
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  // Handle image upload
  if (file) {
    const imageName = `${id}${payload?.name?.firstName}`;
    const path = file?.path;

    //send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    modifiedUpdatedData.profileImg = secure_url as string;
  }

  // Update the document
  const result = await LocalUser.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Local user not found');
  }

  return result;
};

const deleteLocalUserFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deleteLocalUser = await LocalUser.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteLocalUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to delete Local user');
    }
    const userId = deleteLocalUser.user;
    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }
    await session.commitTransaction();
    await session.endSession();
    return deleteLocalUser;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('failed to delete Local User');
  }
};

export const LocalUserServices = {
  getAllLocalUsersFromDB,
  getSingleUserFromDB,
  updateLocalUserIntoDB,
  deleteLocalUserFromDB,
};
