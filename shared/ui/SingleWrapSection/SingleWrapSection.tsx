import { FiBox, FiCode, FiDownload } from 'react-icons/fi';
import styled from './SingleWrapSection.module.scss'
import { Button } from '../Button';

interface SingleWrapSectionProps {
  title: string;
  path?: string;
  icon?: React.ReactNode;
  entity: any;
  entityLoading: boolean;
  extraActions?: React.ReactNode;
  children: React.ReactNode;
}

export const SingleWrapSection = ({ title, path, icon, entity, entityLoading, extraActions, children }: SingleWrapSectionProps) => {
  if (entityLoading) {
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

  if (!entity) {
    return (
      <section className={styled.SingleWrapSection}>
        <div className={styled.SingleWrapSection__Card}>
          <div className={styled.SingleWrapSection__NotFound}>
            <FiBox size={48} />
            <h3>Запись не найдена</h3>
            <p>{path}</p>
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
              {icon}
            </div>
            <div>
              <h2 className={styled.SingleWrapSection__Name}>{title}</h2>
              <span className={styled.SingleWrapSection__Path}>
                {path}
              </span>
            </div>
          </div>
          {extraActions && (
            <>
              {extraActions}
            </>
          )}
        </div>
          {children}
      </div>
    </section>
  )
}