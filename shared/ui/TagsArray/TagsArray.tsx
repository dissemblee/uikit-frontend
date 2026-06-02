import { useState } from "react";
import styles from "./TagsArray.module.scss";
import { FiTag } from "react-icons/fi";

export const TagsArray = ({ tags }: { tags: string[] | undefined}) => {
  if (!tags || tags.length === 0) return null;

  const [showAllTags, setShowAllTags] = useState(false);
  const MAX_VISIBLE_TAGS = 5;

  return (
    <div>
      <div className={styles.TagsArray__Row}>
          <span className={styles.TagsArray__Label}>
            <FiTag size={14} />теги
          </span>
          <div className={styles.TagsArray__Tags}>
            {(showAllTags ? tags : tags.slice(0, MAX_VISIBLE_TAGS)).map((tag) => (
              <span key={tag} className={styles.TagsArray__Tag}>
                {tag.replace(/_/g, " ")}
              </span>
            ))}
            {!showAllTags && tags.length > MAX_VISIBLE_TAGS && (
              <button className={styles.TagsArray__Toggle} onClick={() => setShowAllTags(true)}>
                +{tags.length - MAX_VISIBLE_TAGS}
              </button>
            )}
            {showAllTags && tags.length > MAX_VISIBLE_TAGS && (
              <button className={styles.TagsArray__Toggle} onClick={() => setShowAllTags(false)}>
                скрыть
              </button>
            )}
          </div>
        </div>
    </div>
  );
};
