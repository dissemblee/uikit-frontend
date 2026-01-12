import type { RepositoryDto } from "@entities/repository"
import moment from "moment"
import { Link, useNavigate } from "react-router"
import styles from "./RepositoryCard.module.scss"

export const RepositoryCard = ({ repo }:{ repo: RepositoryDto}) => {
  const navigate = useNavigate()

  return (
    <article className={styles.RepositoryCard} onClick={() => navigate(`/repository/${repo.id}`)}>
      <h3>
        <Link to={`/repositories/${repo.id}`}>
          {repo.name}
        </Link>
      </h3>
      <p>
        {repo.description}
      </p>

      <div>
        <span>
          Фреймворк: {repo.framework}
        </span> <br />
        <span>
          Дата обновления: {moment(repo.updatedAt).format('DD:MM:YYYY')}
        </span>
      </div>
    </article>
  )
}