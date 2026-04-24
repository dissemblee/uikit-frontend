import { Link } from "react-router";
import { ComponentCard } from "@features/ComponentCard";
import { useGetAllComponentsQuery } from "@entities/component";
import { ListWrapSection } from "@shared/ui/ListWrapSection";
import { ButtonCreate } from "@shared/ui/ButtonCreate";
import { Button } from "@shared/ui/Button";
import { useState } from "react";

export const ComponentList = () => {
  const [currentSkip, setCurrentSkip] = useState(0);
  const limit = 10;
  
  const { data, isLoading, isError, isFetching } = useGetAllComponentsQuery({ 
    skip: currentSkip,
    limit,
  });

  const components = data?.result?.data || [];
  const itemsLeft = data?.result?.itemsLeft || 0;
  const hasMore = itemsLeft > 0;

  const loadMore = () => {
    const nextSkip = data?.result?.skipWithCurrentTimestamp;
    if (nextSkip) {
      setCurrentSkip(nextSkip);
    }
  };

  return (
    <ListWrapSection
      title="обзор компонентов"
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
      {components.map(comp => (
        <ComponentCard component={comp} key={comp.id} />
      ))}
      
      {hasMore && (
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <Button 
            onClick={loadMore} 
            disabled={isFetching}
            variant="secondary"
          >
            {isFetching   
              ? "Загрузка..." 
              : `Показать еще (осталось ${itemsLeft})`
            }
          </Button>
        </div>
      )}
    </ListWrapSection>
  );
};
