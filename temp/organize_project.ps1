# PowerShell script to reorganize the TourEase project structure

# Function to create directories if they don't exist
function EnsureDirectoryExists {
    param([string]$directoryPath)
    
    if (-not (Test-Path $directoryPath)) {
        New-Item -ItemType Directory -Path $directoryPath -Force | Out-Null
        Write-Host "Created directory: $directoryPath"
    }
}

# Phase 1: Create directory structure
Write-Host "Phase 1: Creating directory structure..." -ForegroundColor Green

# Components directories
$componentDirs = @(
    "components/auth",
    "components/common",
    "components/layout",
    "components/marketing",
    "components/ui",
    "components/features/ai",
    "components/features/trips",
    "components/features/budget",
    "components/features/destinations",
    "components/features/social",
    "components/features/tour-guides",
    "components/features/weather",
    "components/features/packing",
    "components/features/emergency"
)

foreach ($dir in $componentDirs) {
    EnsureDirectoryExists $dir
}

# Other core directories
$coreDirs = @(
    "context",
    "hooks",
    "lib/api",
    "lib/utils",
    "lib/types",
    "styles",
    "tests/components",
    "tests/hooks",
    "tests/pages",
    "tests/utils",
    "public/fonts",
    "public/images/destinations",
    "public/images/icons",
    "public/images/logos",
    "public/placeholders"
)

foreach ($dir in $coreDirs) {
    EnsureDirectoryExists $dir
}

# Phase 2: Copy UI components
Write-Host "Phase 2: Copying UI components..." -ForegroundColor Green

# Copy UI components from app/components/ui to components/ui
if (Test-Path "app/components/ui") {
    Get-ChildItem -Path "app/components/ui" -Filter "*.tsx" | ForEach-Object {
        $destinationFile = "components/ui/$($_.Name.ToLower())"
        Copy-Item -Path $_.FullName -Destination $destinationFile -Force
        Write-Host "Copied $($_.Name) to $destinationFile"
    }
}

# Phase 3: Copy feature components by category
Write-Host "Phase 3: Organizing feature components..." -ForegroundColor Green

# AI-related components
$aiComponents = @(
    "AIChatbot.tsx", 
    "AIDestinationRecommender.tsx",
    "TravelStyleQuiz.tsx"
)

# Trip-related components
$tripComponents = @(
    "TripPlanner.tsx",
    "TripCard.tsx",
    "NewTripModal.tsx",
    "InteractiveJourneyTimeline.tsx"
)

# Budget-related components
$budgetComponents = @(
    "BudgetCalculator.tsx",
    "BudgetPlanner.tsx",
    "CurrencyConverter.tsx"
)

# Destination-related components
$destinationComponents = @(
    "DestinationCard.tsx",
    "DestinationShowcase.tsx",
    "PopularDestinations.tsx",
    "ImmersiveExplorer.tsx",
    "3DTravelGallery.tsx"
)

# Social-related components
$socialComponents = @(
    "TravelFeed.tsx",
    "PostCreator.tsx",
    "UserProfile.tsx"
)

# Tour guide-related components
$tourGuideComponents = @(
    "TourGuideCard.tsx",
    "TourGuideList.tsx",
    "TourGuideMap.tsx",
    "TourGuideHero.tsx"
)

# Weather-related components
$weatherComponents = @(
    "WeatherWidget.tsx"
)

# Packing-related components
$packingComponents = @(
    "PackingChecklist.tsx"
)

# Emergency-related components
$emergencyComponents = @(
    "EmergencySOSButton.tsx"
)

# Marketing-related components
$marketingComponents = @(
    "HeroSection.tsx",
    "TestimonialsSection.tsx",
    "AnimatedHero.tsx"
)

# Function to copy components to their respective directories
function CopyComponents {
    param(
        [string[]]$components,
        [string]$destination
    )
    
    foreach ($component in $components) {
        $sourcePath = "app/components/features/$component"
        if (Test-Path $sourcePath) {
            Copy-Item -Path $sourcePath -Destination "$destination/$component" -Force
            Write-Host "Copied $component to $destination"
        } else {
            Write-Host "Warning: $sourcePath not found" -ForegroundColor Yellow
        }
    }
}

# Copy components to their respective directories
CopyComponents -components $aiComponents -destination "components/features/ai"
CopyComponents -components $tripComponents -destination "components/features/trips"
CopyComponents -components $budgetComponents -destination "components/features/budget"
CopyComponents -components $destinationComponents -destination "components/features/destinations"
CopyComponents -components $socialComponents -destination "components/features/social"
CopyComponents -components $tourGuideComponents -destination "components/features/tour-guides"
CopyComponents -components $weatherComponents -destination "components/features/weather"
CopyComponents -components $packingComponents -destination "components/features/packing"
CopyComponents -components $emergencyComponents -destination "components/features/emergency"
CopyComponents -components $marketingComponents -destination "components/marketing"

# Rename 3DTravelGallery.tsx to ThreeDTravelGallery.tsx for better compatibility
if (Test-Path "components/features/destinations/3DTravelGallery.tsx") {
    Move-Item -Path "components/features/destinations/3DTravelGallery.tsx" -Destination "components/features/destinations/ThreeDTravelGallery.tsx" -Force
    Write-Host "Renamed 3DTravelGallery.tsx to ThreeDTravelGallery.tsx"
}

# Phase 4: Copy Layout Components
Write-Host "Phase 4: Copying layout components..." -ForegroundColor Green

if (Test-Path "app/components/layout") {
    Get-ChildItem -Path "app/components/layout" -Filter "*.tsx" | ForEach-Object {
        Copy-Item -Path $_.FullName -Destination "components/layout/$($_.Name)" -Force
        Write-Host "Copied $($_.Name) to components/layout"
    }
}

# Phase 5: Copy Contexts
Write-Host "Phase 5: Copying context providers..." -ForegroundColor Green

if (Test-Path "app/contexts") {
    Get-ChildItem -Path "app/contexts" -Filter "*.tsx" | ForEach-Object {
        $newName = $_.Name -replace "context", "context"
        Copy-Item -Path $_.FullName -Destination "context/$newName" -Force
        Write-Host "Copied $($_.Name) to context/$newName"
    }
}

# Phase 6: Extract Utility Functions
Write-Host "Phase 6: Organizing utility functions..." -ForegroundColor Green

if (Test-Path "app/utils.ts") {
    Copy-Item -Path "app/utils.ts" -Destination "lib/utils/common.ts" -Force
    Write-Host "Copied app/utils.ts to lib/utils/common.ts"
}

# Phase 7: Create README files
Write-Host "Phase 7: Creating documentation..." -ForegroundColor Green

$readmePaths = @(
    "components/README.md",
    "components/ui/README.md",
    "components/features/README.md",
    "lib/README.md",
    "context/README.md",
    "hooks/README.md"
)

foreach ($readmePath in $readmePaths) {
    if (-not (Test-Path $readmePath)) {
        $directoryName = [System.IO.Path]::GetDirectoryName($readmePath)
        $content = "# $([System.IO.Path]::GetFileName($directoryName))`n`nThis directory contains $([System.IO.Path]::GetFileName($directoryName))-related files for the TourEase project.`n"
        Set-Content -Path $readmePath -Value $content
        Write-Host "Created $readmePath"
    }
}

# Copy our prepared README to the root
Copy-Item -Path "temp/README.md" -Destination "README.md" -Force

# Create tsconfig.paths.json
$tsconfigPaths = @'
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/hooks/*": ["./hooks/*"],
      "@/context/*": ["./context/*"],
      "@/styles/*": ["./styles/*"],
      "@/public/*": ["./public/*"]
    }
  }
}
'@

Set-Content -Path "tsconfig.paths.json" -Value $tsconfigPaths
Write-Host "Created tsconfig.paths.json"

Write-Host "Project reorganization complete!" -ForegroundColor Green
Write-Host "Next steps:"
Write-Host "1. Update import paths in components"
Write-Host "2. Verify the application builds correctly"
Write-Host "3. Remove duplicate files after verifying" 