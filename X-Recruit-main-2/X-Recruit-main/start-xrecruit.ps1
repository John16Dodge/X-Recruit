# X-Recruit Enhanced Development Server Starter
# This script starts both the backend and frontend servers with enhanced monitoring

function Write-Banner {
    Write-Host "===============================================" -ForegroundColor Green
    Write-Host "          X-RECRUIT APPLICATION STARTER" -ForegroundColor Green  
    Write-Host "===============================================" -ForegroundColor Green
}

function Test-NodeJS {
    try {
        $nodeVersion = node --version
        Write-Host "[INFO] Node.js found: $nodeVersion" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "[ERROR] Node.js is not installed or not in PATH" -ForegroundColor Red
        Write-Host "Please install Node.js from https://nodejs.org" -ForegroundColor Yellow
        return $false
    }
}

function Test-Port {
    param([int]$Port)
    try {
        $connection = Test-NetConnection -ComputerName "localhost" -Port $Port -WarningAction SilentlyContinue
        return $connection.TcpTestSucceeded
    } catch {
        return $false
    }
}

Clear-Host
Write-Banner

# Check Node.js installation
if (-not (Test-NodeJS)) {
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if ports are already in use
if (Test-Port -Port 3001) {
    Write-Host "[WARNING] Port 3001 is already in use!" -ForegroundColor Yellow
}
if (Test-Port -Port 8080) {
    Write-Host "[WARNING] Port 8080 is already in use!" -ForegroundColor Yellow
}

Write-Host "`n[INFO] Starting X-Recruit Application..." -ForegroundColor Cyan

# Start Backend Server
Write-Host "[BACKEND] Starting API Server on Port 3001..." -ForegroundColor Yellow
$backendProcess = Start-Process powershell -ArgumentList "-NoExit", "-Command", "& {Set-Location '$PSScriptRoot'; Write-Host 'Starting X-Recruit Backend Server...' -ForegroundColor Green; node backend/server.cjs}" -PassThru

# Wait for backend to start
Write-Host "[INFO] Waiting for backend to initialize..." -ForegroundColor Cyan
Start-Sleep -Seconds 6

# Test backend health
try {
    $healthCheck = Invoke-RestMethod -Uri "http://localhost:3001/api/health" -Method Get -TimeoutSec 5
    Write-Host "[SUCCESS] Backend is running: $($healthCheck.message)" -ForegroundColor Green
} catch {
    Write-Host "[WARNING] Backend health check failed, but continuing..." -ForegroundColor Yellow
}

# Start Frontend Server
Write-Host "[FRONTEND] Starting Web Application on Port 8080..." -ForegroundColor Yellow
$frontendProcess = Start-Process powershell -ArgumentList "-NoExit", "-Command", "& {Set-Location '$PSScriptRoot'; Write-Host 'Starting X-Recruit Frontend Server...' -ForegroundColor Blue; npm run dev}" -PassThru

# Final status
Write-Host "`n===============================================" -ForegroundColor Green
Write-Host "           SERVERS STATUS" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Green
Write-Host "[BACKEND]  API Server: http://localhost:3001" -ForegroundColor Cyan
Write-Host "[FRONTEND] Web App:    http://localhost:8080" -ForegroundColor Cyan
Write-Host "[HEALTH]   Health:     http://localhost:3001/api/health" -ForegroundColor Cyan
Write-Host "[DOCS]     API Docs:   http://localhost:3001/api" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Green

Write-Host "`n[INFO] Both servers are running in separate windows" -ForegroundColor Green
Write-Host "[INFO] Close their respective windows to stop the servers" -ForegroundColor Yellow
Write-Host "[INFO] Press Ctrl+C to stop this monitoring script" -ForegroundColor Yellow

Read-Host "`nPress Enter to exit this launcher"
