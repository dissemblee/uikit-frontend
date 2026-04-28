import { useCallback, useEffect } from "react";
import { useLoginMutation, useLogoutMutation, useRefreshMutation } from "@entities/auth";
import { useRegisterMutation } from "@entities/auth";
import { useGetUserByIdQuery } from "@entities/user";
import { useCookies } from "react-cookie";
import { tokenStore } from "@shared/tokenStore";

export const useAuth = () => {
  const [cookies] = useCookies(["isAuth"]);
  const isAuthCookie = !!cookies.isAuth;

  const [registerMutation, registerState] = useRegisterMutation();
  const [loginMutation, loginState] = useLoginMutation();
  const [logoutMutation, logoutState] = useLogoutMutation();
  const [refreshMutation, refreshState] = useRefreshMutation();

  useEffect(() => {
    if (isAuthCookie && !tokenStore.get()) {
      refreshMutation();
    }
  }, []);

  const hasToken = !!tokenStore.get();
  const isSessionAlive = hasToken || isAuthCookie;

  const { data: user, isLoading: isUserLoading } = useGetUserByIdQuery("me", {
    skip: !isSessionAlive || refreshState.isLoading,
  });

  const register = useCallback(
    async (data: Parameters<typeof registerMutation>[0]) => {
      return await registerMutation(data).unwrap();
    },
    [registerMutation]
  );

  const login = useCallback(
    async (data: Parameters<typeof loginMutation>[0]) => {
      return await loginMutation(data).unwrap();
    },
    [loginMutation]
  );

  const logout = useCallback(async () => {
    await logoutMutation().unwrap();
    tokenStore.clear();
  }, [logoutMutation]);

  return {
    user,
    isAuthenticated: !!user,
    loading: registerState.isLoading || loginState.isLoading || logoutState.isLoading || refreshState.isLoading || isUserLoading,
    error: registerState.error || loginState.error || logoutState.error,
    register,
    login,
    logout,
  };
};
