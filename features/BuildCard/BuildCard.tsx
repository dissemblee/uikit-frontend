import moment from "moment"
import styles from "./BuildCard.module.scss"
import { BuildStatus, type BuildDto } from "@entities/build"
import { BaseCard } from "@shared/ui/BaseCard"

const statusConfig: Record<BuildStatus, { icon: string; label: string; className: string }> = {
  [BuildStatus.PENDING]: { 
    icon: "⏳", 
    label: "Ожидание", 
    className: "pending" 
  },
  [BuildStatus.RUNNING]: { 
    icon: "⚙️", 
    label: "В процессе", 
    className: "in_progress" 
  },
  [BuildStatus.SUCCESS]: { 
    icon: "✅", 
    label: "Завершено", 
    className: "completed" 
  },
  [BuildStatus.FAILED]: { 
    icon: "❌", 
    label: "Ошибка", 
    className: "failed" 
  },
};

const getDuration = (startedAt: string, completedAt?: string | null): string => {
  const start = moment(startedAt);
  const end = completedAt ? moment(completedAt) : moment();
  const diff = end.diff(start, "seconds");
  
  if (diff < 60) return `${diff}с`;
  if (diff < 3600) return `${Math.floor(diff / 60)}м ${diff % 60}с`;
  return `${Math.floor(diff / 3600)}ч ${Math.floor((diff % 3600) / 60)}м`;
};

export const BuildCard = ({ build, index = 0 }: { build: BuildDto; index?: number }) => {
  const status = statusConfig[build.status];
  const isRunning = build.status === BuildStatus.RUNNING;
  const duration = getDuration(build.startedAt, build.finishedAt);

  return (
    <BaseCard
      to={`/builds/${build.id}`}
      index={index}
      icon={
        <>
          <div className={`${styles.BuildCard__Icon} ${isRunning ? styles['BuildCard__Icon--spinning'] : ''}`}>
            {status.icon}
          </div>
        </>
      }
      name={build.name}
      sub={`v${build.version}`}
      extra={
        <span className={`${styles.BuildCard__Status} ${styles[`BuildCard__Status--${status.className}`]}`}>
          {status.label}
        </span>
      }
      date={build.startedAt}
      right={
        <>
          <span className={styles.BuildCard__Duration}>
            ⏱ {duration}
          </span>
        </>
      }
    />
  );
};
