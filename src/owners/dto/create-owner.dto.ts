import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { OwnerType } from '../../common/type/owner-type.enum';

export class CreateOwnerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  city?: string;

  @IsNotEmpty()
  @ApiProperty()
  type: OwnerType;
}
