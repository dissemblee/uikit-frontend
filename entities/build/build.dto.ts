// import type { ComponentDto } from "@entities/component/component.dto";
// import type { CursorResultDto, EntityDto, ResultDto } from "@shared/types/api";

// export enum BuildStatus {
//   PENDING = "Ожидание",
//   IN_PROGRESS = "В процессе",
//   COMPLETED = "Завершено",
//   FAILED = "Ошибка",
// }

// export interface BuildUpdateEventDto {
//   status: BuildStatus;
//   component: ComponentDto;
//   completedAt?: string;
//   logsChunk: string[];
// }

// export interface BuildDto extends EntityDto {
//   status: BuildStatus;
//   component: ComponentDto;
//   startedAt: string;
//   completedAt?: string;
// }

// export interface BuildResultDto extends ResultDto<BuildDto> {}

// export interface BuildCursorResultDto extends CursorResultDto<BuildDto> {}

// export interface BuildLogsCursorResultDto extends CursorResultDto<BuildDto> {}
// build.dto.ts

export enum BuildStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export interface BuildDto {
  id: string;
  repoId: string;
  username: string;
  name: string;
  version: string;
  status: BuildStatus;
  logs?: string | null;
  errorMessage?: string | null;
  startedAt: string;
  updatedAt: string;
  finishedAt?: string | null;
  type: string;
}

export interface BuildWithRepoDto extends BuildDto {
  repo?: {
    id: string;
    name: string;
    username: string;
  };
}

export type BuildsListResponse = BuildDto[];

export interface BuildsPaginatedResponse {
  data: BuildDto[];
  total: number;
  page: number;
  perPage: number;
}

export interface BuildLogsResponse {
  buildId: string;
  status: BuildStatus;
  logs: string;
  startedAt: string;
  finishedAt?: string | null;
  errorMessage?: string | null;
}

export interface StartBuildRequest {
  componentId: string;
}

export interface PaginationParams {
  page?: number;
  perPage?: number;
}