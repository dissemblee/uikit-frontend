import { RepositoryCard } from "@features/RepositoryCard";
import { Button } from "@shared/ui/Button";
import styled from "./RepositoryList.module.scss";
import { Link } from "react-router";
import { useGetAllRepositoriesQuery } from "@entities/repository";

export const RepositoryList = () => {
  const { data, isLoading, isError } = useGetAllRepositoriesQuery({page: 1, perPage: 10});

  const repositories =
    Array.isArray(data?.result)
      ? data.result
      : data?.result?.itemsLeft ?? [];

  if (isError) return <div>Ошибка загрузки</div>;

  if (isError) return <div>Загрузка</div>;

  return (
    <section className={styled.RepositoryList}>
      <div className={styled.RepositoryHead}>
        <h1>Репозитории</h1>
        <Link to="/repositories/create">
          <Button>Создать репозиторий</Button>
        </Link>
      </div>

      <div className={styled.RepositoryList__Wrap}>
        {repositories.map(repo => (
          <RepositoryCard repo={repo} key={repo.id} />
        ))}
        {!repositories?.length && !isLoading && (
          <div>Видимо репозиториев еще нет...</div>
        )}
      </div>
    </section>
  );
};