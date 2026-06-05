import type { RepositoryDto } from "@entities/repository";
import { FiBox, FiLock, FiUnlock } from "react-icons/fi";
import styles from "./RepositoryCard.module.scss";
import { BaseCard } from "@shared/ui/BaseCard";

const MAX_VISIBLE_TAGS = 3;

export const RepositoryCard = ({ repo, index = 0 }: { repo: RepositoryDto; index?: number }) => {
  const tags = repo.tags ?? [];
  const visibleTags = tags.slice(0, MAX_VISIBLE_TAGS);
  const hiddenCount = tags.length - visibleTags.length;

  return (
    <BaseCard
      to={`/repositories/${repo.username}/${repo.name}`}
      index={index}
      icon={<FiBox />}
      name={repo.name}
      sub={repo.description}
      username={repo.username}
      date={repo.createdAt}
      right={
        tags.length > 0 && (
          <>
            {visibleTags.map((tag) => (
              <span key={tag} className={styles.ComponentCard__Badge}>
                {tag.replace(/_/g, " ")}
              </span>
            ))}
            {hiddenCount > 0 && (
              <span
                className={styles.ComponentCard__More}
                title={tags.slice(MAX_VISIBLE_TAGS).join(", ")}
              >
                +{hiddenCount}
              </span>
            )}
          </>
        )
      }
    />
  );
};
