import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';

@Schema()
export class Student extends Document {
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: String;

  @Prop({
    ref: 'schools',
  }) // 구독하는 학교
  subscriptions: Types.ObjectId[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
