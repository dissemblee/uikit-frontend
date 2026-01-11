import type { MetaResponse } from "@shared/api";

export interface CreateRepositoryDto {
  name: string;
  description: string;
  framework: string;
  filePath: string;
  ownerId: string;
}

export interface UpdateRepositoryDto {
  name?: string;
  description?: string;
  framework?: string;
  filePath?: string;
}

export interface RepositoryDto {
  id: string;
  name: string;
  description: string;
  framework: string;
  filePath: string;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
}

export interface RepositoryResponse {
  success: boolean;
  meta: MetaResponse;
  data: RepositoryDto[];
}
