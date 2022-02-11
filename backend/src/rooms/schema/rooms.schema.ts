import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/chat/chat.dto';
import * as mongoose from 'mongoose';

export type RoomsDocument = Rooms & Document;

@Schema({ timestamps: true })
export class Rooms {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  admin: User;

  @Prop()
  adminName: string;

  @Prop({ default: 0 })
  userCount: number;
}

export const RoomsSchema = SchemaFactory.createForClass(Rooms);
