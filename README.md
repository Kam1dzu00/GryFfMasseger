# 🦁 GryFf — Гибридная социальная платформа

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Go Version](https://img.shields.io/badge/Go-1.22+-00ADD8?logo=go)](https://golang.org)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)](https://reactjs.org)
[![Docker](https://img.shields.io/badge/Docker-24.0-2496ED?logo=docker)](https://docker.com)
[![Kubernetes](https://img.shields.io/badge/K8s-1.29-326CE5?logo=kubernetes)](https://kubernetes.io)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**GryFf** — это гибридная платформа общения, объединяющая лучшее из **Telegram**, **VK** и **Discord**.  
Мы синтезируем скорость и UX Telegram, социальные функции VK и мощные голосовые возможности Discord, упаковывая всё в современный дизайн **Liquid Glass**.

<p align="center">
  <img src="https://via.placeholder.com/800x400.png?text=GryFf+Screenshot+Placeholder" alt="GryFf Preview" width="80%">
</p>

---

## ✨ Возможности

| Категория          | Что реализовано                                                                 |
|--------------------|---------------------------------------------------------------------------------|
| 💬 **Чаты**        | Личные, групповые (до 200k участников), каналы, бинарный протокол, E2E-шифрование |
| 👥 **Сообщества**  | Стена, обсуждения, голосовые каналы, система ролей                              |
| 📞 **Звонки**      | Аудио/видео 1-1 и групповые, стриминг экрана, SFU (mediasoup), TURN            |
| 🎨 **Профиль**     | Стена, друзья, фотоальбомы, настройки приватности (VK-style)                   |
| 🤖 **Боты**        | Telegram-подобный API, вебхуки, инлайн-режим                                    |
| ✨ **AI-фичи**     | Умные ответы, автоперевод, спам-фильтр, рекомендации контента                  |
| 🌓 **Темы**        | Светлая / тёмная тема, обои чатов, система токенов                             |
| 📱 **Кроссплатформа** | Web (React + PWA), Desktop (Electron), мобильные в разработке                |

---

## 🎨 Дизайн-система «Liquid Glass»

Мы создали уникальный визуальный язык, вдохновлённый iOS 18 и Telegram.

| Элемент              | Значение                            |
|----------------------|-------------------------------------|
| 🎨 Основной фон      | `#808080` (спокойный серый)        |
| 🔶 Акцент            | `#FF8C00` (используется точечно)   |
| 🪟 Стеклянные панели | `backdrop-filter: blur(20px)`       |
| 📏 Скругления        | Сообщения — 18px, кнопки — 12px     |
| 🎞️ Анимации         | Shared transitions, ripple, spring  |

Все цвета и размеры заданы через **CSS-переменные** для лёгкой кастомизации.

---

## 🚀 Быстрый старт

### Требования

- **Backend**: Go 1.22+, Node.js 18+ (для старого монолита)
- **Frontend**: Node.js 18+, pnpm
- **Базы данных**: PostgreSQL 16, Redis 7.2, NATS 2.10
- **Для звонков**: coturn (TURN сервер)

### Запуск через Docker (рекомендуется)

```bash
# Клонируем репозиторий
git clone https://github.com/Kam1dzu00/GryFfMasseger.git
cd GryFfMasseger

# Запускаем всю инфраструктуру (БД, очереди, хранилища)
docker-compose -f docker-compose.yml up -d

# Запускаем backend-микросервисы (в отдельных терминалах или через docker-compose.full)
cd services
# пример для auth-service
cd auth && go run main.go

# В новом терминале запускаем frontend
cd frontend
pnpm install
pnpm dev
Для запуска всех сервисов сразу используйте:

bash
docker-compose -f docker-compose.full.yml up -d --build
📁 Структура проекта
text
GryFf/
├── backend/               # Express + TypeScript (старый монолит, для совместимости)
├── frontend/              # React + TypeScript + Vite (основной клиент)
├── services/              # Go микросервисы
│   ├── auth/              # Аутентификация, JWT, 2FA
│   ├── user-service/      # Профили, друзья, стена
│   ├── chat-service/      # Управление чатами
│   ├── message-service/    # Сообщения, бинарный протокол
│   ├── community-service/  # Сообщества, посты, обсуждения
│   ├── media-service/      # Загрузка файлов, MinIO
│   ├── call-service/       # WebRTC звонки, SFU
│   ├── bot-service/        # Bot API
│   └── ai-service/         # AI-фичи
├── infrastructure/         # Docker, Kubernetes, Helm, Terraform
└── protocol/               # Спецификация бинарного протокола
🔌 API Endpoints (через API Gateway)
Сервис	Порт	Примеры эндпоинтов
Auth	8081	POST /auth/register, POST /auth/login, POST /auth/2fa/enable
User	8082	GET /users/:id, PUT /users/:id, POST /friends
Chat	8083	POST /chats, GET /chats, POST /chats/:id/members
Message	8084	POST /messages, GET /chats/:id/messages, POST /messages/smart-replies
Community	8085	POST /communities, GET /communities/:id/posts
Media	8086	POST /upload, GET /files/:id
Call	8088	POST /calls/create, WebSocket /ws/calls
Bot	8089	POST /bots, POST /bots/:id/webhook
AI	8087	POST /ai/check-spam, POST /ai/smart-reply, POST /ai/translate
Все запросы проходят через API Gateway (Nginx) на порту 80.

🗄️ Инфраструктура и DevOps
Мы используем современный стек для надёжности и масштабирования:

Компонент	Технология
Оркестрация	Kubernetes 1.29 + Helm 3.14
CI/CD	GitHub Actions + ArgoCD
Базы данных	PostgreSQL 16, ScyllaDB 5.2, Redis 7.2
Хранилище	MinIO (S3-совместимое)
Очереди	NATS 2.10 / Kafka
Мониторинг	Prometheus 2.50, Grafana 10.3, Loki 2.9
Трейсинг	Jaeger 1.52
Звонки	mediasoup 3.12, coturn 4.6
🧪 Тестирование
bash
# Frontend
cd frontend
pnpm test

# Go-сервисы (пример для auth)
cd services/auth
go test -v ./...
Мы стремимся к покрытию тестами >80% (unit + интеграционные).

📚 Документация
GAID.md — полная инструкция для AI-разработчика (архитектура, дизайн, процесс).

DESIGN_SYSTEM.md — детальное описание визуального языка.

GryFf_ULTIMATE_GUIDE.md — дорожная карта и философия проекта.

TODO.md — актуальные задачи.

CHANGELOG.md — история изменений.

🗺️ Дорожная карта (согласно GryFf_ULTIMATE_GUIDE.md)
Этап 1 — Масштабируемое ядро (микросервисы, инфраструктура)

Этап 2 — Социальная платформа (профили, сообщества)

Этап 3 — Реальное время (звонки, голосовые каналы)

Этап 4 — Полировка и AI-фичи

Завершить интеграцию Bot Service

Документировать Bot API (Swagger)

Реализовать AI-фичи (спам-фильтр, умные ответы, перевод)

Полное покрытие observability

Этап 5 — Дизайн-система и UI (Storybook, анимации)

Этап 9 — Мобильные приложения (iOS/Android)

🤝 Как помочь проекту
Мы приветствуем любые contributions!

Сообщайте об ошибках в Issues.

Предлагайте фичи.

Создавайте PR — мы их любим!

Перед отправкой PR ознакомьтесь с CONTRIBUTING.md.

📄 Лицензия
Проект распространяется под лицензией MIT.
© 2026 GryFf Inc.