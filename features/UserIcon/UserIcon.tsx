import styled from "./UserIcon.module.scss"

type Props = {
  username?: string;
  size?: "sm" | "md" | "lg";
}

export const UserIcon = ({ username, size = "md" }: Props) => {
  const initial = username ? username[0].toUpperCase() : "?";

  return (
    <div className={`${styled.UserIcon} ${size !== "md" ? styled[`UserIcon--${size}`] : ""}`}>
      {initial}
    </div>
  );
}
