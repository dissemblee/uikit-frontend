import { useGetUserStatQuery } from "@entities/component";
import styles from "./UserStat.module.scss";

export const UserStat = ({ username }: { username: string }) => {
  const { data: stat, isLoading } = useGetUserStatQuery({ username });

  if (isLoading || !stat) {
    return null;
  }

  const successRate = stat.totalBuilds > 0
    ? Math.round((stat.successBuilds / stat.totalBuilds) * 100)
    : 0;

  return (
    <div className={styles.UserStat}>
      <div className={styles.UserStat__StatGrid}>
        <div className={styles.UserStat__StatCard}>
          <span className={styles.UserStat__StatLabel}>компонентов</span>
          <span className={styles.UserStat__StatValue}>{stat.totalComponents}</span>
        </div>
        <div className={styles.UserStat__StatCard}>
          <span className={styles.UserStat__StatLabel}>сборок</span>
          <span className={styles.UserStat__StatValue}>{stat.totalBuilds}</span>
        </div>
        <div className={styles.UserStat__StatCard}>
          <span className={styles.UserStat__StatLabel}>успешных</span>
          <span className={styles.UserStat__StatValue}>{stat.successBuilds}</span>
        </div>
        <div className={styles.UserStat__StatCard}>
          <span className={styles.UserStat__StatLabel}>упало</span>
          <span className={styles.UserStat__StatValue}>{stat.failedBuilds}</span>
        </div>
      </div>

      <div className={styles.UserStat__StatBar}>
        <div className={styles.UserStat__StatBarHeader}>
          <span>успешность сборок</span>
          <span>{successRate}%</span>
        </div>
        <div className={styles.UserStat__StatBarTrack}>
          <div
            className={styles.UserStat__StatBarFill}
            style={{ width: `${successRate}%` }}
          />
        </div>
      </div>
    </div>
  );
};
