import mongoose, { Schema } from 'mongoose';
import { LocalUserModel, TLocalUser } from './LU.interface';

const UserNameSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxLength: [20, 'Name can not be more than 20 characters'],
  },

  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxLength: [20, 'Name can not be more than 20 characters'],
  },
});

const LocalUserSchema = new Schema(
  {
    id: { type: String, required: [true, 'Id is required'], unique: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User id is required'],
    },
    name: { type: UserNameSchema, required: [true, 'Name is required'] },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: `{VALUE} is not a valid gender`,
      },
      required: [true, 'gender is required'],
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    profileImg: { type: String, default: '' }, // Optional field
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//virtuals
LocalUserSchema.virtual('fullName').get(function () {
  return this?.name?.firstName + this?.name?.lastName;
});

LocalUserSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
LocalUserSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

LocalUserSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
LocalUserSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await LocalUser.findOne({ id });
  return existingUser;
};

// Create the model
export const LocalUser = mongoose.model<TLocalUser, LocalUserModel>(
  'LocalUser',
  LocalUserSchema,
);
