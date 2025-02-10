import { Model, Types } from 'mongoose';

export type TUserName = {
  firstName: string;

  lastName: string;
};
export type TLocalUser = {
  id: string;
  user: Types.ObjectId;
  name: TUserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: Date;
  email: string;
  contactNo: string;
  profileImg?: string;
  isDeleted: boolean;
};

export interface LocalUserModel extends Model<TLocalUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TLocalUser | null>;
}
