import type { ComponentDto } from "@entities/component/component.dto";
import type { CursorResultDto, EntityDto, ResultDto } from "@shared/types/api";

export enum BuildStatus {
  PENDING = "Ожидание",
  IN_PROGRESS = "В процессе",
  COMPLETED = "Завершено",
  FAILED = "Ошибка",
}

export interface BuildUpdateEventDto {
  status: BuildStatus;
  component: ComponentDto;
  completedAt?: string;
  logsChunk: string[];
}

export interface BuildDto extends EntityDto {
  status: BuildStatus;
  component: ComponentDto;
  startedAt: string;
  completedAt?: string;
}

export interface BuildResultDto extends ResultDto<BuildDto> {}

export interface BuildCursorResultDto extends CursorResultDto<BuildDto> {}

export interface BuildLogsCursorResultDto extends CursorResultDto<BuildDto> {}
