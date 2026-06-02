import { FiCalendar, FiUser } from 'react-icons/fi';
import styles from './SingleWrapSection.module.scss'
import { Link } from 'react-router';
import { InfoRow } from '../InfoRow';

interface BaseProps {
  path?: string;
  icon?: React.ReactNode;
  extraActions?: React.ReactNode;
  username?: string;
  extraChildren?: React.ReactNode;
  extraSide?: React.ReactNode;
}

interface LoadingProps extends BaseProps {
  state: "loading";
}

interface NotFoundProps extends BaseProps {
  state: "not_found";
}

interface SuccessProps extends BaseProps {
  state: "success";
  entity: any;
  title: string;
  children: React.ReactNode;
}

type SingleWrapSectionProps =
  | LoadingProps
  | NotFoundProps
  | SuccessProps;

export const SingleWrapSection = (props: SingleWrapSectionProps) => {

  if (props.state === "loading") {
    return (
      <section className={styles.SingleWrapSection}>
        <div className={styles.SingleWrapSection__SkeletonWrap}>
          <div className={styles.SingleWrapSection__SkeletonHeader}>
            <div className={styles.SingleWrapSection__SkeletonIcon} />
            <div className={styles.SingleWrapSection__SkeletonInfo}>
              <div className={styles.SingleWrapSection__SkeletonLine} />
              <div className={styles.SingleWrapSection__SkeletonLine} />
            </div>
          </div>
          <div className={styles.SingleWrapSection__SkeletonRows}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={styles.SingleWrapSection__SkeletonRow}>
                <div className={styles.SingleWrapSection__SkeletonRowLabel} />
                <div className={styles.SingleWrapSection__SkeletonRowValue} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (props.state === "not_found") {
    return (
      <section className={styles.SingleWrapSection}>
        <div className={styles.SingleWrapSection__NotFound}>
          {props.icon}
          <h3>Запись не найдена</h3>
          {props.path && <p>{props.path}</p>}
        </div>
      </section>
    );
  }

  const hasSidebar = Boolean(props.extraSide);

  return (
    <section className={styles.SingleWrapSection}>
      <div className={hasSidebar ? styles.SingleWrapSection__Card : styles['SingleWrapSection__Card--full']}>
        <div className={styles.SingleWrapSection__CardLeft}>
          <div className={styles.SingleWrapSection__Header}>
            <div className={styles.SingleWrapSection__HeaderTitle}>
              <div className={styles.SingleWrapSection__Icon}>
                {props.icon}
              </div>
              <div>
                <h2 className={styles.SingleWrapSection__Name}>{props.title}</h2>
                {props.path && (
                  <span className={styles.SingleWrapSection__Path}>
                    {props.path}
                  </span>
                )}
              </div>
            </div>
            {props.extraActions && (
              <div className={styles.SingleWrapSection__HeaderActions}>
                {props.extraActions}
              </div>
            )}
          </div>

          <Link to={`/profile/${props.username}`} className={styles.SingleWrapSection__LinkProfile}>
            <InfoRow label='автор' icon={<FiUser size={12} />} value={props.username} />
          </Link>
          <InfoRow label='создан' icon={<FiCalendar size={12} />} value={props.entity?.result?.createdAt || props.entity?.result?.startedAt} isDate />
          {props.children}

          {props.entity?.result?.description && (
            <div className={styles.SingleWrapSection__Description}>
              <h4>описание</h4>
              <p>{props.entity?.result?.description}</p>
            </div>
          )}

          {props.extraChildren && (
            <div className={styles.SingleWrapSection__ExtraChildren}>
              {props.extraChildren}
            </div>
          )}
        </div>

        {hasSidebar && (
          <div className={styles.SingleWrapSection__CardRight}>
            {props.extraSide}
          </div>
        )}

      </div>
    </section>
  )
}
