import { useState } from "react";
import styled from "./TagsArray.module.scss";
import { FiTag } from "react-icons/fi";

export const TagsArray = ({ tags }: { tags: string[] | undefined}) => {
  if (!tags || tags.length === 0) return null;

  const [showAllTags, setShowAllTags] = useState(false);
  const MAX_VISIBLE_TAGS = 5;

  return (
    <div>
      <div className={styled.TagsArray__Row}>
          <span className={styled.TagsArray__Label}>
            <FiTag size={14} />теги
          </span>
          <div className={styled.TagsArray__Tags}>
            {(showAllTags ? tags : tags.slice(0, MAX_VISIBLE_TAGS)).map((tag) => (
              <span key={tag} className={styled.TagsArray__Tag}>
                {tag.replace(/_/g, " ")}
              </span>
            ))}
            {!showAllTags && tags.length > MAX_VISIBLE_TAGS && (
              <button className={styled.TagsArray__Toggle} onClick={() => setShowAllTags(true)}>
                +{tags.length - MAX_VISIBLE_TAGS}
              </button>
            )}
            {showAllTags && tags.length > MAX_VISIBLE_TAGS && (
              <button className={styled.TagsArray__Toggle} onClick={() => setShowAllTags(false)}>
                скрыть
              </button>
            )}
          </div>
        </div>
    </div>
  );
};
