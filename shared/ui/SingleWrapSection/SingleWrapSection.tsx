import { FiCalendar, FiUser } from 'react-icons/fi';
import styled from './SingleWrapSection.module.scss'

interface BaseProps {
  path?: string;
  icon?: React.ReactNode;
  extraActions?: React.ReactNode;
  username?: string;
  extraChildren?: React.ReactNode;
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
        <div className={styled.SingleWrapSection__Card}>
          <div className={styled.SingleWrapSection__SkeletonWrap}>
            <div className={styled.SingleWrapSection__SkeletonIcon} />
            <div className={styled.SingleWrapSection__SkeletonLine} />
            <div className={styled.SingleWrapSection__SkeletonLine} />
          </div>
        </div>
      </section>
    );
  }

  if (props.state === "not_found") {
    return (
      <section className={styled.SingleWrapSection}>
        <div className={styled.SingleWrapSection__Card}>
          <div className={styled.SingleWrapSection__NotFound}>
            {props.icon}
            <h3>Запись не найдена</h3>
            <p>{props.path}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styled.SingleWrapSection}>
      <div className={styled.SingleWrapSection__Card}>
        <div className={styled.SingleWrapSection__Header}>
          <div className={styled.SingleWrapSection__HeaderTitle}>
            <div className={styled.SingleWrapSection__Icon}>
              {props.icon}
            </div>
            <div>
              <h2 className={styled.SingleWrapSection__Name}>{props.title}</h2>
              <span className={styled.SingleWrapSection__Path}>
                {props.path}
              </span>
            </div>
          </div>
          {props.extraActions && (
            <>
              {props.extraActions}
            </>
          )}
        </div>
          <div className={styled.SingleWrapSection__Info}>
            {props.username && (
              <div className={styled.SingleWrapSection__InfoRow}>
                <span className={styled.SingleWrapSection__InfoLabel}>
                  <FiUser size={14} /> автор
                </span>
                <span className={styled.SingleWrapSection__InfoValue}>{props.username}</span>
              </div>
            )}
            <div className={styled.SingleWrapSection__InfoRow}>
              <span className={styled.SingleWrapSection__InfoLabel}>
                <FiCalendar size={14} /> создан
              </span>
              <span className={styled.SingleWrapSection__InfoValue}>
                {new Date(props.entity?.createdAt || props.entity?.startedAt).toLocaleDateString("ru-RU", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            {props.children}
          </div>
          {props.entity?.description && (
            <div className={styled.SingleWrapSection__Description}>
              <h4>описание</h4>
              <p>{props.entity?.description}</p>
            </div>
          )}
          {props.extraChildren && (
            <>
              {props.extraChildren}
            </>
          )}
      </div>
    </section>
  )
}
