"use client";

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SimpleThemeToggleProps {
  className?: string;
  iconClassName?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function SimpleThemeToggle({
  className,
  iconClassName,
  variant = 'ghost',
  size = 'icon',
}: SimpleThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant={variant}
        size={size}
        className={cn('cursor-default', className)}
        disabled
      >
        <Sun className={cn('h-5 w-5 rotate-0 scale-100 transition-all', iconClassName)} />
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={cn('relative', className)}
      aria-label="Toggle theme"
    >
      <Sun
        className={cn(
          'h-5 w-5 transition-all',
          theme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100',
          iconClassName
        )}
      />
      <Moon
        className={cn(
          'absolute h-5 w-5 transition-all',
          theme === 'dark' ? 'rotate-0 scale-100' : 'rotate-90 scale-0',
          iconClassName
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
