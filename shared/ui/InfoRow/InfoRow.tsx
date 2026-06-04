import { formatDate } from "@shared/lib/time";
import styles from "./InfoRow.module.scss";
import type { ReactNode } from "react";

type Props = {
  label: string;
  value?: string | number | null;
  isDate?: boolean;
  icon?: ReactNode
  className?: string;
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
