import moment from "moment";
import styles from "./BuildCard.module.scss";
import { BuildStatus } from "@entities/build";
import type { BuildDto } from "@entities/component"
import { BaseCard } from "@shared/ui/BaseCard";
import { buildStatusConfig } from "@shared/ui/BuildStatusConfig";
import { getDuration } from "@shared/lib/time";
import type { BuildRepoDto } from "@entities/repository";

type BuildCardProps = {
  index?: number;
} & (
  | { componentBuild: BuildDto; repoBuild?: never }
  | { repoBuild: BuildRepoDto; componentBuild?: never }
);

export const BuildCard = ({ componentBuild, repoBuild, index = 0 }: BuildCardProps) => {
  const build = componentBuild ?? repoBuild;
  const status = buildStatusConfig[build.status as BuildStatus];
  const isRunning = build.status === BuildStatus.RUNNING;
  const duration = getDuration(build.startedAt, build.finishedAt);

  const to = componentBuild
    ? `/builds/components/${build.id}`
    : `/builds/repositories/${build.id}`;

  const name = componentBuild ? componentBuild.id : build.id;
  const sub = componentBuild
    ? `${componentBuild.component.name}-v${componentBuild.version}`
    : `${repoBuild.name}-${repoBuild!.version}`;

  return (
    <BaseCard
      to={to}
      index={index}
      icon={
        <div
          className={`${styles.BuildCard__Icon} ${styles[`BuildCard__Icon--${status.className}`]} ${isRunning ? styles["BuildCard__Icon--spinning"] : ""}`}
        >
          {status.icon}
        </div>
      }
      name={name}
      sub={sub}
      extra={
        <span className={styles.BuildCard}>
          <span
            className={`${styles.BuildCard__Status} ${styles[`BuildCard__Status--${status.className}`]}`}
          >
            {status.label}
          </span>
        </span>
      }
      date={build.startedAt}
      right={
        <span
          className={`${styles.BuildCard__Duration} ${isRunning ? styles["BuildCard__Duration--running"] : ""}`}
        >
          ⏱ {duration}
        </span>
      }
    />
  );
};
