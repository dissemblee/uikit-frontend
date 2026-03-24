import { useCallback, useEffect, useRef, useState } from "react";
import {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useRefreshMutation,
} from "@entities/auth";
import { useGetUserByIdQuery } from "@entities/user";
import { tokenStore } from "@shared/tokenStore";

const REFRESH_INTERVAL_MS = 4 * 60 * 1000; // 4 минуты

export const useAuth = () => {
  const [registerMutation, registerState] = useRegisterMutation();
  const [loginMutation, loginState] = useLoginMutation();
  const [logoutMutation, logoutState] = useLogoutMutation();
  const [refreshMutation] = useRefreshMutation();

  // Флаг — есть ли isAuth куки (переживает перезагрузку страницы)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof document === "undefined") return false // SSR guard
    return document.cookie.includes("isAuth=true")
  });

  const refreshTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ─── Запуск автообновления токена ──────────────────────────────────────────

  const startRefreshTimer = useCallback(() => {
    if (refreshTimerRef.current) clearInterval(refreshTimerRef.current);

    refreshTimerRef.current = setInterval(async () => {
      try {
        const result = await refreshMutation().unwrap();
        tokenStore.set(result.result.token);
      } catch {
        // refresh провалился — сессия истекла
        tokenStore.clear();
        setIsAuthenticated(false);
        if (refreshTimerRef.current) clearInterval(refreshTimerRef.current);
      }
    }, REFRESH_INTERVAL_MS);
  }, [refreshMutation]);

  // ─── При загрузке страницы — если isAuth куки есть, делаем refresh ─────────

  useEffect(() => {
    if (!isAuthenticated) return;

    const init = async () => {
      try {
        const result = await refreshMutation().unwrap();
        tokenStore.set(result.result.token);
        startRefreshTimer();
      } catch {
        // refresh куки протух или невалиден
        tokenStore.clear();
        setIsAuthenticated(false);
      }
    };

    init();

    return () => {
      if (refreshTimerRef.current) clearInterval(refreshTimerRef.current);
    };
  }, []); // только при маунте

  // ─── Запросы текущего юзера — только когда есть токен ──────────────────────

  const { data: userData } = useGetUserByIdQuery("me", {
    skip: !isAuthenticated || !tokenStore.get(),
  });

  // ─── Методы ────────────────────────────────────────────────────────────────

  const register = useCallback(
    async (data: Parameters<typeof registerMutation>[0]) => {
      return await registerMutation(data).unwrap();
    },
    [registerMutation]
  );

  const login = useCallback(
    async (data: Parameters<typeof loginMutation>[0]) => {
      const result = await loginMutation(data).unwrap();
      // Сохраняем access токен в памяти
      tokenStore.set(result.result.token);
      setIsAuthenticated(true);
      startRefreshTimer();
      return result;
    },
    [loginMutation, startRefreshTimer]
  );

  const logout = useCallback(async () => {
    try {
      await logoutMutation().unwrap();
    } finally {
      tokenStore.clear();
      setIsAuthenticated(false);
      if (refreshTimerRef.current) clearInterval(refreshTimerRef.current);
    }
  }, [logoutMutation]);

  return {
    user: userData?.result,
    isAuthenticated,
    loading:
      registerState.isLoading ||
      loginState.isLoading ||
      logoutState.isLoading,
    error:
      registerState.error || loginState.error || logoutState.error,
    register,
    login,
    logout,
  };
};