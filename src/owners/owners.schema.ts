import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';
import { OwnerType } from '../common/type/owner-type.enum';
import { Notices } from '../notices/notices.schema';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Owners extends Document {
  @Prop({
    required: true,
    type: String,
    enum: OwnerType,
  })
  @IsString()
  @IsNotEmpty()
  type: OwnerType;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  city: string;

  @Prop({
    ref: 'notices',
  })
  notices: Notices[];

  @Prop({
    ref: 'users',
  })
  subscribers: Types.ObjectId[];
}

export const OwnersSchema = SchemaFactory.createForClass(Owners);
