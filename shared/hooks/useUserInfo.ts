import { useAuthContext } from "@app/provider/AuthProvider";
import { tokenStore } from "@shared/tokenStore";
import { useMemo } from "react";

type UserInfo = {
  displayName: string;
  role: string;
};

export const useUserInfo = (): UserInfo => {
  const { user } = useAuthContext();

  return useMemo(() => {
    const fallback: UserInfo = { displayName: "User", role: "guest" };

    if (!user) return fallback;

    const token = tokenStore.get();
    let role = "guest";

    if (token) {
      try {
        const parts = token.split(".");
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1]));
          role = payload.userRole || payload.role || "guest";
        }
      } catch {}
    }

    return {
      displayName: user.result?.username || "User",
      role,
    };
  }, [user]);
};
