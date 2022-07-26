import { forwardRef, Module } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersController } from './owners.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Owners, OwnersSchema } from './owners.schema';
import { OwnersRepository } from './owners.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Owners.name,
        schema: OwnersSchema,
      },
    ]),
    forwardRef(() => UsersModule),
  ],
  controllers: [OwnersController],
  providers: [OwnersService, OwnersRepository],
  exports: [OwnersRepository, OwnersService],
})
export class OwnersModule {}
