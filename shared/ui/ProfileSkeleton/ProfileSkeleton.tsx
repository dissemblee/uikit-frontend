import styles from "./ProfileSkeleton.module.scss"

export const ProfileSkeleton = () => {
  return (
    <section className={styles.ProfileSkeleton}>
      <div className={styles.ProfileSkeleton__Card}>
        <div className={styles.ProfileSkeleton__Header}>
          <div className={styles.ProfileSkeleton__HeaderTop}>
            <div className={styles.ProfileSkeleton__Avatar} />
            <div className={styles.ProfileSkeleton__HeaderInfo}>
              <div className={`${styles.ProfileSkeleton__Line} ${styles["ProfileSkeleton__Line--name"]}`} />
              <div className={`${styles.ProfileSkeleton__Line} ${styles["ProfileSkeleton__Line--sub"]}`} />
            </div>
          </div>
          <div className={`${styles.ProfileSkeleton__Line} ${styles["ProfileSkeleton__Line--nav"]}`} />
        </div>

        <div className={styles.ProfileSkeleton__Body}>
          {[0, 1].map(i => (
            <div key={i} className={styles.ProfileSkeleton__Row}>
              <div className={`${styles.ProfileSkeleton__Line} ${styles["ProfileSkeleton__Line--label"]}`} />
              <div className={`${styles.ProfileSkeleton__Line} ${styles["ProfileSkeleton__Line--value"]}`} />
            </div>
          ))}
        </div>

        <div className={styles.ProfileSkeleton__Stats}>
          <div className={styles.ProfileSkeleton__Grid}>
            {[0, 1, 2, 3].map(i => (
              <div key={i} className={styles.ProfileSkeleton__StatCard} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
