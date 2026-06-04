import { useGetBuildSourceQuery } from "@entities/component";
import { useState } from "react";
import ShikiHighlighter from "react-shiki";
import styles from "./FileTree.module.scss";
import { FiChevronDown, FiChevronRight, FiCode, FiExternalLink } from "react-icons/fi";
import { Link } from "react-router";

interface FileTreeProps {
  component: {
    componentId: string;
    buildId: string;
    name: string;
    username: string;
    version: number;
  };
}

export const FileTree = ({ component }: FileTreeProps) => {
  const [open, setOpen] = useState(false);

  const { data: source, isLoading: sourceLoading } = useGetBuildSourceQuery(
    { id: component.buildId },
    // { skip: !open },
  );

  return (
    <div className={styles.FileTree__FileBlock}>
      <div className={styles.FileTree__FileRow}>
        <span className={styles.FileTree__LineGuide} aria-hidden />

        <button
          className={styles.FileTree__Toggle}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Скрыть код" : "Показать код"}
        >
          {open ? <FiChevronDown size={12} /> : <FiChevronRight size={12} />}
        </button>

        <FiCode size={13} className={styles.FileTree__FileIcon} />

        <span className={styles.FileTree__FileName}>
          {component.name}
          <span className={styles.FileTree__FileExt}>.tsx</span>
        </span>

        <span className={styles.FileTree__FileVersion}>v{component.version}</span>

        <Link
          to={`/components/${component.username}/${component.name}`}
          className={styles.FileTree__FileLink}
          title="Открыть компонент"
        >
          <FiExternalLink size={12} />
        </Link>
      </div>

      {open && (
        <div className={styles.FileTree__CodeBlock}>
          {sourceLoading || !source ? (
            <div className={styles.FileTree__CodeLoading}>загрузка...</div>
          ) : (
            <ShikiHighlighter language="ts" theme="github-light" showLineNumbers>
              {source}
            </ShikiHighlighter>
          )}
        </div>
      )}
    </div>
  );
};
