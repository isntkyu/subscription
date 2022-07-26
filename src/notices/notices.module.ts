import { Module } from '@nestjs/common';
import { NoticesService } from './notices.service';
import { NoticesController } from './notices.controller';
import { NoticesRepository } from './notices.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Notices, NoticesSchema } from './notices.schema';
import { UsersModule } from '../users/users.module';
import { OwnersModule } from '../owners/owners.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Notices.name,
        schema: NoticesSchema,
      },
    ]),
    UsersModule,
    OwnersModule,
  ],
  controllers: [NoticesController],
  providers: [NoticesService, NoticesRepository],
  exports: [NoticesRepository],
})
export class NoticesModule {}
