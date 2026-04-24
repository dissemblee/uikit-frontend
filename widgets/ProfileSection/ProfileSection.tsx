import { useState } from "react";
import { useParams } from "react-router";
import styled from "./ProfileSection.module.scss";
import { useGetUserByIdQuery } from "@entities/user";
import { Button } from "@shared/ui/Button";
import { FiEdit2, FiLock, FiX } from "react-icons/fi";
import { EditProfile } from "@features/EditProfile";
import { ChangePassword } from "@features/ChangePassword";
import { UserIcon } from "@features/UserIcon";

type ProfileMode = "view" | "edit" | "password";

export const ProfileSection = () => {
  const { username } = useParams();
  const { data, isLoading } = useGetUserByIdQuery(String(username));
  const [mode, setMode] = useState<ProfileMode>("view");

  const user = data?.result;

  if (isLoading) return (
    <section className={styled.ProfileSection}>
      <div className={styled.ProfileSection__Card}>
        <div className={styled.ProfileSection__SkeletonWrap}>
          <div className={styled.ProfileSection__SkeletonAvatar} />
          <div className={styled.ProfileSection__SkeletonLine} />
          <div className={styled.ProfileSection__SkeletonLine} />
        </div>
      </div>
    </section>
  );

  return (
    <section className={styled.ProfileSection}>
      <div className={styled.ProfileSection__Card}>

        <div className={styled.ProfileSection__Header}>
          <UserIcon />
          <div>
            <h2 className={styled.ProfileSection__Name}>
              {user?.username ?? "Давид"}
            </h2>
            <span className={styled.ProfileSection__Email}>
              {user?.email ?? "example@mail.ru"}
            </span>
          </div>
        </div>

        {mode === "view" && (
          <>
            <div className={styled.ProfileSection__Info}>
              <div className={styled.ProfileSection__InfoRow}>
                <span className={styled.ProfileSection__InfoLabel}>логин</span>
                <span className={styled.ProfileSection__InfoValue}>{user?.username ?? "Давид"}</span>
              </div>
              <div className={styled.ProfileSection__InfoRow}>
                <span className={styled.ProfileSection__InfoLabel}>почта</span>
                <span className={styled.ProfileSection__InfoValue}>{user?.email ?? "example@mail.ru"}</span>
              </div>
            </div>

            <div className={styled.ProfileSection__Action}>
              <Button variant="primary" onClick={() => setMode("edit")}>
                <FiEdit2 /> редактировать_профиль
              </Button>
              <Button variant="secondary" onClick={() => setMode("password")}>
                <FiLock /> сменить_пароль
              </Button>
            </div>
          </>
        )}

        {mode === "edit" && (
          <div className={styled.ProfileSection__EditForm}>
            <div className={styled.ProfileSection__EditHeader}>
              <span>// редактировать_профиль</span>
              <Button variant="cancel" nonBlock onClick={() => setMode("view")}>
                <FiX /> назад
              </Button>
            </div>
            <EditProfile />
          </div>
        )}

        {mode === "password" && (
          <div className={styled.ProfileSection__EditForm}>
            <div className={styled.ProfileSection__EditHeader}>
              <span>// сменить_пароль</span>
              <Button variant="cancel" nonBlock onClick={() => setMode("view")}>
                <FiX /> назад
              </Button>
            </div>
            <ChangePassword />
          </div>
        )}
      </div>
    </section>
  );
};
