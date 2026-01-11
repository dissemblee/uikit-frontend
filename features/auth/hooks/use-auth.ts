import { useCallback } from 'react';
import type { LoginDto, RegisterDto } from '@entities/auth';
import { fetchLogin, fetchLogout, fetchRegistration } from '@entities/auth/auth.slice';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loading, error } = useAppSelector(
    (state) => state.auth
  );

  const register = useCallback(async (data: RegisterDto) => {
    try {
      const result = await dispatch(fetchRegistration(data)).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  }, [dispatch]);

  const login = useCallback(async (data: LoginDto) => {
    try {
      const result = await dispatch(fetchLogin(data)).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  }, [dispatch]);

  const signOut = useCallback(() => {
    dispatch(fetchLogout());
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    
    register,
    login,
    logout: signOut,
  };
};
