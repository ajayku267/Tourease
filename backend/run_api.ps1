# PowerShell script to run the TourEase API

$venvPath = "..\\.venv"
$activateScript = "$venvPath\\Scripts\\Activate.ps1"
$pythonCmd = "$venvPath\\Scripts\\python.exe"
$pipCmd = "$venvPath\\Scripts\\pip.exe"

# Check if we need to create virtual environment
if (-not (Test-Path $venvPath)) {
    Write-Host "Virtual environment not found. Creating..." -ForegroundColor Yellow
    python -m venv ../.venv
    
    if (-not $?) {
        Write-Host "Failed to create virtual environment. Please make sure Python is installed." -ForegroundColor Red
        exit 1
    }
}

# Activate virtual environment if it exists
if (Test-Path $activateScript) {
    try {
        . $activateScript
        Write-Host "Virtual environment activated." -ForegroundColor Green
    } catch {
        Write-Host "Failed to activate virtual environment: $_" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "Activation script not found. Cannot continue." -ForegroundColor Red
    exit 1
}

# Install requirements
Write-Host "Installing requirements..." -ForegroundColor Yellow
& $pipCmd install -r requirements.txt

if (-not $?) {
    Write-Host "Failed to install requirements. Please check requirements.txt" -ForegroundColor Red
    exit 1
}

# Run the initialization script if needed
$dataDir = Join-Path $PSScriptRoot "data"
$toursDataFile = Join-Path $dataDir "tours.json"
$tourGuidesDataFile = Join-Path $dataDir "tour_guides.json"

if (-not (Test-Path $dataDir)) {
    Write-Host "Creating data directory..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $dataDir | Out-Null
}

if ((-not (Test-Path $toursDataFile)) -or (-not (Test-Path $tourGuidesDataFile))) {
    Write-Host "Initializing sample data..." -ForegroundColor Yellow
    & $pythonCmd initialize_data.py
}

# Run the API server
Write-Host "Starting API server..." -ForegroundColor Green
& $pythonCmd -m uvicorn main:app --reload --host 0.0.0.0 --port 8000

Write-Host "API server stopped." -ForegroundColor Yellow 