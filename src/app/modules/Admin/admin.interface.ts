import { Model, Types } from 'mongoose';

export type TAdminName = {
  firstName: string;

  lastName: string;
};
export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  name: TAdminName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: Date;
  email: string;
  contactNo: string;
  profileImg?: string;
  isDeleted: boolean;
};

export interface AdminModel extends Model<TAdmin> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TAdmin | null>;
}
