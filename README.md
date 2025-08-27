Особенности структуры и интеграция FSD и NextJS app routing:
  папка app является точкой входа, в ней лежат маршруты, app routing обязывает создавать маршруты внутри папка app, и называть их page.tsx например для маршрута /.
  Папка app будет иметь в себе маршруты, а фактическая реализация страницы будет лежать в папке pages. Таким образом получится изолировать маршруты от фактической реализации и избежать захломления папки app.

Нейминг: 
  app: 
    Файлы: всегда page.tsx
    Функции: PascalCase + Route -> LandingRoute()
    Пример:
      app/landing/page.tsx -> LandingRoute()

  pages:
    Файлы: PascalCase + Page.tsx - LandingPage.tsx, LoginPage.tsx
    Функции: совпадает с именем файла, PascalCase
    Пример:
      pages/landing/LandingPage.tsx -> LandingPage()
      pages/LoginPage.tsx -> LoginPage()

  widgets - составные UI компоненты:
    Файлы и компоненты: PascalCase → Header.tsx, Sidebar.tsx
    Стили: .module.css → Header.module.css
    Пример: 
      widgets/Header/Header.tsx || Header.module.css

  features - блоки: 
    Файлы UI: PascalCase → LoginForm.tsx, NotificationList.tsx
    Файлы state / model / API: camelCase → authSlice.ts
    Пример:
      features/auth/ui/LoginForm.tsx -> LoginForm()
      features/auth/model/authSlice.ts

  entities - доменные объекты:
    Модели / типы: PascalCase → User.ts, Product.ts
    API: camelCase → userApi.ts
    Утилиты: camelCase → userUtils.ts
    Пример:
      entities/user/model.ts || api.ts || utils.ts

  shared - переиспользуемые утилиты и UI: 
    UI компоненты: PascalCase → Button.tsx, Modal.tsx
    Утилиты: camelCase → fetcher.ts, debounce.ts
    Пример:
      shared/ui/Button.tsx || Input.tsx

Принципы БЭМ:
  Блок (Block) -> Самостоятельный компонент с собственной логикой и стилями.
    Название блока —> PascalCase.
    Пример:
      .Header {
        background-color: #080A23;
      }

  Элемент (Element) -> Составная часть блока, не существует без блока.
    Обозначение: block__element
    Пример:
      .Header__logo {
        width: 120px;
      }
      .Header__nav {
        display: flex;
      }

  Модификатор (Modifier) -> Вариант блока или элемента (цвет, состояние, размер).
    Обозначение: block--modifier или block__element--modifier
    Пример:
      .Button--primary {
        background-color: #344AEB;
      }
      .Button--disabled {
        opacity: 0.5;
      }
      .Header__nav--mobile {
        display: none;
      }

