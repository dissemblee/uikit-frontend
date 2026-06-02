import styles from "./InfoRow.module.scss";
import type { ReactNode } from "react";

type Props = {
  label: string;
  value?: string | number | null;
  isDate?: boolean;
  icon?: ReactNode
  className?: string;
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";

  return new Date(dateStr).toLocaleString(
    "ru-RU",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );
};

export const InfoRow = ({
  label,
  value,
  isDate,
  icon,
  className
}: Props) => {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  return (
    <div className={styles.InfoRow}>
      <span className={styles.InfoRow__Label}>
        {icon && icon}{label}
      </span>

      <span className={className ?? styles.InfoRow__Value}>
        {isDate && typeof value === "string"
          ? formatDate(value)
          : value}
      </span>
    </div>
  );
};
