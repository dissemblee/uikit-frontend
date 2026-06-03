import { useGetUserByIdQuery } from "@entities/user";
import { ChangePassword } from "@features/ChangePassword";
import { EditProfile } from "@features/EditProfile";
import { UserStat } from "@features/UserStat";
import { BaseProfile } from "@shared/ui/BaseProfile";
import { Button } from "@shared/ui/Button";
import { InfoRow } from "@shared/ui/InfoRow";
import { ProfileSkeleton } from "@shared/ui/ProfileSkeleton";
import { useState } from "react";
import {
  FiArrowLeft,
  FiEdit2,
  FiLock,
  FiLogOut,
} from "react-icons/fi";
import { useAuthContext } from "~/provider/AuthProvider";
import styles from "./OwnProfile.module.scss";

type Mode = "view" | "edit" | "password";

export const OwnProfile = () => {
  const { data, isLoading } = useGetUserByIdQuery("me");
  const [mode, setMode] = useState<Mode>("view");
  const { logout } = useAuthContext();
  const user = data?.result;

  if (isLoading) return <ProfileSkeleton />;
  if (!user?.username) return null;

  const backButton = (
    <div className={styles.OwnProfile__Back}>
      <Button variant="cancel" size="sm" iconLeft={<FiArrowLeft size={13} />} nonBlock onClick={() => setMode("view")}>
        назад
      </Button>
    </div>
  );

  return (
    <BaseProfile
      username={user.username}
      subtitle={user.email}
      infoRows={
        <>
          <InfoRow label="логин" value={user.username} />
          <InfoRow label="почта" value={user.email} />
        </>
      }
      actions={
        <>
          <Button
            variant="primary"
            iconLeft={<FiEdit2 size={14} />}
            nonBlock
            onClick={() => setMode("edit")}
          >
            сменить почту
          </Button>
          <Button
            variant="secondary"
            iconLeft={<FiLock size={14} />}
            nonBlock
            onClick={() => setMode("password")}
          >
            сменить пароль
          </Button>
          <Button
            variant="danger"
            iconLeft={<FiLogOut size={14} />}
            nonBlock
            onClick={() => logout()}
          >
            Выход
          </Button>
        </>
      }
      extra={
        <>
          {mode === "edit" && (
            <div className={styles.OwnProfile__FormSection}>
              {backButton}
              <EditProfile />
            </div>
          )}
          {mode === "password" && (
            <div className={styles.OwnProfile__FormSection}>
              {backButton}
              <ChangePassword />
            </div>
          )}
        </>
      }
      stats={<UserStat username={user.username} />}
    />
  );
};
