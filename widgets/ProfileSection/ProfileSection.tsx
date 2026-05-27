import { useState } from "react";
import { Link, useParams } from "react-router";
import styled from "./ProfileSection.module.scss";
import { useGetUserByIdQuery } from "@entities/user";
import { Button } from "@shared/ui/Button";
import { FiEdit2, FiLock, FiArrowLeft, FiGitBranch, FiBox, FiLogOut } from "react-icons/fi";
import { EditProfile } from "@features/EditProfile";
import { ChangePassword } from "@features/ChangePassword";
import { UserIcon } from "@features/UserIcon";
import { BanUserModal } from "@features/BanUserModal";
import { useUserInfo } from "@shared/hooks/useUserInfo";
import { useGetBanInfoQuery, useUnbanUserMutation } from "@entities/auth";
import { ProfileSkeleton } from "@shared/ui/ProfileSkeleton";
import { UserStat } from "@features/UserStat";
import { InfoRow } from "@shared/ui/InfoRow";
import { InfoList } from "@shared/ui/InfoList";
import { useAuthContext } from "~/provider/AuthProvider";

type ProfileMode = "view" | "edit" | "password";

export const ProfileSection = () => {
  const { username } = useParams();
  const { displayName } = useUserInfo();

  const isOwn = !username || username === displayName;
  return isOwn ? <OwnProfile /> : <PublicProfile username={username} />;
};

export const OwnProfile = () => {
  const { data, isLoading } = useGetUserByIdQuery("me");
  const [mode, setMode] = useState<ProfileMode>("view");
  const { logout } = useAuthContext();
  const user = data?.result;

  if (isLoading) return <ProfileSkeleton />;

  return (
    <section className={styled.ProfileSection}>
      <div className={styled.ProfileSection__Card}>

        <div className={styled.ProfileSection__Header}>
          <div className={styled.ProfileSection__HeaderTop}>
            <UserIcon username={user?.username} />
            <div className={styled.ProfileSection__Identity}>
              <h2 className={styled.ProfileSection__Name}>{user?.username}</h2>
              <span className={styled.ProfileSection__Sub}>{user?.email}</span>
            </div>
          </div>
          <nav className={styled.ProfileSection__Nav}>
            <Link to={`/repositories/${user?.username}`} className={styled.ProfileSection__NavLink}>
              <FiGitBranch size={12} /> репозитории
            </Link>
            <Link to={`/components/${user?.username}`} className={styled.ProfileSection__NavLink}>
              <FiBox size={12} /> компоненты
            </Link>
          </nav>
        </div>

        {mode === "view" && (
          <div className={styled.ProfileSection__Body}>
            <InfoRow label="логин" value={user?.username} />
            <InfoRow label="почта" value={user?.email} />
            <div className={styled.ProfileSection__Actions}>
              <Button variant="primary" iconLeft={<FiEdit2 size={14} />} nonBlock onClick={() => setMode("edit")}>
                сменить почту
              </Button>
              <Button variant="secondary" iconLeft={<FiLock size={14} />} nonBlock onClick={() => setMode("password")}>
                сменить пароль
              </Button>
              <Button nonBlock iconLeft={<FiLogOut size={14} />} variant="danger" onClick={() => logout()}>
                Выход
              </Button>
            </div>
          </div>
        )}

        {mode === "edit" && (
          <div className={styled.ProfileSection__FormSection}>
            <Button variant="cancel" size="sm" iconLeft={<FiArrowLeft size={13} />} nonBlock onClick={() => setMode("view")}>
              назад
            </Button>
            <EditProfile />
          </div>
        )}

        {mode === "password" && (
          <div className={styled.ProfileSection__FormSection}>
            <Button variant="cancel" size="sm" iconLeft={<FiArrowLeft size={13} />} nonBlock onClick={() => setMode("view")}>
              назад
            </Button>
            <ChangePassword />
          </div>
        )}

        {user?.username && (
          <div className={styled.ProfileSection__Stats}>
            <UserStat username={user.username} />
          </div>
        )}

      </div>
    </section>
  );
};

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
    <section className={styled.ProfileSection}>
      <div className={styled.ProfileSection__Card}>

        <div className={styled.ProfileSection__Header}>
          <div className={styled.ProfileSection__HeaderTop}>
            <UserIcon username={username} />
            <h2>{username}</h2>
            {userBanInfo?.isBanned && (
              <span className={styled.ProfileSection__BannedBadge}>забанен</span>
            )}
          </div>
          <nav className={styled.ProfileSection__Nav}>
            <Link to={`/repositories/${username}`} className={styled.ProfileSection__NavLink}>
              <FiGitBranch size={12} /> репозитории
            </Link>
            <Link to={`/components/${username}`} className={styled.ProfileSection__NavLink}>
              <FiBox size={12} /> компоненты
            </Link>
          </nav>
        </div>

        <div className={styled.ProfileSection__Body}>
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
          {isAdmin && (
            <div className={styled.ProfileSection__Actions}>
              {userBanInfo?.isBanned ? (
                <Button variant="secondary" iconLeft={undefined} nonBlock onClick={handleUnban} loading={isUnbanning} loadingText="Разбаниваем...">
                  разбанить
                </Button>
              ) : (
                <Button variant="danger" nonBlock onClick={() => setShowBanModal(true)}>
                  забанить
                </Button>
              )}
            </div>
          )}
        </div>

        <div className={styled.ProfileSection__Stats}>
          <UserStat username={username} />
        </div>

      </div>

      {showBanModal && username && (
        <BanUserModal userId={username} onClose={() => setShowBanModal(false)} />
      )}
    </section>
  );
};
