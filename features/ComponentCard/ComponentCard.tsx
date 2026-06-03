import type { ComponentDto } from "@entities/component";
import styles from "./ComponentCard.module.scss";
import { BaseCard } from "@shared/ui/BaseCard";
import { FiCode } from "react-icons/fi";

interface ComponentCardProps {
  component: ComponentDto;
  index?: number;
}

const MAX_VISIBLE_TAGS = 3;

export const ComponentCard = ({ component, index = 0 }: ComponentCardProps) => {
  const tags = component.tags ?? [];
  const visibleTags = tags.slice(0, MAX_VISIBLE_TAGS);
  const hiddenCount = tags.length - visibleTags.length;

  return (
    <BaseCard
      to={`/components/${component.username}/${component.name}`}
      index={index}
      icon={<FiCode size={18} />}
      name={component.name}
      sub={component.description}
      meta={component.framework}
      date={component.createdAt}
      username={component.username}
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
