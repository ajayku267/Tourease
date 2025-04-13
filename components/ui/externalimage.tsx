"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { User } from "lucide-react";

interface ExternalImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
  fallbackBgColor?: string;
  isProfileImage?: boolean;
}

/**
 * ExternalImage component - A wrapper around Next.js Image component
 * that handles external image sources with better error handling
 */
export default function ExternalImage({
  src,
  alt,
  width,
  height,
  fallbackSrc,
  fallbackBgColor = "#f3f4f6",
  isProfileImage = false,
  className,
  ...rest
}: ExternalImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    if (isProfileImage) {
      // Profile image specific fallback (avatar)
      return (
        <div 
          className={`flex items-center justify-center bg-primary text-white ${className}`}
          style={{ width, height, backgroundColor: fallbackBgColor }}
        >
          <User className="w-1/2 h-1/2" />
        </div>
      );
    }

    // General image fallback
    return (
      <div 
        className={`flex items-center justify-center ${className}`}
        style={{ 
          width, 
          height, 
          backgroundColor: fallbackBgColor,
        }}
      >
        {fallbackSrc ? (
          <Image
            src={fallbackSrc}
            alt={alt}
            width={width}
            height={height}
            className={className}
            {...rest}
          />
        ) : (
          <span className="text-white text-opacity-70 text-sm font-medium p-2 text-center">
            {alt || "Image unavailable"}
          </span>
        )}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setError(true)}
      {...rest}
    />
  );
} 