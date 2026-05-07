import { Link, useParams } from "react-router";
import { Button } from "@shared/ui/Button";
import { FiCode, FiDownload, FiUser, FiCalendar, FiPackage, FiBox } from "react-icons/fi";
import styled from "./RepositorySingleSection.module.scss";
import { tokenStore } from "@shared/tokenStore";
import { useLazyGetComponentPackageQuery } from "@entities/component/component.api";
import { SingleWrapSection } from "@shared/ui/SingleWrapSection";
import { useGetRepositoryByIdQuery } from "@entities/repository/repository.api";

export const RepositorySingleSection = () => {
  const { username, name } = useParams<{ username: string; name: string }>();
  
  const { data: repo, isLoading: repoLoading } = useGetRepositoryByIdQuery({ 
    username: username!, 
    name: name!
  });

  const packageId = `${username}/${name}`;
  const downloadUrl = `http://localhost:82/api/repo/package/${packageId}`;

  if (repoLoading) {
    return (
      <section className={styled.RepositorySingleSection}>
        <div className={styled.RepositorySingleSection__Card}>
          <div className={styled.RepositorySingleSection__SkeletonWrap}>
            <div className={styled.RepositorySingleSection__SkeletonIcon} />
            <div className={styled.RepositorySingleSection__SkeletonLine} />
            <div className={styled.RepositorySingleSection__SkeletonLine} />
          </div>
        </div>
      </section>
    );
  }

  if (!repo) {
    return (
      <section className={styled.RepositorySingleSection}>
        <div className={styled.RepositorySingleSection__Card}>
          <div className={styled.RepositorySingleSection__NotFound}>
            <FiBox size={48} />
            <h3>Репозиторий не найден</h3>
            <p>{username}/{name}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <SingleWrapSection
      entity={repo}
      entityLoading={repoLoading}
      title={repo.id}
      path={`${repo.id}`}
      icon={<FiCode size={32} />}
      extraActions={
        <a 
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styled.RepositorySingleSection__DownloadLink}
        >
          <Button 
            variant="primary" 
            nonBlock 
            className={styled.SingleWrapSection_DownloadButton}
            >
            <FiDownload /> 
            установить
          </Button>
        </a>
      }
    >
      <div className={styled.RepositorySingleSection__Info}>
        <div className={styled.RepositorySingleSection__InfoRow}>
          <span className={styled.RepositorySingleSection__InfoLabel}>
            <FiUser size={14} /> автор
          </span>
          <span className={styled.RepositorySingleSection__InfoValue}>{username}</span>
        </div>
        <div className={styled.RepositorySingleSection__InfoRow}>
          <span className={styled.RepositorySingleSection__InfoLabel}>
            <FiCalendar size={14} /> создан
          </span>
          <span className={styled.RepositorySingleSection__InfoValue}>
            {new Date(repo.createdAt).toLocaleDateString("ru-RU", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
      {repo.components && repo.components.length > 0 && (
        <div className={styled.RepositorySingleSection__Components}>
          <h4>компоненты</h4>
          <div className={styled.RepositorySingleSection__ComponentsList}>
            {repo.components.map((component, index) => (
              <span key={index} className={styled.RepositorySingleSection__ComponentTag}>
                <Link to={`/components/${component}`}>
                  {component}
                </Link>
              </span>
            ))}
          </div>
        </div>
      )}
      {repo.description && (
        <div className={styled.RepositorySingleSection__Description}>
          <h4>описание</h4>
          <p>{repo.description}</p>
        </div>
      )}
    </SingleWrapSection>
  );
};
