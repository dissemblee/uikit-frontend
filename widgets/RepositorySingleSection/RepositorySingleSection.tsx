import { useParams } from "react-router";
import { FiBox, FiFolder, FiGitCommit } from "react-icons/fi";
import styles from "./RepositorySingleSection.module.scss";
import { SingleWrapSection } from "@shared/ui/SingleWrapSection";
import { useGetRepositoryByIdQuery } from "@entities/repository/repository.api";
import { DownloadMenu } from "@shared/ui/DownloadMenu";
import { FileTree } from "@features/FileTree";

export const RepositorySingleSection = () => {
  const { username, name } = useParams<{ username: string; name: string }>();

  const { data: repo, isLoading: repoLoading } = useGetRepositoryByIdQuery({
    username: username!,
    name: name!,
  });

  if (repoLoading) return <SingleWrapSection state="loading" />;
  if (!repo) return <SingleWrapSection state="not_found" />;

  const packageId = `${username}/${name}`;
  const downloadUrl = `http://localhost:8082/api/repo/package/${packageId}`;
  const components: string[] = repo?.components ?? [];

  return (
    <SingleWrapSection
      entity={repo}
      state="success"
      title={repo?.id}
      path={`${repo?.id}`}
      icon={<FiBox size={32} />}
      username={username}
      extraActions={<DownloadMenu downloadUrl={downloadUrl} />}
      extraChildren={
        components.length > 0 ? (
          <div className={styles.FileTree}>
            <div className={styles.FileTree__Header}>
              <FiGitCommit size={14} />
              <span>
                {components.length} компонент
                {components.length === 1 ? "" : components.length < 5 ? "а" : "ов"}
              </span>
            </div>

            <div className={styles.FileTree__Root}>
              <div className={styles.FileTree__RootRow}>
                <FiFolder size={14} className={styles.FileTree__FolderIcon} />
                <span className={styles.FileTree__RootName}>{name}</span>
              </div>

              <div className={styles.FileTree__Files}>
                {components.map((componentPath) => (
                  <FileTree
                    key={componentPath}
                    componentPath={componentPath}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : null
      }
    >
      <></>
    </SingleWrapSection>
  );
};
