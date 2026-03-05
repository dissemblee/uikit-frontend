import moment from "moment"
import { Link, useNavigate } from "react-router"
import styles from "./ComponentCard.module.scss"
import type { ComponentDto } from "@entities/component"

export const ComponentCard = ({ component }:{ component: ComponentDto}) => {
  const navigate = useNavigate()

  return (
    <article className={styles.ComponentCard} onClick={() => navigate(`/repository/${component.id}`)}>
      <span className={styles.ComponentIcon}>📦 </span>
      <Link
        to={`/components/${component.id}`}
        onClick={(e) => e.stopPropagation()}
      >
        {component.name}
      </Link>

      <div className={styles.ComponentDetails}>{component.description}</div>

      <div className={styles.ComponentDetails}>{component.type}</div>

      <div className={styles.ComponentDetails}>
        {Object.entries(component.meta).map(([key, value]) => (
          <div key={key}>
            <strong>{key}:</strong> {value}
          </div>
        ))}
      </div>

      <div>
        {moment(component.updatedAt).format("DD.MM.YYYY")}
      </div>

      <span className={`${styles.ComponentBadge}`}>
        V.{component.version}
      </span>
    </article>
  )
}
