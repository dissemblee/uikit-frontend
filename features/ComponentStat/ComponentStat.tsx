import { useGetComponentStatQuery } from "@entities/component";
import styles from "./ComponentStat.module.scss";

export const ComponentStat = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetComponentStatQuery({ id });

  if (isLoading) return <div className={styles.ComponentStat__Loading}>загрузка статистики...</div>;
  if (!data?.result) return null;

  const stat = data.result;

  const cards = [
    { label: "за год", value: stat.loadsForYear },
    { label: "за месяц", value: stat.loadsForMonth },
    { label: "за неделю", value: stat.loadsForWeek },
    { label: "за сутки", value: stat.loadsForDay },
  ];

  const maxDaily = Math.max(...stat.dailyChart.map((d) => d.count), 1);

  return (
    <div className={styles.ComponentStat}>
      <div className={styles.ComponentStat__Grid}>
        {cards.map((card) => (
          <div key={card.label} className={styles.ComponentStat__Card}>
            <span className={styles.ComponentStat__CardLabel}>{card.label}</span>
            <span className={styles.ComponentStat__CardValue}>{card.value}</span>
          </div>
        ))}
      </div>

      <div className={styles.ComponentStat__Chart}>
        <div className={styles.ComponentStat__ChartHeader}>
          динамика загрузок за 30 дней (всего: {stat.loadsTotal})
        </div>
        <div className={styles.ComponentStat__ChartBody}>
          {stat.dailyChart.map((day) => (
            <div key={day.date} className={styles.ComponentStat__BarRow}>
              <span className={styles.ComponentStat__BarLabel}>{day.date.slice(5)}</span>
              <div className={styles.ComponentStat__BarTrack}>
                <div
                  className={styles.ComponentStat__BarFill}
                  style={{ width: `${Math.round((day.count / maxDaily) * 100)}%` }}
                />
              </div>
              <span className={styles.ComponentStat__BarCount}>{day.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
