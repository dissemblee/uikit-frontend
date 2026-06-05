import { useGetUserComponentStatQuery } from "@entities/component";
import styles from "./UserStat.module.scss";
import { AreaChartStat } from "@shared/ui/AreaChart";
import { useGetUserRepoStatQuery } from "@entities/repository";

const EMPTY_STAT = {
  totalBuilds: 0,
  successBuilds: 0,
  failedBuilds: 0,
  dailyLoadsChart: [] as { date: string; count: number }[],
  totalComponents: 0,
  totalRepos: 0,
};

export const UserStat = ({ username }: { username: string }) => {
  const { data: componentData, isLoading: componentLoading } = useGetUserComponentStatQuery({ username });
  const { data: repoData, isLoading: repoLoading } = useGetUserRepoStatQuery({ username });

  const componentStat = componentData?.result ?? EMPTY_STAT;
  const repoStat = repoData?.result ?? EMPTY_STAT;

  if (componentLoading || repoLoading || !componentStat || !repoStat) {
    return null;
  }

  const totalBuilds = componentStat.totalBuilds + repoStat.totalBuilds;
  const successBuilds = componentStat.successBuilds + repoStat.successBuilds;
  const failedBuilds = componentStat.failedBuilds + repoStat.failedBuilds;

  const successRate = totalBuilds > 0
    ? Math.round((successBuilds / totalBuilds) * 100)
    : 0;

  const mergedChartMap = new Map<string, number>();
  [...componentStat.dailyLoadsChart, ...repoStat.dailyLoadsChart].forEach(({ date, count }) => {
    mergedChartMap.set(date, (mergedChartMap.get(date) ?? 0) + count);
  });
  const mergedChart = Array.from(mergedChartMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({ date, count }));

  const loadsTotal = mergedChart.reduce((sum, point) => sum + point.count, 0);

  const cards = [
    { label: "компонентов", value: componentStat.totalComponents },
    { label: "репозиториев", value: repoStat.totalRepos },
    { label: "сборок", value: totalBuilds },
    { label: "успешных", value: successBuilds },
    { label: "упало", value: failedBuilds },
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

      <AreaChartStat chartData={mergedChart} loadsTotal={loadsTotal} />
    </div>
  );
};
