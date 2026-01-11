import { MOCK_REPOSITORIES } from "@entities/repository/MOCK_REPOSITORIES";
import { RepositoryCard } from "@features/RepositoryCard"
import { Button } from "@shared/ui/Button";
import { Link } from "react-router";

export const RepositoryList = () => {
  const repositories = MOCK_REPOSITORIES;

  return (
    <section>
      <h1>Репозитории</h1>
      <Button><Link to={"/repositories/create"}>Создать репозиторий</Link></Button>
      {repositories ? ( 
        repositories.map((repo, key) => <RepositoryCard repo={repo} key={key} />)
      ) : (
        <>Нет данных</>
      )}
    </section>
  )
}