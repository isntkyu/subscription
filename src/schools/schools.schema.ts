import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';
import { News } from 'src/news/news.schema';

@Schema()
export class School extends Document {
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  region: String;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: String;

  @Prop({
    ref: 'schools',
  })
  subscriber: Types.ObjectId[];

  @Prop()
  news: News[];
}

export const SchoolSchema = SchemaFactory.createForClass(School);
