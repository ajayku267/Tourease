/**
 * TourEase Image Downloader Script
 * 
 * This script downloads all the required images for the TourEase application
 * and places them in the correct directories.
 * 
 * Usage:
 * 1. Make sure you have Node.js installed
 * 2. Run: npm install axios fs-extra
 * 3. Run: node scripts/download-images.js
 */

const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const { promisify } = require('util');
const stream = require('stream');
const pipeline = promisify(stream.pipeline);

// Create necessary directories
const createDirectories = async () => {
  const dirs = [
    'public/images',
    'public/images/hero',
    'public/images/avatars',
    'public/images/destinations',
    'public/images/trips'
  ];

  for (const dir of dirs) {
    await fs.ensureDir(dir);
    console.log(`✅ Created directory: ${dir}`);
  }
};

// Download an image from a URL to a specified path
const downloadImage = async (url, filePath) => {
  try {
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream'
    });

    await pipeline(response.data, fs.createWriteStream(filePath));
    console.log(`✅ Downloaded: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to download ${url}: ${error.message}`);
    return false;
  }
};

// List of images to download
const imagesToDownload = [
  // Hero background images
  {
    url: 'https://images.unsplash.com/photo-1551649001-7a2482d98d05',
    path: 'public/images/hero/dolomites.jpg',
    params: '?q=80&w=1800&auto=format&fit=crop'
  },
  {
    url: 'https://images.unsplash.com/photo-1494791368093-85217d68a3ce',
    path: 'public/images/hero/coastal-sunset.jpg',
    params: '?q=80&w=1800&auto=format&fit=crop'
  },
  {
    url: 'https://images.unsplash.com/photo-1526711657229-e7e080ed7aa1',
    path: 'public/images/hero/mountain-lake.jpg',
    params: '?q=80&w=1800&auto=format&fit=crop'
  },
  {
    url: 'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5',
    path: 'public/images/hero/moraine-lake.jpg',
    params: '?q=80&w=1800&auto=format&fit=crop'
  },
  {
    url: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8',
    path: 'public/images/hero/maldives.jpg',
    params: '?q=80&w=1800&auto=format&fit=crop'
  },
  {
    url: 'https://images.unsplash.com/photo-1573270689103-d7a4e42b609a',
    path: 'public/images/hero/halong-bay.jpg',
    params: '?q=80&w=1800&auto=format&fit=crop'
  },
  {
    url: 'https://images.unsplash.com/photo-1554302891-a70fad6c08e7',
    path: 'public/images/hero/white-sands.jpg',
    params: '?q=80&w=1800&auto=format&fit=crop'
  },
  
  // Popular Destinations
  {
    url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
    path: 'public/images/hero/santorini.jpg',
    params: '?q=80&w=1200&auto=format&fit=crop'
  },
  {
    url: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a',
    path: 'public/images/hero/bali.jpg',
    params: '?q=80&w=1200&auto=format&fit=crop'
  },
  {
    url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
    path: 'public/images/hero/japan.jpg',
    params: '?q=80&w=1200&auto=format&fit=crop'
  },
  {
    url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    path: 'public/images/hero/paris.jpg',
    params: '?q=80&w=1200&auto=format&fit=crop'
  },
  
  // Explore Page Destinations
  {
    url: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a',
    path: 'public/bali.jpg',
    params: '?q=80&w=800&auto=format&fit=crop'
  },
  {
    url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
    path: 'public/rome.jpg',
    params: '?q=80&w=800&auto=format&fit=crop'
  },
  {
    url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
    path: 'public/tokyo.jpg',
    params: '?q=80&w=800&auto=format&fit=crop'
  },
  {
    url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    path: 'public/paris.jpg',
    params: '?q=80&w=800&auto=format&fit=crop'
  },
  {
    url: 'https://images.unsplash.com/photo-1526392060635-9d6019884377',
    path: 'public/machupicchu.jpg',
    params: '?q=80&w=800&auto=format&fit=crop'
  },
  {
    url: 'https://images.unsplash.com/photo-1562742937-93098e950173',
    path: 'public/sydney.jpg',
    params: '?q=80&w=800&auto=format&fit=crop'
  },
  
  // Trip images
  {
    url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
    path: 'public/images/summer-greece.jpeg',
    params: '?q=80&w=1000&auto=format&fit=crop'
  }
];

// Main function to run the script
const main = async () => {
  try {
    console.log('📥 Starting TourEase image downloader...');
    
    // Create directories
    await createDirectories();
    
    // Download all images
    let successCount = 0;
    for (const image of imagesToDownload) {
      const fullUrl = `${image.url}${image.params}`;
      const success = await downloadImage(fullUrl, image.path);
      if (success) successCount++;
    }
    
    console.log(`\n✅ Download complete! Successfully downloaded ${successCount}/${imagesToDownload.length} images.`);
    
    if (successCount < imagesToDownload.length) {
      console.log('\n⚠️ Some images failed to download. Check the errors above and try running the script again.');
    }
    
    console.log('\n🎨 Next Steps:');
    console.log('1. Make sure all required images are downloaded');
    console.log('2. Check that the image paths in your code match the downloaded image locations');
    console.log('3. Restart your Next.js development server');
    
  } catch (error) {
    console.error('❌ Script error:', error);
  }
};

// Run the script
main(); 