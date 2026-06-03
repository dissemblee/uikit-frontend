import { Link, useParams, useSearchParams } from "react-router";
import { useGetComponentByIdQuery } from "@entities/component";
import { useGetBuildSourceQuery } from "@entities/component";
import { FiCode, FiGitBranch, FiPackage, } from "react-icons/fi";
import { SingleWrapSection } from "@shared/ui/SingleWrapSection";
import { DownloadMenu } from "@shared/ui/DownloadMenu";
import { ComponentStat } from "@features/ComponentStat";
import { InfoRow } from "@shared/ui/InfoRow";
import { TagsArray } from "@shared/ui/TagsArray";
import { ComponentPlayground } from "@shared/ui/ComponentPlayground";
import { ComponentVersionsList } from "@features/ComponentVersionsList";
import { Tabs } from "@shared/ui/Tabs";
import { Button } from "@shared/ui/Button";

export const ComponentSingleSection = () => {
  const { username, name } = useParams<{ username: string; name: string }>();
  const [searchParams] = useSearchParams();
  const version = searchParams.get("version");

  const { data, isLoading } = useGetComponentByIdQuery({
    username: username!,
    name: name!,
    version: version ? Number(version) : undefined,
  });

  const component = data?.result

  const { data: text } = useGetBuildSourceQuery(
    { id: component?.buildId! },
    { skip: !component?.buildId },
  );

  if (isLoading) return <SingleWrapSection state="loading" />;

  if (!component) return <SingleWrapSection state="not_found" />;

  return (
    <SingleWrapSection
      entity={component}
      state="success"
      title={component!.name}
      path={`${component!.username}/${component!.name}`}
      icon={<FiCode size={32} />}
      username={username}
      extraActions={
        <div style={{ display: "flex", gap: "5px" }}>
          {username === component.username && 
            <Link
              to={`/components/${component.username}/${component.name}/version`}
            >
              <Button variant="secondary">Версионировать</Button>
            </Link>
          }
          <DownloadMenu
            downloadUrl={`http://localhost:8080/api/components/builds/${component!.buildId}/package`}
          />
        </div>
      }
      extraSide={
        <Tabs
          items={[
            {
              key: "stat",
              label: "статистика",
              content: <ComponentStat componentId={component.id} />,
            },
            {
              key: "versions",
              label: "версии",
              content: (
                <ComponentVersionsList
                  componentId={component.id}
                  currentBuildId={component.buildId}
                />
              ),
            },
          ]}
        />
      }
      extraChildren={
        <ComponentPlayground buildId={component!.buildId} text={text} />
      }
    >
      <InfoRow label="framework" value={component!.framework} icon={<FiPackage size={14} />} />
      <InfoRow label="версия" value={component!.version} icon={<FiGitBranch size={14} />} />
      <TagsArray tags={component!.tags} />
    </SingleWrapSection>
  );
};
