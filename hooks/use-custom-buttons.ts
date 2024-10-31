import { useState, useEffect } from 'react';

export interface CustomButton {
  id: string;
  name: string;
  command: string;
}

export function useCustomButtons() {
  const [buttons, setButtons] = useState<CustomButton[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('custom-buttons');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('custom-buttons', JSON.stringify(buttons));
  }, [buttons]);

  const addButton = ({ name, command }: { name: string; command: string }) => {
    const newButton: CustomButton = {
      id: Date.now().toString(),
      name,
      command,
    };
    setButtons(prev => [...prev, newButton]);
  };

  const removeButton = (id: string) => {
    setButtons(prev => prev.filter(button => button.id !== id));
  };

  const updateButton = (id: string, updates: Partial<Omit<CustomButton, 'id'>>) => {
    setButtons(prev => prev.map(button => 
      button.id === id ? { ...button, ...updates } : button
    ));
  };

  return {
    buttons,
    addButton,
    removeButton,
    updateButton,
  };
}