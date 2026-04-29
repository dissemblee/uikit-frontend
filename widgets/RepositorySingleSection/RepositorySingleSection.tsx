import { useParams } from "react-router";
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

  const [downloadPackage, { isLoading: isDownloading }] = useLazyGetComponentPackageQuery();

  const handleDownload = async () => {
    if (!username || !name) return;

    try {
      const token = tokenStore.get();
      
      const response = await fetch(
        `http://localhost/api/components/package/${username}/${name}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Ошибка загрузки");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${username}_${name}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Ошибка при скачивании:", error);
    }
  };

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
      title={repo.name}
      path={`${repo.username}/${repo.name}`}
      icon={<FiCode size={32} />}
      extraActions={
        <Button 
          variant="primary" 
          nonBlock 
          className={styled.SingleWrapSection_DownloadButton}
          onClick={handleDownload}
          disabled={isDownloading}
        >
          <FiDownload /> 
          {isDownloading ? "загрузка..." : "установить"}
        </Button>
      }
    >
      <div className={styled.RepositorySingleSection__Info}>
        <div className={styled.RepositorySingleSection__InfoRow}>
          <span className={styled.RepositorySingleSection__InfoLabel}>
            <FiUser size={14} /> автор
          </span>
          <span className={styled.RepositorySingleSection__InfoValue}>{repo.username}</span>
        </div>
        <div className={styled.RepositorySingleSection__InfoRow}>
          <span className={styled.RepositorySingleSection__InfoLabel}>
            <FiPackage size={14} /> фреймворк
          </span>
          <span className={styled.RepositorySingleSection__InfoValue}>{repo.framework}</span>
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
      {repo.description && (
        <div className={styled.RepositorySingleSection__Description}>
          <h4>описание</h4>
          <p>{repo.description}</p>
        </div>
      )}
    </SingleWrapSection>
  );
};
