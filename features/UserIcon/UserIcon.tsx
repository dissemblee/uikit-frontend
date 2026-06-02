import styles from "./UserIcon.module.scss"

type Props = {
  username?: string;
  size?: "sm" | "md" | "lg";
}

export const UserIcon = ({ username, size = "md" }: Props) => {
  const initial = username ? username[0].toUpperCase() : "?";

  return (
    <div className={`${styles.UserIcon} ${size !== "md" ? styles[`UserIcon--${size}`] : ""}`}>
      {initial}
    </div>
  );
}
