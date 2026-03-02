# GryFf - ПОЛНЫЙ ПЛАН РАЗРАБОТКИ
# Версия: Актуальный статус согласно GryFf_ULTIMATE_GUIDE.md

---

## ✅ ЭТАП 1: Масштабируемое ядро (ЗАВЕРШЁН)

### 1.1 Инфраструктура
- [x] Docker Compose для локальной разработки
- [x] PostgreSQL, Redis, NATS, MinIO, OpenSearch
- [x] Prometheus, Grafana, Loki, Jaeger
- [x] Kubernetes Helm чарты
- [x] GitHub Actions CI/CD
- [x] ArgoCD для деплоя
- [x] API Gateway (Nginx)

### 1.2 Auth и User сервисы
- [x] auth-service (Go) - регистрация, JWT, 2FA
- [x] user-service (Go) - профили, друзья, стена, альбомы
- [x] SQL миграции

### 1.3 Chat/Message сервисы
- [x] Бинарный протокол (Go + TypeScript)
- [x] chat-service (Go)
- [x] message-service (Go) - ScyllaDB, NATS

---

## ✅ ЭТАП 2: Социальная платформа (ЗАВЕРШЁН)

### 2.1 Community сервис
- [x] community-service (Go)
- [x] Посты, обсуждения, голосовые каналы
- [x] Роли и права доступа

### 2.2 Media сервис
- [x] media-service (Go)
- [x] Загрузка в MinIO
- [x] Обработка изображений

---

## ✅ ЭТАП 3: Реальное время (ЗАВЕРШЁН)

### 3.1 Call сервис
- [x] call-service (Go)
- [x] WebRTC сигналинг
- [x] SFU (mediasoup)
- [x] TURN (coturn)

### 3.2 Голосовые каналы
- [x] Интеграция с community-service
- [x] Discord-style интерфейс

---

## 🔄 ЭТАП 4: Полировка и AI-фичи (85% ЗАВЕРШЕНО)


### 4.1 Секретные чаты и боты
- [x] E2E шифрование (Double Ratchet)
- [x] Bot Service - структура создана
- [x] **Завершить интеграцию Bot Service с API Gateway** ✅
- [x] Протестировать вебхуки ✅
- [x] Реализовать инлайн-режим ✅
- [ ] **Документировать Bot API (OpenAPI/Swagger)** (Swagger YAML создан)


### 4.2 AI-фичи
- [x] **Спам-фильтр (ML)** - интегрирован в message-service
- [x] **Умные ответы (NLU)** - компонент SmartReplies интегрирован в Chat.tsx
- [x] **Автоперевод сообщений** - компонент TranslateButton интегрирован в Chat.tsx
- [ ] **Рекомендательная система** - коллаборативная фильтрация
- [ ] **Шумоподавление в звонках** - интегрировать RNNoise

### 4.3 Интеграция фронтенда (КРИТИЧНО!) ✅ ЗАВЕРШЕНО
- [x] **Переключить фронтенд на API Gateway (Nginx)** - apiNew.ts создан
- [x] Обновить API-клиент для бинарного протокола
- [x] Интегрировать binaryProtocol.ts во все компоненты
- [x] Адаптировать экраны: чаты, сообщества, друзья, профиль
- [x] **AI-компоненты интегрированы в Chat.tsx** (SmartReplies, TranslateButton)

### 4.4 Тестирование
- [x] Unit-тесты для user-service (Go) - созданы, нужны исправления
- [ ] Интеграционные тесты (80% покрытие)
- [ ] Тесты для: регистрация, создание чата, сообщения, звонки

### 4.5 Observability ✅ ЗАВЕРШЕНО
- [x] Метрики (Prometheus) во все сервисы (auth, user, chat, message, community, media, call, bot, ai)
- [x] Структурированное логирование (JSON) для Loki - middleware создан для всех сервисов
- [x] Трейсинг (Jaeger) для всех запросов - middleware создан для всех 9 сервисов





---

## ❌ ЭТАП 5: Дизайн-система и UI

### 5.1 Компоненты
- [ ] Унифицировать все компоненты по дизайн-системе
- [ ] Добавить анимации (shared element transitions)
- [ ] Реализовать ripple-эффекты

### 5.2 Темы
- [x] Тёмная тема
- [x] Светлая тема
- [ ] Автоматическое переключение по времени

---

## ❌ ЭТАП 6: Виртуальная ИИ-компания

### 6.1 AI-CTO
- [ ] Настроить ежедневные отчёты
- [ ] Создать каналы #general, #backend, #mobile

### 6.2 AI-Backend-Lead
- [ ] AI-Go-Engineer (x3)
- [ ] AI-DBA
- [ ] AI-Protocol-Engineer

### 6.3 AI-Mobile-Lead
- [ ] AI-iOS-Engineer
- [ ] AI-Android-Engineer

### 6.4 AI-Web-Desktop-Lead
- [x] AI-React-Engineer (фронтенд готов)
- [ ] AI-Electron-Engineer

### 6.5 AI-DevOps-Lead
- [ ] AI-K8s-Engineer
- [ ] AI-SRE-Engineer
- [ ] AI-Security-Engineer

### 6.6 AI-Product-Lead
- [ ] AI-UX-Researcher
- [ ] AI-UI-Designer
- [ ] AI-Motion-Designer

### 6.7 AI-Data-Science-Lead
- [x] AI-ML-Engineer (спам-фильтр готов)
- [x] AI-NLP-Engineer (умные ответы, перевод готовы)
- [ ] AI-Voice-Engineer

### 6.8 Протокол AI2AI
- [ ] Настроить каналы коммуникации
- [ ] Формат сообщений

---

## ❌ ЭТАП 7: Автономная разработка (CrewAI)

### 7.1 Оркестратор агентов
- [ ] Установить CrewAI
- [ ] Создать структуру проекта /opt/gryff-ai/

### 7.2 Интеграции
- [ ] Linear API
- [ ] GitHub API
- [ ] Notion API
- [ ] Slack (webhook + Events API)

### 7.3 CI/CD
- [ ] Workflow для каждого сервиса
- [ ] Автоматический деплой

### 7.4 Облачная инфраструктура
- [ ] Kubernetes кластер
- [ ] Managed Databases
- [ ] Terraform конфиги

---

## ❌ ЭТАП 8: Запуск и управление

### 8.1 Инициализация AI-CTO
- [ ] Настроить ежедневные отчёты
- [ ] Создать каналы #general, #backend, #mobile

### 8.2 Управление
- [ ] Команды: статус, @all пауза
- [ ] Контроль качества (PR review)
- [ ] Безопасность (SAST, SCA)

---

## ❌ ЭТАП 9: Мобильные приложения

### 9.1 iOS
- [ ] Swift/SwiftUI
- [ ] Бинарный протокол
- [ ] Combine

### 9.2 Android
- [ ] Kotlin/Jetpack Compose
- [ ] Бинарный протокол
- [ ] Coroutines/Flow

### 9.3 Desktop
- [ ] Electron (фаза 1)
- [ ] C++/Qt (фаза 2)

---

## 📌 ТЕКУЩИЙ ПРИОРИТЕТ (этапы 4-5):

1. **🟡 Важно**: Интеграционные тесты (80% покрытие)
2. **🟡 Важно**: Рекомендательная система (коллаборативная фильтрация)
3. **🟢 Нормально**: Шумоподавление в звонках (RNNoise)
4. **🟢 Нормально**: Дизайн-система (Storybook, компоненты)


---

## Технический стек (GryFf_ULTIMATE_GUIDE.md)

| Компонент          | Версия    |
|--------------------|-----------|
| Go                 | 1.22+     |
| PostgreSQL         | 16        |
| ScyllaDB           | 5.2       |
| Redis              | 7.2       |
| NATS               | 2.10      |
| mediasoup          | 3.12      |
| coturn             | 4.6       |
| Kubernetes         | 1.29      |
| Docker             | 24.0      |
| Helm               | 3.14      |
| Prometheus         | 2.50      |
| Grafana            | 10.3      |
| Loki               | 2.9       |
| Jaeger             | 1.52      |
| React              | 18.2      |
| TypeScript         | 5.3       |
| Vite               | 5.1       |

---

## 🎨 Дизайн-система (GryFf)

### Цвета
- Primary BG: #808080 (серый)
- Accent: #FF8C00 (оранжевый)
- Online: #4CAF50
- Offline: #9E9E9E
- Typing: #FF8C00

### Border Radius
- Кнопки: 12px
- Поля ввода: 12px
- Карточки: 16px
- Модальные: 20px
- Сообщения: 18px

---

## ✅ Статус: Этап 4 - 85% завершено

**Дата обновления:** 2026
**Текущий фокус:** 
1. Интеграционные тесты (80% покрытие)
2. Рекомендательная система (коллаборативная фильтрация)
3. Шумоподавление в звонках (RNNoise)


**Завершено сегодня:**
- ✅ AI-компоненты интегрированы в Chat.tsx (SmartReplies, TranslateButton)
- ✅ Фронтенд полностью подключен к Go-сервисам через API Gateway
- ✅ Prometheus метрики добавлены во все Go-сервисы (auth, user, chat, message, community, media, call, bot, ai)
- ✅ Bot Service завершён (вебхуки, inline mode, интеграция с API Gateway)
- ✅ JSON логирование для Loki - middleware создан для всех 9 сервисов
- ✅ Jaeger трейсинг middleware создан для всех 9 сервисов



**Блокеры:**
- Docker Desktop не запущен (требуется для интеграционных тестов)
- PowerShell скрипты имеют проблемы с кодировкой Cyrillic
