"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface BrowserViewProps {
  isFullscreen?: boolean;
}

export function BrowserView({ isFullscreen = false }: BrowserViewProps) {
  const [darkGlow, setDarkGlow] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isFullscreen) {
      timeout = setTimeout(() => {
        setDarkGlow(true);
      }, 7000);
    } else {
      setDarkGlow(false);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isFullscreen]);

  return (
    <div 
      className={cn(
        "h-full rounded-lg overflow-hidden transition-all duration-1000",
        "terminal",
        darkGlow && "dark-glow"
      )}
    >
      <iframe 
        src="https://duckduckgo.com"
        className="w-full h-full border-none bg-white"
        title="Browser View"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />
    </div>
  );
}