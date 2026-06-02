import type { ComponentDto } from "@entities/component";
import styles from "./ComponentCard.module.scss";
import { BaseCard } from "@shared/ui/BaseCard";
import { FiCode } from "react-icons/fi";

interface ComponentCardProps {
  component: ComponentDto;
  index?: number;
}

export const ComponentCard = ({ component, index = 0 }: ComponentCardProps) => {
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
        component.tags && (
          <>
            {component.tags.map((tag) => (
              <span key={tag} className={styles.ComponentCard__Badge}>
                {tag}
              </span>
            ))}
          </>
        )
      }
    />
  );
};
