import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('owners')
@Controller('api/owners')
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  @ApiOperation({ summary: '페이지 생성 (Owners 객체 리턴)' })
  @ApiBody({ type: CreateOwnerDto })
  @Post()
  async create(@Body() createOwnerDto: CreateOwnerDto) {
    return this.ownersService.create(createOwnerDto);
  }

  @ApiOperation({
    summary: '페이지(학교)의 소식 조회 (소식 count 와 Notices 배열 리턴)',
  })
  @Get(':ownerId/notices')
  async getOwnerNotices(@Param('ownerId') ownerId: string) {
    return this.ownersService.getOwnerNotices(ownerId);
  }
}
