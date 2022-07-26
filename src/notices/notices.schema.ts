import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { Date, Document } from 'mongoose';
import { Owners } from '../owners/owners.schema';
import { Users } from '../users/users.schema';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Notices extends Document {
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  messageText: string;

  @Prop({
    required: true,
    ref: 'owners',
  })
  owner: Owners;

  @Prop({
    required: true,
    ref: 'users',
  })
  writer: Users;
  updatedAt: Date;
}

export const NoticesSchema = SchemaFactory.createForClass(Notices);
