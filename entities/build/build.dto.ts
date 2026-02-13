import type { ComponentDto } from "@entities/component/component.dto";
import type { CursorResultDto, ResultDto } from "@shared/types/api";

export interface BuildUpdateEventDto {
  status: "pending" | "in_progress" | "completed" | "failed";
  component: ComponentDto;
  completedAt?: string;
  logsChunk: string[];
}

export interface BuildDto {
  id: string;
  status: "pending" | "in_progress" | "completed" | "failed";
  component: ComponentDto;
  startedAt: string;
  completedAt?: string;
}

export interface BuildResultDto extends ResultDto<BuildDto> {}

export interface BuildCursorResultDto extends CursorResultDto<BuildDto> {}

export interface BuildLogsCursorResultDto extends CursorResultDto<BuildDto> {}
