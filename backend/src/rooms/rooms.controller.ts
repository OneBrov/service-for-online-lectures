import {
  Body,
  Controller,
  Get,
  Headers,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TokenUserDto } from 'src/users/dto/user.dto';
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
  async createRoom(@Body() dto: RoomDto, @Req() req: any) {
    const user = req.user as TokenUserDto;
    const room = await this.roomsService.createRoom(
      dto.name,
      dto.subject,
      user.userId,
    );

    return room.id;
  }
}
