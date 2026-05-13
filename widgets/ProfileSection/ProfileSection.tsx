import { useState } from "react";
import { Link, useParams } from "react-router";
import styled from "./ProfileSection.module.scss";
import { useGetUserByIdQuery } from "@entities/user";
import { Button } from "@shared/ui/Button";
import { FiEdit2, FiLock, FiX } from "react-icons/fi";
import { EditProfile } from "@features/EditProfile";
import { ChangePassword } from "@features/ChangePassword";
import { UserIcon } from "@features/UserIcon";

type ProfileMode = "view" | "edit" | "password";

export const ProfileSection = () => {
  const { data, isLoading } = useGetUserByIdQuery("me");
  const [mode, setMode] = useState<ProfileMode>("view");

  const user = data;

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
              {user?.id}
            </h2>
            <span className={styled.ProfileSection__Email}>
              {user?.email}
            </span>
          </div>
          <div className={styled.ProfileSection__InfoRow}>
            <Link className={styled.ProfileSection__InfoValue} to={`/repositories/${user?.id}`}>
              Мои репозитории
            </Link>
            <Link className={styled.ProfileSection__InfoValue} to={`/components/${user?.id}`}>
              Мои компоненты
            </Link>
          </div>
        </div>

        {mode === "view" && (
          <>
            <div className={styled.ProfileSection__Info}>
              <div className={styled.ProfileSection__InfoRow}>
                <span className={styled.ProfileSection__InfoLabel}>логин</span>
                <span className={styled.ProfileSection__InfoValue}>{user?.id}</span>
              </div>
              <div className={styled.ProfileSection__InfoRow}>
                <span className={styled.ProfileSection__InfoLabel}>почта</span>
                <span className={styled.ProfileSection__InfoValue}>{user?.email}</span>
              </div>
            </div>

            <div className={styled.ProfileSection__Action}>
              <Button variant="primary" onClick={() => setMode("edit")} style={{textAlign: "center"}}>
                <FiEdit2 /> сменить почту
              </Button>
              <Button variant="secondary" onClick={() => setMode("password")} style={{textAlign: "center"}}>
                <FiLock /> сменить пароль
              </Button>
            </div>
          </>
        )}

        {mode === "edit" && (
          <div className={styled.ProfileSection__EditForm}>
            <div className={styled.ProfileSection__EditHeader}>
              <span>// редактировать профиль</span>
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
              <span>// сменить пароль</span>
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
