import { Link, useParams } from "react-router";
import { useState } from "react";
import { ComponentCard } from "@features/ComponentCard";
import { ListWrapSection } from "@shared/ui/ListWrapSection";
import { ButtonCreate } from "@shared/ui/ButtonCreate";
import {
  Framework,
  useGetAllComponentsQuery,
  type ComponentDto,
} from "@entities/component";
import { Input, Select } from "@shared/ui/Inputs";
import { useCursorPagination } from "@shared/hooks/useCursorPagination";
import { LoadMoreButton } from "@shared/ui/LoadMoreButton/LoadMoreButton";

type SortType = "asc" | "desc";

export const ComponentList = () => {
  const { username } = useParams();
  const limit = 10;

  const [search, setSearch] = useState("");
  const [framework, setFramework] = useState<Framework | "">("");
  const [sort, setSort] = useState<SortType>("desc");

  const { cursor, loadMore, isFirstPage } = useCursorPagination({
    limit,
    resetOn: [search, framework, sort, username],
  });

  const { data, isLoading, isError, isFetching } = useGetAllComponentsQuery({
    skip: cursor.skip,
    limit,
    startDate: cursor.startDate,
    sort,
    ...(username
      ? { username }
      : {
          query: search || undefined,
          framework: framework || undefined,
        }),
  });

  const items = data?.result?.data ?? [];
  const itemsLeft = data?.result?.itemsLeft ?? 0;

  const frameworkOptions = [
    { value: "", label: "Все фреймворки" },
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "svelte", label: "Svelte" },
  ];

  const descOptions = [
    { value: "desc", label: "Сначала новые" },
    { value: "asc", label: "Сначала старые" },
  ];

  return (
    <ListWrapSection
      title={username ? `компоненты ${username}` : "обзор компонентов"}
      action={
        <Link to="/components/create">
          <ButtonCreate />
        </Link>
      }
      isLoading={isLoading && isFirstPage}
      isError={isError}
      isEmpty={items.length === 0 && !isLoading}
      emptyMessage="Компонентов пока нет"
      errorMessage="Не удалось загрузить компоненты"
      totalCount={items.length}
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
              value={framework}
              onChange={(e) => setFramework(e.target.value as Framework | "")}
              options={frameworkOptions}
              label="Фреймворки"
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
      {items.map((comp: ComponentDto) => (
        <ComponentCard component={comp} key={comp.id} />
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
