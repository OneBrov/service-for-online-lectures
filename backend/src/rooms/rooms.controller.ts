import {
  Body,
  Controller,
  Get,
  Headers,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';
import { RoomDto } from './dto/room.dto';
import { RoomsService } from './rooms.service';

@Controller('/rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Get(':roomId')
  async getRoom(@Param('roomId') roomId: string) {
    const room = await this.roomsService.getRoom(roomId);
    if (!room) {
      throw new NotFoundException(
        `Комната с идентефикатором ${roomId} не найдена!`,
      );
    }
    return room;
  }

  @Get()
  async getManyRooms(
    @Query('limit') limit: number,
    @Query('page') page: number,
    @Query('keyword') keyword: string,
  ) {
    return await this.roomsService.getPage(
      Number(limit),
      Number(page),
      keyword,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createRoom(
    @Body() dto: RoomDto,
    @Headers('Authorization') auth: string,
  ) {
    const room = await this.roomsService.createRoom(
      dto.name,
      dto.subject,
      auth.split(' ')[1],
    );

    return room.id;
  }
}
