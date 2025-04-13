# update-imports.ps1
# Author: Claude
# Date: 2023-04-09
# Purpose: Update import paths after migrating components

# Stop on errors
$ErrorActionPreference = "Stop"

Write-Host "TourEase Import Path Update Script" -ForegroundColor Cyan
Write-Host "===============================" -ForegroundColor Cyan
Write-Host "This script will update import paths to point to the new component structure."
Write-Host "IMPORTANT: Run this script AFTER running migrate-components.ps1." -ForegroundColor Yellow
Write-Host ""

# Confirm before proceeding
$confirm = Read-Host "Do you want to proceed? (y/n)"
if ($confirm -ne "y") {
    Write-Host "Import update cancelled." -ForegroundColor Red
    exit
}

# Define import path mappings
$importMappings = @(
    # UI components
    @{
        OldPattern = '@/app/components/ui/'
        NewPattern = '@/components/ui/'
    },

    # Feature components
    @{
        OldPattern = '@/app/components/features/AIDestinationRecommender'
        NewPattern = '@/components/features/ai/AIDestinationRecommender'
    },
    @{
        OldPattern = '@/app/components/features/ImmersiveExplorer'
        NewPattern = '@/components/features/destinations/ImmersiveExplorer'
    },
    @{
        OldPattern = '@/app/components/features/3DTravelGallery'
        NewPattern = '@/components/features/destinations/ThreeDTravelGallery'
    },
    @{
        OldPattern = '@/app/components/features/WeatherWidget'
        NewPattern = '@/components/features/weather/WeatherWidget'
    },
    @{
        OldPattern = '@/app/components/features/PackingChecklist'
        NewPattern = '@/components/features/packing/PackingChecklist'
    },
    @{
        OldPattern = '@/app/components/features/TripCard'
        NewPattern = '@/components/features/trips/TripCard'
    },

    # Shared components
    @{
        OldPattern = '@/app/components/AnimatedHero'
        NewPattern = '@/components/marketing/AnimatedHero'
    },
    @{
        OldPattern = '@/app/components/DestinationCard'
        NewPattern = '@/components/ui/destinationcard'
    },
    @{
        OldPattern = '@/app/components/FeatureCard'
        NewPattern = '@/components/marketing/FeatureCard'
    },
    @{
        OldPattern = '@/app/components/TestimonialCard'
        NewPattern = '@/components/marketing/TestimonialCard'
    },
    
    # Providers
    @{
        OldPattern = '@/app/components/ThemeProvider'
        NewPattern = '@/components/providers/ThemeProvider'
    }
)

# Get all TypeScript/JavaScript files in the project
$files = Get-ChildItem -Path . -Include "*.ts", "*.tsx", "*.js", "*.jsx" -Recurse -File

# Track statistics
$totalFiles = 0
$updatedFiles = 0
$totalUpdates = 0

foreach ($file in $files) {
    $totalFiles++
    # Read file content as a single string
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $originalContent = $content
    $fileUpdated = $false
    $fileUpdates = 0
    
    foreach ($mapping in $importMappings) {
        $oldPattern = $mapping.OldPattern
        $newPattern = $mapping.NewPattern
        
        if ($content -match [regex]::Escape($oldPattern)) {
            $content = $content -replace [regex]::Escape($oldPattern), $newPattern
            $fileUpdated = $true
            $fileUpdates++
            $totalUpdates++
        }
    }
    
    if ($fileUpdated) {
        $updatedFiles++
        [System.IO.File]::WriteAllText($file.FullName, $content)
        Write-Host "Updated $($file.FullName) with $fileUpdates changes" -ForegroundColor Green
    }
}

# Print summary
Write-Host ""
Write-Host "Import Path Update Summary:" -ForegroundColor Cyan
Write-Host "===============================" -ForegroundColor Cyan
Write-Host "Total files scanned: $totalFiles"
Write-Host "Files updated: $updatedFiles"
Write-Host "Total import paths updated: $totalUpdates"
Write-Host ""

if ($updatedFiles -gt 0) {
    Write-Host "Next Steps:" -ForegroundColor Green
    Write-Host "1. Test your application to ensure all imports are working correctly"
    Write-Host "2. Check for any imports that might have been missed manually"
}
else {
    Write-Host "No files were updated. This could mean one of the following:" -ForegroundColor Yellow
    Write-Host "- Your project doesn't use the import paths in the mappings"
    Write-Host "- The imports have already been updated"
    Write-Host "- There was an issue with the search patterns"
} 