import { SingleWrapSection } from "@shared/ui/SingleWrapSection/SingleWrapSection";
import { FiBox, FiCalendar, FiClock, FiCode, FiPackage } from "react-icons/fi";
import { Link, useParams } from "react-router";
import styles from "./BuildSingleSection.module.scss";
import { InfoRow } from "@shared/ui/InfoRow";
import { buildStatusConfig } from "@shared/ui/BuildStatusConfig";
import { getDuration } from "@shared/lib/time";
import type { BuildStatus } from "@entities/build";
import { useGetBuildByIdQuery, type BuildDto } from "@entities/component";
import { useGetRepoBuildByIdQuery, type BuildRepoDto } from "@entities/repository";
import { useUserInfo } from "@shared/hooks/useUserInfo";
import { BuildLogs } from "@shared/ui/BuildLog";

export const BuildSingleSection = () => {
  const { service, buildId } = useParams<{ service: string; buildId: string }>();
  const { displayName } = useUserInfo();

  if (!buildId || !service) return <SingleWrapSection state="not_found" />;

  const isRepo = service === "repositories";
  const isComponent = service === "components";

  const { data: componentData, isLoading: componentLoading } = useGetBuildByIdQuery(
    { buildId },
    { skip: !isComponent }
  );

  const { data: repoData, isLoading: repoLoading } = useGetRepoBuildByIdQuery(
    { buildId },
    { skip: !isRepo }
  );

  const isLoading = componentLoading || repoLoading;
  const build = (componentData?.result ?? repoData?.result) as BuildDto | BuildRepoDto;

  if (isLoading) return <SingleWrapSection state="loading" />;
  if (!build) return <SingleWrapSection state="not_found" />;

  const status = buildStatusConfig[build.status as BuildStatus];
  const duration = getDuration(build.startedAt, build.finishedAt);

  const title = isRepo
    ? `${displayName}/${(build as any).name}`
    : `${(build as any).component?.username}/${(build as any).component?.name}`;

  const linkPath = isComponent
    ? `/components/${(build as any).component?.username}/${(build as any).component?.name}?version=${build.version}`
    : `/repositories/${displayName}/${(build as any).name}?version=${build.version}`;

  const linkLabel = isComponent
    ? `${(build as any).component?.username}/${(build as any).component?.name}-v${build.version}`
    : `${displayName}/${(build as any).name}-v${build.version}`;

  return (
    <SingleWrapSection
      entity={build}
      state="success"
      title={build.id}
      path={title}
      icon={<FiPackage size={32} />}
    >
      <InfoRow label="Завершен" value={build.finishedAt} icon={<FiCalendar size={14} />} isDate />
      <InfoRow label="Продолжительность" value={duration} icon={<FiClock size={14} />} />
      <InfoRow
        label="Статус"
        value={status.label}
        icon={status.icon}
        className={`${styles.BuildSingleSection__Status} ${
          styles[`BuildSingleSection__Status--${status.className}`]
        }`}
      />
      <Link to={linkPath} className={styles.SingleWrapSection__LinkProfile}>
        <InfoRow
          label={isComponent ? "Компонент" : "Репозиторий"}
          value={linkLabel}
          icon={<FiCode size={14} />}
        />
      </Link>

      <BuildLogs build={build} />
    </SingleWrapSection>
  );
};
