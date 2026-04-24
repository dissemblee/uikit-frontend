import { useNavigate } from "react-router"
import moment from "moment"
import styles from "./BaseCard.module.scss"
import type { ReactNode } from "react"

interface BaseCardProps {
  to: string
  index?: number
  className?: string
  icon: ReactNode
  name: ReactNode
  sub?: string
  meta?: Record<string, string> | string;
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

  const formatDate = (dateStr: string) => {
    const d = moment(dateStr)
    const now = moment()
    if (d.isSame(now, 'day')) {
      return `сегодня ${d.format('HH:mm')}`
    }
    if (d.isSame(now.subtract(1, 'day'), 'day')) {
      return `вчера ${d.format('HH:mm')}`
    }
    return d.format('DD MMM HH:mm')
  }

  const truncateText = (text: string, maxLength: number = 60) => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength).trim() + '...'
  }

  return (
    <article
      className={`${styles.BaseCard}${className ? ` ${className}` : ""}`}
      style={{ animationDelay: `${index * 30}ms` }}
      onDoubleClick={() => navigate(to)}
    >
      <code className={styles.BaseCard__Line}>
        <span className={styles.BaseCard__Prompt}>$</span>
        <span className={styles.BaseCard__Command}>cat {name}</span>
      </code>
      
      <div className={styles.BaseCard__Content}>
        <div className={styles.BaseCard__Left}>
          <div className={styles.BaseCard__Icon}>{icon}</div>
          <div className={styles.BaseCard__Info}>
            <span className={styles.BaseCard__Name}>{name}</span>
            {sub && (
              <span className={styles.BaseCard__Sub}>
                <span className={styles.BaseCard__Comment}>#</span>
                <span className={styles.BaseCard__SubText}>
                  {truncateText(sub, 50)}
                </span>
              </span>
            )}
          </div>
        </div>

        <div className={styles.BaseCard__Meta}>
          {extra && (
            <span className={styles.BaseCard__Extra}>
              {extra}
            </span>
          )}
          {meta && (
            <div className={styles.BaseCard__Tags}>
              {typeof meta === 'string' ? (
                <span className={styles.BaseCard__Tag}>
                  <span className={styles.BaseCard__TagValue}>{truncateText(meta, 30)}</span>
                </span>
              ) : (
                Object.entries(meta).map(([key, value]) => (
                  <span key={key} className={styles.BaseCard__Tag}>
                    <span className={styles.BaseCard__TagKey}>{key}:</span>
                    <span className={styles.BaseCard__TagValue}>{truncateText(value, 20)}</span>
                  </span>
                ))
              )}
            </div>
          )}
        </div>

        <div className={styles.BaseCard__Right}>
          {right && (
            <span className={styles.BaseCard__RightContent}>
              {right}
            </span>
          )}
          <span className={styles.BaseCard__Date}>
            <span className={styles.BaseCard__DateIcon}>⏱</span>
            <span>{formatDate(date)}</span>
          </span>
        </div>
      </div>
    </article>
  )
}
