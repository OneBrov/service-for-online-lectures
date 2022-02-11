import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsService } from './rooms.service';
import { Rooms, RoomsSchema } from './schema/rooms.schema';
import { RoomsController } from './rooms.controller';
import { UsersModule } from 'src/users/users.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  controllers: [RoomsController],
  imports: [
    MongooseModule.forFeature([{ name: Rooms.name, schema: RoomsSchema }]),
    UsersModule,
    ScheduleModule.forRoot(),
  ],
  providers: [RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}
