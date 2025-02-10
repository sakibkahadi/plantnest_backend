import { User } from './user.model';

export const findLastUserId = async () => {
  const lastUser = await User.findOne(
    {
      role: 'user',
    },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastUser?.id ? lastUser.id : undefined;
};

export const generateUserId = async () => {
  let currentID = (0).toString();
  const lastUserId = await findLastUserId();
  if (lastUserId) {
    currentID = lastUserId.substring(2);
  }
  let incrementId = (Number(currentID) + 1).toString().padStart(4, '0');
  incrementId = `U-${incrementId}`;
  return incrementId;
};

export const findLastAdminId = async () => {
  const lastAdmin = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
  let currentID = (0).toString();
  const lastAdminId = await findLastAdminId();
  if (lastAdminId) {
    currentID = lastAdminId.substring(2);
  }
  let incrementId = (Number(currentID) + 1).toString().padStart(4, '0');
  incrementId = `A-${incrementId}`;
  return incrementId;
};
