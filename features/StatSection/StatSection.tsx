import styles from "./StatSection.module.scss";
import { AreaChartStat } from "@shared/ui/AreaChart";

interface StatData {
  loadsForYear: number;
  loadsForMonth: number;
  loadsForWeek: number;
  loadsForDay: number;
  loadsTotal: number;
  dailyChart?: { date: string; count: number }[];
  dailyLoadsChart?: { date: string; count: number }[];
}

interface StatSectionProps {
  data: StatData | undefined;
  isLoading: boolean;
}

const formatDay = (iso: string) => {
  const [, m, d] = iso.split("-");
  return `${d}.${m}`;
};

export const StatSection = ({ data, isLoading }: StatSectionProps) => {
  if (isLoading) return <div className={styles.StatSection__Loading}>загрузка статистики...</div>;
  if (!data) return null;

  const cards = [
    { label: "за год", value: data.loadsForYear },
    { label: "за месяц", value: data.loadsForMonth },
    { label: "за неделю", value: data.loadsForWeek },
    { label: "за сутки", value: data.loadsForDay },
  ];

  const chart = data.dailyChart ?? data.dailyLoadsChart ?? [];

  const chartData = chart.map((d) => ({
    date: formatDay(d.date),
    count: d.count,
  }));

  return (
    <div className={styles.StatSection}>
      <div className={styles.StatSection__Grid}>
        {cards.map((card) => (
          <div key={card.label} className={styles.StatSection__Card}>
            <span className={styles.StatSection__CardLabel}>{card.label}</span>
            <span className={styles.StatSection__CardValue}>{card.value}</span>
          </div>
        ))}
      </div>
      <AreaChartStat chartData={chartData} loadsTotal={data.loadsTotal} />
    </div>
  );
};
