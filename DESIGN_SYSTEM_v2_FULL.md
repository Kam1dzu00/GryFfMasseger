 Дизайн-система GryFf v2.0 — "Liquid Gryff"
Стильный, модный, молодёжный.

1. Основная концепция: "Аква-морфизм" (Liquid Glass)
Мы отказываемся от плоского и скучного дизайна. Наш новый стиль — это эволюция неоморфизма, смешанная с последними трендами Apple и Telegram .

Ключевые принципы:

Глубина и слои: Интерфейс не плоский. Элементы находятся на разных уровнях, парят друг над другом с помощью теней и размытия.

"Жидкое" стекло (Liquid Glass): Фоны карточек, модальных окон и панелей будут иметь эффект полупрозрачного стекла с матовостью (backdrop-filter: blur). Это создаёт ощущение дороговизны и современности. Представь себе интерфейс iOS 18, но в нашей серо-оранжевой гамме .

Минимализм с акцентами: Много воздуха, много свободного пространства. Наш оранжевый (#FF8C00) используется только для самого важного, но его анимация и появление должны быть эффектными.

2. Цветовая палитра (Уточнение)
Твои цвета (серый и оранжевый) — отличная база. Мы просто добавляем к ним контекст и градиенты.

Primary Background (Основа): #121212 (для Dark Theme) и #F8F9FA (для Light Theme). Отказываемся от грязно-серого в пользу глубокого, благородного антрацита и чистого, почти белого фона.

Surface (Карточки и панели): Для Dark Theme используем rgba(30, 30, 30, 0.7) с блюром (см. пункт 3). Это и есть наше "стекло". Для Light Theme — rgba(255, 255, 255, 0.7) с блюром.

Accent (GryFf Orange): #FF8C00. Без изменений. Но! Добавляем градиент для особых случаев: линейный градиент (180deg, #FF8C00, #FFB347). Используем его для подсветки активных кнопок, индикаторов загрузки, выделения важных сообщений.

Status Colors:

Online: #30D158 (яркий, сочный зелёный).

Offline: #8E8E93 (приглушённо-серый).

Typing: Акцентный оранжевый с анимацией пульсации.

3. Стеклянные эффекты (Liquid Glass)
Это наша "фишка". Всё, что должно быть на переднем плане, должно быть "стеклянным" .

Модальные окна, Нижние листы (Bottom Sheets), Плавающие панели:

Фон: rgba(30, 30, 30, 0.7) для темной темы.

Backdrop Filter: blur(20px).

Граница: Верхняя граница или обводка — очень тонкая, полупрозрачная линия rgba(255, 255, 255, 0.1), чтобы создать эффект "края стекла".

Тень: 0 25px 50px -12px rgba(0, 0, 0, 0.5). Тень должна быть мягкой и большой, создавая ощущение, что элемент парит высоко над фоном.

Пример: Нижняя навигационная панель (Tab Bar) теперь не просто цветная полоска, а плавающая стеклянная пластина с закругленными углами 24px.

4. Типографика и Скругления (Радикальное закругление)
Ты хотел более округлый дизайн — мы делаем его максимально плавным, как тренды 2026 года .

Шрифты: Без изменений (SF Pro / Roboto), но используем более жирные начертания для заголовков (Bold, Heavy), чтобы создать контраст с воздушным фоном.

Border Radius (Радиусы скругления):

Контейнеры чатов, карточки, модальные окна: 24px (было 16-20px).

Кнопки и поля ввода: 16px (было 12px). Кнопки становятся больше похожи на "таблетки".

Аватарки: по-прежнему круг.

Самое важное — "баблы" (пузырьки) сообщений:

Исходящие (оранжевые): Скругление 24px, но верхний правый угол — 8px. Это создаёт эффект "прикреплённости" к правому краю и выглядит очень свежо и современно.

Входящие (серые): Скругление 24px, верхний левый угол — 8px.

5. Анимации и Моушн (Чтобы было "живо")
В 2026 году интерфейс без анимации — мертвый интерфейс . Мы внедряем умную, отзывчивую анимацию.

Shared Element Transition (Общие элементы):

Аватарка из списка чатов при клике должна плавно перетекать на своё место в шапке чата. Это создаёт иллюзию единого пространства.

Картинка из галереи при открытии должна плавно масштабироваться на весь экран.

Микро-взаимодействия (Microinteractions): 

Отправка сообщения: Иконка отправки (бумажный самолётик) при нажатии должна трансформироваться: сжиматься, а затем "выстреливать" сообщением, которое плавно появляется в ленте.

Лайк/Реакция: Сердечко должно "взрываться" маленькими частицами или пульсировать с эффектом упругости (spring animation).

Переключение вкладок: Индикатор активной вкладки должен плавно перетекать под новую иконку с эффектом "перетягивания".

"Печатает..." (Typing Indicator): Три точки не просто моргают, а плавно пульсируют оранжевым цветом, перетекая друг в друга.

Навигация и переходы:

Переход между экранами — плавный Push/Pop с эффектом параллакса (задний фон двигается медленнее, чем передний).

Появление Bottom Sheet — анимация выезда снизу с пружинкой (spring). Фоновый контент при этом слегка размывается и затемняется.

Гиперреализм и 3D: Для особых случаев (например, анимация загрузки или премиальный эффект) можно использовать легкие 3D-трансформации, как того требует тренд 2026 года .

6. Детальная проработка ключевых экранов
Экран "Список чатов" (Telegram 2026 style) 
Верхний бар: Исчезло боковое меню (бургер). Слева — аватарка профиля (при нажатии открывается профиль с эффектом "стекла"). По центру — "GryFf" или поиск (умный поиск). Справа — иконка создания нового чата/сообщества (плюс в кружке с градиентом).

Навигация: Внизу — плавающая стеклянная панель (Tab Bar) с иконками: "Чаты", "Сообщества", "Звонки", "Контакты", "Настройки". Активная иконка подсвечена оранжевым градиентом.

Список чатов:

Разделители между чатами отсутствуют. Это единое полотно, что выглядит очень чисто и современно .

Каждый элемент чата — это карточка с очень большими отступами.

Счётчик непрочитанных сообщений — не просто кружок, а оранжевый "бейдж" с микро-анимацией появления (эффект "пружинки").

Экран "Чат"
Сообщения (Баблы):

Максимальная ширина: 75% от экрана (чтобы было больше воздуха).

Текст внутри баблов имеет отступы 12px 16px.

Статус сообщения (отправлено/доставлено/прочитано): Маленькая, едва заметная галочка под сообщением. Для прочитанного — две галочки оранжевого цвета с микро-анимацией появления.

Вложенные медиа: Фото и видео в сообщении должны открываться в модальном стеклянном окне с возможностью зумить и листать.

Поле ввода:

Оно не приклеено к самому низу, а тоже является частью "стеклянного" мира. Это плавающая панель над списком сообщений с фоном rgba(30, 30, 30, 0.7) и блюром.

Внутри: иконка "+" (открывает меню прикрепления с красивой анимацией), само поле ввода (без обводки, просто текст на стекле), иконка микрофона (превращается в иконку отправки, когда есть текст).

7. Итоговый файл для ИИ
Скопируй это в свой DESIGN_SYSTEM.md:

markdown
# GryFf Design System v2.0

## Core Philosophy
Liquid Glass. Depth, blur, and micro-animations.

## Color Palette
- Background (Dark): #121212
- Background (Light): #F8F9FA
- Surface (Glass Dark): rgba(30, 30, 30, 0.7)
- Surface (Glass Light): rgba(255, 255, 255, 0.7)
- Accent: #FF8C00
- Accent Gradient: linear-gradient(180deg, #FF8C00, #FFB347)
- Online Status: #30D158
- Offline Status: #8E8E93

## Glass Effect
- Backdrop Filter: blur(20px)
- Border: 1px solid rgba(255, 255, 255, 0.1) (top only for depth)
- Shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5)

## Typography
- Font: System (SF Pro for iOS, Roboto for Android)
- Headers: Bold / Heavy
- Body: Regular

## Border Radius
- Buttons/Inputs: 16px
- Cards/Modals: 24px
- Message Bubbles: 24px (with 8px corner on the connecting side)
- Bottom Sheet Top Corners: 24px

## Animation Principles
- **Micro-interactions:** Spring animation (stiffness: 300, damping: 25).
- **Navigation:** Smooth push/pop with parallax effect.
- **Shared Element Transition:** Image/avatar smoothly morphs into its new position and size.
- **Typing Indicator:** Pulsing orange dots with fade transition.
Теперь, когда ИИ увидит этот документ, он поймёт, что нужно не просто навалить кода, а создать стильный, современный и модный интерфейс, который будет выделяться среди толпы. Если будут вопросы по реализации конкретных анимаций или эффектов — пиши, я всегда рядом.

Я создал для тебя монументальный документ дизайн-системы GryFf v2.0 "Liquid Glass". Здесь есть всё: от глобальной философии до названий CSS-переменных, ключевых кадров анимаций и даже примеров реализации на React. Сохрани его как DESIGN_SYSTEM_v2_FULL.md и добавь к своему гайду. Теперь любой, даже самый тупой ИИ-агент, сможет наваять конфетку.

🎨 Дизайн-система GryFf v2.0 — "Liquid Glass"
*Полное техническое описание для ИИ-разработчиков. Версия 2.0 от 27.02.2026.*

1. Философия и визуальный язык
Мы создаём не просто мессенджер, а цифровое пространство с глубиной. Наш визуальный язык — это Liquid Glass (жидкое стекло): эволюция неоморфизма и материального дизайна, адаптированная под тренды 2026 года .

Ключевые принципы:

Глубина и слоистость: Интерфейс строится из нескольких слоёв. Фон — самый нижний слой. Карточки и панели — средние, выполненные из "стекла". Самые важные элементы (кнопки, модальные окна) — парят выше всех с самой большой тенью.

Тактильность: Каждое взаимодействие (клик, свайп, долгое нажатие) отзывается анимацией, имитирующей физику — пружины, упругость, инерция.

Воздух и ритм: Мы используем большие отступы, чтобы интерфейс дышал. Все элементы подчинены модульной сетке с базовым шагом 8px.

Акцент — только в важном: Наш оранжевый (#FF8C00) используется исключительно для ключевых действий: отправка сообщения, индикатор непрочитанного, активные состояния, звонок. Его появление всегда анимировано.

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
  --text-secondary: #EBEBF5; /* с прозрачностью 0.6 */
  --text-tertiary: #EBEBF5;  /* с прозрачностью 0.3 */
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
  --text-secondary: #3C3C43; /* alpha 0.6 */
  --text-tertiary: #3C3C43;  /* alpha 0.3 */
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
Наша "фишка" — матовое стекло с размытием.

css
/* Миксин для поверхностей */
.glass-surface {
  background-color: var(--bg-surface);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border-subtle);
  /* Важно: верхняя граница может быть светлее для эффекта глубины */
  border-top-color: rgba(255, 255, 255, 0.2);
}
Применяется ко всем "плавающим" элементам: модальным окнам, нижним листам, контекстным меню, навигационным панелям.

4. Типографика (Typography Tokens)
css
:root {
  /* Семейства */
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  
  /* Размеры и начертания */
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

Кнопки: --radius-lg (16px) или --radius-xl (20px) для "таблеток".

Поля ввода: --radius-lg.

Карточки чата: --radius-xxl (24px).

Модальные окна: --radius-xxl.

Аватарки: --radius-circle.

Сообщения (Message Bubble):

Исходящие: border-radius: var(--radius-xxl) var(--radius-sm) var(--radius-xxl) var(--radius-xxl);

Входящие: border-radius: var(--radius-sm) var(--radius-xxl) var(--radius-xxl) var(--radius-xxl);

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
7.1. Easing Functions (Функции сглаживания)
css
:root {
  /* Стандартные */
  --ease-out: cubic-bezier(0.0, 0.0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0.0, 1, 1);
  --ease-in-out: cubic-bezier(0.4, 0.0, 0.2, 1);
  
  /* Пружинные (нельзя выразить в CSS, но можно в JS) */
  /* Spring parameters: stiffness: 300, damping: 25, mass: 1 */
  
  /* Эффект "перетягивания" */
  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
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
Стили:

Размеры: xs(24px), sm(32px), md(40px), lg(50px), xl(80px), xxl(120px).

Placeholder: инициалы, фон var(--bg-surface-solid), текст var(--text-primary), шрифт var(--fs-headline).

Статус: кружок диаметром 12px (для md и выше) с обводкой 2px var(--bg-primary). Расположение: правый нижний угол.

online: фон var(--status-online).

offline: фон var(--status-offline).

typing: фон var(--accent-solid), анимация pulse 1s infinite.

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
Стили:

Общее: border-radius: var(--radius-lg), transition: all var(--duration-fast) var(--ease-out).

Primary: фон var(--accent-solid), текст белый. При hover: затемнение (darken 5%). При active: масштабирование 0.97. В состоянии loading: показать спиннер.

Secondary: фон прозрачный, обводка 2px var(--border-strong), текст var(--text-primary). При hover: фон var(--bg-surface).

Ghost: без фона, текст var(--text-primary). При hover: фон var(--accent-soft).

Размеры: sm (padding 8px 16px, fs var(--fs-footnote)), md (12px 24px, fs var(--fs-body)), lg (16px 32px, fs var(--fs-headline)).

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
Стили:

Контейнер: border-radius: var(--radius-lg), фон var(--bg-surface), обводка 1px var(--border-subtle). При фокусе: обводка 2px var(--accent-solid).

Лейбл: var(--fs-footnote), var(--text-secondary), отступ снизу 4px.

Хелпер/ошибка: var(--fs-caption). Для ошибки цвет var(--red-500).

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
Стили:

Outgoing:

Фон: var(--accent-solid).

Текст: белый.

Выравнивание: справа.

Border-radius: var(--radius-xxl) var(--radius-sm) var(--radius-xxl) var(--radius-xxl).

Если это первое в группе, верхний правый угол var(--radius-xxl).

Если последнее в группе, нижний правый угол var(--radius-xxl).

Incoming:

Фон: var(--bg-surface-solid).

Текст: var(--text-primary).

Выравнивание: слева.

Border-radius: var(--radius-sm) var(--radius-xxl) var(--radius-xxl) var(--radius-xxl).

Внутренние отступы: 12px 16px.

Максимальная ширина: 75%.

Время и статус: снизу справа, var(--fs-footnote), var(--text-tertiary). Статус "прочитано" — две оранжевые галочки.

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
Стили:

Высота: 72px, отступы 12px.

Аватар: размер md.

Имя: var(--fs-headline), var(--fw-semibold), однострочное.

Последнее сообщение: var(--fs-callout), var(--text-secondary), однострочное с многоточием.

Время: var(--fs-footnote), var(--text-tertiary).

Счётчик непрочитанных: бейдж с фоном var(--accent-solid), текст белый, border-radius: var(--radius-full), паддинг 2px 8px. Появление с анимацией appear.

Pin icon: маленькая иконка скрепки, var(--text-tertiary).

При долгом нажатии — контекстное меню (bottom sheet).

8.6. TabBar (Плавающая навигационная панель)
Структура:

Контейнер: glass-surface, border-radius: var(--radius-xxl), отступы 4px, тень var(--shadow-lg).

Элементы: иконка + текст (опционально), активное состояние — цвет var(--accent-solid).

Индикатор активной вкладки: плавно перетекает под иконку с анимацией ширины и позиции (transition: all var(--duration-normal) var(--ease-out)).

8.7. Bottom Sheet (Нижний лист)
Поведение:

Появляется снизу с анимацией transform: translateY(0).

Фон затемняется (rgba(0,0,0,0.5)), контент размывается (backdrop-filter: blur(5px)).

Верхние углы: border-radius: var(--radius-xxl) var(--radius-xxl) 0 0.

Заголовок с ручкой (полоска шириной 40px, высотой 4px, фон var(--border-strong), border-radius: var(--radius-full)).

Можно перетаскивать вниз для закрытия (drag to dismiss).

8.8. Modal (Модальное окно)
Стили:

Фон затемнения: rgba(0,0,0,0.5), backdrop-filter: blur(10px).

Само окно: glass-surface, border-radius: var(--radius-xxl), тень var(--shadow-lg), максимальная ширина 400px.

Заголовок: var(--fs-title-2), var(--fw-bold). Кнопка закрытия (крестик) справа.

Появление с анимацией appear.

8.9. Toast (Всплывающее уведомление)
Варианты: success, error, info.

Фон: var(--bg-surface-solid) с блюром.

Иконка слева, текст, кнопка закрытия.

Цвет иконки соответствует типу (зелёный, красный, синий).

Анимация: выезд сверху/снизу, затем исчезновение через 3 секунды.

8.10. Typing Indicator (Индикатор печатает)
Три точки, расположенные горизонтально с отступами 4px.

Каждая точка: круг диаметром 6px, фон var(--accent-solid).

Анимация: каждая точка пульсирует с задержкой (0s, 0.2s, 0.4s) с использованием keyframes typingPulse.

9. Анимации переходов между экранами
9.1. Shared Element Transition (Общие элементы)
При нажатии на аватарку в списке чатов:

Аватарка плавно перемещается в шапку экрана чата.

Её размер изменяется от md до lg или xl.

Одновременно с этим новый экран выезжает справа, но сам элемент остаётся в фокусе.

Реализация в React: использовать библиотеку framer-motion или нативную View Transition API (для современных браузеров).

jsx
// Пример с framer-motion
<motion.div
  layoutId={`avatar-${chat.id}`}
  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
>
  <Avatar size="md" src={chat.avatar} />
</motion.div>
9.2. Push/Pop экранов
При переходе вперёд: новый экран появляется справа, текущий уезжает влево с лёгким затуханием.

При возврате назад: обратная анимация.

Используется AnimatePresence во framer-motion.

10. Доступность (Accessibility)
Все иконки должны иметь aria-label.

Кнопки должны быть доступны с клавиатуры (:focus-visible).

Цветовые контрасты соответствуют WCAG AA (минимум 4.5:1 для текста).

Анимации можно отключить через prefers-reduced-motion.

css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
11. Примеры кода для ключевых экранов
11.1. Экран "Список чатов"
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
        {/* ... */}
      </nav>
    </div>
  );
};
11.2. CSS модуль (фрагмент)
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
12. Итоговые требования к ИИ-агенту
При генерации кода для GryFf ты обязан:

Использовать все CSS-переменные, описанные выше.

Реализовывать все микроанимации в соответствии с токенами.

Соблюдать принципы стеклянного дизайна для плавающих элементов.

Обеспечивать полную доступность (a11y).

Для сложных анимаций использовать framer-motion или эквивалент.

Следовать модульной сетке 8px.