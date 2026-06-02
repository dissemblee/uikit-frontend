import { useGetComponentByIdQuery, useGetComponentSourceQuery } from "@entities/component";
import { useState } from "react";
import ShikiHighlighter from "react-shiki";
import styles from "./FileRow.module.scss";
import { FiChevronDown, FiChevronRight, FiCode, FiExternalLink } from "react-icons/fi";
import { Link } from "react-router";

export const FileTree = ({ componentPath }: { componentPath: string }) => {
  const [open, setOpen] = useState(false);

  const [compUsername, compName] = componentPath.split("/");

  const { data: component } = useGetComponentByIdQuery(
    { username: compUsername, name: compName },
    { skip: !open }
  );

  const { data: source, isLoading: sourceLoading } = useGetComponentSourceQuery(
    { id: component?.id! },
    { skip: !open || !component?.id }
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
          {compName}
          <span className={styles.FileTree__FileExt}>.tsx</span>
        </span>

        <Link
          to={`/components/${compUsername}/${compName}`}
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
