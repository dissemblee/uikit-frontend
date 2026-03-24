import { useNavigate } from "react-router"
import moment from "moment"
import { FiClock } from "react-icons/fi"
import styles from "./BaseCard.module.scss"
import type { ReactNode } from "react"

interface BaseCardProps {
  to: string
  index?: number
  className?: string
  icon: ReactNode
  name: ReactNode
  sub?: string
  meta?: Record<string, string>
  extra?: ReactNode;
  date: string
  right?: ReactNode
}

export const BaseCard = ({
  to,
  index = 0,
  className,
  icon,
  name,
  sub,
  meta,
  extra,
  date,
  right,
}: BaseCardProps) => {
  const navigate = useNavigate()

  return (
    <article
      className={`${styles.BaseCard}${className ? ` ${className}` : ""}`}
      style={{ animationDelay: `${index * 60}ms` }}
      onClick={() => navigate(to)}
    >
      <div className={styles.BaseCard__Left}>
        <div className={styles.BaseCard__Icon}>{icon}</div>
        <div className={styles.BaseCard__Info}>
          <span className={styles.BaseCard__Name}>{name}</span>
          {sub && <span className={styles.BaseCard__Sub}>{sub}</span>}
        </div>
      </div>
        <div className={styles.BaseCard__Meta}>
          {extra && (
            <>
              {extra}
            </>
          )}
          {meta && Object.keys(meta).length > 0 && (
            <div>
              {Object.entries(meta).map(([key, value]) => (
                <span key={key} className={styles.BaseCard__Tag}>
                  <span className={styles.BaseCard__TagKey}>{key}</span>
                  <span className={styles.BaseCard__TagValue}>{value}</span>
                </span>
              ))}
            </div>
          )}
        </div>

      <div className={styles.BaseCard__Right}>
        {right}
        <span className={styles.BaseCard__Date}>
          <FiClock />
          {moment(date).format("DD MMM YYYY")}
        </span>
      </div>
    </article>
  )
}
