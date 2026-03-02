@echo off
setlocal
chcp 65001 >nul

set "ROOT=%~dp0"
pushd "%ROOT%"

echo ==========================================
echo    GryFf - Local Development Launcher
echo ==========================================
echo.

where node >nul 2>&1
if errorlevel 1 (
  echo [ERROR] Node.js is not installed or not in PATH.
  pause
  exit /b 1
)

echo [OK] Node.js found
echo.

if not exist "%ROOT%backend\package.json" (
  echo [ERROR] backend\package.json not found.
  pause
  exit /b 1
)

if not exist "%ROOT%frontend\package.json" (
  echo [ERROR] frontend\package.json not found.
  pause
  exit /b 1
)

echo [0/5] Cleaning busy ports (3000, 5173)...
powershell -NoProfile -ExecutionPolicy Bypass -Command "$ports=@(3000,5173); foreach($p in $ports){$c=Get-NetTCPConnection -LocalPort $p -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1; if($c){Stop-Process -Id $c.OwningProcess -Force -ErrorAction SilentlyContinue; Write-Host ('[INFO] Freed port ' + $p + ' (PID ' + $c.OwningProcess + ')');}}"
timeout /t 1 /nobreak >nul

echo [1/5] Installing backend dependencies...
cd /d "%ROOT%backend"
call npm install
if errorlevel 1 (
  echo [ERROR] Backend dependencies install failed.
  pause
  exit /b 1
)

echo [2/5] Starting backend (port 3000)...
start "GryFf Backend" cmd /k "cd /d \"%ROOT%backend\" && npm run dev"
timeout /t 2 /nobreak >nul

echo [3/5] Installing frontend dependencies...
cd /d "%ROOT%frontend"
call npm install
if errorlevel 1 (
  echo [ERROR] Frontend dependencies install failed.
  pause
  exit /b 1
)

echo [4/5] Starting frontend (port 5173)...
start "GryFf Frontend" cmd /k "cd /d \"%ROOT%frontend\" && npm run dev -- --host 0.0.0.0 --port 5173"
timeout /t 2 /nobreak >nul

echo [5/5] Checking availability...
powershell -NoProfile -ExecutionPolicy Bypass -Command "try {$f=(Invoke-WebRequest -Uri 'http://localhost:5173' -UseBasicParsing -TimeoutSec 8).StatusCode; Write-Host ('[OK] Frontend HTTP ' + $f)} catch {Write-Host ('[WARN] Frontend check failed: ' + $_.Exception.Message)}; try {$b=(Invoke-WebRequest -Uri 'http://localhost:3000' -UseBasicParsing -TimeoutSec 8).StatusCode; Write-Host ('[OK] Backend HTTP ' + $b)} catch {Write-Host ('[WARN] Backend check failed: ' + $_.Exception.Message)}"

echo.
echo ==========================================
echo Services started:
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:3000
echo ==========================================
echo.
echo Admin login:
echo Email:    Kam1dzu00@yandex.ru
echo Password: Misha305090
echo.
echo Close opened terminal windows to stop services.

popd
pause
