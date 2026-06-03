import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { useGetAllBuildsQuery } from "@entities/component";
import { Button } from "@shared/ui/Button";
import styles from "./ComponentVersionsList.module.scss";
import { BuildStatus } from "@entities/build/build.dto";

interface Props {
  componentId: string;
  currentBuildId?: string;
}

const PAGE_SIZE = 10;

const formatDate = (iso: string) =>
  iso !== "none"
    ? new Date(iso).toLocaleString("ru", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

export const ComponentVersionsList = ({ componentId, currentBuildId }: Props) => {
  const [page, setPage] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isFetching } = useGetAllBuildsQuery({
    componentId,
    skip: page * PAGE_SIZE,
    limit: PAGE_SIZE,
    status: BuildStatus.SUCCESS,
  });

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
