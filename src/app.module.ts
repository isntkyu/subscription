import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NoticesModule } from './notices/notices.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OwnersModule } from './owners/owners.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_PORT: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
      }),
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    NoticesModule,
    UsersModule,
    OwnersModule,
    SubscriptionsModule,
  ],
  providers: [ConfigService],
})
export class AppModule {}
