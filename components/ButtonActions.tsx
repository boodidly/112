"use client";

import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ButtonActionsProps {
  onRename: (newName: string) => void;
  onChangeIcon: (newIcon: string) => void;
  className?: string;
}

export function ButtonActions({ onRename, onChangeIcon, className }: ButtonActionsProps) {
  return (
    <div className={cn("absolute right-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="p-1 hover:bg-white/10 rounded cursor-pointer">
            <MoreHorizontal className="h-4 w-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-[#1E1E1E] border-[#1F4662] text-[#D4D4D4]">
          <DropdownMenuItem
            onClick={() => {
              const name = prompt("Enter new name");
              if (name) onRename(name);
            }}
            className="hover:bg-white/10"
          >
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              const icon = prompt("Enter new icon");
              if (icon) onChangeIcon(icon);
            }}
            className="hover:bg-white/10"
          >
            Change Icon
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}