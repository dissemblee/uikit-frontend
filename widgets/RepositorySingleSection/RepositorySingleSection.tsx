import { useParams } from "react-router";
import { FiBox, FiFolder, FiGitBranch, FiGitCommit } from "react-icons/fi";
import styles from "./RepositorySingleSection.module.scss";
import { SingleWrapSection } from "@shared/ui/SingleWrapSection";
import { DownloadMenu } from "@shared/ui/DownloadMenu";
import { FileTree } from "@features/FileTree";
import { useGetRepositoryByIdQuery } from "@entities/repository";
import { InfoRow } from "@shared/ui/InfoRow";

const pluralComponents = (n: number) => {
  if (n === 1) return "компонент";
  if (n < 5) return "компонента";
  return "компонентов";
};

export const RepositorySingleSection = () => {
  const { username, name } = useParams<{ username: string; name: string }>();

  const { data, isLoading } = useGetRepositoryByIdQuery({
    username: username!,
    name: name!,
  });

  const repo = data?.result;

  if (isLoading) return <SingleWrapSection state="loading" />;

  if (!repo) return <SingleWrapSection state="not_found" />;

  const latestBuild = repo.builds?.[0];
  const components = latestBuild?.componentBuilds ?? [];

  return (
    <SingleWrapSection
      entity={repo}
      state="success"
      title={repo.name}
      path={`${repo.username}/${repo.name}`}
      icon={<FiBox size={32} />}
      username={username}
      extraActions={
        <DownloadMenu downloadUrl={`http://localhost:8082/api/repo/builds/${repo.latestBuildId}/package`} />
      }
      extraChildren={
        components.length > 0 ? (
          <div className={styles.FileTree}>
            <div className={styles.FileTree__Header}>
              <FiGitCommit size={14} />
              <span>
                {components.length} {pluralComponents(components.length)}
              </span>
            </div>

            <div className={styles.FileTree__Root}>
              <div className={styles.FileTree__RootRow}>
                <FiFolder size={14} className={styles.FileTree__FolderIcon} />
                <span className={styles.FileTree__RootName}>{repo.name}</span>
              </div>

              <div className={styles.FileTree__Files}>
                {components.map((component) => (
                  <FileTree
                    key={component.componentId}
                    component={component}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : null
      }
    >
      <InfoRow label="версия" value={repo!.latestBuildVersion} icon={<FiGitBranch size={14} />} />
    </SingleWrapSection>
  );
};
