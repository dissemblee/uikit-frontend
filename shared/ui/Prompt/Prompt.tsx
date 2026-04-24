import styles from "./Prompt.module.scss";

interface PromptProps {
  path: string;
  showCursor?: boolean;
}

export const Prompt = ({ path, showCursor = false }: PromptProps) => {
  return (
    <code className={styles.Prompt}>
      <span className={styles.Prompt__User}>user@uikit</span>
      <span className={styles.Prompt__Separator}>:</span>
      <span className={styles.Prompt__Path}>{path}</span>
      <span className={styles.Prompt__Dollar}>$</span>
      {showCursor && <span className={styles.Prompt__Cursor}>█</span>}
    </code>
  );
};