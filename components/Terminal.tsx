"use client";

import { useEffect, useState, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useOllama } from "@/lib/ollama";

interface TerminalProps {
  output: string[];
  isFullscreen?: boolean;
}

export function Terminal({ output, isFullscreen = false }: TerminalProps) {
  const [darkGlow, setDarkGlow] = useState(false);
  const [currentInput, setCurrentInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { generateResponse, isLoading } = useOllama();

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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [output]);

  const handleKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isProcessing) {
      e.preventDefault();
      
      if (currentInput.trim()) {
        setIsProcessing(true);
        
        if (currentInput.startsWith('/ai ')) {
          const prompt = currentInput.slice(4);
          try {
            const response = await generateResponse(prompt);
            output.push(`🤖 ${response}\n`);
          } catch (error) {
            output.push('Error: Failed to generate AI response\n');
          }
        }
        
        setCurrentInput("");
        setIsProcessing(false);
      }
    }
  };

  return (
    <div 
      className={cn(
        "h-full rounded-lg overflow-hidden transition-all duration-1000",
        "terminal",
        darkGlow && "dark-glow"
      )}
    >
      <ScrollArea className="h-full p-4" ref={scrollRef}>
        <div className="terminal-font text-sm text-[#D4D4D4] whitespace-pre-wrap terminal-content">
          {output.map((line, i) => (
            <div key={i} className="min-h-[20px]">
              {line}
            </div>
          ))}
          <div className="flex items-start">
            <span className="text-[#50FA7B]">$ </span>
            <textarea
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 bg-transparent border-none outline-none resize-none text-[#D4D4D4] terminal-font ml-2"
              rows={1}
              disabled={isProcessing || isLoading}
              style={{
                overflow: 'hidden',
                height: 'auto',
              }}
            />
          </div>
          {(isProcessing || isLoading) && (
            <div className="text-[#BD93F9]">Processing...</div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}