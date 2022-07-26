import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { convertStringToObjectId } from '../common/utils/convertStringToObjectId';
import { Notice } from './INotice';
import { Notices } from './notices.schema';

@Injectable()
export class NoticesRepository {
  constructor(
    @InjectModel(Notices.name) private readonly noticesModel: Model<Notices>,
  ) {}

  async create(notice: Notice, session): Promise<Notices> {
    // session 사용하려면 notice 아닌 [notice]로 삽입.
    const result = await this.noticesModel.create([notice], { session });
    return result[0];
  }

  async findById(id: Types.ObjectId): Promise<Notices> {
    const notice = await this.noticesModel.findById(id);
    return notice;
  }

  async findByIdAndUpdate(
    id: string,
    notice: Notice,
    session,
  ): Promise<Notices> {
    const noticeObjectId = convertStringToObjectId(id);
    const updatedNotice = await this.noticesModel.findById(
      noticeObjectId,
      null,
      { session },
    );
    if (notice.message) updatedNotice.message = notice.message;
    if (notice.messageText) updatedNotice.messageText = notice.messageText;
    await updatedNotice.save();
    return updatedNotice;
  }

  async findByIdAndRemove(id: string, session): Promise<Notices> {
    const noticeObjectId = convertStringToObjectId(id);
    const result = await this.noticesModel.findByIdAndRemove(noticeObjectId, {
      session,
    });
    return result;
  }
}
