import { AxiosResponse } from 'axios'
import $api from '../api-client'

export interface SuccessAuthResponse {
    access_token: string;
}

export default class AuthService {
  static async login(username: string, password: string): Promise<AxiosResponse<SuccessAuthResponse>> {
    return await $api.post<SuccessAuthResponse>('/users/login', {username, password})
  }

  static async registration(username: string, fullName: string, password: string): Promise<AxiosResponse<SuccessAuthResponse>> {
    return await $api.post<SuccessAuthResponse>('/users/registration', {username, fullName, password})
  }

  static async refresh(): Promise<AxiosResponse<SuccessAuthResponse>> {
    return await $api.get<SuccessAuthResponse>('/users/refreshToken')
  }
}