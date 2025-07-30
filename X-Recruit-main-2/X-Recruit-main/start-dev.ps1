Write-Host "Starting X-Recruit Development Environment..." -ForegroundColor Green
Write-Host ""

# Start backend server in a new PowerShell window
Write-Host "Starting Backend Server..." -ForegroundColor Yellow
$currentDir = Get-Location
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$currentDir'; npm run backend"

# Wait a moment for backend to start
Start-Sleep -Seconds 3

# Start frontend development server in a new PowerShell window  
Write-Host "Starting Frontend Development Server..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$currentDir'; npm run dev"

Write-Host ""
Write-Host "Both servers are starting..." -ForegroundColor Green
Write-Host "Backend API: http://localhost:3001" -ForegroundColor Cyan
Write-Host "Frontend App: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
