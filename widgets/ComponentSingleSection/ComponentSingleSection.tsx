import { useParams } from "react-router";
import { useGetComponentByIdQuery } from "@entities/component";
import { useGetComponentSourceQuery } from "@entities/component";
import { FiCode, FiGitBranch, FiPackage, } from "react-icons/fi";
import { SingleWrapSection } from "@shared/ui/SingleWrapSection";
import { DownloadMenu } from "@shared/ui/DownloadMenu";
import { ComponentStat } from "@features/ComponentStat";
import { InfoRow } from "@shared/ui/InfoRow";
import { TagsArray } from "@shared/ui/TagsArray";
import { ComponentPlayground } from "@shared/ui/ComponentPlayground";

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

  if (isLoading) return <SingleWrapSection state="loading" />;

  if (!component) return <SingleWrapSection state="not_found" />;

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
          downloadUrl={`http://localhost:8080/api/components/builds/${component.result!.buildId}/package`}
        />
      }
      extraSide={
        <ComponentStat id={component.result!.id} />
      }
      extraChildren={
        <ComponentPlayground buildId={component.result!.buildId} text={text} />
      }
    >
      <InfoRow label="framework" value={component.result!.framework} icon={<FiPackage size={14} />} />
      <InfoRow label="версия" value={component.result!.version} icon={<FiGitBranch size={14} />} />
      <TagsArray tags={component.result!.tags} />
    </SingleWrapSection>
  );
};
