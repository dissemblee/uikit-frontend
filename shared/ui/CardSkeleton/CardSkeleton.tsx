import styles from "./CardSkeleton.module.scss";

export const CardSkeleton = () => (
  <div className={styles.CardSkeleton}>
    <div className={styles.CardSkeleton__left}>
      <div className={`${styles.shimmer} ${styles.CardSkeleton__icon}`} />
      <div className={styles.CardSkeleton__info}>
        <div className={`${styles.shimmer} ${styles.CardSkeleton__name}`} />
        <div className={`${styles.shimmer} ${styles.CardSkeleton__desc}`} />
      </div>
    </div>
    <div className={styles.CardSkeleton__meta}>
      <div className={`${styles.shimmer} ${styles.CardSkeleton__tag}`} />
      <div className={`${styles.shimmer} ${styles.CardSkeleton__tag} ${styles.CardSkeleton__tag_short}`} />
    </div>
    <div className={styles.CardSkeleton__right}>
      <div className={`${styles.shimmer} ${styles.CardSkeleton__badge}`} />
      <div className={`${styles.shimmer} ${styles.CardSkeleton__date}`} />
    </div>
  </div>
);