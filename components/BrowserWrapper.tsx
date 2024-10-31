"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface BrowserWrapperProps {
  url: string;
  setUrl: (url: string) => void;
  isFullscreen?: boolean;
}

export function BrowserWrapper({ url, setUrl, isFullscreen = false }: BrowserWrapperProps) {
  const [inputUrl, setInputUrl] = useState(url);
  const [history, setHistory] = useState<string[]>([url]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newUrl = inputUrl;
    if (!newUrl.startsWith('http://') && !newUrl.startsWith('https://')) {
      newUrl = `https://${newUrl}`;
    }
    setUrl(newUrl);
    setHistory(prev => [...prev.slice(0, currentIndex + 1), newUrl]);
    setCurrentIndex(prev => prev + 1);
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setUrl(history[currentIndex - 1]);
      setInputUrl(history[currentIndex - 1]);
    }
  };

  const goForward = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUrl(history[currentIndex + 1]);
      setInputUrl(history[currentIndex + 1]);
    }
  };

  const refresh = () => {
    setUrl(url);
  };

  return (
    <div className={cn(
      "h-full rounded-lg overflow-hidden transition-all duration-1000 bg-[#1E1E1E] border border-[#2A2A2A]",
      "shadow-lg hover:shadow-xl"
    )}>
      <div className="h-12 bg-[#1A1A1A] border-b border-[#2A2A2A] flex items-center px-2 gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={goBack}
          disabled={currentIndex === 0}
          className="h-8 w-8 text-[#D4D4D4] hover:bg-[#2A2A2A] disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={goForward}
          disabled={currentIndex === history.length - 1}
          className="h-8 w-8 text-[#D4D4D4] hover:bg-[#2A2A2A] disabled:opacity-50"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={refresh}
          className="h-8 w-8 text-[#D4D4D4] hover:bg-[#2A2A2A]"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        <form onSubmit={handleSubmit} className="flex-1 flex items-center">
          <div className="relative flex-1">
            <Globe className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#808080]" />
            <Input
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="w-full pl-8 bg-[#2A2A2A] border-[#3A3A3A] text-[#D4D4D4] h-8 focus-visible:ring-1 focus-visible:ring-[#4A4A4A]"
              placeholder="Enter URL..."
            />
          </div>
        </form>
      </div>
      <iframe 
        src={url}
        className="w-full h-[calc(100%-3rem)] border-none bg-[#1E1E1E]"
        title="Browser View"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />
    </div>
  );
}