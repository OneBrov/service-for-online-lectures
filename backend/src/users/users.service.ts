import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TokenUserDto, UserDto } from './dto/user.dto';
import { Users, UsersDocument } from './schema/users.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
    private jwtService: JwtService,
  ) {}

  async registration(dto: UserDto) {
    const candidate = await this.usersModel.findOne({ username: dto.username });
    if (candidate) {
      throw new ConflictException('User already exists');
    }
    const hashPassword = await bcrypt.hash(dto.password, 3);
    const user = await this.usersModel.create({
      username: dto.username,
      password: hashPassword,
      fullName: dto.fullName,
    });
    const userPayload = {
      userId: user.id,
      username: dto.username,
      password: hashPassword,
    };
    const token = this.jwtService.sign(userPayload);
    console.log('signed');
    return token;
  }

  async login(dto: UserDto) {
    const user = await this.usersModel.findOne({ username: dto.username });
    if (!user) {
      throw new BadRequestException(
        'Пользователь с введенным логином не найден.',
      );
    }
    const isValidPassword = await bcrypt.compare(
      dto.password,
      String(user.password),
    );
    if (!isValidPassword) {
      throw new BadRequestException('Неверный пароль.');
    }

    const userPayload = {
      userId: user.id,
      username: dto.username,
      password: user.password,
    };
    const token = this.jwtService.sign(userPayload);
    return token;
  }

  async generateTokenFromUser(tokenUser: TokenUserDto) {
    const userPayload = {
      userId: tokenUser.userId,
      username: tokenUser.username,
      password: tokenUser.password,
    };
    return this.jwtService.sign(userPayload);
  }

  async getUserByToken(token: string) {
    const user = this.jwtService.decode(token) as any;
    return await this.usersModel.findById(user.userId);
  }
}
