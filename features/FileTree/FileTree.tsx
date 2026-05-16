import { useGetComponentByIdQuery, useGetComponentSourceQuery } from "@entities/component";
import { useState } from "react";
import ShikiHighlighter from "react-shiki";
import styled from "./FileRow.module.scss";
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
    <div className={styled.FileTree__FileBlock}>
      <div className={styled.FileTree__FileRow}>
        <span className={styled.FileTree__LineGuide} aria-hidden />

        <button
          className={styled.FileTree__Toggle}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Скрыть код" : "Показать код"}
        >
          {open ? <FiChevronDown size={12} /> : <FiChevronRight size={12} />}
        </button>

        <FiCode size={13} className={styled.FileTree__FileIcon} />

        <span className={styled.FileTree__FileName}>
          {compName}
          <span className={styled.FileTree__FileExt}>.tsx</span>
        </span>

        <Link
          to={`/components/${compUsername}/${compName}`}
          className={styled.FileTree__FileLink}
          title="Открыть компонент"
        >
          <FiExternalLink size={12} />
        </Link>
      </div>

      {open && (
        <div className={styled.FileTree__CodeBlock}>
          {sourceLoading || !source ? (
            <div className={styled.FileTree__CodeLoading}>загрузка...</div>
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
