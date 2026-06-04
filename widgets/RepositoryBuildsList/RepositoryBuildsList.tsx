// import { ListWrapSection } from "@shared/ui/ListWrapSection";
// import { useGetUserRepositoryBuildsQuery } from "@entities/build";
// import { BuildCard } from "@features/BuildCard";
// import { useUserInfo } from "@shared/hooks/useUserInfo";

export const RepositoryBuildsList = () => {
  // const { displayName } = useUserInfo();
  // const { data: builds, isLoading, isError } =
  //   useGetUserRepositoryBuildsQuery({ username: displayName });

  return (
    // <ListWrapSection
    //   isLoading={isLoading}
    //   isError={isError}
    //   isEmpty={builds?.length === 0 && !isLoading}
    //   emptyMessage="Вы пока не собирали репозитории"
    //   errorMessage="Не удалось загрузить сборки репозиториев"
    //   totalCount={builds?.length}
    // >
    //   {builds?.map((build, i) => (
    //     <BuildCard build={build} key={build.id} index={i} />
    //   ))}
    // </ListWrapSection>
    <>Placeholder for Repository Builds List</>
  );
};