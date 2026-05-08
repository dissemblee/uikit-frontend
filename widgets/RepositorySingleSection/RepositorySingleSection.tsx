import { Link, useParams } from "react-router";
import { FiBox } from "react-icons/fi";
import styled from "./RepositorySingleSection.module.scss";
import { SingleWrapSection } from "@shared/ui/SingleWrapSection";
import { useGetRepositoryByIdQuery } from "@entities/repository/repository.api";
import { DownloadMenu } from "@shared/ui/DownloadMenu";

export const RepositorySingleSection = () => {
  const { username, name } = useParams<{ username: string; name: string }>();
  
  const { data: repo, isLoading: repoLoading } = useGetRepositoryByIdQuery({ 
    username: username!, 
    name: name!
  });

  if (repoLoading) {
    return <SingleWrapSection state="loading" />;
  }

  if (!repo) {
    return (
      <SingleWrapSection state="not_found" />
    );
  }

  const packageId = `${username}/${name}`;
  const downloadUrl = `http://localhost:8082/api/repo/package/${packageId}`;

  return (
    <SingleWrapSection
      entity={repo}
      state="success"
      title={repo?.id}
      path={`${repo?.id}`}
      icon={<FiBox size={32} />}
      username={username}
      extraActions={
        <DownloadMenu downloadUrl={downloadUrl} />
      }
    >
      {repo?.components && repo?.components?.length > 0 && (
        <div className={styled.RepositorySingleSection__Components}>
          <h4>компоненты</h4>
          <div className={styled.RepositorySingleSection__ComponentsList}>
            {repo?.components?.map((component, index) => (
              <span key={index} className={styled.RepositorySingleSection__ComponentTag}>
                <Link to={`/components/${component}`}>
                  {component}
                </Link>
              </span>
            ))}
          </div>
        </div>
      )}
    </SingleWrapSection>
  );
};
