import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OwnerType } from '../common/type/owner-type.enum';
import { convertStringToObjectId } from '../common/utils/convertStringToObjectId';
import { Owners } from '../owners/owners.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './users.schema';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<Users>,
  ) {}

  async create(user: CreateUserDto): Promise<Users> {
    const result = await this.usersModel.create(user);
    return result;
  }

  async findById(id: string, session): Promise<Users> {
    const userObjectId = convertStringToObjectId(id);
    const result = await this.usersModel.findById(userObjectId, null, {
      session,
    });
    return result;
  }

  async findByIdAndSubscribe(
    id: string,
    owner: Owners,
    session,
  ): Promise<Users> {
    const user = await this.findById(id, session);
    user.subscribingOwner.push(owner);
    const result = await user.save();
    return result;
  }

  async findByIdAndUnsubscribe(
    ownerId: string,
    id: string,
    session,
  ): Promise<Users> {
    const user = await this.findById(id, session);
    const ownerObjectId = convertStringToObjectId(ownerId);

    for (let i = 0; i < user.subscribingOwner.length; i++) {
      if (user.subscribingOwner[i]._id.equals(ownerObjectId)) {
        user.subscribingOwner.splice(i, 1);
        break;
      }
    }
    const result = await user.save();
    return result;
  }

  async findAllSubscribingSchools(id: string): Promise<Owners[]> {
    const user = await this.usersModel.findById(id);
    const subscripbingSchools = user.subscribingOwner.filter(
      (owner) => owner.type == OwnerType.school,
    );
    return subscripbingSchools;
  }

  async pushNotice(userId, noticeId: string, session) {
    const noticeObjectId = convertStringToObjectId(noticeId);
    const user = await this.usersModel.findById(userId, null, { session });
    user.newsFeed.push(noticeObjectId);
    await user.save();
  }
}
