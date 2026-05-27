import { Link, useParams } from "react-router";
import { useState } from "react";
import { ComponentCard } from "@features/ComponentCard";
import { ListWrapSection } from "@shared/ui/ListWrapSection";
import { ButtonCreate } from "@shared/ui/ButtonCreate";
import { Button } from "@shared/ui/Button";
import { useGetAllComponentsQuery, useGetComponentsByUserQuery, type ComponentDto } from "@entities/component";
import { Input, Select } from "@shared/ui/Inputs";

type SortType = "asc" | "desc";

export const ComponentList = () => {
  const [currentSkip, setCurrentSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [framework, setFramework] = useState("");
  const [sort, setSort] = useState<SortType>("desc");
  const limit = 10;

  const { username } = useParams();

  const allComponentsQuery = useGetAllComponentsQuery(
    {
      skip: currentSkip,
      limit,
      search: search || undefined,
      framework: framework || undefined,
      sort,
    },
    {
      skip: Boolean(username),
    },
  );

  const userComponentsQuery = useGetComponentsByUserQuery(
    {
      username: String(username),
      skip: currentSkip,
      limit,
    },
    {
      skip: !username,
    },
  );

  const activeQuery = username ? userComponentsQuery : allComponentsQuery;

  const { data, isLoading, isError, isFetching } = activeQuery;

  const components = data?.data || [];
  const itemsLeft = data?.itemsLeft || 0;
  console.log(data)
  const hasMore = itemsLeft > 0;

  const loadMore = () => {
    const nextSkip = data?.skipWithCurrentTimestamp;
    if (nextSkip) setCurrentSkip(nextSkip);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentSkip(0);
  };

  const handleFrameworkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFramework(e.target.value);
    setCurrentSkip(0);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value as SortType);
    setCurrentSkip(0);
  };

  const frameworkOptions = [
    { value: "", label: "Все фреймворки" },
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "svelte", label: "Svelte" },
  ]

  const descOptions = [
    { value: "desc", label: "Сначала новые" },
    { value: "asc", label: "Сначала старые" },
  ]

  return (
    <ListWrapSection
      title={username ? `компоненты ${username}` : "обзор компонентов"}
      action={
        <Link to="/components/create">
          <ButtonCreate />
        </Link>
      }
      isLoading={isLoading && currentSkip === 0}
      isError={isError}
      isEmpty={components.length === 0 && !isLoading}
      emptyMessage="Компонентов пока нет"
      errorMessage="Не удалось загрузить компоненты"
      totalCount={components.length}
      filters={
        !username && (
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <Input
              type="text"
              placeholder="Поиск..."
              value={search}
              onChange={handleSearchChange} label={"Поиск по имени"}
            />
            <Select value={framework} onChange={handleFrameworkChange} options={frameworkOptions} label={"Фреймворки"} />
            <Select value={sort} onChange={handleSortChange} options={descOptions} label={"Сортировка по времени"} />
          </div>
        )
      }
    >
      {components.map((comp: ComponentDto) => (
        <ComponentCard component={comp} key={comp.id} />
      ))}

      {hasMore && (
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <Button onClick={loadMore} disabled={isFetching} variant="secondary">
            {isFetching ? "Загрузка..." : `Показать еще (осталось ${itemsLeft})`}
          </Button>
        </div>
      )}
    </ListWrapSection>
  );
};