# Create placeholders directory if it doesn't exist
$placeholdersDir = "public/placeholders"
if (-not (Test-Path $placeholdersDir)) {
    New-Item -ItemType Directory -Path $placeholdersDir -Force
}

# Download placeholder images
$placeholders = @(
    @{Uri = "https://picsum.photos/800/600"; OutFile = "$placeholdersDir/tour-placeholder.jpg"},
    @{Uri = "https://picsum.photos/400/400"; OutFile = "$placeholdersDir/activity-placeholder.jpg"},
    @{Uri = "https://picsum.photos/600/800"; OutFile = "$placeholdersDir/portrait-placeholder.jpg"},
    @{Uri = "https://picsum.photos/500/500"; OutFile = "$placeholdersDir/avatar-placeholder.jpg"}
)

foreach ($placeholder in $placeholders) {
    Write-Host "Downloading $($placeholder.OutFile)..."
    try {
        Invoke-WebRequest -Uri $placeholder.Uri -OutFile $placeholder.OutFile
        Write-Host "Downloaded successfully to $($placeholder.OutFile)"
    } catch {
        Write-Host "Failed to download $($placeholder.Uri): $_"
    }
}

Write-Host "All downloads completed. Check $placeholdersDir directory." 