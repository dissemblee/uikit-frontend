import { FiCalendar, FiUser } from 'react-icons/fi';
import styled from './SingleWrapSection.module.scss'
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
      <section className={styled.SingleWrapSection}>
        <div className={styled.SingleWrapSection__SkeletonWrap}>
          <div className={styled.SingleWrapSection__SkeletonHeader}>
            <div className={styled.SingleWrapSection__SkeletonIcon} />
            <div className={styled.SingleWrapSection__SkeletonInfo}>
              <div className={styled.SingleWrapSection__SkeletonLine} />
              <div className={styled.SingleWrapSection__SkeletonLine} />
            </div>
          </div>
          <div className={styled.SingleWrapSection__SkeletonRows}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={styled.SingleWrapSection__SkeletonRow}>
                <div className={styled.SingleWrapSection__SkeletonRowLabel} />
                <div className={styled.SingleWrapSection__SkeletonRowValue} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (props.state === "not_found") {
    return (
      <section className={styled.SingleWrapSection}>
        <div className={styled.SingleWrapSection__NotFound}>
          {props.icon}
          <h3>Запись не найдена</h3>
          {props.path && <p>{props.path}</p>}
        </div>
      </section>
    );
  }

  const hasSidebar = Boolean(props.extraSide);

  return (
    <section className={styled.SingleWrapSection}>
      <div className={hasSidebar ? styled.SingleWrapSection__Card : styled['SingleWrapSection__Card--full']}>
        <div className={styled.SingleWrapSection__CardLeft}>
          <div className={styled.SingleWrapSection__Header}>
            <div className={styled.SingleWrapSection__HeaderTitle}>
              <div className={styled.SingleWrapSection__Icon}>
                {props.icon}
              </div>
              <div>
                <h2 className={styled.SingleWrapSection__Name}>{props.title}</h2>
                {props.path && (
                  <span className={styled.SingleWrapSection__Path}>
                    {props.path}
                  </span>
                )}
              </div>
            </div>
            {props.extraActions && (
              <div className={styled.SingleWrapSection__HeaderActions}>
                {props.extraActions}
              </div>
            )}
          </div>

          <Link to={`/profile/${props.username}`} className={styled.SingleWrapSection__LinkProfile}>
            <InfoRow label='автор' icon={<FiUser size={12} />} value={props.username} />
          </Link>
          <InfoRow label='создан' icon={<FiCalendar size={12} />} value={props.entity?.createdAt || props.entity?.startedAt} isDate />
          {props.children}

          {props.entity?.description && (
            <div className={styled.SingleWrapSection__Description}>
              <h4>описание</h4>
              <p>{props.entity?.description}</p>
            </div>
          )}

          {props.extraChildren && (
            <div className={styled.SingleWrapSection__ExtraChildren}>
              {props.extraChildren}
            </div>
          )}
        </div>

        {hasSidebar && (
          <div className={styled.SingleWrapSection__CardRight}>
            {props.extraSide}
          </div>
        )}

      </div>
    </section>
  )
}
