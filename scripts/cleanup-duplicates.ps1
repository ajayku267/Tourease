# cleanup-duplicates.ps1
# Author: Claude
# Date: 2023-04-09
# Purpose: Clean up duplicate components after migration

# Stop on errors
$ErrorActionPreference = "Stop"

Write-Host "TourEase Component Cleanup Script" -ForegroundColor Cyan
Write-Host "===============================" -ForegroundColor Cyan
Write-Host "This script will help clean up duplicate components after migration."
Write-Host "WARNING: This will permanently delete files. Make sure you have a backup." -ForegroundColor Yellow
Write-Host ""

# Confirm before proceeding
$confirm = Read-Host "Do you want to proceed? (y/n)"
if ($confirm -ne "y") {
    Write-Host "Cleanup cancelled." -ForegroundColor Red
    exit
}

# Define directories to check for duplicate components
$originalDirectory = "app/components"
$newDirectory = "components"

# Get lists of files
$originalFiles = Get-ChildItem -Path $originalDirectory -Recurse -File -Include "*.tsx", "*.jsx", "*.ts", "*.js"
$newFiles = Get-ChildItem -Path $newDirectory -Recurse -File -Include "*.tsx", "*.jsx", "*.ts", "*.js"

Write-Host "Found $($originalFiles.Count) files in original directory."
Write-Host "Found $($newFiles.Count) files in new directory."
Write-Host ""

# Track statistics
$filesToDelete = @()
$errorFiles = @()

# Identify duplicate files
Write-Host "Identifying duplicate files..." -ForegroundColor Cyan
foreach ($origFile in $originalFiles) {
    # Extract the base file name without path
    $fileName = $origFile.Name
    
    # Check if the file exists in the new structure
    $duplicateFiles = $newFiles | Where-Object { $_.Name -eq $fileName }
    
    if ($duplicateFiles.Count -gt 0) {
        # File exists in both places
        $filesToDelete += $origFile
    }
}

Write-Host "Found $($filesToDelete.Count) duplicate files that can be deleted." -ForegroundColor Yellow
Write-Host ""

# Show files that will be deleted
if ($filesToDelete.Count -gt 0) {
    Write-Host "The following files will be deleted:" -ForegroundColor Yellow
    foreach ($file in $filesToDelete) {
        Write-Host "  - $($file.FullName)"
    }
    Write-Host ""
    
    # Confirm deletion
    $confirmDelete = Read-Host "Are you sure you want to delete these files? (y/n)"
    if ($confirmDelete -ne "y") {
        Write-Host "Deletion cancelled." -ForegroundColor Red
        exit
    }
    
    # Delete the files
    Write-Host "Deleting files..." -ForegroundColor Cyan
    foreach ($file in $filesToDelete) {
        try {
            Remove-Item -Path $file.FullName -Force
            Write-Host "  - Deleted: $($file.FullName)" -ForegroundColor Green
        } catch {
            $errorFiles += $file.FullName
            Write-Host "  - Failed to delete: $($file.FullName)" -ForegroundColor Red
            Write-Host "    Error: $_" -ForegroundColor Red
        }
    }
}

# Print summary
Write-Host ""
Write-Host "Cleanup Summary:" -ForegroundColor Cyan
Write-Host "===============================" -ForegroundColor Cyan
Write-Host "Total duplicate files found: $($filesToDelete.Count)"
Write-Host "Files successfully deleted: $($filesToDelete.Count - $errorFiles.Count)"
if ($errorFiles.Count -gt 0) {
    Write-Host "Files failed to delete: $($errorFiles.Count)" -ForegroundColor Red
    foreach ($errorFile in $errorFiles) {
        Write-Host "  - $errorFile" -ForegroundColor Red
    }
}
Write-Host ""

# Check if app/components directory is empty
$remainingFiles = Get-ChildItem -Path $originalDirectory -Recurse -File
if ($remainingFiles.Count -eq 0) {
    Write-Host "The original components directory is now empty." -ForegroundColor Green
    $removeDir = Read-Host "Would you like to remove the empty directory structure? (y/n)"
    if ($removeDir -eq "y") {
        try {
            Remove-Item -Path $originalDirectory -Recurse -Force
            Write-Host "Successfully removed $originalDirectory directory." -ForegroundColor Green
        } catch {
            Write-Host "Failed to remove directory: $_" -ForegroundColor Red
        }
    }
} else {
    Write-Host "The original components directory still contains $($remainingFiles.Count) files." -ForegroundColor Yellow
    Write-Host "You may want to check these files manually before removing the directory." -ForegroundColor Yellow
} 