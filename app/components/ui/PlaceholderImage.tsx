'use client'

import { useState, useEffect } from 'react'
import Image, { ImageProps } from 'next/image'
import { Placeholder } from './Placeholder'

interface PlaceholderImageProps extends Omit<ImageProps, 'src'> {
  src: string | null | undefined
  alt: string
  width: number
  height: number
  placeholderText?: string
  placeholderBgColor?: string
  placeholderTextColor?: string
  className?: string
  style?: React.CSSProperties
  priority?: boolean
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  onLoad?: () => void
  onError?: () => void
  fallbackSrc?: string
}

export function PlaceholderImage({
  src,
  alt,
  width,
  height,
  placeholderText,
  placeholderBgColor = '#cccccc',
  placeholderTextColor = '#ffffff',
  className = '',
  style,
  priority = false,
  objectFit = 'cover',
  onLoad,
  onError,
  fallbackSrc = '/placeholders/image-placeholder.jpg',
  ...props
}: PlaceholderImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [imageSrc, setImageSrc] = useState(src)

  // Reset loading state when src changes
  useEffect(() => {
    setIsLoading(true)
    setIsError(false)
    setImageSrc(src)
  }, [src])

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    setIsError(true)
    onError?.()
  }

  return (
    <div 
      className={`relative ${className}`}
      style={{ 
        width: width || '100%', 
        height: height || 'auto',
        ...style 
      }}
    >
      {(isLoading || isError) && (
        <div className="absolute inset-0 z-10">
          <Placeholder
            width={width}
            height={height}
            text={isError ? `Error loading image${placeholderText ? `: ${placeholderText}` : ''}` : (placeholderText || 'Loading...')}
            bgColor={placeholderBgColor}
            textColor={placeholderTextColor}
            className="w-full h-full"
          />
        </div>
      )}
      
      {!isError && (
        <Image
          src={!src || isError ? fallbackSrc : src}
          alt={alt || 'Image'}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
          priority={priority}
          className={`w-full h-full transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          style={{ objectFit }}
          {...props}
        />
      )}
    </div>
  )
}

// Preset configurations
export function DestinationImage({ src, alt, className = '', width = 600, height = 400 }: Omit<PlaceholderImageProps, 'width' | 'height'> & { width?: number, height?: number }) {
  return (
    <PlaceholderImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      placeholderText="Destination"
      className={className}
    />
  )
}

export function ProfileImage({ src, alt, className = '', size = 300 }: Omit<PlaceholderImageProps, 'width' | 'height'> & { size?: number }) {
  return (
    <PlaceholderImage
      src={src}
      alt={alt}
      width={size}
      height={size}
      placeholderText="Profile"
      className={`rounded-full ${className}`}
    />
  )
}

export function TourImage({ src, alt, className = '', width = 800, height = 600 }: Omit<PlaceholderImageProps, 'width' | 'height'> & { width?: number, height?: number }) {
  return (
    <PlaceholderImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      placeholderText="Tour"
      className={className}
    />
  )
}

export function AvatarImage({ src, alt, className = '', size = 80 }: Omit<PlaceholderImageProps, 'width' | 'height'> & { size?: number }) {
  return (
    <PlaceholderImage
      src={src}
      alt={alt}
      width={size}
      height={size}
      placeholderText="A"
      className={`rounded-full ${className}`}
    />
  )
} 