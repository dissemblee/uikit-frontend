import { Link } from "react-router"
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
  meta?: string
  extra?: ReactNode
  date?: string | null | false
  right?: ReactNode
  username?: string
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
  username
}: BaseCardProps) => {

  const formatDate = (dateStr: string) => {
    const d   = moment(dateStr)
    const now = moment()
    if (d.isSame(now, "day")) return `сегодня ${d.format("HH:mm")}`
    if (d.isSame(now.clone().subtract(1, "day"), "day")) return `вчера ${d.format("HH:mm")}`
    return d.format("DD MMM HH:mm")
  }

  const truncate = (text: string, max = 60) =>
    text.length <= max ? text : text.slice(0, max).trim() + "…"

  return (
    <Link
      to={to}
      className={`${styles.BaseCard}${className ? ` ${className}` : ""}`}
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <div className={styles.BaseCard__Line}>
        <span className={styles.BaseCard__Prompt}>$</span>
        <span className={styles.BaseCard__Command}>
          <span className={styles.BaseCard__CommandSlash}>./</span>
          <span className={styles.BaseCard__CommandName}>{name}</span>
        </span>
      </div>

      <div className={styles.BaseCard__Content}>
        <div className={styles.BaseCard__Left}>
          <div className={styles.BaseCard__Icon}>{icon}</div>
          <div className={styles.BaseCard__Info}>
            <span className={styles.BaseCard__Name}>{name}</span>
            {sub && (
              <span className={styles.BaseCard__Sub}>
                <span className={styles.BaseCard__Comment}>#</span>
                <span className={styles.BaseCard__SubText}>{truncate(sub, 50)}</span>
              </span>
            )}
          </div>
        </div>

        <div className={styles.BaseCard__Meta}>
          {extra && <span className={styles.BaseCard__Tag}>{extra}</span>}
          {username ? <span className={styles.BaseCard__Tag}><Link to={`/profile/${username}`}>@{username}</Link></span> : null}
          {meta && (
            <span className={styles.BaseCard__Tag}>{meta}</span>
          )}
        </div>

        <div className={styles.BaseCard__Right}>
          {right && <span className={styles.BaseCard__RightContent}>{right}</span>}
          {date && (
            <span className={styles.BaseCard__Date}>
              <span className={styles.BaseCard__DateIcon}>⏱</span>
              <span>{formatDate(date)}</span>
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
