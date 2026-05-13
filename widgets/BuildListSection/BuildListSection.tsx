import { ListWrapSection } from "@shared/ui/ListWrapSection";
import { useGetUserBuildsQuery } from "@entities/build";
import { BuildCard } from "@features/BuildCard";
import { useUserInfo } from "@shared/hooks/useUserInfo";

export const BuildListSection = () => {
  const { displayName } = useUserInfo();
  const { data, isLoading, isError } = useGetUserBuildsQuery({ username: displayName });
  console.log(data)
  const builds = data

  return (
    <ListWrapSection
      title="обзор ваших сборок"
      isLoading={isLoading}
      isError={isError}
      isEmpty={builds?.length === 0 && !isLoading}
      emptyMessage="Вы пока не сделали ни одной сборки"
      errorMessage="Не удалось загрузить ваши сборки"
      totalCount={builds?.length}
      loadTime={performance.now()}
    >
      {builds?.map((build, i) => (
        <BuildCard build={build} key={build.id} index={i} />
      ))}
    </ListWrapSection>
  )
}
