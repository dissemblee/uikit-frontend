import type { RepositoryDto } from "@entities/repository";
import { FiBox, FiLock, FiUnlock } from "react-icons/fi";
import styles from "./RepositoryCard.module.scss";
import { BaseCard } from "@shared/ui/BaseCard";

export const RepositoryCard = ({ repo, index = 0 }: { repo: RepositoryDto; index?: number }) => {
  const isPublic = true;

  return (
    <BaseCard
      to={`/repository/${repo.id}`}
      index={index}
      icon={<FiBox />}
      name={repo.name}
      sub={repo.description}
      meta={repo.meta}
      date={repo.updatedAt}
      right={
        <span className={`${styles.RepositoryCard__Badge} ${styles[isPublic ? 'RepositoryCard__Badge--public' : 'RepositoryCard__Badge--private']}`}>
          {isPublic ? <FiUnlock /> : <FiLock />}
          {isPublic ? 'public' : 'private'}
        </span>
      }
    />
  );
};
