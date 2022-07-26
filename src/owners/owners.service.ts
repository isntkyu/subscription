import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { OwnersRepository } from './owners.repository';

@Injectable()
export class OwnersService {
  constructor(
    private readonly ownersRepository: OwnersRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(createOwnerDto: CreateOwnerDto) {
    const { name, type } = createOwnerDto;
    const isOwnerExist = await this.ownersRepository.existsByNameAndType(
      name,
      type,
    );

    if (isOwnerExist) {
      throw new UnauthorizedException('해당 오너는 이미 존재합니다.');
    }

    return await this.ownersRepository.create(createOwnerDto);
  }

  async getOwnerNotices(ownerId: string) {
    const notices = await this.ownersRepository.findNoticesById(ownerId);
    const result = {
      count: notices.length,
      data: notices,
    };
    return result;
  }

  async registerSubscriber(ownerId: string, userId: string, session) {
    await this.ownersRepository.findByIdAndRegisterSubs(
      ownerId,
      userId,
      session,
    );
  }

  async removeSubscripber(ownerId: string, userId: string, session) {
    await this.ownersRepository.findByIdAndRemoveSubs(ownerId, userId, session);
  }

  async notifySubscribers(
    ownerId: string,
    noticeId: string,
    session,
  ): Promise<void> {
    const owner = await this.ownersRepository.findById(ownerId, session);
    const subscribers = owner.subscribers;
    const promises = subscribers.map((userId) => {
      return this.usersRepository.pushNotice(userId, noticeId, session);
    });
    await Promise.all(promises);
  }
}
