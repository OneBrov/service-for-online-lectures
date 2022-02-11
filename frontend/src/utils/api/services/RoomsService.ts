import { AxiosResponse } from 'axios'
import $api from '../api-client'

export interface SuccessAuthResponse {
    access_token: string;
}

export type Room = {
  _id: string
  name: string
  subject: string
  admin: string
  adminName: string
  userCount: number
}

export default class RoomsService {
  static async createRoom(
    name: string, subject: string
  ): Promise<AxiosResponse<string>> {
    return await $api.post<string>('/rooms', { name, subject })
  }

  static async getRooms(
    limit: number, page: number, keyword: string
  ): Promise<AxiosResponse<Room[]>> {
    const params = { limit, page, keyword}
    return await $api.get<Room[]>('/rooms', { params } )
  }

  static async getOneRoom(
    roomId: string
  ): Promise<AxiosResponse<Room>> {
    return await $api.get<Room>('/rooms/' + roomId)
  }
}