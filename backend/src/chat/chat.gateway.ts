import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsResponse } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Message, User } from './chat.dto';
import { RoomsService } from 'src/rooms/rooms.service';

@WebSocketGateway({ cors: true })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly roomsService: RoomsService,
  ) {}

  private logger: Logger = new Logger('AppGateway');

  users: User[] = [];

  @SubscribeMessage('joinRoom')
  async handleRoomEnter(
    socket: Socket,
    data: { roomId: string; RTCId: string },
  ): Promise<void> {
    socket.join(data.roomId);
    this.roomsService.incrementUserCount(data.roomId);

    this.logger.log(`New user in ${data.roomId} with rtc id:  ${data.RTCId}`);
    this.logger.log(`${socket.id} joined to room ${data.roomId}`);

    const username = await this.chatService.getUsernameFromSocket(socket);

    const usersInRoom = this.users.filter(
      (user) => user.roomId === data.roomId,
    );
    socket.emit('sendUserList', {
      users: usersInRoom,
    });

    const newUser = {
      username: username,
      socketId: socket.id,
      roomId: data.roomId,
      RTCId: data.RTCId,
    };

    this.users.push(newUser);

    socket.to(data.roomId).emit('enterTheRoom', {
      ...newUser,
    });
  }

  @SubscribeMessage('msgToServer')
  async handleMessage(socket: Socket, msg: string): Promise<void> {
    const username = await this.chatService.getUsernameFromSocket(socket);
    const { roomId } = this.users.find((user) => user.socketId === socket.id);
    this.logger.log(`Message sended in room ${roomId} with message ${msg}`);
    this.server.to(roomId).emit('message', {
      name: username,
      text: msg,
    });
  }

  afterInit(server: Server) {
    this.logger.log(`Init on port ${server.path}`);
  }

  async handleConnection(socket: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${socket.id}`);
    const username = await this.chatService.getUsernameFromSocket(socket);
    this.logger.log(`userList: ${this.users.map((user) => user.username)}`);
  }

  async handleDisconnect(socket: Socket) {
    this.logger.log(`Client disconnected: ${socket.id}`);
    const user = await this.chatService.getUserBySocket(socket, this.users);
    if (user) {
      this.roomsService.decrementUserCount(user.roomId);
      socket.to(user.roomId).emit('leftTheRoom', {
        ...user,
      });
    }
    this.users = this.users.filter((user) => user.socketId !== socket.id);
    socket.disconnect(true);
  }
}
