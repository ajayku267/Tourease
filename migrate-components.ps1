# PowerShell Script to migrate TourEase components to the new structure
# Author: Claude
# Date: 2023-04-09

$ErrorActionPreference = "Stop"
Write-Host "TourEase Component Migration Script" -ForegroundColor Green
Write-Host "===================================" -ForegroundColor Green
Write-Host "This script will reorganize your project's component structure." -ForegroundColor Yellow
Write-Host "Make sure to backup your project before running this script!" -ForegroundColor Red
Write-Host ""

# Define component categories and their destinations
$componentMigrations = @{
    # UI Components
    "app\components\ui\button.tsx" = "components\ui\button.tsx"
    "app\components\ui\card.tsx" = "components\ui\card.tsx"
    "app\components\ui\input.tsx" = "components\ui\input.tsx"
    "app\components\ui\label.tsx" = "components\ui\label.tsx"
    "app\components\ui\badge.tsx" = "components\ui\badge.tsx"
    "app\components\ui\checkbox.tsx" = "components\ui\checkbox.tsx"
    "app\components\ui\toast.tsx" = "components\ui\toast.tsx"
    "app\components\ui\toaster.tsx" = "components\ui\toaster.tsx"
    "app\components\ui\use-toast.ts" = "components\ui\use-toast.ts"
    "app\components\ui\tabs.tsx" = "components\ui\tabs.tsx"
    "app\components\ui\scroll-area.tsx" = "components\ui\scroll-area.tsx"
    "app\components\ui\separator.tsx" = "components\ui\separator.tsx"
    "app\components\ui\skeleton.tsx" = "components\ui\skeleton.tsx"
    "app\components\ui\switch.tsx" = "components\ui\switch.tsx"
    "app\components\ui\tooltip.tsx" = "components\ui\tooltip.tsx"
    "app\components\ui\alert.tsx" = "components\ui\alert.tsx"
    
    # Feature Components
    "app\components\features\WeatherWidget.tsx" = "components\features\WeatherWidget.tsx"
    "app\components\features\CurrencyConverter.tsx" = "components\features\CurrencyConverter.tsx"
    "app\components\features\PackingChecklist.tsx" = "components\features\PackingChecklist.tsx"
    "app\components\features\EmergencySOSButton.tsx" = "components\features\EmergencySOSButton.tsx"
    "app\components\features\TourGuideList.tsx" = "components\features\TourGuideList.tsx"
    "app\components\features\PopularDestinations.tsx" = "components\features\PopularDestinations.tsx"
    "app\components\features\HeroSection.tsx" = "components\features\HeroSection.tsx"
    "app\components\features\UserProfile.tsx" = "components\features\UserProfile.tsx"
    "app\components\features\TestimonialsSection.tsx" = "components\features\TestimonialsSection.tsx"
    "app\components\features\NewTripModal.tsx" = "components\features\NewTripModal.tsx"
    "app\components\features\TravelStyleQuiz.tsx" = "components\features\TravelStyleQuiz.tsx"
    "app\components\features\BudgetPlanner.tsx" = "components\features\BudgetPlanner.tsx"
    "app\components\features\ImmersiveExplorer.tsx" = "components\features\ImmersiveExplorer.tsx"
    "app\components\features\AIDestinationRecommender.tsx" = "components\features\AIDestinationRecommender.tsx"
    "app\components\features\3DTravelGallery.tsx" = "components\features\3DTravelGallery.tsx"
    "app\components\features\PostCreator.tsx" = "components\features\PostCreator.tsx"
    
    # Shared Components
    "app\components\ui\DestinationCard.tsx" = "components\shared\DestinationCard.tsx"
    "app\components\features\TripCard.tsx" = "components\shared\TripCard.tsx"
    "app\components\features\TourGuideCard.tsx" = "components\shared\TourGuideCard.tsx"
    "app\components\ui\ImageWithFallback.tsx" = "components\shared\ImageWithFallback.tsx"
    "app\components\ui\PlaceholderImage.tsx" = "components\shared\PlaceholderImage.tsx"
    "app\components\ui\AnimatedImageBackground.tsx" = "components\shared\AnimatedImageBackground.tsx"
    "app\components\ui\ThemeToggle.tsx" = "components\shared\ThemeToggle.tsx"
    
    # Provider Components
    "app\components\theme-provider.tsx" = "components\providers\theme-provider.tsx"
}

# Create directories if they don't exist
$directories = @(
    "components\ui",
    "components\features",
    "components\layout",
    "components\shared",
    "components\providers"
)

foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        Write-Host "Creating directory: $dir" -ForegroundColor Cyan
        New-Item -Path $dir -ItemType Directory -Force | Out-Null
    }
}

# Copy components to their new locations
$successCount = 0
$errorCount = 0
$skippedCount = 0

foreach ($source in $componentMigrations.Keys) {
    $destination = $componentMigrations[$source]
    
    if (Test-Path $source) {
        try {
            Write-Host "Copying $source to $destination..." -ForegroundColor Cyan
            Copy-Item -Path $source -Destination $destination -Force
            $successCount++
        }
        catch {
            Write-Host "Error copying $source to $destination: $_" -ForegroundColor Red
            $errorCount++
        }
    }
    else {
        Write-Host "Source file not found, skipping: $source" -ForegroundColor Yellow
        $skippedCount++
    }
}

# Update components.json
$componentsJsonPath = "components.json"
if (Test-Path $componentsJsonPath) {
    Write-Host "Updating components.json..." -ForegroundColor Cyan
    $componentsJson = Get-Content $componentsJsonPath -Raw | ConvertFrom-Json
    $componentsJson.aliases.components = "@/components"
    $componentsJson.aliases.ui = "@/components/ui"
    $componentsJson | ConvertTo-Json -Depth 10 | Set-Content $componentsJsonPath
    Write-Host "Updated components.json successfully" -ForegroundColor Green
}
else {
    Write-Host "components.json not found, skipping update" -ForegroundColor Yellow
}

# Summary
Write-Host ""
Write-Host "Migration Summary:" -ForegroundColor Green
Write-Host "=================" -ForegroundColor Green
Write-Host "Successfully migrated: $successCount components" -ForegroundColor Green
Write-Host "Skipped (not found): $skippedCount components" -ForegroundColor Yellow
Write-Host "Errors: $errorCount components" -ForegroundColor Red
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Search and replace import paths in your codebase:" -ForegroundColor White
Write-Host "   - From: @/app/components/ui/" -ForegroundColor Yellow
Write-Host "   - To:   @/components/ui/" -ForegroundColor Green
Write-Host "2. Search and replace other paths according to the migration plan" -ForegroundColor White
Write-Host "3. Test your application to ensure everything works correctly" -ForegroundColor White
Write-Host ""
Write-Host "Migration complete!" -ForegroundColor Green 