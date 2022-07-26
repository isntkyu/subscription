import mongoose from 'mongoose';

export const convertStringToObjectId = (id: string) => {
  return new mongoose.Types.ObjectId(id);
};
