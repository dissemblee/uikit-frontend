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

  const packageId = `${username}/${name}`;
  const downloadUrl = `http://localhost:80/api/components/package/${packageId}`;

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
