export type User = {
  username: string;
  socketId: string;
  roomId: string;
};

export class Message {
  name: string;
  text: string;
}
