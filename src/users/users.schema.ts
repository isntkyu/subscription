import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';
import { UserType } from '../common/type/user-type.enum';
import { Owners } from '../owners/owners.schema';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Users extends Document {
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({
    type: String,
    enum: UserType,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  type: UserType;

  @Prop({
    ref: 'owners',
  })
  subscribingOwner: Owners[];

  @Prop({
    ref: 'notices',
  })
  newsFeed: Types.ObjectId[];
}

export const UsersSchema = SchemaFactory.createForClass(Users);
