"use client";

import { useState } from 'react';
import { Palette, Sparkles, Gauge, Plus, Trash2 } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTabs } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { ColorPicker } from './ColorPicker';
import { useTheme } from '@/hooks/use-theme';
import { useCustomButtons } from '@/hooks/use-custom-buttons';

interface ThemeSettingsPanelProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ThemeSettingsPanel({ isOpen, onOpenChange }: ThemeSettingsPanelProps) {
  const { theme, updateTheme, resetTheme } = useTheme();
  const { buttons, addButton, removeButton, updateButton } = useCustomButtons();
  const [localTheme, setLocalTheme] = useState(theme);
  const [newButton, setNewButton] = useState({ name: '', command: '' });

  const handleColorChange = (key: string, value: string) => {
    setLocalTheme(prev => ({ ...prev, [key]: value }));
    updateTheme({ [key]: value });
  };

  const handleIntensityChange = (value: number) => {
    setLocalTheme(prev => ({ ...prev, glowIntensity: value }));
    updateTheme({ glowIntensity: value });
  };

  const handleAddButton = () => {
    if (newButton.name && newButton.command) {
      addButton(newButton);
      setNewButton({ name: '', command: '' });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] bg-[#1E1E1E] border-none text-[#D4D4D4]">
        <SheetHeader>
          <SheetTitle className="text-[#D4D4D4]">Settings</SheetTitle>
        </SheetHeader>
        
        <Tabs defaultValue="theme" className="mt-6">
          <TabsList className="bg-[#2A2A2A] border-b border-[#3A3A3A]">
            <TabsTrigger value="theme" className="data-[state=active]:bg-[#3A3A3A]">
              Theme
            </TabsTrigger>
            <TabsTrigger value="buttons" className="data-[state=active]:bg-[#3A3A3A]">
              Buttons
            </TabsTrigger>
          </TabsList>

          <TabsContent value="theme" className="py-4 space-y-6">
            <ColorPicker
              label="Background Color"
              value={localTheme.backgroundColor}
              onChange={(value) => handleColorChange('backgroundColor', value)}
              icon={<Palette className="h-4 w-4" />}
            />

            <ColorPicker
              label="Terminal Glow Color"
              value={localTheme.glowColor}
              onChange={(value) => handleColorChange('glowColor', value)}
              icon={<Sparkles className="h-4 w-4" />}
            />

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Gauge className="h-4 w-4" />
                Glow Intensity
              </Label>
              <Slider
                value={[localTheme.glowIntensity]}
                onValueChange={([value]) => handleIntensityChange(value)}
                min={0}
                max={1}
                step={0.1}
                className="bg-[#1A1A1A]"
              />
            </div>

            <Button
              variant="outline"
              className="w-full bg-[#1A1A1A] hover:bg-[#2A2A2A] border-none"
              onClick={resetTheme}
            >
              Reset to Default
            </Button>
          </TabsContent>

          <TabsContent value="buttons" className="py-4 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Button Name</Label>
                <Input
                  value={newButton.name}
                  onChange={(e) => setNewButton(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter button name..."
                  className="bg-[#2A2A2A] border-[#3A3A3A]"
                />
              </div>
              <div className="space-y-2">
                <Label>Command</Label>
                <Input
                  value={newButton.command}
                  onChange={(e) => setNewButton(prev => ({ ...prev, command: e.target.value }))}
                  placeholder="Enter command..."
                  className="bg-[#2A2A2A] border-[#3A3A3A]"
                />
              </div>
              <Button
                className="w-full bg-[#2A2A2A] hover:bg-[#3A3A3A]"
                onClick={handleAddButton}
                disabled={!newButton.name || !newButton.command}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Button
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Custom Buttons</Label>
              {buttons.map((button) => (
                <div
                  key={button.id}
                  className="flex items-center gap-2 p-2 bg-[#2A2A2A] rounded-md"
                >
                  <div className="flex-1">
                    <div className="font-medium">{button.name}</div>
                    <div className="text-sm text-gray-400">{button.command}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeButton(button.id)}
                    className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}