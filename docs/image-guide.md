# TourEase Image Guide

This guide explains how to download and use images for the TourEase application.

## Why Use Local Images?

Using local images in your Next.js application has several benefits:

1. **Performance**: Local images can be optimized by Next.js Image component
2. **Stability**: No dependency on external services that might change URLs or go down
3. **Control**: Full control over image quality and format
4. **SEO**: Better for search engine optimization

## Using the Image Downloader Script

We've created a script that will automatically download all the required images for the TourEase application.

### Prerequisites

- Node.js installed on your machine
- npm or yarn package manager

### Installation

1. Install the required dependencies:

```bash
npm install axios fs-extra
# or with yarn
yarn add axios fs-extra
```

2. Create a `scripts` directory in your project root if it doesn't exist:

```bash
mkdir -p scripts
```

3. Place the `download-images.js` script in the `scripts` directory.

### Running the Script

Execute the script with:

```bash
node scripts/download-images.js
```

This will:
- Create all necessary directories
- Download all required images from Unsplash
- Save them to the correct locations in your project

### What Images Are Downloaded?

The script downloads images for:

1. **Hero Section Backgrounds**: Stunning landscapes for the hero carousel
2. **Popular Destinations**: Featured destination images
3. **Explore Page**: Thumbnails for various destinations
4. **Trip Pages**: Images for trip cards

## Alternative: Manual Download

If the script doesn't work for you, you can manually download the images:

1. Create these directories:
   - `public/images`
   - `public/images/hero`
   - `public/images/avatars`
   - `public/images/destinations`
   - `public/images/trips`

2. Download these images from Unsplash (or use the provided URLs in the script):
   - For hero backgrounds (high quality, 1800px width)
   - For destination cards (medium quality, 1200px width)
   - For the explore page (smaller thumbnails, 800px width)
   - For trip images (medium quality, 1000px width)

3. Place them in their respective directories with the correct filenames as specified in the script.

## Using Images in Your Code

The images are already referenced in the codebase with the correct paths. Once downloaded, they should work automatically.

### Important Image Paths

- Hero backgrounds: `/images/hero/[name].jpg`
- Popular destinations: `/images/hero/[name].jpg`
- Explore page destinations: `/[name].jpg`
- Trip images: `/images/[name].jpeg`

## Using Your Own Images

If you want to use your own images:

1. Replace the files in the directories with your own images (keep the same filenames)
2. Make sure they have similar dimensions and aspect ratios
3. Optimize them for web use (compress them)

## Troubleshooting

If images aren't showing:

1. Check console errors for 404s
2. Verify image paths in the code match the actual file locations
3. Make sure the files have the correct permissions
4. Restart your Next.js development server after adding new images

## Image Credits

All default images are sourced from [Unsplash](https://unsplash.com) and are free to use according to the [Unsplash License](https://unsplash.com/license). 