import type { EntityDto, CursorResultDto, ResultDto } from "@shared/types/api";

export interface BuildDto extends EntityDto {
  componentId: string;
  version: number;
  status: string;
  startedAt: string;
  finishedAt: string;
  logs: string;
  sourceFileText: string;
}

export interface BuildCursorResultDto extends CursorResultDto<BuildDto> {}
export interface BuildResultDto extends ResultDto<BuildDto> {}

export interface BuildFiltersDto {
  componentId?: string;
  status?: string;
  username?: string;
  limit?: number;
  skip?: number;
  startDate?: string;
}
