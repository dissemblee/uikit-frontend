import { Button } from "@shared/ui/Button";
import { SingleWrapSection } from "@shared/ui/SingleWrapSection/SingleWrapSection";
import { FiCalendar, FiClock, FiCode, FiDownload, FiPackage } from "react-icons/fi";
import { Link, useParams } from "react-router";
import styled from "./BuildSingleSection.module.scss";
import { useGetBuildByIdQuery } from "@entities/build/build.api";
import { BuildStatus } from "@entities/build";
import moment from "moment";

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

export const BuildSingleSection = () => {
  const { buildId } = useParams<{ buildId: string }>();

  if (!buildId) {
    return <div>Build id not found</div>;
  }

  const { data: build, isLoading: buildLoading } = useGetBuildByIdQuery(buildId);

  if (buildLoading) {
    return <SingleWrapSection state="loading" />;
  }

  if (!build) {
    return (
      <SingleWrapSection state="not_found" />
    );
  }

  const status = statusConfig[build.status];
  const duration = getDuration(build.startedAt, build.finishedAt);

  return (
    <SingleWrapSection
      entity={build}
      state="success"
      title={build?.id}
      path={`${build?.repoId}`}
      icon={<FiCode size={32} />}
    >
      <>
        <div className={styled.BuildSingleSection__InfoRow}>
          <span className={styled.BuildSingleSection__InfoLabel}>
            <FiCalendar size={14} /> Завершен
          </span>
          <span className={styled.BuildSingleSection__InfoValue}>
            {build?.finishedAt ? new Date(build.finishedAt).toLocaleDateString("ru-RU", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }) : "В процессе..."}
          </span>
        </div>
        <div className={styled.BuildSingleSection__InfoRow}>
          <span className={styled.BuildSingleSection__InfoLabel}>
            <FiClock size={14} /> Продолжительность
          </span>
          <span className={styled.BuildSingleSection__InfoValue}>
            {duration}
          </span>
        </div>
        <div className={styled.BuildSingleSection__InfoRow}>
          <span className={styled.BuildSingleSection__InfoLabel}>
            <FiPackage size={14} /> Статус
          </span>
          <span className={`${styled.BuildSingleSection__Status} ${styled[`BuildSingleSection__Status--${status.className}`]}`}>
            {status.label}
          </span>
        </div>
        <div className={styled.BuildSingleSection__InfoRow}>
          <span className={styled.BuildSingleSection__InfoLabel}>
            <FiPackage size={14} /> Репозиторий
          </span>
          <span className={styled.BuildSingleSection__InfoValue}>
            <Link to={`/repositories/${build?.repoId}`} className={styled.BuildSingleSection__RepoLink}>
              {build?.repoId}
            </Link>
          </span>
        </div>
        <div className={styled.BuildSingleSection__InfoRow}>
          <div className={styled.BuildSingleSection__LogsWrapper}>
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
      </>
    </SingleWrapSection>
  );
}
