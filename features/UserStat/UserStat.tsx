import { useGetUserStatQuery } from "@entities/component";
import styled from "./UserStat.module.scss";

export const UserStat = ({ username }: { username: string }) => {
  const { data: stat, isLoading } = useGetUserStatQuery({ username });

  if (isLoading || !stat) {
    return null;
  }

  const successRate = stat.totalBuilds > 0
    ? Math.round((stat.successBuilds / stat.totalBuilds) * 100)
    : 0;

  return (
    <div className={styled.UserStat}>
      <div className={styled.UserStat__StatGrid}>
        <div className={styled.UserStat__StatCard}>
          <span className={styled.UserStat__StatLabel}>компонентов</span>
          <span className={styled.UserStat__StatValue}>{stat.totalComponents}</span>
        </div>
        <div className={styled.UserStat__StatCard}>
          <span className={styled.UserStat__StatLabel}>сборок</span>
          <span className={styled.UserStat__StatValue}>{stat.totalBuilds}</span>
        </div>
        <div className={styled.UserStat__StatCard}>
          <span className={styled.UserStat__StatLabel}>успешных</span>
          <span className={styled.UserStat__StatValue}>{stat.successBuilds}</span>
        </div>
        <div className={styled.UserStat__StatCard}>
          <span className={styled.UserStat__StatLabel}>упало</span>
          <span className={styled.UserStat__StatValue}>{stat.failedBuilds}</span>
        </div>
      </div>

      <div className={styled.UserStat__StatBar}>
        <div className={styled.UserStat__StatBarHeader}>
          <span>успешность сборок</span>
          <span>{successRate}%</span>
        </div>
        <div className={styled.UserStat__StatBarTrack}>
          <div
            className={styled.UserStat__StatBarFill}
            style={{ width: `${successRate}%` }}
          />
        </div>
      </div>
    </div>
  );
};
