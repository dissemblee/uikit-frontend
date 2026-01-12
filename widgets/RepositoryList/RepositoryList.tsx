import { MOCK_REPOSITORIES } from "@entities/repository/MOCK_REPOSITORIES";
import { RepositoryCard } from "@features/RepositoryCard"
import { Button } from "@shared/ui/Button";
import { Link } from "react-router";
import styled from "./RepositoryList.module.scss";

export const RepositoryList = () => {
  const repositories = MOCK_REPOSITORIES;

  return (
    <section className={styled.RepositoryList}>
      <h1>Репозитории</h1>
      <Link to={"/repositories/create"}><Button>Создать репозиторий</Button></Link>
      <div className={styled.RepositoryList__Wrap}>
        {repositories ? ( 
          repositories.map((repo, key) => <RepositoryCard repo={repo} key={key} />)
        ) : (
          <>Нет данных</>
        )}
      </div>
    </section>
  )
}