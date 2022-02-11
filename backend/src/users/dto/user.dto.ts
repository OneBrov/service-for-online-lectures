export interface UserDto {
  username: string;
  password: string;
  fullName: string;
}

export interface TokenUserDto {
  userId: string;
  username: string;
  password: string;
}
