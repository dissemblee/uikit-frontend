import { tokenStore } from "@shared/tokenStore";
import { useMemo } from "react";

type UserInfo = {
  displayName: string;
  role: string;
};

export const useUserInfo = (): UserInfo => {
  const token = tokenStore.get();

  return useMemo(() => {
    const fallback: UserInfo = {
      displayName: "User",
      role: "guest",
    };

    if (!token) {
      return fallback;
    }

    try {
      const parts = token.split(".");

      if (parts.length !== 3) {
        return fallback;
      }

      const payload = JSON.parse(atob(parts[1]));

      let rawUsername =
        payload.username ||
        payload.userId ||
        "User";

      try {
        rawUsername = decodeURIComponent(
          escape(rawUsername),
        );
      } catch {}

      const displayName =
        rawUsername.includes("Ð") ||
        rawUsername.length > 20
          ? "User"
          : rawUsername;

      const role =
        payload.userRole ||
        payload.role ||
        "guest";

      return {
        displayName,
        role,
      };
    } catch (error) {
      console.error(
        "Failed to decode token:",
        error,
      );

      return fallback;
    }
  }, [token]);
};