import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';

@Schema()
export class News extends Document {
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: String;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  content: String;

  @Prop({
    required: true,
    ref: 'schools',
  }) // 학교 objectID
  @IsNotEmpty()
  schoolId: Types.ObjectId;
}

export const NewsSchema = SchemaFactory.createForClass(News);
