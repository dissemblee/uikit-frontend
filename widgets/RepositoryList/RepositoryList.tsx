import { RepositoryCard } from "@features/RepositoryCard";
import { Link } from "react-router";
import { useGetAllRepositoriesQuery } from "@entities/repository";
import { ListWrapSection } from "@shared/ui/ListWrapSection";
import { ButtonCreate } from "@shared/ui/ButtonCreate";
import { useState } from "react";
import { Button } from "@shared/ui/Button/Button";

export const RepositoryList = () => {
  const [currentSkip, setCurrentSkip] = useState(0);
  const limit = 10;

  const { data, isLoading, isError, isFetching } = useGetAllRepositoriesQuery({ skip: currentSkip, limit });

  const repositories = data?.result?.data || [];
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
      title="обзор репозиториев"
      action={
        <Link to="/repositories/create">
          <ButtonCreate />
        </Link>
      }
      isLoading={isLoading}
      isError={isError}
      isEmpty={repositories.length === 0 && !isLoading}
      emptyMessage="Репозиториев пока нет"
      errorMessage="Не удалось загрузить репозитории"
    >
      {repositories.map((repo, i) => (
        <RepositoryCard repo={repo} key={repo.id} index={i} />
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
  )
}
