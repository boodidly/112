"use client";

import * as React from "react";
import { Command } from "cmdk";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import * as icons from "lucide-react";

type IconName = keyof typeof icons;

interface IconPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export const IconPicker = React.forwardRef<HTMLDivElement, IconPickerProps>(
  ({ value, onChange }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");

    // Filter out non-icon exports
    const iconNames = Object.keys(icons).filter(
      (key) => typeof icons[key as IconName] === "function" && 
               key !== "createLucideIcon" && 
               key !== "default"
    ) as IconName[];

    const filteredIcons = iconNames.filter((icon) =>
      icon.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const SelectedIcon = icons[value as IconName] || icons.Command;

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-[#2D2D2D] border-[var(--background-color)]"
          >
            <div className="flex items-center gap-2">
              {React.createElement(SelectedIcon, { className: "h-4 w-4" })}
              <span>{value}</span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0 bg-[#1E1E1E] border-[var(--background-color)]">
          <Command className="bg-transparent">
            <Command.Input
              placeholder="Search icons..."
              className="h-9 px-3 py-2 w-full bg-[#2D2D2D] border-b border-[var(--background-color)] text-[#D4D4D4] placeholder-[#808080] focus:outline-none"
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <Command.List className="max-h-[300px] overflow-y-auto">
              <Command.Empty className="py-6 text-center text-sm text-[#808080]">
                No icons found.
              </Command.Empty>
              {filteredIcons.map((iconName) => {
                const Icon = icons[iconName];
                return (
                  <Command.Item
                    key={iconName}
                    value={iconName}
                    onSelect={() => {
                      onChange(iconName);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 text-sm text-[#D4D4D4] cursor-pointer",
                      "hover:bg-[#2D2D2D] aria-selected:bg-[#2D2D2D]"
                    )}
                  >
                    {React.createElement(Icon, { className: "h-4 w-4" })}
                    {iconName}
                  </Command.Item>
                );
              })}
            </Command.List>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

IconPicker.displayName = "IconPicker";

export const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const Icon = icons[name as IconName] || icons.Command;
  return React.createElement(Icon, { className });
};