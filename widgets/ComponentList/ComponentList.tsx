import { Link, useParams } from "react-router";
import { useState } from "react";

import { ComponentCard } from "@features/ComponentCard";

import { ListWrapSection } from "@shared/ui/ListWrapSection";
import { ButtonCreate } from "@shared/ui/ButtonCreate";
import { Button } from "@shared/ui/Button";
import { useGetAllComponentsQuery, useGetComponentsByUserQuery } from "@entities/component";

export const ComponentList = () => {
  const [currentSkip, setCurrentSkip] = useState(0);
  const limit = 5;

  const { username } = useParams();

  const allComponentsQuery = useGetAllComponentsQuery(
    {
      skip: currentSkip,
      limit,
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

  const activeQuery = username
    ? userComponentsQuery
    : allComponentsQuery;

  const {
    data,
    isLoading,
    isError,
    isFetching,
  } = activeQuery;

  const components = data?.result?.data || [];
  const itemsLeft = data?.result?.itemsLeft || 0;

  const hasMore = itemsLeft > 0;

  const loadMore = () => {
    const nextSkip =
      data?.result?.skipWithCurrentTimestamp;

    if (nextSkip) {
      setCurrentSkip(nextSkip);
    }
  };

  return (
    <ListWrapSection
      title={
        username
          ? `компоненты ${username}`
          : "обзор компонентов"
      }
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
      loadTime={performance.now()}
    >
      {components.map((comp) => (
        <ComponentCard
          component={comp}
          key={comp.id}
        />
      ))}

      {hasMore && (
        <div
          style={{
            textAlign: "center",
            marginTop: "24px",
          }}
        >
          <Button
            onClick={loadMore}
            disabled={isFetching}
            variant="secondary"
          >
            {isFetching
              ? "Загрузка..."
              : `Показать еще (осталось ${itemsLeft})`}
          </Button>
        </div>
      )}
    </ListWrapSection>
  );
};