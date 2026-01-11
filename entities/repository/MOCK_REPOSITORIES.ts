import type { RepositoryDto } from "./repository.dto";

export const MOCK_REPOSITORIES: RepositoryDto[] = [
  {
    id: '1',
    name: 'web-ui-kit',
    description: 'Библиотека компонентов для React',
    framework: 'React',
    filePath: '/projects/web-ui-kit',
    createdAt: new Date('2023-01-15T10:30:00Z'),
    updatedAt: new Date('2023-06-20T14:45:00Z'),
    ownerId: 'user-001'
  },
  {
    id: '2',
    name: 'mobile-app-backend',
    description: 'Бэкенд сервис для мобильного приложения',
    framework: 'NestJS',
    filePath: '/services/mobile-backend',
    createdAt: new Date('2023-02-10T09:15:00Z'),
    updatedAt: new Date('2023-08-05T11:20:00Z'),
    ownerId: 'user-002'
  },
  {
    id: '3',
    name: 'data-analytics',
    description: 'Инструменты для анализа данных',
    framework: 'Python',
    filePath: '/analytics/data-pipeline',
    createdAt: new Date('2023-03-05T13:40:00Z'),
    updatedAt: new Date('2023-09-12T16:30:00Z'),
    ownerId: 'user-003'
  },
  {
    id: '4',
    name: 'ecommerce-platform',
    description: 'Платформа для интернет-магазина',
    framework: 'Angular',
    filePath: '/platforms/ecommerce',
    createdAt: new Date('2023-01-20T08:00:00Z'),
    updatedAt: new Date('2023-07-15T12:10:00Z'),
    ownerId: 'user-001'
  },
  {
    id: '5',
    name: 'auth-service',
    description: 'Микросервис аутентификации и авторизации',
    framework: 'Spring Boot',
    filePath: '/services/auth',
    createdAt: new Date('2023-04-12T11:25:00Z'),
    updatedAt: new Date('2023-10-01T09:45:00Z'),
    ownerId: 'user-004'
  },
  {
    id: '6',
    name: 'documentation',
    description: 'Техническая документация проекта',
    framework: 'Vue',
    filePath: '/docs/project-docs',
    createdAt: new Date('2023-02-28T14:20:00Z'),
    updatedAt: new Date('2023-08-30T10:15:00Z'),
    ownerId: 'user-002'
  },
  {
    id: '7',
    name: 'payment-gateway',
    description: 'Интеграция платежных систем',
    framework: 'Node.js',
    filePath: '/services/payments',
    createdAt: new Date('2023-05-08T16:50:00Z'),
    updatedAt: new Date('2023-11-05T13:30:00Z'),
    ownerId: 'user-005'
  },
  {
    id: '8',
    name: 'iot-dashboard',
    description: 'Дашборд для IoT устройств',
    framework: 'React',
    filePath: '/iot/dashboard',
    createdAt: new Date('2023-03-25T10:10:00Z'),
    updatedAt: new Date('2023-09-18T15:25:00Z'),
    ownerId: 'user-003'
  },
  {
    id: '9',
    name: 'testing-framework',
    description: 'Кастомный фреймворк для тестирования',
    framework: 'Jest',
    filePath: '/testing/custom-framework',
    createdAt: new Date('2023-06-01T09:00:00Z'),
    updatedAt: new Date('2023-12-10T11:40:00Z'),
    ownerId: 'user-006'
  },
  {
    id: '10',
    name: 'admin-panel',
    description: 'Панель администратора',
    framework: 'Angular',
    filePath: '/admin/control-panel',
    createdAt: new Date('2023-04-30T12:35:00Z'),
    updatedAt: new Date('2023-10-25T14:20:00Z'),
    ownerId: 'user-001'
  }
];