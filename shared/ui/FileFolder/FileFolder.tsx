import { FiFolder, FiGitCommit } from "react-icons/fi"
import styles from "./FileFolder.module.scss"
import type { ReactNode } from "react";

export const FileFolder = ({length, name, fileTree}: {length: number, name: string, fileTree: ReactNode}) => {
  if (length === 0) return null
  return (
    <div className={styles.FileFolder}>
      <div className={styles.FileFolder__Header}>
        <FiGitCommit size={14} />
        <span>
          {length} {pluralComponents(length)}
        </span>
      </div>

      <div className={styles.FileFolder__Root}>
        <div className={styles.FileFolder__RootRow}>
          <FiFolder size={14} className={styles.FileFolder__FolderIcon} />
          <span>{name}</span>
        </div>

        <div className={styles.FileFolder__Files}>
          {fileTree}
        </div>
      </div>
    </div>
  )
}

const pluralComponents = (n: number) => {
  if (n === 1) return "компонент";
  if (n < 5) return "компонента";
  return "компонентов";
};
