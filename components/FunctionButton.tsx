"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ButtonActions } from "@/components/ButtonActions";
import { cn } from "@/lib/utils";

interface FunctionButtonProps {
  icon: ReactNode;
  name: string;
  onClick: () => void;
  onRename: (newName: string) => void;
  onChangeIcon: (newIcon: string) => void;
  isDeleteMode?: boolean;
  isFirst?: boolean;
}

export function FunctionButton({
  icon,
  name,
  onClick,
  onRename,
  onChangeIcon,
  isDeleteMode,
  isFirst,
}: FunctionButtonProps) {
  return (
    <div className="relative group">
      <Button
        variant="ghost"
        onClick={onClick}
        className={cn(
          "w-full justify-start gap-2 bg-[#1A1A1A] text-[#D4D4D4] hover:bg-[#2A2A2A]",
          "border-b border-[#1F4662]",
          isDeleteMode && "border-red-500 bg-red-500/10 hover:bg-red-500/20",
          !isFirst && "rounded-none",
          "transition-all duration-300 ease-in-out"
        )}
      >
        {icon}
        <span className="flex-1 text-left">{name}</span>
      </Button>
      {!isDeleteMode && (
        <ButtonActions
          onRename={onRename}
          onChangeIcon={onChangeIcon}
          className="opacity-0 group-hover:opacity-100"
        />
      )}
    </div>
  );
}