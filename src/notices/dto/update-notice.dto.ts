import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Users } from '../../users/users.schema';
import { CreateNoticeDto } from './create-notice.dto';

export class UpdateNoticeDto extends PartialType(CreateNoticeDto) {
  writer?: Users;
}
