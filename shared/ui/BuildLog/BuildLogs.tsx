import type { BuildDto } from "@entities/component";
import styles from "./BuildLog.module.scss";
import type { BuildRepoDto } from "@entities/repository";

export const BuildLogs = ({build}: {build: BuildDto | BuildRepoDto}) => {
  return (
    <div className={styles.BuildLog__LogsWrapper}>
      <div className={styles.BuildLogs__LogsCard}>
        <div className={styles.BuildLogs__LogsHeader}>
          <span>build.log</span>
        </div>
        <pre className={styles.BuildLogs__Logs}>
          <code>
            {build.logs
              ?.split("\n")
              .filter(Boolean)
              .map((line, index) => {
                const level =
                  line.includes("[ERROR]") ? "error"
                  : line.includes("[WARN]") ? "warn"
                  : line.includes("[DEBUG]") ? "debug"
                  : line.includes("[SUCCESS]") ? "success"
                  : "info";

                const className =
                  level === "error" ? styles["BuildLogs__Logs--error"]
                  : level === "warn" ? styles["BuildLogs__Logs--warn"]
                  : level === "success" ? styles["BuildLogs__Logs--success"]
                  : level === "debug" ? styles["BuildLogs__Logs--debug"]
                  : "";

                return (
                  <div key={index} className={className}>
                    {line}
                  </div>
                );
              })}
          </code>
        </pre>
      </div>
    </div>
  );
};
