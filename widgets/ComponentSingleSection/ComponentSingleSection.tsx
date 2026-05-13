import { useState } from "react";
import { useParams } from "react-router";
import {
  useGetComponentByIdQuery,
} from "@entities/component";
import {
  useGetComponentPreviewQuery,
  useGetComponentSourceQuery,
} from "@entities/component";
import {
  FiCode,
  FiEye,
  FiPackage,
} from "react-icons/fi";
import styled from "./ComponentSingleSection.module.scss";
import { SingleWrapSection } from "@shared/ui/SingleWrapSection";
import { DownloadMenu } from "@shared/ui/DownloadMenu";
import ShikiHighlighter from "react-shiki";

export const ComponentSingleSection = () => {
  const [tab, setTab] = useState<"preview" | "code">("code");

  const { username, name } = useParams<{ username: string; name: string }>();

  const { data: component, isLoading } = useGetComponentByIdQuery({
    username: username!,
    name: name!,
  });

  const { data: preview } = useGetComponentPreviewQuery({
    username: username!,
    name: name!,
  });

  const { data: text } = useGetComponentSourceQuery({
    id: component?.id!,
  });

  if (isLoading) {
    return <SingleWrapSection state="loading" />;
  }

  if (!component) {
    return <SingleWrapSection state="not_found" />;
  }

  const packageId = `${username}/${name}`;

  return (
    <SingleWrapSection
      entity={component}
      state="success"
      title={component.name}
      path={`${component.username}/${component.name}`}
      icon={<FiCode size={32} />}
      username={username}
      extraActions={
        <DownloadMenu
          downloadUrl={`http://localhost:8080/api/component/package/${packageId}`}
        />
      }
      extraChildren={
        <div className={styled.ComponentSingleSection__Surface}>
          <div className={styled.ComponentSingleSection__Tabs}>
            <span
              className={
                tab === "code"
                  ? styled.ComponentSingleSection__TabActive
                  : styled.ComponentSingleSection__Tab
              }
              onClick={() => setTab("code")}
            >
              $ view --исходный код
            </span>
            <span
              className={
                tab === "preview"
                  ? styled.ComponentSingleSection__TabActive
                  : styled.ComponentSingleSection__Tab
              }
              onClick={() => setTab("preview")}
            >
              $ view --предпросмотр
            </span>
          </div>

          <div className={styled.ComponentSingleSection__Body}>
            {tab === "preview" && (
              <div className={styled.ComponentSingleSection__PreviewWrap}>
                {preview?.url && (
                  <iframe
                    src={`http://localhost:8080/api/component/preview-page/${component.id}`}
                    sandbox="allow-scripts"
                    className={styled.ComponentSingleSection__Preview}
                  />
                )}
              </div>
            )}

            {tab === "code" && (
              <ShikiHighlighter
                language={"ts"}
                theme="github-light"
                showLineNumbers
              >
                {text || "Source code not available"}
              </ShikiHighlighter>
            )}
          </div>
        </div>
      }
    >
      <div className={styled.ComponentSingleSection__InfoRow}>
        <span className={styled.ComponentSingleSection__InfoLabel}>
          <FiPackage size={14} />
          framework
        </span>

        <span className={styled.ComponentSingleSection__InfoValue}>
          {component.framework}
        </span>
      </div>
    </SingleWrapSection>
  );
};
