import { ListWrapSection } from "@shared/ui/ListWrapSection";
import { BuildCard } from "@features/BuildCard";
import { useUserInfo } from "@shared/hooks/useUserInfo";
import { useGetAllBuildsQuery } from "@entities/component/api/build.api";
import { Input, Select } from "@shared/ui/Inputs";
import { useState } from "react";
import { useCursorPagination } from "@shared/hooks/useCursorPagination";
import { LoadMoreButton } from "@shared/ui/LoadMoreButton";

const statusOptions = [
  { value: "", label: "Все статусы" },
  { value: "pending", label: "Ожидание" },
  { value: "running", label: "В процессе" },
  { value: "success", label: "Завершено" },
  { value: "failed", label: "Ошибка" },
];

export const ComponentBuildsList = () => {
  const { displayName } = useUserInfo();
  const limit = 10;

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const { cursor, loadMore, isFirstPage } = useCursorPagination({
    limit,
    resetOn: [search, status, displayName],
  });

  const { data, isLoading, isError, isFetching } = useGetAllBuildsQuery({
    username: displayName,
    limit,
    skip: cursor.skip,
    startDate: cursor.startDate,
    query: search || undefined,
    status: status || undefined,
  });

  const builds = data?.result?.data ?? [];
  const itemsLeft = data?.result?.itemsLeft ?? 0;

  return (
    <ListWrapSection
      title={"Ваши сборки компонентов"}
      isLoading={isLoading && isFirstPage}
      isError={isError}
      isEmpty={builds.length === 0 && !isLoading}
      emptyMessage="Вы пока не собирали компоненты"
      errorMessage="Не удалось загрузить сборки компонентов"
      totalCount={builds.length}
      filters={
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <Input
            type="text"
            placeholder="Поиск по имени компонента..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            label="Поиск"
          />
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={statusOptions}
            label="Статус"
          />
        </div>
      }
    >
      {builds.map((build, i) => (
        <BuildCard componentBuild={build} key={build.id} index={i} />
      ))}

      {itemsLeft > 0 && (
        <LoadMoreButton
          itemsLeft={itemsLeft}
          isFetching={isFetching}
          onClick={() => loadMore(data?.result)}
        />
      )}
    </ListWrapSection>
  );
};
