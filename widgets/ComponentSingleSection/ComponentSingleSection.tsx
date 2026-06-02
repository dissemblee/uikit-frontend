import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useGetComponentByIdQuery } from "@entities/component";
import { useGetComponentSourceQuery } from "@entities/component";
import { FiCode, FiGitBranch, FiPackage, FiTag } from "react-icons/fi";
import styles from "./ComponentSingleSection.module.scss";
import { SingleWrapSection } from "@shared/ui/SingleWrapSection";
import { DownloadMenu } from "@shared/ui/DownloadMenu";
import ShikiHighlighter from "react-shiki";
import { ComponentStat } from "@features/ComponentStat";
import { InfoRow } from "@shared/ui/InfoRow";
import { TagsArray } from "@shared/ui/TagsArray";
// import StatCard from "StatCard" // Пример для компонентов
// import MyButton from "shawarmaRepo/shawarma.js" // пример для реп
// import Why from "useGetComponentSourceQueryRepo/EnterprisePricingShowcase.js"

export const ComponentSingleSection = () => {
  const { username, name } = useParams<{ username: string; name: string }>();
  const { data: component, isLoading } = useGetComponentByIdQuery({
    username: username!,
    name: name!,
  });

  const { data: text } = useGetComponentSourceQuery(
    { id: component?.result?.buildId! },
    { skip: !component?.result?.buildId },
  );

  const [tab, setTab] = useState<"preview" | "code">("code");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'resize' && iframeRef.current) {
        iframeRef.current.style.height = `${e.data.height + 100}px`;
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  if (isLoading) return <SingleWrapSection state="loading" />;

  if (!component) return <SingleWrapSection state="not_found" />;

  const packageId = `${username}/${name}/${component.result!.version}`;

  return (
    <SingleWrapSection
      entity={component}
      state="success"
      title={component.result!.name}
      path={`${component.result!.username}/${component.result!.name}`}
      icon={<FiCode size={32} />}
      username={username}
      extraActions={
        <DownloadMenu
          downloadUrl={`http://localhost:8080/api/components/load/${packageId}`}
        />
      }
      extraSide={<ComponentStat id={component.result!.id} />}
      extraChildren={
        <div className={styles.ComponentSingleSection}>
          <div
            className={styles.ComponentSingleSection__Tabs}
            onClick={() => setIsOpen((v) => !v)}
            style={{ cursor: "pointer" }}
          >
            <span className={styles.ComponentSingleSection__Toggle}>
              {isOpen ? "▾" : "▸"}
            </span>
            {isOpen && (
              <>
                <span
                  className={tab === "code" ? styles.ComponentSingleSection__TabActive : styles.ComponentSingleSection__Tab}
                  onClick={(e) => { e.stopPropagation(); setTab("code"); }}
                >
                  $ view --исходный код
                </span>
                <span
                  className={tab === "preview" ? styles.ComponentSingleSection__TabActive : styles.ComponentSingleSection__Tab}
                  onClick={(e) => { e.stopPropagation(); setTab("preview"); }}
                >
                  $ view --предпросмотр
                </span>
              </>
            )}
            {!isOpen && (
              <span className={styles.ComponentSingleSection__Tab}>
                $ view --исходный код / предпросмотр
              </span>
            )}
          </div>

          {isOpen && (
            <div className={styles.ComponentSingleSection__Body}>
              {tab === "preview" && (
                <>
                  {component?.result?.id && (
                    <iframe
                      ref={iframeRef}
                      src={`http://localhost:8080/api/components/previews/${component.result!.id}/page`}
                      sandbox="allow-scripts"
                      className={styles.ComponentSingleSection__Preview}
                      style={{ height: 0 }}
                    />
                  )}
                </>
              )}
              {tab === "code" && (
                <ShikiHighlighter language={"ts"} theme="github-light" showLineNumbers>
                  {text || "Source code not available"}
                </ShikiHighlighter>
              )}
            </div>
          )}
        </div>
      }
    >
      <InfoRow label="framework" value={component.result!.framework} icon={<FiPackage size={14} />} />
      <InfoRow label="версия" value={component.result!.version} icon={<FiGitBranch size={14} />} />
      <TagsArray tags={component.result!.tags} />
    </SingleWrapSection>
  );
};
