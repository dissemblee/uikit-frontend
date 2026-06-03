import { useState, type ReactNode } from "react";
import styles from "./Tabs.module.scss";
import { Button } from "../Button";

export interface TabItem {
  key: string;
  label: ReactNode;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultActiveKey?: string;
  activeKey?: string;
  onChange?: (key: string) => void;
  className?: string;
}

export const Tabs = ({
  items,
  defaultActiveKey,
  activeKey,
  onChange,
  className,
}: TabsProps) => {
  const [internalKey, setInternalKey] = useState(defaultActiveKey ?? items[0]?.key);

  const isControlled = activeKey !== undefined;
  const currentKey = isControlled ? activeKey : internalKey;

  const handleClick = (key: string) => {
    if (!isControlled) setInternalKey(key);
    onChange?.(key);
  };

  const activeItem = items.find((item) => item.key === currentKey) ?? items[0];

  const rootClasses = [styles.Tabs, className].filter(Boolean).join(" ");

  return (
    <div className={rootClasses}>
      <div className={styles.Tabs__Header} role="tablist">
        {items.map((item) => {
          const isActive = item.key === currentKey;
          return (
            <Button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              variant={isActive ? "primary" : "secondary"}
              onClick={() => handleClick(item.key)}
            >
              {item.label}
            </Button>
          );
        })}
      </div>

      <div className={styles.Tabs__Content} role="tabpanel">
        {activeItem?.content}
      </div>
    </div>
  );
};
