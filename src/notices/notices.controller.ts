import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { NoticesService } from './notices.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('notices')
@Controller('api/notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @ApiOperation({ summary: '소식 작성 (Notices 객체 리턴)' })
  @ApiBody({ type: CreateNoticeDto })
  @Post()
  async create(
    @Query('owner_id') ownerId: string,
    @Query('user_id') userId: string,
    @Body() createNoticeDto: CreateNoticeDto,
  ) {
    return this.noticesService.create(ownerId, userId, createNoticeDto);
  }

  @ApiOperation({ summary: '소식 수정 (Notices 객체 리턴)' })
  @ApiBody({ type: UpdateNoticeDto })
  @Put(':id')
  async update(
    @Param('id') noticeId: string,
    @Body() updateNoticeDto: UpdateNoticeDto,
  ) {
    return this.noticesService.update(noticeId, updateNoticeDto);
  }

  @ApiOperation({ summary: '소식 삭제 (success: Boolean 리턴)' })
  @Delete(':id')
  async remove(
    @Param('id') noticeId: string,
    @Query('owner_id') ownerId: string,
  ) {
    return this.noticesService.remove(noticeId, ownerId);
  }
}
