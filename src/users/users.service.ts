import { Injectable } from '@nestjs/common';
import { NoticesRepository } from '../notices/notices.repository';
import { Owners } from '../owners/owners.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { Users } from './users.schema';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly noticesRepository: NoticesRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    return await this.usersRepository.create(createUserDto);
  }

  async getSubscribingSchools(userId: string) {
    const schools = await this.usersRepository.findAllSubscribingSchools(
      userId,
    );
    const result = {
      count: schools.length,
      data: schools,
    };
    return result;
  }

  async getAllNoticesFeed(userId: string) {
    const user = await this.usersRepository.findById(userId, null);
    const feedIds = user.newsFeed;
    const feeds = await Promise.all(
      feedIds.map((id) => {
        return this.noticesRepository.findById(id);
      }),
    );
    return feeds.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) return -1;
      else if (a.updatedAt < b.updatedAt) return 1;
      return 0;
    });
  }
}
