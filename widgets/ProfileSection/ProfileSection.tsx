import { useState } from "react";
import { useParams } from "react-router";
import styled from "./ProfileSection.module.scss";
import { useGetUserByIdQuery } from "@entities/user";
import { Button } from "@shared/ui/Button";
import { FaUser } from "react-icons/fa";
import { EditProfile } from "@features/EditProfile";
import { ChangePassword } from "@features/ChangePassword";

type ProfileMode = "view" | "edit" | "password";

export const ProfileSection = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetUserByIdQuery(Number(id));
  
  const [mode, setMode] = useState<ProfileMode>("view");

  if (isLoading) return (
    <section className={styled.ProfileSection}>
      <div className={styled.loader}>Загрузка профиля...</div>
    </section>
  );

  return (
    <section className={styled.ProfileSection}>
      <div className={styled.profileCard}>
        <div className={styled.profileHeader}>
          <div className={styled.avatar}>
            <FaUser />
          </div>
          <h2>Профиль пользователя</h2>
        </div>

        {mode === "view" && (
          <>
            <div className={styled.profileInfo}>
              <div className={styled.infoRow}>
                <span className={styled.label}>Имя:</span>
                <span className={styled.value}>{data?.result?.username || "sde23f"}</span>
              </div>
              <div className={styled.infoRow}>
                <span className={styled.label}>Email:</span>
                <span className={styled.value}>{data?.result?.email || "gf3@example.com"}</span>
              </div>
            </div>

            <div className={styled.profileActions}>
              <Button 
                variant="primary" 
                onClick={() => setMode("edit")}
              >
                ✏️ Изменить профиль
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => setMode("password")}
              >
                🔒 Сменить пароль
              </Button>
            </div>
          </>
        )}

        {mode === "edit" && (
          <div className={styled.editForm}>
            <h3>Редактирование профиля</h3>
            <EditProfile id={Number(id)}/>
            <br />
            <Button variant="secondary" onClick={() => setMode("view")}>Отмена</Button>
          </div>
        )}

        {mode === "password" && (
          <div className={styled.editForm}>
            <h3>Смена пароля</h3>
            <ChangePassword />
            <br />
            <Button variant="secondary" onClick={() => setMode("view")}>Отмена</Button>
          </div>
        )}
      </div>
    </section>
  );
};
