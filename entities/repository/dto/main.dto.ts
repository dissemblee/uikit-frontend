import type { CursorResultDto, EntityDto, ResultDto } from "@shared/types/api";
import type { BuildRepoDto } from "./build.dto";

export interface RepositoryDto extends EntityDto {
  username: string;
  name: string;
  description: string;
  latestBuildId: string;
  latestBuildVersion: string;
  builds: BuildRepoDto[];
  tags: string[];
}

export interface RepositoryCreateDto {
  name: string;
  description: string;
  componentBuildIds: string[];
  tags: string[];
}

export interface RepositoryUpdateDto {
  name?: string;
  description?: string;
  meta?: Record<string, string>;
}

export interface RepositoryCursorResultDto extends CursorResultDto<RepositoryDto> {}
export interface RepositoryCreateResultDto extends ResultDto<RepositoryDto> {}
export interface RepositoryResultDto extends ResultDto<RepositoryDto> {}
export interface RepositoryNewVersionResultDto extends ResultDto<RepositoryDto> {}

export class RepoFiltersDto {
  username?: string;
  query?: string;
  startDate?: string;
  skip: number = 0;
  limit: number = 10;
  sort?: 'asc' | 'desc';
  tags?: string[];
}

export interface RepositoryNewVersionDto {
  componentBuildIds: string[];
}

export enum RepoTag {
  // тип
  UI_KIT = 'ui_kit',
  COMPONENT_LIBRARY = 'компонентная_библиотека',
  DESIGN_SYSTEM = 'дизайн_система',
  TEMPLATE = 'шаблон',
  UTILS = 'утилиты',
  HOOKS = 'хуки',
  ICONS = 'иконки',
  FONTS = 'шрифты',
  TOKENS = 'токены',

  // фреймворк
  REACT = 'react',
  VUE = 'vue',
  SVELTE = 'svelte',
  ANGULAR = 'angular',
  SOLID = 'solid',
  VANILLA = 'vanilla',

  // платформа
  WEB = 'веб',
  MOBILE = 'мобильный',
  DESKTOP = 'десктоп',
  RESPONSIVE = 'адаптивный',
  CROSS_PLATFORM = 'кроссплатформенный',

  // стек
  TYPESCRIPT = 'typescript',
  JAVASCRIPT = 'javascript',
  TAILWIND = 'tailwind',
  SASS = 'sass',
  CSS_MODULES = 'css_модули',
  STYLED_COMPONENTS = 'styled_components',
  CSS_IN_JS = 'css_in_js',

  // назначение
  FORMS = 'формы',
  TABLES = 'таблицы',
  NAVIGATION = 'навигация',
  CHARTS = 'графики',
  MAPS = 'карты',
  ANIMATION = 'анимация',
  MEDIA = 'медиа',
  TYPOGRAPHY = 'типографика',
  MODALS = 'модальные_окна',
  NOTIFICATIONS = 'уведомления',
  LAYOUT = 'компоновка',
  DATA_INPUT = 'ввод_данных',
  DATA_DISPLAY = 'отображение_данных',

  // стиль
  MINIMALIST = 'минималистичный',
  RICH = 'насыщенный',
  MATERIAL = 'материальный',
  FLAT = 'плоский',
  NEUMORPHISM = 'неоморфизм',
  GLASSMORPHISM = 'glassmorphism',
  DARK_THEME = 'тёмная_тема',
  LIGHT_THEME = 'светлая_тема',
  THEMEABLE = 'темизированный',

  // доступность
  ACCESSIBLE = 'доступный',
  ARIA = 'поддержка_aria',
  KEYBOARD_NAV = 'клавиатурная_навигация',

  // совместимость
  SSR_READY = 'готов_к_ssr',
  I18N = 'интернационализация',
  RTL = 'поддержка_rtl',
  SEO = 'seo_оптимизирован',
}
