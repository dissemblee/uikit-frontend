import styled from "./ProfileSkeleton.module.scss"

export const ProfileSkeleton = () => {
  return (
    <section className={styled.ProfileSkeleton}>
      <div className={styled.ProfileSkeleton__Card}>
        <div className={styled.ProfileSkeleton__Header}>
          <div className={styled.ProfileSkeleton__HeaderTop}>
            <div className={styled.ProfileSkeleton__Avatar} />
            <div className={styled.ProfileSkeleton__HeaderInfo}>
              <div className={`${styled.ProfileSkeleton__Line} ${styled["ProfileSkeleton__Line--name"]}`} />
              <div className={`${styled.ProfileSkeleton__Line} ${styled["ProfileSkeleton__Line--sub"]}`} />
            </div>
          </div>
          <div className={`${styled.ProfileSkeleton__Line} ${styled["ProfileSkeleton__Line--nav"]}`} />
        </div>

        <div className={styled.ProfileSkeleton__Body}>
          {[0, 1].map(i => (
            <div key={i} className={styled.ProfileSkeleton__Row}>
              <div className={`${styled.ProfileSkeleton__Line} ${styled["ProfileSkeleton__Line--label"]}`} />
              <div className={`${styled.ProfileSkeleton__Line} ${styled["ProfileSkeleton__Line--value"]}`} />
            </div>
          ))}
        </div>

        <div className={styled.ProfileSkeleton__Stats}>
          <div className={styled.ProfileSkeleton__Grid}>
            {[0, 1, 2, 3].map(i => (
              <div key={i} className={styled.ProfileSkeleton__StatCard} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
