import type { ReactNode } from "react"
import styled from "./ListWrapSection.module.scss"
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
        <code className={styled.ListWrapSection__TitleCode}>
          <span className={styled.ListWrapSection__Comment}>//</span>
          <span>{titleText}</span>
        </code>
      )
    }

    const lastWord = words.pop()
    const restText = words.join(" ")

    return (
      <code className={styled.ListWrapSection__TitleCode}>
        <span className={styled.ListWrapSection__Comment}>//</span>
        <span>{restText} </span>
        <span className={styled.ListWrapSection__HighlightTitle}>{lastWord}</span>
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
    <section className={styled.ListWrapSection}>
      <div className={styled.ListWrapSection__Header}>
        <div className={styled.ListWrapSection__HeaderLeft}>
          {formatTitle(title)}
          {shouldShowStats && (
            <code className={styled.ListWrapSection__StatsBadge}>
              <span className={styled.ListWrapSection__StatsDollar}>$</span>
              <span className={styled.ListWrapSection__StatsCmd}>ls</span>
              <span className={styled.ListWrapSection__StatsOut}>{getItemsCountText()}</span>
            </code>
          )}
        </div>
        {action && (
          <div className={styled.ListWrapSection__Action}>
            {action}
          </div>
        )}
      </div>

      {/* ── Main panel card ── */}
      <div className={styled.ListWrapSection__Panel}>

        {filters && (
          <div className={styled.ListWrapSection__Filters}>
            {filters}
          </div>
        )}

        <div className={styled.ListWrapSection__Body}>

          {isLoading && renderSkeletons()}

          {isError && !isLoading && (
            <div className={styled.ListWrapSection__State}>
              <span className={styled.ListWrapSection__StateIcon}>{errorIcon}</span>
              <code className={styled.ListWrapSection__StateMessage}>
                <span className={styled.ListWrapSection__ErrorPrompt}>[ERROR]</span>
                {errorMessage}
              </code>
            </div>
          )}

          {!isLoading && !isError && isEmpty && (
            <div className={styled.ListWrapSection__State}>
              <span className={styled.ListWrapSection__StateIcon}>{emptyIcon}</span>
              <code className={styled.ListWrapSection__StateMessage}>
                <span className={styled.ListWrapSection__InfoPrompt}>[INFO]</span>
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
