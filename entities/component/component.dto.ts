import type { EntityDto, CursorResultDto, ResultDto } from "@shared/types/api";

export interface ComponentDto extends EntityDto {
  name: string;
  type: string;
  version: number;
  description?: string;
  tags?: string[];
  meta: Record<string, string>;
}

export interface ComponentCreateDto {
  name: string;
  description: string;
  meta: Record<string, string>;
  archive: File;
}

export interface ComponentCursorResultDto extends CursorResultDto<ComponentDto> {}
export interface ComponentCreateResultDto extends ResultDto<ComponentDto> {}
export interface ComponentResultDto extends ResultDto<ComponentDto> {}
