import type { EntityDto, CursorResultDto, ResultDto } from "@shared/types/api";

export interface ComponentDto extends EntityDto {
  name: string;
  version: number;
  description?: string;
  tags?: string[];
  framework: string;
  type?: string;
}

export interface ComponentCreateDto {
  name: string;
  description: string;
  framework: 'react' | 'vanilla';
  fileExtension: 'ts' | 'tsx' | 'js' | 'jsx';
  file: File;
  css?: Record<string, any>;
  dependencies?: Record<string, string>;
}

export interface ComponentCursorResultDto extends CursorResultDto<ComponentDto> {}
export interface ComponentCreateResultDto extends ResultDto<ComponentDto> {}
export interface ComponentResultDto extends ResultDto<ComponentDto> {}