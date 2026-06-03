import { useGetUserStatQuery } from "@entities/component";
import styles from "./UserStat.module.scss";
import { AreaChartStat } from "@shared/ui/AreaChart";

export const UserStat = ({ username }: { username: string }) => {
  const { data, isLoading } = useGetUserStatQuery({ username });
  const stat = data?.result;

  if (isLoading || !stat) {
    return null;
  }

  const successRate =
    stat.totalBuilds > 0
      ? Math.round((stat.successBuilds / stat.totalBuilds) * 100)
      : 0;

  const loadsTotal = stat.dailyLoadsChart.reduce(
    (sum, point) => sum + point.count,
    0,
  );

  const cards = [
    { label: "компонентов", value: stat.totalComponents },
    { label: "сборок", value: stat.totalBuilds },
    { label: "успешных", value: stat.successBuilds },
    { label: "упало", value: stat.failedBuilds },
  ];

  return (
    <div className={styles.UserStat}>
      <div className={styles.UserStat__StatGrid}>
        {cards.map(({ label, value }) => (
          <div key={label} className={styles.UserStat__StatCard}>
            <span className={styles.UserStat__StatLabel}>{label}</span>
            <span className={styles.UserStat__StatValue}>{value}</span>
          </div>
        ))}
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

      <AreaChartStat
        chartData={stat.dailyLoadsChart}
        loadsTotal={loadsTotal}
      />
    </div>
  );
};