import type { BuildStatus } from "@entities/build";
import type { CursorResultDto, EntityDto, ResultDto } from "@shared/types/api";

export interface ComponentBuildDto {
  componentId: string;
  name: string;
  username: string;
  version: number;
  buildId: string;
}

export interface BuildRepoDto extends EntityDto {
  status: BuildStatus;
  version: number;
  logs: string;
  startedAt: string;
  finishedAt: string;
  repoId: string;
  componentBuilds?: ComponentBuildDto[];
  name: string;
}

export interface BuildCursorResultDto extends CursorResultDto<BuildRepoDto> {}
export interface BuildResultDto extends ResultDto<BuildRepoDto> {}

export interface BuildFiltersDto {
  repoId?: string;
  username?: string;
  status?: string;
  startDate?: string;
  skip?: number;
  limit?: number;
  query?: string;
}
