import type { ResultDto } from "@shared/types/api";

export interface DailyStatPointDto {
  date: string;
  count: number;
}

export interface ComponentStatDto {
  componentId: string;
  loadsTotal: number;
  loadsForYear: number;
  loadsForMonth: number;
  loadsForWeek: number;
  loadsForDay: number;
  dailyChart: DailyStatPointDto[];
}

export interface UserStatDto {
  username: string;
  totalComponents: number;
  totalBuilds: number;
  successBuilds: number;
  failedBuilds: number;
  pendingBuilds: number;
  runningBuilds: number;
  dailyLoadsChart: DailyStatPointDto[];
}

export interface ComponentStatResultDto extends ResultDto<ComponentStatDto> {}
export interface UserStatResultDto extends ResultDto<UserStatDto> {}

