import { Module } from '@nestjs/common';
import { RoomsModule } from 'src/rooms/rooms.module';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
  imports: [RoomsModule],
  controllers: [],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
