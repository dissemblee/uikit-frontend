import { RepositoryCard } from "@features/RepositoryCard";
import { Link, useParams } from "react-router";
import { useGetAllRepositoriesQuery } from "@entities/repository";
import { ListWrapSection } from "@shared/ui/ListWrapSection";
import { ButtonCreate } from "@shared/ui/ButtonCreate";
import { useState } from "react";
import { useCursorPagination } from "@shared/hooks/useCursorPagination";
import { LoadMoreButton } from "@shared/ui/LoadMoreButton";
import { Input, Select } from "@shared/ui/Inputs";

type SortType = "asc" | "desc";

export const RepositoryList = () => {
  const { username } = useParams();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortType>("desc");
  const limit = 10;

  const { cursor, loadMore, isFirstPage } = useCursorPagination({
    limit,
    resetOn: [search, sort, username],
  });

  const { data, isLoading, isError, isFetching } = useGetAllRepositoriesQuery({
    skip: cursor.skip,
    limit,
    startDate: cursor.startDate,
    sort,
      ...(username
      ? { username }
      : {
          query: search || undefined,
        }),
  });

  const descOptions = [
    { value: "desc", label: "Сначала новые" },
    { value: "asc", label: "Сначала старые" },
  ];

  const repositories = data?.result?.data ?? [];
  const itemsLeft = data?.result?.itemsLeft ?? 0;

  return (
    <ListWrapSection
      title={username ? `репозитории ${username}` : "обзор репозиториев"}
      action={
        <Link to="/repositories/create">
          <ButtonCreate />
        </Link>
      }
      isLoading={isLoading && isFirstPage}
      isError={isError}
      isEmpty={repositories.length === 0 && !isLoading}
      emptyMessage="Репозиториев пока нет"
      errorMessage="Не удалось загрузить репозитории"
      totalCount={repositories.length}
      loadTime={performance.now()}
      filters={
        !username && (
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <Input
              type="text"
              placeholder="Поиск..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              label="Поиск по имени"
            />
            <Select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortType)}
              options={descOptions}
              label="Сортировка по времени"
            />
          </div>
        )
      }
    >
      {repositories.map((repo, i) => (
        <RepositoryCard repo={repo} key={repo.id} index={i} />
      ))}

      {itemsLeft > 0 && (
        <LoadMoreButton
          itemsLeft={itemsLeft}
          isFetching={isFetching}
          onClick={() => loadMore(data?.result)}
        />
      )}
    </ListWrapSection>
  )
}
