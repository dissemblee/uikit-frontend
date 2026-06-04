import type { EntityDto, CursorResultDto, ResultDto } from "@shared/types/api";
import type { ComponentDto } from "./component.dto";

export interface BuildDto extends EntityDto {
  componentId: string;
  version: number;
  status: string;
  startedAt: string;
  finishedAt: string;
  logs: string;
  sourceFileText: string;
  component: ComponentDto;
}

export interface BuildCursorResultDto extends CursorResultDto<BuildDto> {}
export interface BuildResultDto extends ResultDto<BuildDto> {}

export interface BuildFiltersDto {
  componentId?: string;
  status?: string;
  username?: string;
  query?: string;
  limit?: number;
  skip?: number;
  startDate?: string;
}
