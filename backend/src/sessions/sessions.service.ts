import { Injectable } from '@nestjs/common';
import { OpenVidu, OpenViduRole } from 'openvidu-node-client';

@Injectable()
export class SessionsService {
  private OV = new OpenVidu(
    process.env.OPENVIDU_URL,
    process.env.OPENVIDU_SECRET,
  );

  async getToken(sessionName: string) {
    // The video-call to connect
    console.log(process.env.OPENVIDU_URL + process.env.OPENVIDU_SECRET);

    console.log('Getting a token | {sessionName}={' + sessionName + '}');
    // Добавить проверку на существование комнаты
    // New session
    console.log('New session ' + sessionName);

    // Create a new OpenVidu Session asynchronously
    try {
      const session = await this.OV.createSession({
        customSessionId: sessionName,
      });
      console.log('session');
      // Generate a new connection asynchronously with the recently created connectionProperties
      const connection = await session.createConnection({});
      console.log('connection');
      // Return the Token to the client
      return connection.token;
    } catch (e) {
      console.log(e);
    }
  }
}
