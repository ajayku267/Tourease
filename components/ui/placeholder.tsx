'use client'

import React from 'react'

interface PlaceholderProps {
  width: number
  height: number
  text?: string
  bgColor?: string
  textColor?: string
  className?: string
  fontSize?: number
  responsive?: boolean
  aspectRatio?: boolean
}

export function Placeholder({
  width,
  height,
  text = 'Placeholder',
  bgColor = '#cccccc',
  textColor = '#ffffff',
  className = '',
  fontSize = 24,
  responsive = false,
  aspectRatio = false
}: PlaceholderProps) {
  const baseStyle: React.CSSProperties = {
    backgroundColor: bgColor,
    color: textColor,
    fontSize: `${fontSize}px`,
    fontWeight: 'bold',
    overflow: 'hidden'
  }

  let sizeStyle: React.CSSProperties = {}
  
  if (aspectRatio) {
    sizeStyle = {
      position: 'relative',
      paddingBottom: `${(height / width) * 100}%`,
      width: '100%',
      height: '0'
    }
    return (
      <div 
        className={className} 
        style={{...baseStyle, ...sizeStyle}}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {text}
        </div>
      </div>
    )
  } 
  
  if (responsive) {
    sizeStyle = {
      maxWidth: '100%',
      width: `${width}px`,
      height: 'auto',
      minHeight: `${height}px`
    }
  } else {
    sizeStyle = {
      width: `${width}px`,
      height: `${height}px`
    }
  }

  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      style={{...baseStyle, ...sizeStyle}}
    >
      {text}
    </div>
  )
}

// Pre-configured placeholder components
export function ProfilePlaceholder({ className = '', responsive = false }: { className?: string, responsive?: boolean }) {
  return <Placeholder width={300} height={300} text="Profile" className={className} responsive={responsive} />
}

export function DestinationPlaceholder({ className = '', responsive = false }: { className?: string, responsive?: boolean }) {
  return <Placeholder width={600} height={400} text="Destination" className={className} responsive={responsive} />
}

export function GalleryPlaceholder({ className = '' }: { className?: string }) {
  return <Placeholder width={1200} height={800} text="Gallery" className={className} responsive={true} />
}

export function LandscapePlaceholder({ className = '' }: { className?: string }) {
  return <Placeholder width={1920} height={1080} text="Landscape" className={className} responsive={true} />
}

export function TourPlaceholder({ className = '', responsive = false }: { className?: string, responsive?: boolean }) {
  return <Placeholder width={800} height={600} text="Tour" className={className} responsive={responsive} />
}

export function ActivityPlaceholder({ className = '', responsive = false }: { className?: string, responsive?: boolean }) {
  return <Placeholder width={400} height={400} text="Activity" className={className} responsive={responsive} />
}

export function AvatarPlaceholder({ className = '', size = 80 }: { className?: string, size?: number }) {
  return <Placeholder width={size} height={size} text="A" className={`rounded-full ${className}`} fontSize={Math.max(16, size / 4)} />
}

// Aspect ratio placeholders
export function AspectRatio16x9({ className = '', text = '16:9' }: { className?: string, text?: string }) {
  return <Placeholder width={16} height={9} text={text} className={className} aspectRatio={true} />
}

export function AspectRatio4x3({ className = '', text = '4:3' }: { className?: string, text?: string }) {
  return <Placeholder width={4} height={3} text={text} className={className} aspectRatio={true} />
}

export function AspectRatio1x1({ className = '', text = '1:1' }: { className?: string, text?: string }) {
  return <Placeholder width={1} height={1} text={text} className={className} aspectRatio={true} />
}