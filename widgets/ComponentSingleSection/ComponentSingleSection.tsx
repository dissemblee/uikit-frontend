import { useState } from "react";
import { useParams } from "react-router";
import { useGetComponentByIdQuery } from "@entities/component";
import { Button } from "@shared/ui/Button";
import { FiCode, FiDownload, FiUser, FiCalendar, FiPackage, FiBox } from "react-icons/fi";
import styled from "./ComponentSingleSection.module.scss";
import { tokenStore } from "@shared/tokenStore";
import { useGetComponentSourceQuery, useLazyGetComponentPackageQuery } from "@entities/component/component.api";
import { SingleWrapSection } from "@shared/ui/SingleWrapSection";

export const ComponentSingleSection = () => {
  const { username, name } = useParams<{ username: string; name: string }>();
  
  const { data: component, isLoading: componentLoading } = useGetComponentByIdQuery({ 
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

  if (componentLoading) {
    return (
      <section className={styled.ComponentSingleSection}>
        <div className={styled.ComponentSingleSection__Card}>
          <div className={styled.ComponentSingleSection__SkeletonWrap}>
            <div className={styled.ComponentSingleSection__SkeletonIcon} />
            <div className={styled.ComponentSingleSection__SkeletonLine} />
            <div className={styled.ComponentSingleSection__SkeletonLine} />
          </div>
        </div>
      </section>
    );
  }

  if (!component) {
    return (
      <section className={styled.ComponentSingleSection}>
        <div className={styled.ComponentSingleSection__Card}>
          <div className={styled.ComponentSingleSection__NotFound}>
            <FiBox size={48} />
            <h3>Компонент не найден</h3>
            <p>{username}/{name}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <SingleWrapSection
      entity={component}
      entityLoading={componentLoading}
      title={component.name}
      path={`${component.username}/${component.name}`}
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
      <div className={styled.ComponentSingleSection__Info}>
        <div className={styled.ComponentSingleSection__InfoRow}>
          <span className={styled.ComponentSingleSection__InfoLabel}>
            <FiUser size={14} /> автор
          </span>
          <span className={styled.ComponentSingleSection__InfoValue}>{component.username}</span>
        </div>
        <div className={styled.ComponentSingleSection__InfoRow}>
          <span className={styled.ComponentSingleSection__InfoLabel}>
            <FiPackage size={14} /> фреймворк
          </span>
          <span className={styled.ComponentSingleSection__InfoValue}>{component.framework}</span>
        </div>
        <div className={styled.ComponentSingleSection__InfoRow}>
          <span className={styled.ComponentSingleSection__InfoLabel}>
            <FiCalendar size={14} /> создан
          </span>
          <span className={styled.ComponentSingleSection__InfoValue}>
            {new Date(component.createdAt).toLocaleDateString("ru-RU", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
      {component.description && (
        <div className={styled.ComponentSingleSection__Description}>
          <h4>описание</h4>
          <p>{component.description}</p>
        </div>
      )}
    </SingleWrapSection>
  );
};
