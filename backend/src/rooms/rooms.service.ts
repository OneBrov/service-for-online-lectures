import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { Rooms, RoomsDocument } from './schema/rooms.schema';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Rooms.name) private roomsModel: Model<RoomsDocument>,
    private usersService: UsersService,
  ) {}

  async getRoom(roomId: string) {
    const room = await this.roomsModel.findById(roomId);
    return room;
  }

  async getPage(limit: number, page: number, keyword: string) {
    const offset = limit * page;
    const rooms = await this.roomsModel
      .find({
        $or: [
          { name: { $regex: '^' + keyword, $options: 'i' } },
          { adminName: { $regex: '^' + keyword, $options: 'i' } },
          { subject: { $regex: '^' + keyword, $options: 'i' } },
        ],
      })
      .skip(offset)
      .limit(limit);

    return rooms;
  }

  async createRoom(name: string, subject: string, userId: string) {
    const admin = await this.usersService.getUserById(userId);
    const roomWithSameName = await this.roomsModel.findOne({ name: name });
    if (roomWithSameName) {
      throw new BadRequestException('Комната с введенным именем уже существует!')
    }
    return await this.roomsModel.create({
      name: name,
      subject,
      admin: admin,
      adminName: admin.fullName,
    });
  }

  async incrementUserCount(roomId: string) {
    const room = await this.roomsModel.findById(roomId);
    room.userCount++;
    room.save();
    return room.userCount;
  }

  async decrementUserCount(roomId: string) {
    const room = await this.roomsModel.findById(roomId);
    room.userCount--;
    room.save();
    return room.userCount;
  }

  async deleteRoom(roomId: string) {
    return await this.roomsModel.findByIdAndRemove(roomId);
  }

  async deleteAllRooms() {
    return await this.roomsModel.deleteMany({});
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleRoomsClear() {
    const olderThanHalfHourDate = new Date();
    olderThanHalfHourDate.setMinutes(olderThanHalfHourDate.getMinutes() - 30);
    const afkRooms = await this.roomsModel.deleteMany({
      updatedAt: { $lt: olderThanHalfHourDate },
      userCount: 0,
    });
    console.log(afkRooms);
  }
}
