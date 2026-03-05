import { useCallback } from "react";
import { useLoginMutation, useLogoutMutation } from "@entities/auth";
import { useRegisterMutation } from "@entities/auth";
import { useGetUserByIdQuery } from "@entities/user";

export const useAuth = () => {
  const [registerMutation, registerState] = useRegisterMutation();
  const [loginMutation, loginState] = useLoginMutation();
  const [logoutMutation, logoutState] = useLogoutMutation();

  const { data: user } = useGetUserByIdQuery("me", {
    skip: !loginState.isSuccess,
  });

  const register = useCallback(
    async (data: Parameters<typeof registerMutation>[0]) => {
      const result = await registerMutation(data).unwrap();
      return result;
    },
    [registerMutation]
  );

  const login = useCallback(
    async (data: Parameters<typeof loginMutation>[0]) => {
      const result = await loginMutation(data).unwrap();
      return result;
    },
    [loginMutation]
  );

  const logout = useCallback(async () => {
    await logoutMutation().unwrap();
  }, [logoutMutation]);

  return {
    user,
    isAuthenticated: !!user,
    loading: registerState.isLoading || loginState.isLoading || logoutState.isLoading,
    error: registerState.error || loginState.error || logoutState.error,

    register,
    login,
    logout,
  };
};
