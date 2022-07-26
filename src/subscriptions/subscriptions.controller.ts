import { Controller, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('subscriptions')
@Controller('api/subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @ApiOperation({ summary: '구독 (Users 객체 리턴)' })
  @ApiBody({ type: CreateSubscriptionDto })
  @Post()
  subscribe(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionsService.subscribe(createSubscriptionDto);
  }

  @ApiOperation({ summary: '구독해지 (Users 객체 리턴)' })
  @Delete(':ownerId')
  unsubscribe(
    @Param('ownerId') ownerId: string,
    @Query('user_id') userId: string,
  ) {
    return this.subscriptionsService.unsubscribe(ownerId, userId);
  }
}
