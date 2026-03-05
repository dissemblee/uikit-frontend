import type { EntityDto, CursorResultDto, ResultDto } from "@shared/types/api";

export interface ComponentDto extends EntityDto {
  name: string;
  type: string;
  version: number;
  description?: string;
  tags?: string[];
  meta: Record<string, string>;
}

export interface ComponentCursorResultDto extends CursorResultDto<ComponentDto> {}

export interface ComponentResultDto extends ResultDto<ComponentDto> {}
