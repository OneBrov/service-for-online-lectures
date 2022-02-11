import { Controller, Get, Param } from '@nestjs/common';
import { SessionsService } from './sessions.service';

@Controller('/sessions')
export class SessionsController {
  constructor(private sessionsService: SessionsService) {}

  @Get(':roomId')
  async getToken(@Param('roomId') roomId: string) {
    console.log('room id: ' + roomId);
    return await this.sessionsService.getToken(roomId);
  }
}
