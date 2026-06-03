import { useGetComponentStatQuery } from "@entities/component";
import styles from "./ComponentStat.module.scss";
import { AreaChartStat } from "@shared/ui/AreaChart";

const formatDay = (iso: string) => {
  const [, m, d] = iso.split("-");
  return `${d}.${m}`;
};

export const ComponentStat = ({ componentId }: { componentId: string }) => {
  const { data, isLoading } = useGetComponentStatQuery({ componentId });

  if (isLoading) return <div className={styles.ComponentStat__Loading}>загрузка статистики...</div>;
  if (!data?.result) return null;

  const stat = data.result;

  const cards = [
    { label: "за год", value: stat.loadsForYear },
    { label: "за месяц", value: stat.loadsForMonth },
    { label: "за неделю", value: stat.loadsForWeek },
    { label: "за сутки", value: stat.loadsForDay },
  ];

  const chartData = stat.dailyChart.map((d: { date: string; count: any; }) => ({
    date: formatDay(d.date),
    fullDate: d.date,
    count: d.count,
  }));

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

      <AreaChartStat chartData={chartData} loadsTotal={stat.loadsTotal} />
    </div>
  );
};
