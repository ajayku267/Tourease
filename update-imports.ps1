# PowerShell Script to update import paths after component migration
# Author: Claude
# Date: 2023-04-09

$ErrorActionPreference = "Stop"
Write-Host "TourEase Import Path Update Script" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green
Write-Host "This script will update import paths in your project files." -ForegroundColor Yellow
Write-Host "Make sure to backup your project before running this script!" -ForegroundColor Red
Write-Host ""

# Define search and replace patterns
$replacements = @(
    @{
        From = '@/app/components/ui/'
        To = '@/components/ui/'
        Description = 'UI component imports'
    },
    @{
        From = '@/app/components/features/'
        To = '@/components/features/'
        Description = 'Feature component imports'
    },
    @{
        From = '@/app/components/'
        To = '@/components/'
        Description = 'General component imports'
    },
    @{
        From = 'from "components/'
        To = 'from "@/components/'
        Description = 'Relative component imports'
    },
    @{
        From = 'from "../components/'
        To = 'from "@/components/'
        Description = 'Relative parent component imports'
    },
    @{
        From = 'from "../../components/'
        To = 'from "@/components/'
        Description = 'Relative grandparent component imports'
    }
)

# Directories to scan
$directories = @(
    "app",
    "components",
    "lib"
)

# File extensions to process
$extensions = @("*.tsx", "*.ts", "*.jsx", "*.js")

# Get all files to process
$files = @()
foreach ($dir in $directories) {
    foreach ($ext in $extensions) {
        $files += Get-ChildItem -Path $dir -Filter $ext -Recurse
    }
}

Write-Host "Found $($files.Count) files to process" -ForegroundColor Cyan
Write-Host ""

# Process files
$filesUpdated = 0
$replacementsCount = 0

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    $originalContent = $content
    $fileUpdated = $false
    
    foreach ($replacement in $replacements) {
        if ($content -match [regex]::Escape($replacement.From)) {
            $content = $content -replace [regex]::Escape($replacement.From), $replacement.To
            $replacementsCount++
            $fileUpdated = $true
        }
    }
    
    if ($fileUpdated) {
        $filesUpdated++
        Write-Host "Updating import paths in: $($file.FullName)" -ForegroundColor Cyan
        Set-Content -Path $file.FullName -Value $content
    }
}

# Summary
Write-Host ""
Write-Host "Update Summary:" -ForegroundColor Green
Write-Host "==============" -ForegroundColor Green
Write-Host "Files processed: $($files.Count)" -ForegroundColor White
Write-Host "Files updated: $filesUpdated" -ForegroundColor Green
Write-Host "Replacements made: $replacementsCount" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Run your application and check for any import errors" -ForegroundColor White
Write-Host "2. Fix any remaining import issues manually" -ForegroundColor White
Write-Host "3. Update your tests to reflect the new component locations" -ForegroundColor White
Write-Host ""
Write-Host "Import path update complete!" -ForegroundColor Green 