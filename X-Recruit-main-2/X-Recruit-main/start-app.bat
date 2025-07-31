@echo off
color 0A
echo ===============================================
echo          X-RECRUIT APPLICATION STARTER
echo ===============================================
echo.

echo [INFO] Checking if Node.js is installed...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo [INFO] Node.js found!
echo [INFO] Starting X-Recruit Application...
echo.

REM Start Backend Server
echo [BACKEND] Starting Backend Server on Port 3001...
start "X-Recruit Backend" cmd /k "title X-Recruit Backend && cd /d "%~dp0" && echo Starting backend server... && node backend/server.cjs"

REM Wait for backend to start
echo [INFO] Waiting for backend to initialize...
timeout /t 5 /nobreak >nul

REM Start Frontend Development Server
echo [FRONTEND] Starting Frontend Development Server on Port 8080...
start "X-Recruit Frontend" cmd /k "title X-Recruit Frontend && cd /d "%~dp0" && echo Starting frontend server... && npm run dev"

echo.
echo ===============================================
echo           SERVERS STARTING UP...
echo ===============================================
echo [BACKEND]  API Server: http://localhost:3001
echo [FRONTEND] Web App:    http://localhost:8080
echo [HEALTH]   Health:     http://localhost:3001/api/health
echo ===============================================
echo.
echo [INFO] Both servers are starting in separate windows
echo [INFO] Close this window when you're done
echo [INFO] To stop servers, close their respective windows
echo.
pause
