import { Link, useParams, useSearchParams } from "react-router";
import { FiBox, FiGitBranch } from "react-icons/fi";
import { SingleWrapSection } from "@shared/ui/SingleWrapSection";
import { DownloadMenu } from "@shared/ui/DownloadMenu";
import { FileTree } from "@features/FileTree";
import { useGetRepositoryByIdQuery, useGetRepositoryStatQuery } from "@entities/repository";
import { InfoRow } from "@shared/ui/InfoRow";
import { Button } from "@shared/ui/Button";
import { StatSection } from "@features/StatSection";
import { FileFolder } from "@shared/ui/FileFolder";
import { Tabs } from "@shared/ui/Tabs";
import { ComponentVersionsList } from "@features/ComponentVersionsList";
import { TagsArray } from "@shared/ui/TagsArray";

export const RepositorySingleSection = () => {
  const { username, name } = useParams<{ username: string; name: string }>();
  const [searchParams] = useSearchParams();
  const version = searchParams.get("version");

  const { data, isLoading } = useGetRepositoryByIdQuery({
    username: username!,
    name: name!,
    version: version ? Number(version) : undefined,
  });

  const repo = data?.result;

  const { data: stat, isLoading: statLoading } = useGetRepositoryStatQuery(
    { repoId: repo?.id! },
    { skip: !repo?.id },
  );

  if (isLoading) return <SingleWrapSection state="loading" />;

  if (!repo) return <SingleWrapSection state="not_found" />;

  const latestBuild = repo.builds?.[0];
  const components = latestBuild?.componentBuilds ?? [];

  const SideTabs = (
    <Tabs
      items={[
        {
          key: "stat",
          label: "статистика",
          content: (
            <StatSection
              data={stat?.result}
              isLoading={statLoading}
            />
          )
        },
        {
          key: "versions",
          label: "версии",
          content: (
            <ComponentVersionsList
              repoId={repo.id}
              currentBuildId={latestBuild?.id}
              type="repo"
            />
          ),
        },
      ]}
    />
  )

  const Folder = (
    <FileFolder
      length={components.length}
      name={repo.name}
      fileTree={
        components.map((component) => (
          <FileTree
            key={component.componentId}
            component={component}
          />
        ))
      } 
    />
  )

  const Action = (
    <div style={{ display: "flex", gap: "5px" }}>
      {username === repo.username && 
        <Link
          to={`/repositories/${repo.username}/${repo.name}/version`}
        >
          <Button variant="secondary">Версионировать</Button>
        </Link>
      }
      <DownloadMenu
        downloadUrl={`http://localhost:8082/api/repo/builds/${repo.latestBuildId}/package`}
      />
    </div>
  )

  return (
    <SingleWrapSection
      entity={repo}
      state="success"
      title={repo.name}
      path={`${repo.username}/${repo.name}`}
      icon={<FiBox size={32} />}
      username={username}
      extraActions={Action}
      extraSide={SideTabs}
      extraChildren={Folder}
    >
      <InfoRow label="версия" value={repo!.latestBuildVersion} icon={<FiGitBranch size={14} />} />
      <TagsArray tags={repo!.tags} />
    </SingleWrapSection>
  );
};
