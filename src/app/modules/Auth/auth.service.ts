import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../config';
import { TLoginUser } from './auth.interface';
import { User } from '../User/user.model';
import AppError from '../../errors/AppError';
import { createToken } from './auth.utils';
const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistByCustomEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }
  // checking  if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'this user is deleted');
  }

  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  }
  // checking if the password is ccorrect
  console.log(payload?.password);
  console.log(user?.password);
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'password do not matched');
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.access_secret as string,
    config.access_expires as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.refresh_secret as string,
    config.refresh_expires as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

export const AuthServices = {
  loginUser,
};
