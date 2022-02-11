import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';

@Module({
  controllers: [SessionsController],
  imports: [ConfigModule.forRoot()],
  providers: [SessionsService],
})
export class SessionsModule {}
