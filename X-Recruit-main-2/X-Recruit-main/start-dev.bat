@echo off
echo Starting X-Recruit Development Environment...
echo.

REM Start backend server in a new window
echo Starting Backend Server...
start "X-Recruit Backend" cmd /k "cd /d %~dp0 && npm run backend"

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend development server in a new window
echo Starting Frontend Development Server...
start "X-Recruit Frontend" cmd /k "cd /d %~dp0 && npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:3001
echo Frontend: http://localhost:5173
echo.
pause
