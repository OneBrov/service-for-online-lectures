import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './schema/users.schema';
import { UsersService } from './users.service';
import { UsersStrategy } from './users.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [UsersController],
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  exports: [UsersService],
  providers: [UsersService, UsersStrategy],
})
export class UsersModule {}
