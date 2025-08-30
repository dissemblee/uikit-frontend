# Архитектура проекта: FSD и Next.js App Router

## Общие принципы

### Проект сочетает методологию Feature-Sliced Design (FSD) с возможностями маршрутизации Next.js App Router.

## Структура папок и назначение

### 📁 `app/` - Точка входа приложения, содержащая маршруты в соответствии с Next.js App Router.
- **Файлы:** всегда `page.tsx` или `layout.tsx`
- **Компоненты:** `PascalCase + Route` → `LandingRoute()`
- **Пример:**
  ```tsx
  export default function LandingRoute() {
    return <LandingPage />;
  }
  ```

### 📁 `pages/` - Содержит реальную реализацию страницы
- **Файлы:** всегда `PascalCase + Page.tsx` → `LandingPage.tsx`
- **Компонент:** совпадает с именем файла
- **Пример:**
  ```tsx
    pages/
    ├── LandingPage/
        ├── LandingPage.tsx → LandingPage.tsx
        └── LandingPage.module.css
  ```

### 📁 `widgets/` - Содержит составные UI компоненты
- **Файлы и компоненты:** всегда `PascalCase` → `Header.tsx`
- **Стили:** `.module.css → Header.module.css`
- **Пример:**
  ```tsx
    widgets/
    ├── Header/
        ├── Header.tsx
        └── Header.module.css
  ```

### 📁 `features/` - Содержит блоки
- **Файлы UI:** всегда `PascalCase` → `LoginForm.tsx`
- **Стили:** `.module.css → LoginForm.module.css`
- **Файлы state / model / API:** всегда `camelCase` → `authSlice.ts`
- **Пример:**
  ```tsx
    features/
    └── auth/
        ├── ui/
        │   └── LoginForm.tsx
        |   └── LoginForm.module.css
        └── model/
            └── authSlice.ts
  ```

### 📁 `entities/` - доменные объекты
- **Модели / типы:** всегда `PascalCase` → `User.ts`
- **API:** всегда `camelCase` → `userApi.ts`
- **Утилиты:** всегда `camelCase` → `userUtils.ts`
- **Пример:**
  ```tsx
    entities/
    └── user/
        ├── model.ts
        ├── api.ts
        └── utils.ts
  ```

### 📁 `shared/` - переиспользуемые утилиты и UI: 
- **UI компоненты:** всегда `PascalCase` → `Button.tsx`
- **Стили:** `.module.css → Button.module.css`
- **API:** всегда `camelCase` → `userApi.ts`
- **Утилиты:** всегда `camelCase` → `debounce.ts`
- **Пример:**
  ```tsx
    shared/
    ├── ui/
    │   ├── Button.tsx
    │   └── Input.tsx
    └── lib/
        ├── fetcher.ts
        └── debounce.ts
  ```

## Методология БЭМ для стилизации
### 📁 `Блок (Block)` - Самостоятельный компонент с собственной логикой и стилями.
- **Название блока:** всегда `PascalCase`
- **Пример:**
  ```tsx
    .Header {
      background-color: #080A23;
    }
  ```
### 📁 `Элемент (Element)` - Составная часть блока, не существует без блока.
- **Название 'элемента':** всегда `Block__element`
- **Пример:**
  ```tsx
    .Header__logo {
      width: 120px;
    }
    .Header__nav {
      display: flex;
    }
  ```
### 📁 `Модификатор (Modifier)` - Вариант блока или элемента (цвет, состояние, размер).
- **Название 'элемента':** всегда `Block--modifier или Block__element--modifier`
- **Пример:**
  ```tsx
    .Button--primary {
      background-color: #344AEB;
    }
    .Button--disabled {
      opacity: 0.5;
    }
    .Header__nav--mobile {
      display: none;
    }
  ```
