import { useParams } from "react-router";
import { useGetComponentByIdQuery } from "@entities/component";
import { FiCode, FiPackage } from "react-icons/fi";
import styled from "./ComponentSingleSection.module.scss";
import { SingleWrapSection } from "@shared/ui/SingleWrapSection";
import { DownloadMenu } from "@shared/ui/DownloadMenu";

export const ComponentSingleSection = () => {
  const { username, name } = useParams<{ username: string; name: string }>();

  const { data: component, isLoading: componentLoading } = useGetComponentByIdQuery({ 
    username: username!, 
    name: name! 
  });

  if (componentLoading) {
    return <SingleWrapSection state="loading" />;
  }

  if (!component) {
    return (
      <SingleWrapSection state="not_found" />
    );
  }

  const packageId = `${username}/${name}`;
  const downloadUrl = `http://localhost:8080/api/components/package/${packageId}`;

  return (
    <SingleWrapSection
      entity={component}
      state="success"
      title={component?.name}
      path={`${component?.username}/${component?.name}`}
      icon={<FiCode size={32} />}
      username={username}
      extraActions={
        <DownloadMenu downloadUrl={downloadUrl} />
      }
    >
      <div className={styled.ComponentSingleSection__InfoRow}>
        <span className={styled.ComponentSingleSection__InfoLabel}>
          <FiPackage size={14} /> фреймворк
        </span>
        <span className={styled.ComponentSingleSection__InfoValue}>{component?.framework}</span>
      </div>
    </SingleWrapSection>
  );
};
