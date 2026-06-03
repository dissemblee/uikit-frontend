import { useGetBanInfoQuery, useUnbanUserMutation } from "@entities/auth";
import { BanUserModal } from "@features/BanUserModal";
import { UserStat } from "@features/UserStat";
import { useUserInfo } from "@shared/hooks/useUserInfo";
import { Button } from "@shared/ui/Button";
import { InfoList } from "@shared/ui/InfoList";
import { InfoRow } from "@shared/ui/InfoRow";
import { ProfileSkeleton } from "@shared/ui/ProfileSkeleton";
import { useState } from "react";
import styles from "./PublicProfile.module.scss";
import { BaseProfile } from "@shared/ui/BaseProfile";

export const PublicProfile = ({ username }: { username: string }) => {
  const { data: banInfo, isLoading } = useGetBanInfoQuery(username);
  const { role } = useUserInfo();
  const isAdmin = role === "ADMIN";
  const userBanInfo = banInfo?.result;

  const [showBanModal, setShowBanModal] = useState(false);
  const [unbanUser, { isLoading: isUnbanning }] = useUnbanUserMutation();

  const handleUnban = async () => {
    if (!username) return;
    await unbanUser({ userId: username });
  };

  if (isLoading) return <ProfileSkeleton />;

  return (
    <>
      <BaseProfile
        username={username}
        badge={
          userBanInfo?.isBanned && (
            <span className={styles.PublicProfile__BannedBadge}>забанен</span>
          )
        }
        infoRows={
          <>
            <InfoRow label="логин" value={username} />
            {userBanInfo?.isBanned && (
              <>
                <InfoList
                  labels={["причина", "забанил"]}
                  values={[userBanInfo.banReason, userBanInfo.bannedBy]}
                />
                <InfoRow label="дата бана" value={userBanInfo.bannedAt} isDate />
              </>
            )}
          </>
        }
        actions={
          isAdmin &&
          (userBanInfo?.isBanned ? (
            <Button
              variant="secondary"
              nonBlock
              onClick={handleUnban}
              loading={isUnbanning}
              loadingText="Разбаниваем..."
            >
              разбанить
            </Button>
          ) : (
            <Button
              variant="danger"
              nonBlock
              onClick={() => setShowBanModal(true)}
            >
              забанить
            </Button>
          ))
        }
        stats={<UserStat username={username} />}
      />

      {showBanModal && (
        <BanUserModal
          userId={username}
          onClose={() => setShowBanModal(false)}
        />
      )}
    </>
  );
};
