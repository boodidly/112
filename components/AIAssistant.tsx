"use client";

import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface AIAssistantProps {
  message: string;
  isFullscreen?: boolean;
}

export function AIAssistant({ message, isFullscreen = false }: AIAssistantProps) {
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
      <ScrollArea className="h-full p-6 bg-[#1A1A1A]">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-invert">
            <p className="text-[#D4D4D4] text-lg">{message}</p>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}