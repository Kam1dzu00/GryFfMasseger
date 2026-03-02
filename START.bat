@echo off
chcp 65001 >nul
echo ==========================================
echo    GryFf - Запуск локального сервера
echo ==========================================
echo.

:: Проверка Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo [ОШИБКА] Node.js не установлен!
    echo Скачайте с https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js найден
echo.

:: Установка зависимостей бэкенда
echo [1/4] Установка зависимостей бэкенда...
cd backend
call npm install
if errorlevel 1 (
    echo [ОШИБКА] Не удалось установить зависимости бэкенда
    pause
    exit /b 1
)
echo [OK] Зависимости бэкенда установлены
echo.

:: Запуск бэкенда в отдельном окне
echo [2/4] Запуск бэкенда на порту 3000...
start "GryFf Backend" cmd /k "cd backend && npm run dev"
echo [OK] Бэкенд запущен
timeout /t 3 /nobreak >nul
echo.

:: Установка зависимостей фронтенда
echo [3/4] Установка зависимостей фронтенда...
cd ..\frontend
call npm install
if errorlevel 1 (
    echo [ОШИБКА] Не удалось установить зависимости фронтенда
    pause
    exit /b 1
)
echo [OK] Зависимости фронтенда установлены
echo.

:: Запуск фронтенда
echo [4/4] Запуск фронтенда на порту 5173...
start "GryFf Frontend" cmd /k "cd frontend && npm run dev"
echo [OK] Фронтенд запущен
echo.

echo ==========================================
echo    ВСЕ СЕРВИСЫ ЗАПУЩЕНЫ!
echo ==========================================
echo.
echo  Фронтенд: http://localhost:5173
echo  Бэкенд:  http://localhost:3000
echo.
echo  Логин:    Kam1dzu00@yandex.ru
echo  Пароль:   Misha305090
echo.
echo  Для остановки закройте окна терминалов
echo ==========================================
echo.

pause
