import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { OwnersRepository } from '../owners/owners.repository';
import { OwnersService } from '../owners/owners.service';
import { UsersRepository } from '../users/users.repository';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { NoticesRepository } from './notices.repository';
import { Notices } from './notices.schema';

@Injectable()
export class NoticesService {
  constructor(
    private readonly noticesRepository: NoticesRepository,
    private readonly ownersRepository: OwnersRepository,
    private readonly usersRepository: UsersRepository,
    private readonly ownersService: OwnersService,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async create(
    ownerId: string,
    userId: string,
    createNoticeDto: CreateNoticeDto,
  ): Promise<Notices> {
    const session = await this.connection.startSession();
    session.startTransaction();
    let result;
    try {
      const owner = await this.ownersRepository.findById(ownerId, session);
      const writer = await this.usersRepository.findById(userId, session);
      const notice = {
        owner: owner,
        writer: writer,
        ...createNoticeDto,
      };
      result = await this.noticesRepository.create(notice, session);
      await this.ownersService.notifySubscribers(ownerId, result._id, session);
      await this.ownersRepository.pushNotice(result, session);
      await session.commitTransaction();
    } catch (e) {
      result = e;
      await session.abortTransaction();
      throw new Error(e);
    } finally {
      await session.endSession();
      return result;
    }
  }

  async update(
    noticeId: string,
    updateNoticeDto: UpdateNoticeDto,
  ): Promise<Notices> {
    const session = await this.connection.startSession();
    session.startTransaction();
    let result;
    try {
      result = await this.noticesRepository.findByIdAndUpdate(
        noticeId,
        updateNoticeDto,
        session,
      );
      await this.ownersRepository.editNotice(result, session);
      await session.commitTransaction();
    } catch (e) {
      result = e;
      await session.abortTransaction();
      throw new Error(e);
    } finally {
      await session.endSession();
      return result;
    }
  }

  async remove(noticeId: string, ownerId: string) {
    const session = await this.connection.startSession();
    session.startTransaction();
    let result = { success: true, message: '', data: [] };
    try {
      await this.noticesRepository.findByIdAndRemove(noticeId, session);
      await this.ownersRepository.removeNotice(noticeId, ownerId, session);
      await session.commitTransaction();
    } catch (e) {
      result.message = e;
      result.success = false;
      await session.abortTransaction();
      throw new Error(e);
    } finally {
      await session.endSession();
      return result;
    }
  }
}
