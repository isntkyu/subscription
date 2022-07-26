import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { OwnersModule } from '../owners/owners.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [OwnersModule, UsersModule],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
})
export class SubscriptionsModule {}
