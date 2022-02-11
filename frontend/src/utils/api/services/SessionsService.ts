import { AxiosResponse } from 'axios'
import $api from '../api-client'


export default class SessionsService {
  static async getToken(sessionId: string): Promise<AxiosResponse<string>> {
    return await $api.get<string>('/sessions/' + sessionId)
  }

}