import moment from "moment"
import styles from "./BuildCard.module.scss"
import { BuildStatus, type BuildDto } from "@entities/build"
import { BaseCard } from "@shared/ui/BaseCard"
import { buildStatusConfig } from "@shared/ui/BuildStatusConfig";

const getDuration = (startedAt: string, completedAt?: string | null): string => {
  const start = moment(startedAt);
  const end = completedAt ? moment(completedAt) : moment();
  const diff = end.diff(start, "seconds");
  
  if (diff < 60) return `${diff}с`;
  if (diff < 3600) return `${Math.floor(diff / 60)}м ${diff % 60}с`;
  return `${Math.floor(diff / 3600)}ч ${Math.floor((diff % 3600) / 60)}м`;
};

export const BuildCard = ({ build, index = 0 }: { build: BuildDto; index?: number }) => {
  const status = buildStatusConfig[build.status];
  const isRunning = build.status === BuildStatus.RUNNING;
  const duration = getDuration(build.startedAt, build.finishedAt);

  return (
    <BaseCard
      to={`/builds/${build.type}/${build.id}`}
      index={index}
      icon={
        <div className={`${styles.BuildCard__Icon} ${styles[`BuildCard__Icon--${status.className}`]} ${isRunning ? styles['BuildCard__Icon--spinning'] : ''}`}>
          {status.icon}
        </div>
      }
      name={build.id}
      sub={`${build.component.name}-${build.component.version}`}
      extra={
        <span className={`${styles.BuildCard__Status} ${styles[`BuildCard__Status--${status.className}`]}`}>
          {status.label}
        </span>
      }
      date={build.startedAt}
      right={
        <span className={`${styles.BuildCard__Duration} ${isRunning ? styles["BuildCard__Duration--running"] : ""}`}>
          ⏱ {duration}
        </span>
      }
    />
  );
};
