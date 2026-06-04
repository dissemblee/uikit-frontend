import type { CursorResultDto, EntityDto, ResultDto } from "@shared/types/api";
import type { BuildDto } from "./build.dto";

export interface RepositoryDto extends EntityDto {
  username: string;
  name: string;
  description: string;
  latestBuildId: string;
  latestBuildVersion: string;
  builds: BuildDto[];
}

export interface RepositoryCreateDto {
  name: string;
  description: string;
  componentBuildIds: string[];
}

export interface RepositoryUpdateDto {
  name?: string;
  description?: string;
  meta?: Record<string, string>;
}

export interface RepositoryCursorResultDto extends CursorResultDto<RepositoryDto> {}

export interface RepositoryCreateResultDto extends ResultDto<RepositoryDto> {}

export interface RepositoryResultDto extends ResultDto<RepositoryDto> {}

export class RepoFiltersDto {
  username?: string;
  query?: string;
  startDate?: string;
  skip: number = 0;
  limit: number = 10;
  sort?: 'asc' | 'desc';
}
