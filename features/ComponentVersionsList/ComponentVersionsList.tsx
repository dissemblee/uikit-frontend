import { useState } from "react";
import { useSearchParams } from "react-router";
import { useGetAllBuildsQuery } from "@entities/component";
import { useGetAllRepoBuildsQuery } from "@entities/repository";
import { Button } from "@shared/ui/Button";
import styles from "./ComponentVersionsList.module.scss";
import { BuildStatus } from "@entities/build/build.dto";
import { formatDate } from "@shared/lib/time";

interface BaseProps {
  currentBuildId?: string;
}

interface ComponentProps extends BaseProps {
  type: "component";
  componentId: string;
}

interface RepoProps extends BaseProps {
  type: "repo";
  repoId: string;
}

type Props = ComponentProps | RepoProps;

const PAGE_SIZE = 10;

export const ComponentVersionsList = (props: Props) => {
  const { currentBuildId } = props;
  const [page, setPage] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const isRepo = props.type === "repo";

  const { data: componentData, isFetching: componentFetching } = useGetAllBuildsQuery(
    {
      componentId: !isRepo ? (props as ComponentProps).componentId : undefined,
      skip: page * PAGE_SIZE,
      limit: PAGE_SIZE,
      status: BuildStatus.SUCCESS,
    },
    { skip: isRepo }
  );

  const { data: repoData, isFetching: repoFetching } = useGetAllRepoBuildsQuery(
    {
      repoId: isRepo ? (props as RepoProps).repoId : undefined,
      skip: page * PAGE_SIZE,
      limit: PAGE_SIZE,
      status: BuildStatus.SUCCESS,
    },
    { skip: !isRepo }
  );

  const data = isRepo ? repoData : componentData;
  const isFetching = isRepo ? repoFetching : componentFetching;

  const builds = data?.result?.data ?? [];
  const itemsLeft = data?.result?.itemsLeft ?? 0;
  const itemsSkipped = data?.result?.itemsSkipped ?? 0;
  const total = itemsSkipped + builds.length + itemsLeft;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const selectVersion = (version: number, isLatest: boolean) => {
    if (isLatest) {
      searchParams.delete("version");
    } else {
      searchParams.set("version", String(version));
    }
    setSearchParams(searchParams);
  };

  if (!builds.length && !isFetching) {
    return <div className={styles.ComponentVersionsList__Empty}>версий пока нет</div>;
  }

  const latestVersion = builds[0]?.version;

  return (
    <div className={styles.ComponentVersionsList}>
      <div className={styles.ComponentVersionsList__Header}>
        история версий
        <span className={styles.ComponentVersionsList__Total}>({total})</span>
      </div>

      <div className={styles.ComponentVersionsList__List}>
        {builds.map((build) => {
          const isCurrent = build.id === currentBuildId;
          const isLatest = build.version === latestVersion;
          const rowClasses = [
            styles.ComponentVersionsList__Row,
            isCurrent && styles["ComponentVersionsList__Row--current"],
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              key={build.id}
              type="button"
              className={rowClasses}
              onClick={() => selectVersion(build.version, isLatest)}
              disabled={isCurrent}
            >
              <span className={styles.ComponentVersionsList__Version}>v{build.version}</span>
              {isCurrent && (
                <span className={styles.ComponentVersionsList__Badge}>текущая</span>
              )}
              <span className={styles.ComponentVersionsList__Date}>
                {formatDate(build.startedAt)}
              </span>
            </button>
          );
        })}
      </div>

      {pageCount > 1 && (
        <div className={styles.ComponentVersionsList__Pagination}>
          <Button
            variant="secondary"
            disabled={page === 0 || isFetching}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          >
            ←
          </Button>
          <span className={styles.ComponentVersionsList__PageInfo}>
            {page + 1} / {pageCount}
          </span>
          <Button
            variant="secondary"
            disabled={page + 1 >= pageCount || isFetching}
            onClick={() => setPage((p) => p + 1)}
          >
            →
          </Button>
        </div>
      )}
    </div>
  );
};
