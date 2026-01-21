import type { RepositoryDto } from "@entities/repository"
import moment from "moment"
import { Link, useNavigate } from "react-router"
import styles from "./ComponentCard.module.scss"

export const ComponentCard = ({ component }:{ component: RepositoryDto}) => {
  const navigate = useNavigate()

  return (
    <article className={styles.ComponentCard} onClick={() => navigate(`/repository/${component.id}`)}>
      <h3>
        <Link to={`/repositories/${component.id}`}>
          {component.name}
        </Link>
      </h3>
      <p>
        {component.description}
      </p>

      <div>
        <span>
          Фреймворк: {component.framework}
        </span> <br />
        <span>
          Дата обновления: {moment(component.updatedAt).format('DD:MM:YYYY')}
        </span>
      </div>
    </article>
  )
}