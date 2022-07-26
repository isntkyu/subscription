import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OwnerType } from '../common/type/owner-type.enum';
import { convertStringToObjectId } from '../common/utils/convertStringToObjectId';
import { Notice } from '../interface/INotice';
import { Notices } from '../notices/notices.schema';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { Owners } from './owners.schema';

@Injectable()
export class OwnersRepository {
  constructor(
    @InjectModel(Owners.name) private readonly ownersModel: Model<Owners>,
  ) {}

  async existsByNameAndType(name: string, type: OwnerType): Promise<Boolean> {
    const result = await this.ownersModel.exists({ name, type });
    return result !== null ? true : false;
  }

  async create(owner: CreateOwnerDto): Promise<Owners> {
    const result = await this.ownersModel.create(owner);
    return result;
  }

  async findById(id: string, session): Promise<Owners> {
    const ownerObjectId = convertStringToObjectId(id);
    const result = await this.ownersModel.findById(ownerObjectId, null, {
      session,
    });
    return result;
  }

  async pushNotice(notice: Notices, session) {
    const ownerObjectId = notice.owner._id;
    const owner = await this.ownersModel.findById(ownerObjectId, null, {
      session,
    });
    owner.notices.push(notice);

    const result = await owner.save();
    return result;
  }

  async editNotice(notice: Notices, session) {
    const ownerObjectId = notice.owner._id;
    const owner = await this.ownersModel.findById(ownerObjectId, null, {
      session,
    });

    for (let i = 0; i < owner.notices.length; i++) {
      if (owner.notices[i]._id.equals(notice._id)) {
        owner.notices[i] = notice;
        break;
      }
    }

    const result = await owner.save();
    return result;
  }

  async removeNotice(noticeId: string, ownerId: string, session) {
    const ownerObjectId = convertStringToObjectId(ownerId);
    const noticeObjectId = convertStringToObjectId(noticeId);

    const owner = await this.ownersModel.findById(ownerObjectId, null, {
      session,
    });

    for (let i = 0; i < owner.notices.length; i++) {
      if (owner.notices[i]._id.equals(noticeObjectId)) {
        owner.notices.splice(i, 1);
        break;
      }
    }

    const result = await owner.save();
    return result;
  }

  async findNoticesById(id: string): Promise<Notices[]> {
    const ownerObjectId = convertStringToObjectId(id);
    const owner = await this.ownersModel.findById(ownerObjectId);
    return owner.notices.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) return -1;
      else if (a.updatedAt < b.updatedAt) return 1;
      return 0;
    });
  }

  async findByIdAndRegisterSubs(id: string, userId: string, session) {
    const ownerObjectId = convertStringToObjectId(id);
    const owner = await this.ownersModel.findById(ownerObjectId, null, {
      session,
    });
    const userObjectId = convertStringToObjectId(userId);
    owner.subscribers.push(userObjectId);
    await owner.save();
  }

  async findByIdAndRemoveSubs(id: string, userId: string, session) {
    const ownerObjectId = convertStringToObjectId(id);
    const owner = await this.ownersModel.findById(ownerObjectId, null, {
      session,
    });
    const userObjectId = convertStringToObjectId(userId);

    for (let i = 0; i < owner.subscribers.length; i++) {
      if (owner.subscribers[i].equals(userObjectId)) {
        owner.subscribers.splice(i, 1);
        break;
      }
    }
    await owner.save();
  }
}
