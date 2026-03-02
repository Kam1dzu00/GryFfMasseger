# GryFf - Гибридная социальная платформа

**GryFf** — это гибридная платформа общения, объединяющая лучшее из Telegram, VK и Discord.

## Возможности

- 💬 **Чаты** — личные, групповые (до 200k участников), каналы
- 👥 **Сообщества** — стена, обсуждения, голосовые каналы
- 📞 **Звонки** — аудио/видео, групповые, стриминг экрана
- 🎨 **Профиль** — стена, друзья, фотоальбомы (VK-style)
- 🤖 **Боты** — Telegram-подобный API
- ✨ **AI-фичи** — умные ответы, перевод, спам-фильтр

## Дизайн-система

| Элемент | Значение |
|---------|---------|
| Основной фон | `#808080` |
| Акцент | `#FF8C00` |
| Border Radius (сообщения) | `18px` |
| Border Radius (кнопки) | `12px` |

## Быстрый старт

### Требования

- **Backend**: Node.js 18+, Go 1.22+
- **Frontend**: Node.js 18+, pnpm
- **Базы данных**: PostgreSQL 16, Redis 7.2, NATS 2.10
- **Для звонков**: coturn сервер

### Запуск с Docker (рекомендуется)

```
bash
# Клонировать репозиторий
git clone https://github.com/Kam1dzu00/GryFfMasseger.git
cd GryFfMasseger

# Запустить инфраструктуру
docker-compose -f docker-compose.yml up -d

# Запустить backend
cd backend
npm install
npm run dev

# Запустить frontend (новый терминал)
cd frontend
pnpm install
pnpm dev
```

### Запуск полного стека (все сервисы)

```
bash
# Все сервисы через Docker
docker-compose -f docker-compose.full.yml up -d --build
```

### Ручной запуск

```
bash
# 1. PostgreSQL
docker run -d -p 5432:5432 -e POSTGRES_USER=gryff -e POSTGRES_PASSWORD=pass -e POSTGRES_DB=gryff postgres:16

# 2. Redis
docker run -d -p 6379:6379 redis:7.2-alpine

# 3. NATS
docker run -d -p 4222:4222 nats:2.10

# 4. MinIO (для медиа)
docker run -d -p 9000:9000 -p 9001:9001 -e MINIO_ROOT_USER=admin -e MINIO_ROOT_PASSWORD=password minio/minio server /data --console-address ":9001"
```

## Структура проекта

```
GryFf/
├── backend/              # Express + TypeScript (монолит, для совместимости)
├── frontend/            # React + TypeScript + Vite
├── services/           # Go микросервисы
│   ├── auth/          # Аутентификация
│   ├── user-service/ # Профили, друзья
│   ├── chat-service/ # Управление чатами
│   ├── message-service/ # Сообщения
│   ├── community-service/ # Сообщества
│   ├── media-service/ # Загрузка файлов
│   ├── call-service/ # WebRTC звонки
│   ├── bot-service/  # Bot API
│   └── ai-service/   # AI фичи
├── infrastructure/    # Docker, K8s,监控
└── protocol/          # Бинарный протокол
```

## API Endpoints

### Auth Service (порт 8081)
- `POST /auth/register` — регистрация
- `POST /auth/login` — вход
- `POST /auth/refresh` — refresh токен
- `POST /auth/2fa/enable` — включить 2FA

### User Service (порт 8082)
- `GET /users/:id` — профиль
- `PUT /users/:id` — обновить профиль
- `POST /friends` — добавить друга
- `GET /friends` — список друзей

### Chat Service (порт 8083)
- `POST /chats` — создать чат
- `GET /chats` — список чатов
- `POST /chats/:id/members` — добавить участника

### Message Service (порт 8084)
- `POST /messages` — отправить сообщение
- `GET /chats/:id/messages` — история

### Community Service (порт 8085)
- `POST /communities` — создать сообщество
- `GET /communities/:id` — информация
- `POST /communities/:id/posts` — пост на стене

### Media Service (порт 8086)
- `POST /upload` — загрузить файл
- `GET /files/:id` — получить файл

### Call Service (порт 8088)
- `POST /calls/create` — создать звонок
- `WebSocket /ws/calls` — сигналинг

### Bot Service (порт 8089)
- `POST /bots` — создать бота
- `GET /bots/:token/webhook` — вебхук

### AI Service (порт 8087)
- `POST /ai/check-spam` — проверка на спам
- `POST /ai/smart-reply` — умные ответы
- `POST /ai/translate` — перевод

## Переменные окружения

```
env
# Backend
DATABASE_URL=postgres://gryff:pass@localhost:5432/gryff
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_secret_key

# Services
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
REDIS_HOST=localhost
REDIS_PORT=6379
NATS_HOST=localhost
NATS_PORT=4222
```

## Разработка

```
bash
# Backend
cd backend
npm install
npm run dev     # Development
npm run build    # Production

# Frontend
cd frontend
pnpm install
pnpm dev        # Development
pnpm build      # Production

# Services (Go)
cd services/auth
go run main.go
```

## Docker Compose сервисы

| Сервис | Порт | Описание |
|--------|------|----------|
| postgres | 5432 | База данных |
| redis | 6379 | Кэш, Pub/Sub |
| nats | 4222 | Event Bus |
| minio | 9000/9001 | S3 хранилище |
| opensearch | 9200 | Поиск |
| prometheus | 9090 | Метрики |
| grafana | 3001 | Дашборды |
| loki | 3100 | Логи |
| jaeger | 16686 | Трейсинг |
| coturn | 3478 | TURN сервер |

## Тестирование

```
bash
# Frontend
cd frontend
pnpm test

# Go сервисы
cd services/auth
go test -v ./...
```

## Следующие шаги (по GryFf_ULTIMATE_GUIDE.md)

- [x] Этап 1: Инфраструктура
- [x] Этап 2: Социальная платформа
- [x] Этап 3: Реальное время
- [ ] Этап 4: Полировка и AI-фичи
  - [ ] Завершить интеграцию Bot Service
  - [ ] Документировать Bot API (Swagger)
  - [ ] AI фичи (спам-фильтр, умные ответы)
- [ ] Интеграция фронтенда на API Gateway
- [ ] Observability (Prometheus, Grafana, Loki, Jaeger)

## Лицензия

© 2026 GryFf Inc.
