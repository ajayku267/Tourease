# migrate-components.ps1
# Author: Claude
# Date: 2023-04-09
# Purpose: Automate the migration of components from app/components to the new structure

# Stop on errors
$ErrorActionPreference = "Stop"

Write-Host "TourEase Component Migration Script" -ForegroundColor Cyan
Write-Host "===============================" -ForegroundColor Cyan
Write-Host "This script will migrate components from the old structure to the new structure."
Write-Host "IMPORTANT: Please make sure you have backed up your project before running this script." -ForegroundColor Yellow
Write-Host ""

# Confirm before proceeding
$confirm = Read-Host "Do you want to proceed? (y/n)"
if ($confirm -ne "y") {
    Write-Host "Migration cancelled." -ForegroundColor Red
    exit
}

# Create necessary directories if they don't exist
$directories = @(
    "components",
    "components/ui",
    "components/features",
    "components/shared",
    "components/providers"
)

foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        Write-Host "Creating directory: $dir" -ForegroundColor Green
        New-Item -ItemType Directory -Path $dir | Out-Null
    }
}

# Define migration mapping
$migrationMap = @{
    # UI components
    "app/components/ui" = "components/ui"

    # Feature components
    "app/components/features/AIDestinationRecommender.tsx" = "components/features/AIDestinationRecommender.tsx"
    "app/components/features/ImmersiveExplorer.tsx" = "components/features/ImmersiveExplorer.tsx"
    "app/components/features/3DTravelGallery.tsx" = "components/features/ThreeDTravelGallery.tsx"
    "app/components/features/WeatherWidget.tsx" = "components/features/WeatherWidget.tsx"
    "app/components/features/PackingChecklist.tsx" = "components/features/PackingChecklist.tsx"
    "app/components/features/TripCard.tsx" = "components/features/TripCard.tsx"

    # Shared components
    "app/components/AnimatedHero.tsx" = "components/shared/AnimatedHero.tsx"
    "app/components/DestinationCard.tsx" = "components/shared/DestinationCard.tsx"
    "app/components/FeatureCard.tsx" = "components/shared/FeatureCard.tsx"
    "app/components/TestimonialCard.tsx" = "components/shared/TestimonialCard.tsx"
    
    # Providers
    "app/components/ThemeProvider.tsx" = "components/providers/ThemeProvider.tsx"
}

# Track migration statistics
$totalFiles = 0
$migratedFiles = 0
$skippedFiles = 0

# Function to migrate a single file or directory
function Migrate-Item {
    param (
        [string]$Source,
        [string]$Destination
    )

    # Check if source exists
    if (-not (Test-Path $Source)) {
        Write-Host "Skipping $Source - source does not exist" -ForegroundColor Yellow
        $global:skippedFiles++
        return
    }

    # Check if destination parent directory exists
    $destDir = Split-Path -Parent $Destination
    if (-not (Test-Path $destDir)) {
        Write-Host "Creating directory: $destDir" -ForegroundColor Green
        New-Item -ItemType Directory -Path $destDir -Force | Out-Null
    }

    # Check if it's a directory
    if ((Get-Item $Source) -is [System.IO.DirectoryInfo]) {
        # Copy all files in the directory
        $files = Get-ChildItem -Path $Source -File
        foreach ($file in $files) {
            $destFile = Join-Path -Path $Destination -ChildPath $file.Name
            Copy-Item -Path $file.FullName -Destination $destFile -Force
            Write-Host "Migrated: $($file.FullName) -> $destFile" -ForegroundColor Green
            $global:migratedFiles++
            $global:totalFiles++
        }
    }
    else {
        # Copy single file
        Copy-Item -Path $Source -Destination $Destination -Force
        Write-Host "Migrated: $Source -> $Destination" -ForegroundColor Green
        $global:migratedFiles++
        $global:totalFiles++
    }
}

# Perform migration
foreach ($source in $migrationMap.Keys) {
    $destination = $migrationMap[$source]
    Migrate-Item -Source $source -Destination $destination
}

# Print summary
Write-Host ""
Write-Host "Migration Summary:" -ForegroundColor Cyan
Write-Host "===============================" -ForegroundColor Cyan
Write-Host "Total files processed: $totalFiles"
Write-Host "Files migrated: $migratedFiles"
Write-Host "Files skipped: $skippedFiles"
Write-Host ""

if ($migratedFiles -gt 0) {
    Write-Host "Next Steps:" -ForegroundColor Green
    Write-Host "1. Run the update-imports.ps1 script to update import paths"
    Write-Host "2. Test your application to ensure everything works correctly"
    Write-Host "3. Once confirmed working, you can remove the original files from app/components"
}
else {
    Write-Host "No files were migrated. Please check your project structure." -ForegroundColor Yellow
} 