export interface EntityDto {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ErrorDto {
  message: string;
  code: number;
  errorType: string;
}

export interface ResultDto<T> {
  success: boolean;
  error?: ErrorDto;
  result?: T;
}

export interface CursorDto<T> {
  itemsLeft: number;
  data: T[];
  nextItemTimestamp: string;
  skipWithCurrentTimestamp: number;
}

export interface CursorResultDto<T> extends ResultDto<CursorDto<T>> {}
