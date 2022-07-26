import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { OwnersRepository } from '../owners/owners.repository';
import { OwnersService } from '../owners/owners.service';
import { UsersRepository } from '../users/users.repository';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectConnection() private readonly connection: mongoose.Connection,
    private readonly ownersRepository: OwnersRepository,
    private readonly ownersService: OwnersService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async subscribe(createSubscriptionDto: CreateSubscriptionDto) {
    const { userId, ownerId } = createSubscriptionDto;
    const session = await this.connection.startSession();
    session.startTransaction();
    let result;
    try {
      const owner = await this.ownersRepository.findById(ownerId, session);
      result = await this.usersRepository.findByIdAndSubscribe(
        userId,
        owner,
        session,
      );
      await this.ownersService.registerSubscriber(ownerId, userId, session);
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

  async unsubscribe(ownerId: string, userId: string) {
    const session = await this.connection.startSession();
    session.startTransaction();
    let result;
    try {
      result = await this.usersRepository.findByIdAndUnsubscribe(
        ownerId,
        userId,
        session,
      );
      await this.ownersService.removeSubscripber(ownerId, userId, session);
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
}
