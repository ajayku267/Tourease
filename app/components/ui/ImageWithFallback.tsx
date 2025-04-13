"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
  fallbackBgColor?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc,
  fallbackBgColor,
  ...rest
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [error, setError] = useState(false);

  const handleError = () => {
    if (fallbackSrc && !error) {
      setImgSrc(fallbackSrc);
      setError(true);
    } else if (fallbackBgColor) {
      setError(true);
    }
  };

  if (error && !fallbackSrc && fallbackBgColor) {
    return (
      <div 
        style={{ backgroundColor: fallbackBgColor }}
        className="w-full h-full flex items-center justify-center"
        {...rest}
      >
        <span className="text-white text-opacity-70 text-sm font-medium">
          {alt || "Image unavailable"}
        </span>
      </div>
    );
  }

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt || ""}
      onError={handleError}
    />
  );
} 