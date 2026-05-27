import { useGetComponentStatQuery } from "@entities/component";
import styled from "./ComponentStat.module.scss";

export const ComponentStat = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetComponentStatQuery({ id });

  if (isLoading) return <div className={styled.ComponentStat__Loading}>загрузка статистики...</div>;
  if (!data) return null;

  const max = Math.max(data.loadsForYear, 1);
  const rows = [
    { label: "Год", value: data.loadsForYear },
    { label: "Месяц", value: data.loadsByMonth },
    { label: "Неделя", value: data.loadsByWeek },
    { label: "Сутки", value: data.loadsByDay },
  ];

  return (
    <div className={styled.ComponentStat}>
      <div className={styled.ComponentStat__Grid}>
        <div className={styled.ComponentStat__Card}>
          <span className={styled.ComponentStat__CardLabel}>за год</span>
          <span className={styled.ComponentStat__CardValue}>{data.loadsForYear}</span>
        </div>
        <div className={styled.ComponentStat__Card}>
          <span className={styled.ComponentStat__CardLabel}>за месяц</span>
          <span className={styled.ComponentStat__CardValue}>{data.loadsByMonth}</span>
        </div>
        <div className={styled.ComponentStat__Card}>
          <span className={styled.ComponentStat__CardLabel}>за неделю</span>
          <span className={styled.ComponentStat__CardValue}>{data.loadsByWeek}</span>
        </div>
        <div className={styled.ComponentStat__Card}>
          <span className={styled.ComponentStat__CardLabel}>за сутки</span>
          <span className={styled.ComponentStat__CardValue}>{data.loadsByDay}</span>
        </div>
      </div>

      <div className={styled.ComponentStat__Chart}>
        <div className={styled.ComponentStat__ChartHeader}>
          динамика загрузок
        </div>
        <div className={styled.ComponentStat__ChartBody}>
          {rows.map((row) => (
            <div key={row.label} className={styled.ComponentStat__BarRow}>
              <span className={styled.ComponentStat__BarLabel}>{row.label}</span>
              <div className={styled.ComponentStat__BarTrack}>
                <div
                  className={styled.ComponentStat__BarFill}
                  style={{ width: `${Math.round((row.value / max) * 100)}%` }}
                />
              </div>
              <span className={styled.ComponentStat__BarCount}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
