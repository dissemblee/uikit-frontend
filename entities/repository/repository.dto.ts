import type { CursorResultDto, EntityDto, ResultDto } from "@shared/types/api";

export interface RepositoryDto extends EntityDto {
  name: string;
  description: string;
  ownerId: string;
  meta: Record<string, string>;
}

export interface RepositoryCreateDto {
  name: string;
  description: string;
  meta: Record<string, string>;
}

export interface RepositoryUpdateDto {
  name?: string;
  description?: string;
  meta?: Record<string, string>;
}

export interface RepositoryCursorResultDto extends CursorResultDto<RepositoryDto> {}

export interface RepositoryCreateResultDto extends ResultDto<RepositoryDto> {}

export interface RepositoryResultDto extends ResultDto<RepositoryDto> {}
