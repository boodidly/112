"use client";

import { useState } from "react";
import { Terminal as TerminalIcon, Gem, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSettingsPanel } from "@/components/ThemeSettings";
import { useCustomButtons } from "@/hooks/use-custom-buttons";
import { cn } from "@/lib/utils";

interface LeftPanelProps {
  onCommand: (command: string) => void;
}

export function LeftPanel({ onCommand }: LeftPanelProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { buttons } = useCustomButtons();
  const glowColor = 'var(--glowColor)';

  return (
    <div className="h-full flex flex-col bg-[#1A1A1A] rounded-lg">
      <div className="p-4 border-b border-[#2A2A2A]">
        <div className="flex items-center gap-2 text-[#D4D4D4] mb-4">
          <Gem style={{ color: glowColor }} className="w-5 h-5" />
          <span className="font-semibold">Ruby</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <button
          className="sidebar-button"
          onClick={() => onCommand('terminal')}
        >
          <TerminalIcon style={{ color: glowColor }} className="w-5 h-5" />
          Terminal
        </button>

        {buttons.map((button) => (
          <button
            key={button.id}
            className="sidebar-button"
            onClick={() => onCommand(button.command)}
          >
            <TerminalIcon style={{ color: glowColor }} className="w-5 h-5" />
            {button.name}
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-[#2A2A2A]">
        <Button
          variant="ghost"
          className="action-button w-full"
          onClick={() => onCommand('/ai')}
        >
          <TerminalIcon style={{ color: glowColor }} className="w-5 h-5" />
          AI Assistant
        </Button>
        <Button
          variant="ghost"
          className="action-button w-full mt-2"
          onClick={() => setIsSettingsOpen(true)}
        >
          <Settings style={{ color: glowColor }} className="w-5 h-5" />
          Settings
        </Button>
      </div>

      <ThemeSettingsPanel
        isOpen={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
      />
    </div>
  );
}