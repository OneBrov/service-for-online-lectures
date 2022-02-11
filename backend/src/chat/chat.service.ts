import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';
import { User } from './chat.dto';

@Injectable()
export class ChatService {
  // async getUserFromSocket(socket: Socket) {
  //   const cookie = socket.request;
  //   console.log(cookie);
  //   if (!cookie) {
  //     throw new WsException('Invalid credentials');
  //   }
  //   return cookie;
  // }

  async getUsernameFromSocket(socket: Socket): Promise<string> {
    const username = String(socket.handshake.query['username']);
    return username;
  }

  async getUserBySocket(socket: Socket, users: User[]): Promise<User> {
    const user = users.find((user) => user.socketId === socket.id);
    return user;
  }
}
