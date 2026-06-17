import { useCallback, useEffect, useState } from "react";
import { useLoginMutation, useLogoutMutation, useRefreshMutation } from "@entities/auth";
import { useRegisterMutation } from "@entities/auth";
import { useCookies } from "react-cookie";
import { tokenStore } from "@shared/tokenStore";
import { useGetMeQuery } from "@entities/user";
import { useNavigate } from "react-router";

export const useAuth = () => {
  const [cookies] = useCookies(["isAuth"]);
  const isAuthCookie = !!cookies.isAuth;
  const navigate = useNavigate();

  const [registerMutation, registerState] = useRegisterMutation();
  const [loginMutation, loginState] = useLoginMutation();
  const [logoutMutation, logoutState] = useLogoutMutation();
  const [refreshMutation, refreshState] = useRefreshMutation();

  const [isRefreshing, setIsRefreshing] = useState(() => {
    return isAuthCookie && !tokenStore.get();
  });

  useEffect(() => {
    if (isAuthCookie && !tokenStore.get()) {
      refreshMutation()
        .unwrap()
        .catch(() => {})
        .finally(() => setIsRefreshing(false));
    }
  }, []);

  const hasToken = !!tokenStore.get();
  const isSessionAlive = hasToken || isAuthCookie;

  const { data: user, isLoading: isUserLoading } = useGetMeQuery(undefined, {
    skip: !isSessionAlive || isRefreshing,
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
    try {
      await logoutMutation().unwrap();
    } catch {}
    tokenStore.clear();
    navigate("/login");
  }, [logoutMutation]);

  useEffect(() => {
    const handleLogoutEvent = () => {
      logout();
    };

    window.addEventListener("auth:logout", handleLogoutEvent);
    return () => {
      window.removeEventListener("auth:logout", handleLogoutEvent);
    };
  }, [logout]);

  return {
    user,
    isAuthenticated: !!user,
    loading: isRefreshing || registerState.isLoading || loginState.isLoading || logoutState.isLoading || refreshState.isLoading || isUserLoading,
    error: registerState.error || loginState.error || logoutState.error,
    register,
    login,
    logout,
  };
};
