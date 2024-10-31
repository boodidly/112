"use client";

import { useState } from "react";
import { LeftPanel } from "@/components/LeftPanel";
import { Terminal } from "@/components/Terminal";
import { executeCommand } from "@/lib/executeCommand";
import { cn } from "@/lib/utils";
import { AIAssistant } from "@/components/AIAssistant";

export default function Home() {
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "Terminal v1.0.0",
    "Type 'help' for available commands",
    "",
    "$ _"
  ]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeView, setActiveView] = useState<'terminal' | 'ai'>('ai');
  const [aiMessage, setAiMessage] = useState<string>("Hello! I'm your AI assistant. How can I help you today?");

  const handleCommand = async (command: string) => {
    try {
      const result = await executeCommand(command);
      
      if (result.type === 'ai') {
        setActiveView('ai');
        setAiMessage(result.output || "How can I help you?");
      } else if (result.type === 'terminal') {
        setActiveView('terminal');
        if (command === 'clear') {
          setTerminalOutput(["$ _"]);
        } else {
          setTerminalOutput(prev => [...prev.slice(0, -1), `$ ${command}`, result.output, "$ _"]);
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setTerminalOutput(prev => [...prev, `Error: ${errorMessage}`, "", "$ _"]);
    }
  };

  const handleDoubleClick = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <main className="h-screen w-screen flex bg-[#1A1A1A] overflow-hidden p-4 gap-4">
      <div 
        className={cn(
          "h-full transition-all duration-300 ease-in-out",
          isFullscreen ? "w-0 opacity-0" : "w-64"
        )}
      >
        <LeftPanel onCommand={handleCommand} />
      </div>
      <div 
        className="flex-1 h-full transition-all duration-300 ease-in-out"
        onDoubleClick={handleDoubleClick}
      >
        {activeView === 'ai' ? (
          <AIAssistant message={aiMessage} isFullscreen={isFullscreen} />
        ) : (
          <Terminal output={terminalOutput} isFullscreen={isFullscreen} />
        )}
      </div>
    </main>
  );
}