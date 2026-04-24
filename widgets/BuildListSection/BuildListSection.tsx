import { ListWrapSection } from "@shared/ui/ListWrapSection";
import { useGetAllBuildsQuery } from "@entities/build";
import { BuildCard } from "@features/BuildCard";

export const BuildListSection = () => {
  const { data, isLoading, isError } = useGetAllBuildsQuery({ page: 1, perPage: 10 });

  const builds =
    Array.isArray(data?.result)
      ? data.result
      : data?.result?.itemsLeft ?? [];

  return (
    <ListWrapSection
      title="обзор ваших сборок"
      isLoading={isLoading}
      isError={isError}
      isEmpty={builds.length === 0}
      emptyMessage="Вы пока не сделали ни одной сборки"
      errorMessage="Не удалось загрузить ваши сборки"
    >
      {builds.map((build, i) => (
        <BuildCard build={build} key={build.id} index={i} />
      ))}
    </ListWrapSection>
  )
}
