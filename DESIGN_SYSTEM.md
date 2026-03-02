Дизайн-система GryFf v2.0 — «Liquid Glass»
Стильный, модный, молодёжный.
*Полное техническое описание для ИИ-разработчиков. Версия 2.0 от 27.02.2026.*
# GryFf — Главная инструкция для ИИ-разработчика интерфейса

Версия: AI MASTER SPEC v3.0
Назначение: Полная спецификация визуала и поведения интерфейса.
# GryFf_AI_DESIGN_GUIDE.md
Версия: 3.1 – Полная инструкция для AI по созданию интерфейса

## ⚠️ Важно для AI
Этот файл — **главный источник истины для интерфейса GryFf**.  
ИИ обязан:
- строго соблюдать layout и компоненты;
- использовать все токены и дизайн-систему;
- реализовывать все микроанимации;
- соблюдать UX Telegram, VK и Discord;
- генерировать код модульно, для слабого железа;
- обеспечивать доступность (a11y) и поддержку мобильной/десктопной версии.

Нельзя:
- менять расположение элементов;
- упрощать интерфейс;
- заменять цвета и шрифты.

---

## 1. Философия и визуальный язык
- **Liquid Glass**: многослойный интерфейс, стеклянные панели с blur.
- Глубина: фон → панели → плавающие элементы → активные.
- Тактильность: пружины, инерция, micro-interactions.
- Воздух: модульная сетка, базовый шаг 8px, большие отступы.
- Минимализм с акцентом: оранжевый #FF8C00 используется точечно.

---

## 2. Цветовая система и токены
**Светлая тема:**  
- Фон: #F8F9FA  
- Панели: rgba(255,255,255,0.7)  
- Акцент: #FF8C00  

**Тёмная тема:**  
- Фон: #121212  
- Панели: rgba(30,30,30,0.7)  
- Акцент: #FF8C00  

**Статусы:** online #30D158, offline #9E9E9E, typing #FF8C00

Все цвета должны использоваться через CSS-переменные.

---

## 3. Типографика
| Стиль | Размер | Вес | Применение |
|-------|--------|-----|------------|
| Large Title | 34px | Bold | Заголовки экранов |
| Title 1 | 28px | Bold | Модальные окна |
| Title 2 | 22px | SemiBold | Название чата/сообщества |
| Headline | 17px | SemiBold | Имя контакта, пункты меню |
| Body | 16px | Regular | Основной текст |
| Callout | 15px | Regular | Текст под сообщением |
| Subhead | 14px | Regular | Второстепенный текст |
| Footnote | 13px | Regular | Счётчики |
| Caption | 12px | Regular | Мелкие элементы |

---

## 4. Скругления и тени
| Компонент | Радиус | Тень |
|-----------|--------|------|
| Кнопки, поля ввода | 12–16px | --shadow-md |
| Карточки, модалки | 20–24px | --shadow-lg |
| Аватарки | 50% | --shadow-sm |
| Сообщения | 18px | --shadow-md |
| Bottom Sheet | 24px верхние углы | --shadow-lg |

---

## 5. Анимации и микро-взаимодействия
- **Shared element transition**: аватар из списка → шапка чата.
- **Push/Pop переходы**: экран справа налево, затухание фона.
- **Сообщения**: scale 0.9→1, смещение, плавный скролл.
- **Отправка**: иконка → спиннер → галочка.
- **Нажатия**: ripple 1.1, spring animation.
- **Голосовые сообщения**: wave animation.
- **Входящий звонок**: пульсация аватара.
- Использовать Framer Motion или аналог.

---

## 6. Компоненты UI
### Avatar
- Размеры: xs 24px → xxl 120px  
- Статусы: online/offline/typing  
- Круглая форма, placeholder — инициалы

### Button
- Primary: фон #FF8C00, белый текст, hover + darken 5%, active scale 0.97
- Secondary: прозрачный фон, обводка #FF8C00
- Ghost: прозрачный фон, текст основной, hover — accent-soft

### Input
- Фон: var(--bg-surface)
- Скругление: 12px
- Иконки слева/справа
- Focus: border 2px #FF8C00

### MessageBubble
- Outgoing: фон #FF8C00, текст белый, radius xx-large/small
- Incoming: фон светлый/тёмный, текст контрастный
- Внутренние отступы 12x16px, max-width 75%
- Reply quote: блок с border-left 2px accent

### ChatListItem
- Высота: 72px
- Аватар md, имя headline, последнее сообщение callout
- Счётчик непрочитанных: оранжевый круг, text-white, appear animation
- Свайпы: закрепить, архив

### TabBar
- Glass-surface, radius 24px, индикатор активного tab: accent-gradient, плавная анимация

### Bottom Sheet
- Скругление 24px, drag-to-dismiss, blur background

### Modal
- Центр, radius 24px, shadow-lg, appear animation

### Toast
- Появление снизу/сверху, auto-dismiss 3s, цвет в зависимости от типа

### Typing Indicator
- Три точки, пульсация 0.2s, фон accent-solid

---

## 7. Ключевые экраны
1. **Chat List**: Header (Avatar + Logo/Search + New Chat), список ChatListItem, TabBar
2. **Chat Screen**: Header (Back + Avatar + Name + Call/Menu), сообщения с группировкой, Input Bar (attach + input + mic/send)
3. **User Profile**: Cover + Avatar, Tabs (Wall, Photos, Friends, Info)
4. **Community**: Tabs (Posts, Discussions, Members, Voice Channels)
5. **Voice Channels**: 3 колонки: Channels, Active Room, Members
6. **Call Screen**: Fullscreen video, PiP self, Floating controls
7. **Settings / Admin**: профиль, уведомления, безопасность, роли, статистика

---

## 8. Пошаговая инструкция для AI
1. **Инициализация**:
   - Прочитать `DESIGN_SYSTEM.md` и `GryFf_ULTIMATE_GUIDE.md`
   - Составить карту экранов, компонентов и анимаций

2. **Layout shell**:
   - Sidebar / Chat List / Active Chat
   - Mobile Stack / TabBar

3. **Компоненты**:
   - Avatar, Button, Input, MessageBubble, ChatListItem, TabBar, BottomSheet, Modal, Toast, TypingIndicator

4. **Анимации**:
   - Shared element, push/pop, appear/disappear, ripple, soundWave

5. **Ключевые экраны**:
   - ChatList, Chat, UserProfile, Community, VoiceChannels, Call

6. **Тестирование UI**:
   - Проверить доступность, адаптивность, контрастность, интерактивность

7. **Отчёт для AI-CTO**:
   - Каждое изменение фиксировать
   - Обновлять Linear и Slack

8. **Итерации**:
   - Малые задачи: один экран или компонент за раз
   - Использовать микро-анимации и токены

---

## 9. Контроль качества
- Использовать модульные CSS и CSS-переменные
- Все анимации через токены
- Проверка на слабом железе (virtualized lists, memo, lazy loading)
- Полная доступность (aria, keyboard)

---

## 10. Итог
ИИ должен:
- Сгенерировать **точную копию UX Telegram Desktop** + VK Profile + Discord Call
- Использовать **Liquid Glass, цвета, шрифты, анимации**
- Работать модульно и производительно
- Действовать как **команда из 5 AI**, каждая роль — свой экран или компонент
- Отчётность в Linear/Slack каждый цикл

---

# Конец GryFf_AI_DESIGN_GUIDE.md
---

# ⚠️ ОБЯЗАТЕЛЬНО ДЛЯ ИИ

Этот документ — НЕ описание дизайна.

Это **единственный источник истины**, по которому необходимо:

* проектировать интерфейс
* генерировать компоненты
* строить архитектуру UI
* реализовывать UX
* принимать визуальные решения

ИИ **НЕ имеет права**:

* придумывать собственный layout
* менять навигацию
* упрощать интерфейс
* заменять Telegram UX

---

# 1. Концепция продукта

GryFf — гибридная платформа:

Telegram + VK + Discord.

## Основные принципы

### Telegram — база UX

* навигация
* расположение элементов
* структура экранов
* поведение чатов

Пользователь Telegram должен чувствовать себя дома.

### VK — социальная часть

* профили
* стена
* медиа
* сообщества

### Discord — realtime коммуникация

* голосовые комнаты
* звонки
* активность участников

---

# 2. Главный принцип интерфейса

Интерфейс НЕ приложение.

Интерфейс — **живая среда общения**.

Каждый элемент должен:

* иметь глубину
* реагировать на пользователя
* плавно появляться
* иметь физику движения

Стиль: **Liquid Glass UI**

---

# 3. Общая архитектура интерфейса

ИИ обязан реализовать layout как Telegram Desktop.

## Desktop Layout (обязательный)

```
| Sidebar | Chat List | Active Chat |
```

### Sidebar

Фиксированная ширина.

Содержит:

* аватар пользователя
* переключение разделов
* уведомления
* настройки

Никогда не исчезает.

---

### Chat List

Поведение 1:1 Telegram:

* вертикальный список
* pinned чаты сверху
* поиск
* unread badge
* свайпы
* hover действия

---

### Active Chat

Главная зона приложения.

Содержит:

* header
* сообщения
* input bar
* realtime события

---

## Mobile Layout

* Stack Navigation
* Push переходы
* Floating TabBar
* Telegram mobile logic

---

# 4. Глобальная UX-логика (ОЧЕНЬ ВАЖНО)

ИИ обязан реализовать:

## Сообщения

* optimistic sending
* мгновенное появление
* статус отправки
* доставка
* прочтение
* редактирование
* reply
* реакции
* группировка сообщений

---

## Поведение Telegram

Обязательно:

* плавный переход в чат
* сохранение позиции скролла
* автоскролл вниз
* разделитель непрочитанных
* hover actions
* контекстные меню

---

# 5. Система состояний

ИИ должен создать глобальные store:

## authStore

* user
* session
* auth status

## chatStore

* список чатов
* активный чат
* unread counters
* pinned chats

## messageStore

* сообщения по chatId
* очередь отправки
* realtime обновления

## uiStore

* модалки
* bottom sheets
* активные меню
* темы

## callStore

* активный звонок
* участники
* микрофон
* камера
* speaking state

---

# 6. Realtime система

ИИ ОБЯЗАН использовать WebSocket abstraction.

```
connect()
joinChat()
leaveChat()
sendMessage()
receiveMessage()
typing()
presence()
callSignal()
```

Никаких перезагрузок UI.

---

# 7. Визуальная философия — Liquid Glass

Интерфейс строится слоями:

1. Background
2. Glass Surfaces
3. Floating Elements
4. Active Elements

Все панели — стекло.

Использовать:

* backdrop-filter blur
* мягкие тени
* полупрозрачность

---

# 8. Цвета и токены

(ИИ обязан использовать только переменные)

👉 ОСТАВИТЬ ВСЕ ТВОИ COLOR TOKENS ИЗ ИСХОДНОГО ФАЙЛА БЕЗ ИЗМЕНЕНИЙ.

Запрещено:

* hardcoded цвета
* inline styles

---

# 9. Типографика

Текст должен чувствоваться как iOS + Telegram.

Правила:

* большие отступы
* лёгкость чтения
* акцент через вес шрифта
* минимализм

Использовать только typography tokens.

---

# 10. Компонентная система

Каждый компонент обязан иметь:

* loading state
* hover state
* active state
* animation state
* accessibility support

Компоненты НЕ монолитные.

---

# 11. Главные экраны

## Chat List Screen

Telegram clone.

Обязательно:

* header
* поиск
* список чатов
* плавающая нижняя панель

---

## Chat Screen (КРИТИЧЕСКИЙ)

Самый важный экран.

ИИ обязан реализовать:

* sticky header
* message grouping
* typing indicator
* reply preview
* attachments
* voice record gesture
* animated sending

Input bar должен вести себя как Telegram.

---

## Profile Screen (VK логика)

* cover image
* большой avatar
* tabs
* wall posts
* media grid
* друзья

---

## Community Screen

Смешение:

* Telegram каналов
* Discord серверов
* VK групп

Разделы:

* посты
* обсуждения
* участники
* voice channels

---

## Voice Channels

Discord UX:

```
| Channels | Active Room | Members |
```

Реалтайм speaking indicators обязательны.

---

## Call Screen

Fullscreen.

Обязательно:

* video grid
* floating controls
* mute/video/share
* PiP preview

---

# 12. Анимации (НЕОБХОДИМО)

Запрещены резкие изменения.

Использовать:

* spring physics
* shared element transition
* fade + slide
* inertia scrolling

Framer Motion обязателен.

---

# 13. Производительность (важно для слабых ПК)

ИИ должен:

* использовать virtualized lists
* lazy loading
* memo components
* избегать лишних rerender
* разделять bundles

Интерфейс обязан работать на слабом железе.

---

# 14. Accessibility

Обязательно:

* aria-label
* keyboard navigation
* focus-visible
* reduced motion support

---

# 15. Поведение ИИ при генерации кода

ИИ обязан:

1. Строго соблюдать layout
2. Не менять UX Telegram
3. Не упрощать интерфейс
4. Использовать дизайн-токены
5. Добавлять микроанимации
6. Делать переиспользуемые компоненты
7. Разделять feature modules

---

# 16. Порядок разработки (MANDATORY)

ИИ должен строить проект строго:

1. Layout shell
2. Navigation
3. Chat List
4. Chat Screen
5. Realtime messaging
6. Profile
7. Communities
8. Voice system
9. Calls
10. Polish & animations

---

# 17. Главная цель

Создать интерфейс уровня:

* Telegram
* Discord
* современного iOS приложения

Интерфейс должен ощущаться:

✔ живым
✔ дорогим
✔ быстрым
✔ физическим

Далее перепрвоерь старое :

1. Философия и визуальный язык
Мы отказываемся от плоского и скучного дизайна. Наш новый стиль — это эволюция неоморфизма, смешанная с последними трендами Apple и Telegram. Мы создаём не просто мессенджер, а цифровое пространство с глубиной. Наш визуальный язык — Liquid Glass (жидкое стекло).

Ключевые принципы:

Глубина и слоистость: Интерфейс строится из нескольких слоёв. Фон — самый нижний слой. Карточки и панели — средние, выполненные из «стекла». Самые важные элементы (кнопки, модальные окна) парят выше всех с самой большой тенью.

«Жидкое» стекло (Liquid Glass): Фоны карточек, модальных окон и панелей имеют эффект полупрозрачного стекла с матовостью (backdrop-filter: blur). Это создаёт ощущение дороговизны и современности (как интерфейс iOS 18, но в нашей серо-оранжевой гамме).

Тактильность: Каждое взаимодействие (клик, свайп, долгое нажатие) отзывается анимацией, имитирующей физику — пружины, упругость, инерция.

Воздух и ритм: Мы используем большие отступы, чтобы интерфейс дышал. Все элементы подчинены модульной сетке с базовым шагом 8px.

Минимализм с акцентами: Много воздуха, много свободного пространства. Наш оранжевый (#FF8C00) используется только для самого важного, но его анимация и появление должны быть эффектными.

2. Цветовая система (Color Tokens)
Все цвета определяются как CSS-переменные (токены) для лёгкой смены темы и поддержки.

2.1. Основная палитра (Core Palette)
css
:root {
  /* Серый (основа) */
  --gray-50: #F8F9FA;
  --gray-100: #F1F3F5;
  --gray-200: #E9ECEF;
  --gray-300: #DEE2E6;
  --gray-400: #CED4DA;
  --gray-500: #ADB5BD;
  --gray-600: #6C757D;
  --gray-700: #495057;
  --gray-800: #343A40;
  --gray-900: #212529;
  --gray-950: #121212; /* Наш глубокий чёрный */
  
  /* Акцентный оранжевый */
  --orange-500: #FF8C00;
  --orange-600: #E07B00;
  --orange-400: #FFB347; /* Для градиентов */
  
  /* Системные цвета */
  --green-500: #30D158; /* Online */
  --red-500: #FF453A; /* Ошибка, отбой */
  --yellow-500: #FFD60A; /* Предупреждение */
  --blue-500: #0A84FF; /* Ссылки, информация */
}
2.2. Токены темы (Theme Tokens)
Тёмная тема (Dark Theme)
css
[data-theme="dark"] {
  /* Фоны */
  --bg-primary: var(--gray-950);      /* #121212 */
  --bg-surface: rgba(30, 30, 30, 0.7);  /* Стеклянная поверхность */
  --bg-surface-solid: var(--gray-900); /* Для непрозрачных элементов */
  
  /* Текст */
  --text-primary: #FFFFFF;
  --text-secondary: rgba(235, 235, 245, 0.6);
  --text-tertiary: rgba(235, 235, 245, 0.3);
  --text-link: var(--blue-500);
  
  /* Границы и разделители */
  --border-subtle: rgba(255, 255, 255, 0.1);
  --border-strong: rgba(255, 255, 255, 0.2);
  
  /* Акцент */
  --accent-solid: var(--orange-500);
  --accent-soft: rgba(255, 140, 0, 0.1);
  --accent-gradient: linear-gradient(180deg, var(--orange-500), var(--orange-400));
  
  /* Статусы */
  --status-online: var(--green-500);
  --status-offline: var(--gray-500);
  
  /* Тени (с чёрным цветом) */
  --shadow-color: 0, 0, 0;
}
Светлая тема (Light Theme)
css
[data-theme="light"] {
  --bg-primary: var(--gray-50);        /* #F8F9FA */
  --bg-surface: rgba(255, 255, 255, 0.7); /* Стекло */
  --bg-surface-solid: #FFFFFF;
  
  --text-primary: #000000;
  --text-secondary: rgba(60, 60, 67, 0.6);
  --text-tertiary: rgba(60, 60, 67, 0.3);
  --text-link: var(--blue-500);
  
  --border-subtle: rgba(60, 60, 67, 0.1);
  --border-strong: rgba(60, 60, 67, 0.2);
  
  --accent-solid: var(--orange-500);
  --accent-soft: rgba(255, 140, 0, 0.1);
  --accent-gradient: linear-gradient(180deg, var(--orange-500), var(--orange-400));
  
  --status-online: var(--green-500);
  --status-offline: var(--gray-500);
  
  --shadow-color: 60, 60, 67;
}
3. Эффект стекла (Glassmorphism)
Наша «фишка» — матовое стекло с размытием. Применяется ко всем «плавающим» элементам: модальным окнам, нижним листам, контекстным меню, навигационным панелям.

css
.glass-surface {
  background-color: var(--bg-surface);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border-subtle);
  /* Важно: верхняя граница может быть светлее для эффекта глубины */
  border-top-color: rgba(255, 255, 255, 0.2);
  box-shadow: var(--shadow-glass);
}
4. Типографика (Typography Tokens)
css
:root {
  /* Семейства */
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  
  /* Размеры */
  --fs-display: 3rem;      /* 48px */
  --fs-title-1: 2rem;      /* 32px */
  --fs-title-2: 1.5rem;    /* 24px */
  --fs-headline: 1.125rem; /* 18px */
  --fs-body: 1rem;         /* 16px */
  --fs-callout: 0.9375rem; /* 15px */
  --fs-subhead: 0.875rem;  /* 14px */
  --fs-footnote: 0.8125rem;/* 13px */
  --fs-caption: 0.75rem;   /* 12px */
  
  /* Веса */
  --fw-regular: 400;
  --fw-medium: 500;
  --fw-semibold: 600;
  --fw-bold: 700;
  --fw-heavy: 800;
  
  /* Межстрочные интервалы */
  --lh-tight: 1.2;
  --lh-normal: 1.4;
  --lh-loose: 1.6;
  
  /* Трекинг (межбуквенный интервал) */
  --ls-none: 0;
  --ls-tight: -0.02em;
  --ls-wide: 0.02em;
}
Применение:

Заголовки: --fs-title-1, --fw-bold, --ls-tight.

Основной текст: --fs-body, --fw-regular, --lh-normal, --ls-none.

Вспомогательный: --fs-footnote, --fw-regular, --text-secondary.

5. Скругления (Border Radius Tokens)
css
:root {
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-xxl: 24px;
  --radius-full: 9999px;
  --radius-circle: 50%;
}
Правила применения:

Компонент	Радиус скругления
Кнопки, поля ввода	--radius-lg (16px) или --radius-xl (20px) для «таблеток»
Карточки чата, модальные окна	--radius-xxl (24px)
Аватарки	--radius-circle
Исходящие сообщения	border-radius: var(--radius-xxl) var(--radius-sm) var(--radius-xxl) var(--radius-xxl);
Входящие сообщения	border-radius: var(--radius-sm) var(--radius-xxl) var(--radius-xxl) var(--radius-xxl);
6. Тени и поднятие (Elevation Tokens)
Тени должны быть мягкими и большими, чтобы создать эффект парения.

css
:root {
  /* Маленькая тень (для элементов в пределах карточки) */
  --shadow-sm: 0 2px 8px rgba(var(--shadow-color), 0.1), 0 1px 2px rgba(var(--shadow-color), 0.06);
  
  /* Средняя тень (для карточек) */
  --shadow-md: 0 4px 12px rgba(var(--shadow-color), 0.12), 0 2px 4px rgba(var(--shadow-color), 0.08);
  
  /* Большая тень (для модальных окон) */
  --shadow-lg: 0 25px 50px -12px rgba(var(--shadow-color), 0.5);
  
  /* Тень для стекла (дополнительный слой глубины) */
  --shadow-glass: 0 4px 30px rgba(var(--shadow-color), 0.1);
}
7. Анимации и переходы (Animation Tokens)
7.1. Easing Functions
css
:root {
  --ease-out: cubic-bezier(0.0, 0.0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0.0, 1, 1);
  --ease-in-out: cubic-bezier(0.4, 0.0, 0.2, 1);
  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1); /* Эффект «перетягивания» */
  /* Spring parameters для JS: stiffness: 300, damping: 25, mass: 1 */
}
7.2. Длительности (Durations)
css
:root {
  --duration-instant: 100ms;
  --duration-fast: 200ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-extra-slow: 800ms;
}
7.3. Ключевые кадры (Keyframes)
css
/* Пульсация для индикатора печатает */
@keyframes typingPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(0.9); }
}

/* Появление элемента (fade + scale) */
@keyframes appear {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

/* Исчезновение */
@keyframes disappear {
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.9); }
}

/* Вращение для загрузки */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Волна для голосового сообщения */
@keyframes soundWave {
  0% { height: 4px; }
  50% { height: 20px; }
  100% { height: 4px; }
}
8. Детальная спецификация компонентов
8.1. Avatar (Аватар)
tsx
interface AvatarProps {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  src?: string;
  name: string; // для инициалов
  status?: 'online' | 'offline' | 'typing' | 'none';
  showStatus?: boolean;
}
Размеры: xs(24px), sm(32px), md(40px), lg(50px), xl(80px), xxl(120px).

Placeholder: инициалы (первые буквы имени), фон var(--bg-surface-solid), текст var(--text-primary), шрифт var(--fs-headline).

Статус: кружок диаметром 12px (для размеров md и выше) с обводкой 2px var(--bg-primary). Расположение: правый нижний угол.

online: фон var(--status-online)

offline: фон var(--status-offline)

typing: фон var(--accent-solid), анимация pulse 1s infinite

8.2. Button (Кнопка)
tsx
type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant: ButtonVariant;
  size: ButtonSize;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}
Общее: border-radius: var(--radius-lg), transition: all var(--duration-fast) var(--ease-out).

Primary: фон var(--accent-solid), текст белый. При hover: затемнение (darken 5%). При active: масштабирование 0.97. В состоянии loading: показать спиннер.

Secondary: фон прозрачный, обводка 2px var(--border-strong), текст var(--text-primary). При hover: фон var(--bg-surface).

Ghost: без фона, текст var(--text-primary). При hover: фон var(--accent-soft).

Размеры: sm (padding 8px 16px, fs --fs-footnote), md (12px 24px, fs --fs-body), lg (16px 32px, fs --fs-headline).

8.3. Input (Поле ввода)
tsx
interface InputProps {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'tel';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  helperText?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
Контейнер: border-radius: var(--radius-lg), фон var(--bg-surface), обводка 1px var(--border-subtle). При фокусе: обводка 2px var(--accent-solid).

Лейбл: --fs-footnote, --text-secondary, отступ снизу 4px.

Хелпер/ошибка: --fs-caption. Для ошибки цвет var(--red-500).

Иконки: размер 20px, цвет var(--text-tertiary).

8.4. MessageBubble (Пузырёк сообщения)
tsx
interface MessageBubbleProps {
  type: 'outgoing' | 'incoming';
  text?: string;
  media?: MediaType; // фото, видео, документ
  replyTo?: Message; // цитируемое сообщение
  status?: 'sending' | 'sent' | 'delivered' | 'read';
  timestamp: Date;
  isFirstInGroup: boolean;
  isLastInGroup: boolean;
}
Outgoing:

Фон: var(--accent-solid). Текст: белый. Выравнивание: справа.

Border-radius: var(--radius-xxl) var(--radius-sm) var(--radius-xxl) var(--radius-xxl).

Коррекция для первого/последнего в группе: если первое, верхний правый угол var(--radius-xxl); если последнее, нижний правый угол var(--radius-xxl).

Incoming:

Фон: var(--bg-surface-solid). Текст: var(--text-primary). Выравнивание: слева.

Border-radius: var(--radius-sm) var(--radius-xxl) var(--radius-xxl) var(--radius-xxl).

Общее: внутренние отступы 12px 16px, макс. ширина 75%.

Время и статус: снизу справа, --fs-footnote, --text-tertiary. Статус «прочитано» — две оранжевые галочки с микроанимацией появления.

Цитата (reply): небольшой блок сверху с фоном rgba(0,0,0,0.1) и обводкой слева 2px var(--accent-solid).

Медиа: фото/видео занимают всю ширину пузырька, скругление наследуется.

8.5. ChatListItem (Элемент списка чатов)
tsx
interface ChatListItemProps {
  avatar: string | React.ReactNode;
  name: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  pinned: boolean;
  muted: boolean;
  onClick: () => void;
  onSwipeLeft: () => void; // закрепить
  onSwipeRight: () => void; // прочитано/архив
}
Высота: 72px, отступы 12px.

Аватар: размер md.

Имя: --fs-headline, --fw-semibold, однострочное.

Последнее сообщение: --fs-callout, --text-secondary, однострочное с многоточием.

Время: --fs-footnote, --text-tertiary.

Счётчик непрочитанных: бейдж с фоном var(--accent-solid), текст белый, border-radius: var(--radius-full), паддинг 2px 8px. Появление с анимацией appear.

Pin icon: маленькая иконка скрепки, var(--text-tertiary).

При долгом нажатии — контекстное меню (bottom sheet).

8.6. TabBar (Плавающая навигационная панель)
Контейнер: glass-surface, border-radius: var(--radius-xxl), отступы 4px, тень var(--shadow-lg).

Элементы: иконка + текст (опционально), активное состояние — цвет var(--accent-solid).

Индикатор активной вкладки плавно перетекает под иконку с анимацией ширины и позиции (transition: all var(--duration-normal) var(--ease-out)).

8.7. Bottom Sheet (Нижний лист)
Появляется снизу с анимацией transform.

Фон затемнения: rgba(0,0,0,0.5), backdrop-filter: blur(5px).

Верхние углы: border-radius: var(--radius-xxl) var(--radius-xxl) 0 0.

Ручка: полоска 40x4px, фон var(--border-strong), border-radius: var(--radius-full).

Можно закрыть свайпом вниз (drag to dismiss).

8.8. Modal (Модальное окно)
Фон затемнения: rgba(0,0,0,0.5), backdrop-filter: blur(10px).

Само окно: glass-surface, border-radius: var(--radius-xxl), тень var(--shadow-lg), максимальная ширина 400px.

Заголовок: --fs-title-2, --fw-bold. Кнопка закрытия (крестик) справа.

Появление с анимацией appear.

8.9. Toast (Всплывающее уведомление)
Варианты: success, error, info.

Фон: var(--bg-surface-solid) с блюром. Иконка слева, текст, кнопка закрытия.

Цвет иконки соответствует типу (зелёный, красный, синий).

Анимация: выезд сверху/снизу, затем исчезновение через 3 секунды.

8.10. Typing Indicator (Индикатор печатает)
Три точки (круги 6px) с отступом 4px, фон var(--accent-solid).

Анимация: каждая точка пульсирует с задержкой (0s, 0.2s, 0.4s) с использованием keyframes typingPulse.

9. Детальная проработка ключевых экранов
9.1. Экран «Список чатов» (ChatList)
Макет (слева направо):

Верхний бар (Header):

Слева: аватарка профиля (размер sm). При нажатии открывается профиль с эффектом стекла (shared element transition).

По центру: либо логотип «GryFf», либо поле поиска (умный поиск, появляется при фокусе).

Справа: иконка создания нового чата/сообщества (плюс в кружке с градиентом).

Список чатов:

Вертикальный список элементов ChatListItem.

Между элементами нет разделителей, только воздух (отступы).

Каждый элемент — карточка с большими отступами, при нажатии переход в чат.

Нижняя навигация (TabBar):

Плавающая стеклянная панель внизу, прижата к низу с отступом 16px.

Пункты: «Чаты», «Сообщества», «Звонки», «Контакты», «Настройки».

Активная иконка подсвечена оранжевым градиентом и имеет плавный индикатор.

CSS-классы: .chat-list, .chat-list__header, .chat-list__items, .tab-bar.

9.2. Экран «Чат» (Chat)
Макет:

Верхний бар (Header):

Кнопка «Назад» (стрелка).

Аватарка (размер sm) и имя собеседника/группы (при нажатии — информация о чате).

Справа: иконка звонка (аудио/видео) и меню (три точки).

Лента сообщений (Message List):

Вертикальный скролл.

Сообщения группируются по дням с датой-разделителем (стиль --fs-footnote, --text-tertiary).

Пузырьки сообщений с аватарками для входящих (если не первое в группе — аватарка скрыта).

При скролле вверх подгружаются старые сообщения.

Поле ввода (Input Bar):

Плавающая панель над списком сообщений (фон glass-surface, отступы 8px).

Слева: иконка «+» (открывает меню прикрепления с красивой анимацией).

По центру: поле ввода (без обводки, просто текст на стекле).

Справа: иконка микрофона (превращается в иконку отправки, когда есть текст).

CSS-классы: .chat, .chat__header, .chat__messages, .chat__input-bar.

9.3. Экран «Профиль пользователя» (UserProfile)
Макет:

Шапка (Cover + Avatar):

Обложка (широкая картинка) с полупрозрачным градиентом снизу.

Аватарка (размер xl) поверх обложки, смещена вниз.

Имя, фамилия, статус (онлайн/офлайн).

Кнопки действий: «Написать», «Позвонить», «Добавить в друзья» (или «Редактировать» для своего профиля).

Табы:

Горизонтальные вкладки: «Стена», «Фото», «Друзья», «Информация».

Индикатор активной вкладки плавно перетекает.

Контент таба:

Стена: лента постов (как в ВК: аватар, имя, дата, текст, медиа, лайки, комментарии).

Фото: сетка 3 колонки, при нажатии открывается галерея (модальное окно).

Друзья: список друзей (аватарка, имя, кнопка «Написать»).

Информация: дата рождения, город, о себе, контакты.

CSS-классы: .profile, .profile__header, .profile__tabs, .profile__content.

9.4. Экран «Сообщество» (Community)
Аналогичен профилю, но с дополнительными табами:

Обсуждения (Discussions): список тем форума (название, автор, кол-во ответов).

Участники (Members): список с ролями (админ, модератор).

Голосовые каналы (Voice Channels): Discord-стиль (см. ниже).

9.5. Экран «Голосовые каналы» (VoiceChannels)
Трёхколоночный макет:

Левая колонка (каналы):

Список голосовых каналов сообщества.

Каждый канал: иконка динамика, название, количество участников.

Центральная колонка (выбранный канал):

Информация о канале (название, тема).

Крупно: кто сейчас говорит (аватарки с индикатором активности).

Правая колонка (участники):

Список участников канала с ролями и статусами (микрофон включён/выключен).

Все колонки имеют стеклянный фон с размытием.

9.6. Экран «Звонок» (Call)
Входящий звонок: полноэкранное модальное окно с аватаркой, именем, кнопками принять/отклонить.

Активный звонок:

Видео на весь экран (для 1-на-1) или сетка (для группы).

Маленькое окно себя (картинка в картинке) в углу.

Нижняя панель управления (микрофон, видео, стриминг экрана, завершить) — плавающая стеклянная.

10. Анимации переходов между экранами
10.1. Shared Element Transition (Общие элементы)
При нажатии на аватарку в списке чатов она плавно перемещается и изменяет размер в шапке нового экрана. Использовать framer-motion или View Transition API.

jsx
<motion.div
  layoutId={`avatar-${chat.id}`}
  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
>
  <Avatar size="md" src={chat.avatar} />
</motion.div>
10.2. Push/Pop экранов
Переход вперёд: новый экран появляется справа, текущий уезжает влево с лёгким затуханием.

Назад: обратная анимация.

Использовать AnimatePresence во framer-motion.

11. Доступность (Accessibility)
Все иконки должны иметь aria-label.

Кнопки должны быть доступны с клавиатуры (:focus-visible).

Цветовые контрасты соответствуют WCAG AA (минимум 4.5:1 для текста).

Уважать настройки пользователя:

css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
12. Примеры кода для ключевых экранов
12.1. Экран «Список чатов» (фрагмент)
tsx
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

const ChatList: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className="chat-list" data-theme={theme}>
      <header className="chat-list__header glass-surface">
        <Avatar size="sm" src={user.avatar} />
        <h1>GryFf</h1>
        <button className="btn-icon" aria-label="Создать чат">
          <PlusIcon />
        </button>
      </header>
      
      <div className="chat-list__items">
        <AnimatePresence>
          {chats.map(chat => (
            <motion.div
              key={chat.id}
              layoutId={`chat-${chat.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <ChatListItem
                avatar={chat.avatar}
                name={chat.name}
                lastMessage={chat.lastMessage}
                timestamp={chat.timestamp}
                unreadCount={chat.unreadCount}
                pinned={chat.pinned}
                muted={chat.muted}
                onClick={() => navigate(`/chat/${chat.id}`)}
                onSwipeLeft={() => togglePin(chat.id)}
                onSwipeRight={() => markAsRead(chat.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <nav className="tab-bar glass-surface">
        {/* иконки */}
      </nav>
    </div>
  );
};
12.2. CSS модуль (фрагмент)
css
.chat-list {
  background-color: var(--bg-primary);
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 0 16px;
}

.chat-list__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  margin: 16px 0;
  border-radius: var(--radius-xxl);
  background-color: var(--bg-surface);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-glass);
}

.chat-list__header h1 {
  font-size: var(--fs-headline);
  font-weight: var(--fw-bold);
  color: var(--text-primary);
}

.chat-list__items {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
13. Итоговые требования к ИИ-агенту
При генерации кода для GryFf разработчик (или ИИ) обязан:

Использовать все описанные выше CSS-переменные.

Реализовывать все микроанимации в соответствии с токенами.

Соблюдать принципы стеклянного дизайна для плавающих элементов.

Обеспечивать полную доступность (a11y).

Для сложных анимаций использовать framer-motion или эквивалент.

Следовать модульной сетке с базовым шагом 8px.

Строго придерживаться описанной структуры экранов (колонки, расположение кнопок, табы).

Конец документа