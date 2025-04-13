"use client";

import { useEffect } from "react";

/**
 * ImageFix - A component that helps fix broken images across the application
 * Add this to your layout or main pages to automatically handle broken images
 */
export function ImageFix() {
  useEffect(() => {
    // Function to add fallbacks to all images
    const fixBrokenImages = () => {
      const images = document.querySelectorAll('img');
      
      images.forEach(img => {
        // Skip images that already have error handlers
        if (img.hasAttribute('data-has-error-handler')) return;
        
        // Mark as having an error handler to avoid duplicates
        img.setAttribute('data-has-error-handler', 'true');
        
        // Add error handler
        img.addEventListener('error', () => {
          const isProfileImg = img.classList.contains('rounded-full');
          
          if (isProfileImg) {
            // Profile image fallback - orange circle with user initial
            img.style.display = 'none';
            const parent = img.parentElement;
            if (parent) {
              parent.style.backgroundColor = '#ff5f1f';
              parent.style.color = 'white';
              parent.style.display = 'flex';
              parent.style.alignItems = 'center';
              parent.style.justifyContent = 'center';
              parent.innerHTML = '<span style="font-weight: bold; font-size: 1rem;">U</span>';
            }
          } else {
            // Standard image fallback - gray box with image icon or alt text
            const parent = img.parentElement;
            img.style.display = 'none';
            
            if (parent) {
              parent.style.backgroundColor = '#f3f4f6';
              if (img.alt && img.alt.length > 0) {
                const placeholderText = document.createElement('span');
                placeholderText.textContent = img.alt;
                placeholderText.style.fontSize = '0.875rem';
                placeholderText.style.color = '#6b7280';
                parent.appendChild(placeholderText);
              }
            }
          }
        });
      });
    };

    // Fix on load
    fixBrokenImages();
    
    // Also fix after any DOM changes (for dynamically loaded images)
    const observer = new MutationObserver(fixBrokenImages);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => observer.disconnect();
  }, []);

  // This component doesn't render anything visible
  return null;
} 