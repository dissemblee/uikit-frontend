import type { ReactNode } from "react"
import styles from "./ListWrapSection.module.scss"
import { CardSkeleton } from "../CardSkeleton"

interface ListWrapSectionProps {
  title: string
  action?: ReactNode
  isLoading?: boolean
  isError?: boolean
  isEmpty?: boolean
  skeletonCount?: number
  errorMessage?: string
  emptyMessage?: string
  emptyIcon?: string
  errorIcon?: string
  skeleton?: ReactNode
  children: ReactNode
  totalCount?: number
  loadTime?: number
  filters?: ReactNode;
}

export const ListWrapSection = ({
  title,
  action,
  isLoading = false,
  isError = false,
  isEmpty = false,
  skeletonCount = 10,
  errorMessage = "exit code: 1",
  emptyMessage = "No records found (0 lines processed)",
  emptyIcon = "📭",
  errorIcon = "😕",
  children,
  totalCount,
  filters
}: ListWrapSectionProps) => {

  const renderSkeletons = () => {
    return Array.from({ length: skeletonCount }).map((_, i) => (
      <CardSkeleton key={i} />
    ))
  }

  const formatTitle = (titleText: string) => {
    const words = titleText.split(" ");

    if (words.length === 1) {
      return (
        <code className={styles.ListWrapSection__TitleCode}>
          <span className={styles.ListWrapSection__Comment}>//</span>
          <span>{titleText}</span>
        </code>
      )
    }

    const lastWord = words.pop()
    const restText = words.join(" ")

    return (
      <code className={styles.ListWrapSection__TitleCode}>
        <span className={styles.ListWrapSection__Comment}>//</span>
        <span>{restText} </span>
        <span className={styles.ListWrapSection__HighlightTitle}>{lastWord}</span>
      </code>
    )
  }

  const getItemsCountText = () => {
    if (totalCount === undefined) return null
    if (totalCount === 0) return "0 items"
    if (totalCount === 1) return "1 item"
    return `${totalCount} items`
  }

  const shouldShowStats = totalCount !== undefined

  return (
    <section className={styles.ListWrapSection}>
      <div className={styles.ListWrapSection__Header}>
        <div className={styles.ListWrapSection__HeaderLeft}>
          {formatTitle(title)}
          {shouldShowStats && (
            <code className={styles.ListWrapSection__StatsBadge}>
              <span className={styles.ListWrapSection__StatsDollar}>$</span>
              <span className={styles.ListWrapSection__StatsCmd}>ls</span>
              <span className={styles.ListWrapSection__StatsOut}>{getItemsCountText()}</span>
            </code>
          )}
        </div>
        {action && (
          <div className={styles.ListWrapSection__Action}>
            {action}
          </div>
        )}
      </div>

      <div className={styles.ListWrapSection__Panel}>

        {filters && (
          <div className={styles.ListWrapSection__Filters}>
            {filters}
          </div>
        )}

        <div className={styles.ListWrapSection__Body}>

          {isLoading && renderSkeletons()}

          {isError && !isLoading && (
            <div className={styles.ListWrapSection__State}>
              <span className={styles.ListWrapSection__StateIcon}>{errorIcon}</span>
              <code className={styles.ListWrapSection__StateMessage}>
                <span className={styles.ListWrapSection__ErrorPrompt}>[ERROR]</span>
                {errorMessage}
              </code>
            </div>
          )}

          {!isLoading && !isError && isEmpty && (
            <div className={styles.ListWrapSection__State}>
              <span className={styles.ListWrapSection__StateIcon}>{emptyIcon}</span>
              <code className={styles.ListWrapSection__StateMessage}>
                <span className={styles.ListWrapSection__InfoPrompt}>[INFO]</span>
                {emptyMessage}
              </code>
            </div>
          )}

          {!isLoading && !isError && !isEmpty && children}
        </div>
      </div>

    </section>
  )
}
