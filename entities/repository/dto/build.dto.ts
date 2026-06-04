import type { BuildStatus } from "@entities/build";
import type { EntityDto } from "@shared/types/api";

export interface ComponentBuildDto {
  componentId: string;
  name: string;
  username: string;
  version: number;
  buildId: string;
}

export interface BuildDto extends EntityDto {
  status: BuildStatus;
  version: number;
  logs: string;
  startedAt: string;
  finishedAt: string;
  repoId: string;
  componentBuilds?: ComponentBuildDto[];
}
