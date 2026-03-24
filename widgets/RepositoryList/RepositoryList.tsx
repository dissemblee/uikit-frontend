import { RepositoryCard } from "@features/RepositoryCard";
import { Link } from "react-router";
import { useGetAllRepositoriesQuery } from "@entities/repository";
import { ListWrapSection } from "@shared/ui/ListWrapSection";
import { ButtonCreate } from "@shared/ui/ButtonCreate";

export const RepositoryList = () => {
  const { data, isLoading, isError } = useGetAllRepositoriesQuery({ page: 1, perPage: 10 });

  const repositories =
    Array.isArray(data?.result)
      ? data.result
      : data?.result?.itemsLeft ?? [];

  return (
    <ListWrapSection
      title="Репозитории"
      action={
        <Link to="/repositories/create">
          <ButtonCreate />
        </Link>
      }
      isLoading={isLoading}
      isError={isError}
      isEmpty={repositories.length === 0}
      emptyMessage="Репозиториев пока нет"
      errorMessage="Не удалось загрузить репозитории"
    >
      {repositories.map((repo, i) => (
        <RepositoryCard repo={repo} key={repo.id} index={i} />
      ))}
    </ListWrapSection>
  )
}
