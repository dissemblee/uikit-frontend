import { $api } from '@shared/api'
import type { LoginDto, RegisterDto, RegisterResponseDto } from './auth.dto'

/**
 * Register a new user.
 * 
 * @param {RegisterDto} data - The user data to be registered.
 * @returns {Promise<RegisterResponseDto>} - A promise of the registered user.
 */
export const register = (data: RegisterDto) => {
  return $api<RegisterResponseDto, RegisterDto>({
    endPoint: "register",
    method: "POST",
    data,
  })
}

/**
 * Login to the application.
 * 
 * @param {LoginDto} data - The user data to login with.
 * @returns {Promise<void>} - A promise that resolves when the user is logged in.
 */
export const login = (data: LoginDto) => {
  return $api<void, LoginDto>({
    endPoint: "login",
    method: "POST",
    data,
  })
}

/**
 * Logs the user out of the application.
 * 
 * @returns {Promise<void>} - A promise that resolves when the user is logged out.
 */
export const logout = () => {
  return $api<void>({
    endPoint: "logout",
    method: "POST",
  })
}
