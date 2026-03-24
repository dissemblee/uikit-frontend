import moment from "moment"
import styles from "./BuildCard.module.scss"
import type { BuildDto } from "@entities/build"
import { BuildStatus } from "@entities/build"
import { BaseCard } from "@shared/ui/BaseCard"

const statusConfig: Record<BuildStatus, { icon: string; label: string; className: string }> = {
  [BuildStatus.PENDING]: { 
    icon: "⏳", 
    label: "Ожидание", 
    className: "pending" 
  },
  [BuildStatus.IN_PROGRESS]: { 
    icon: "⚙️", 
    label: "В процессе", 
    className: "in_progress" 
  },
  [BuildStatus.COMPLETED]: { 
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

const getDuration = (startedAt: string, completedAt?: string): string => {
  const start = moment(startedAt);
  const end = completedAt ? moment(completedAt) : moment();
  const diff = end.diff(start, "seconds");
  
  if (diff < 60) return `${diff}с`;
  if (diff < 3600) return `${Math.floor(diff / 60)}м ${diff % 60}с`;
  return `${Math.floor(diff / 3600)}ч ${Math.floor((diff % 3600) / 60)}м`;
};

export const BuildCard = ({ build, index = 0 }: { build: BuildDto; index?: number }) => {
  const status = statusConfig[build.status];
  const isRunning = build.status === BuildStatus.IN_PROGRESS;
  const duration = getDuration(build.startedAt, build.completedAt);

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
      name={build.component.name}
      sub={`v${build.component.version}`}
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
