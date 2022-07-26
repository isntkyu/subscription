import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Users } from './users.schema';

@Controller('api/users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '회원가입 (Users 객체 리턴)' })
  @ApiBody({ type: CreateUserDto })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({
    summary: '구독목록 조회 (구독중인 페이지 count와 Owners 객체 배열 리턴',
  })
  @Get(':userId/subscribing')
  async getSubscriptions(
    @Param('userId') userId: string,
    @Query('owner_type') ownerType: string,
  ) {
    switch (ownerType) {
      case 'school':
        return this.usersService.getSubscribingSchools(userId);
      default:
        break;
    }
  }

  @ApiOperation({ summary: '뉴스피드 조회 (Notices 객체 배열 리턴' })
  @Get(':userId/newsfeed')
  async getAllNoticesFeed(@Param('userId') userId: string) {
    return this.usersService.getAllNoticesFeed(userId);
  }
}
