import type { ComponentDto } from "@entities/component";
import styles from "./ComponentCard.module.scss";
import { BaseCard } from "@shared/ui/BaseCard";

interface ComponentCardProps {
  component: ComponentDto;
  index?: number;
}

export const ComponentCard = ({ component, index = 0 }: ComponentCardProps) => {
  return (
    <BaseCard
      to={`/components/${component.id}`}
      index={index}
      icon="🧩"
      name={component.name}
      sub={component.description}
      meta={component.meta}
      date={component.updatedAt}
      extra={
        component.type && (
          <span className={styles.ComponentCard__Type}>
            {component.type}
          </span>
        )
      }
      right={
        <span className={styles.ComponentCard__Version}>
          v{component.version}
        </span>
      }
    />
  );
};
