import type { UserDto } from "@entities/user/user.dto";
import type { CursorResultDto, EntityDto, ResultDto } from "@shared/types/api";

export enum UserBanReason {
  SPAMMING = 'Спам',
  OFFENSIVE_BEHAVIOR = 'Оскорбительное поведение',
  UNWANTED_CONTENT = 'Создание нежелательного контента',
  SUSPICIOUS_ACTIVITY = 'Подозрительная активность',
  OTHER = 'Другое'
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface SignInDto {
  username: string;
  password: string;
}

export interface SignUpDto {
  username: string;
  password: string;
  email?: string;
}

export interface SignUpResultDto extends ResultDto<UserDto> {}

export interface UserBanInfoDto {
  userId: string;
  isBanned: boolean;
  banReason?: UserBanReason;
  bannedBy?: string;
  bannedAt?: string;
  unbannedBy?: string;
  unbannedAt?: string;
}

export interface UserBanInfoResultDto extends ResultDto<UserBanInfoDto> {}

export interface UserPublicDto extends EntityDto {
  role: UserRole;
  isBanned: boolean;
  banReason?: UserBanReason;
  bannedBy?: string;
  bannedAt?: string;
  unbannedBy?: string;
  unbannedAt?: string;
}

export interface UserPublicCursorResultDto extends CursorResultDto<UserPublicDto> {}

export interface SignInResultDto {
  success: boolean;
  result: {
    token: string;
  };
}
