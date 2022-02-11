export type SocketUser = {
  username: string;
  socketId: string;
  roomId: string;
  RTCId: string;
};


export interface UserType  {
    username: string;
    socketId: string;
    isAdmin: boolean;
    isSpeak: boolean;
    isSharing: boolean;
    isMicroOn: boolean;
    isCameraOn: boolean;
    isMe: boolean;
    RTCId: string 
}

export class User implements UserType  {
  
  username: string
  socketId: string
  RTCId      = ''
  isAdmin    = false
  isSpeak    = false
  isSharing  = false
  isCameraOn = false
  isMicroOn  = false
  isMe       = false
    
  constructor(username: string, socketId: string, RTCId?: string, isMe?: boolean) {
    this.username = username
    this.socketId = socketId
    RTCId && (this.RTCId = RTCId)
    isMe  && (this.isMe  = isMe)
  }
}

