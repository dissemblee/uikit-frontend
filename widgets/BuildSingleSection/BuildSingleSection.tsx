import { SingleWrapSection } from "@shared/ui/SingleWrapSection/SingleWrapSection";
import { FiBox, FiCalendar, FiCheckCircle, FiClock, FiCode, FiLoader, FiPackage, FiXCircle } from "react-icons/fi";
import { Link, useParams } from "react-router";
import styled from "./BuildSingleSection.module.scss";
import { useGetBuildByIdQuery } from "@entities/build/build.api";
import { BuildStatus } from "@entities/build";
import moment from "moment";
import { InfoRow } from "@shared/ui/InfoRow";
import { buildStatusConfig } from "@shared/ui/BuildStatusConfig";

const getDuration = (startedAt: string, completedAt?: string | null): string => {
  const start = moment(startedAt);
  const end = completedAt ? moment(completedAt) : moment();
  const diff = end.diff(start, "seconds");
  
  if (diff < 60) return `${diff}с`;
  if (diff < 3600) return `${Math.floor(diff / 60)}м ${diff % 60}с`;
  return `${Math.floor(diff / 3600)}ч ${Math.floor((diff % 3600) / 60)}м`;
};

export const BuildSingleSection = () => {
  const { service, buildId } = useParams<{ service: string; buildId: string }>();

  if (!buildId || !service) {
    return <div>Build id not found</div>;
  }
  
  const serviceType: 'repo' | 'components' = service === "repo" ? "repo" : "components";

  const { data: build, isLoading: buildLoading } = useGetBuildByIdQuery({ buildId, service: serviceType });

  if (buildLoading) return <SingleWrapSection state="loading" />;

  if (!build) return <SingleWrapSection state="not_found" />

  const status = buildStatusConfig[build.status];
  const duration = getDuration(build.startedAt, build.finishedAt);

  return (
    <SingleWrapSection
      entity={build}
      state="success"
      title={build?.id}
      path={serviceType === "components" ? `${build?.username}/${build?.name}` : `${build?.repoId}`}
      icon={<FiPackage size={32} />}
    >
      <InfoRow label="Завершен" value={build.finishedAt} icon={<FiCalendar size={14} />} isDate />
      <InfoRow label="Продолжительность" value={duration} icon={<FiClock size={14} />} />
      <InfoRow
        label="Статус"
        value={status.label}
        icon={status.icon}
        className={`${styled.BuildSingleSection__Status} ${
          styled[
            `BuildSingleSection__Status--${status.className}`
          ]
        }`}
      />
      <Link to={serviceType === "components" ? `/components/${build?.component.username}/${build?.component.name}` : `/repositories/${build?.repoId}`} className={styled.SingleWrapSection__LinkProfile}>
        <InfoRow
          label={serviceType === "components" ? "Компонент" : "Репозиторий"}
          value={serviceType === "components" ? `${build?.component.username}/${build?.component.name}` : build?.component.repoId}
          icon={serviceType === "components" ? <FiCode size={14} /> : <FiBox size={14} />}
        />
      </Link>

      <div className={styled.BuildSingleSection__InfoWrapper}>
        <div className={styled.BuildSingleSection__LogsCard}>
          <div className={styled.BuildSingleSection__LogsHeader}>
            <span>build.log</span>
          </div>

          <pre className={styled.BuildSingleSection__Logs}>
            <code>
              {build?.logs
                ?.split("\n")
                .filter(Boolean)
                .map((line, index) => {
                  const level =
                    line.includes("[ERROR]") ? "error"
                    : line.includes("[WARN]") ? "warn"
                    : line.includes("[DEBUG]") ? "debug"
                    : line.includes("[SUCCESS]") ? "success"
                    : "info";

                  const className =
                    level === "error"
                      ? styled["BuildSingleSection__Logs--error"]
                      : level === "warn"
                      ? styled["BuildSingleSection__Logs--warn"]
                      : level === "success"
                      ? styled["BuildSingleSection__Logs--success"]
                      : level === "debug"
                      ? styled["BuildSingleSection__Logs--debug"]
                      : "";

                  return (
                    <div key={index} className={className}>
                      {line}
                    </div>
                  );
                })}
            </code>
          </pre>
        </div>
      </div>
    </SingleWrapSection>
  );
}
