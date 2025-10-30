'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface ColorPickerProps {
  value?: string;
  onChange: (color: string) => void;
  label?: string;
}

// Predefined color palette
const PRESET_COLORS = [
  '#FF5733', '#33FF57', '#3357FF', '#FF33F5', '#F5FF33',
  '#FF8C33', '#33FFF5', '#8C33FF', '#FF3333', '#33FF8C',
  '#5733FF', '#F533FF', '#33F5FF', '#FFE033', '#E033FF',
  '#33FFE0', '#E0FF33', '#FF33E0', '#33E0FF', '#E03',
  '#0D9488', '#0891B2', '#0284C7', '#2563EB', '#4F46E5',
  '#7C3AED', '#A855F7', '#C026D3', '#DB2777', '#E11D48',
  '#DC2626', '#EA580C', '#D97706', '#CA8A04', '#65A30D',
];

export function ColorPicker({ value = '#FF5733', onChange, label }: ColorPickerProps) {
  const [customColor, setCustomColor] = useState(value);

  const handlePresetClick = (color: string) => {
    setCustomColor(color);
    onChange(color);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCustomColor(newColor);
    onChange(newColor);
  };

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start text-left font-normal">
            <div className="flex items-center gap-2 w-full">
              <div
                className="h-6 w-6 rounded border border-gray-300"
                style={{ backgroundColor: value }}
              />
              <span className="flex-1">{value}</span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            {/* Preset colors */}
            <div>
              <p className="text-sm font-medium mb-2">Preset Colors</p>
              <div className="grid grid-cols-7 gap-2">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className="h-8 w-8 rounded border border-gray-300 relative hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    onClick={() => handlePresetClick(color)}
                  >
                    {value === color && (
                      <Check className="h-4 w-4 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-md" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom color picker */}
            <div>
              <p className="text-sm font-medium mb-2">Custom Color</p>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={customColor}
                  onChange={handleCustomChange}
                  className="h-10 w-16 rounded border border-gray-300 cursor-pointer"
                />
                <Input
                  type="text"
                  value={customColor}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                      setCustomColor(val);
                      if (val.length === 7) {
                        onChange(val);
                      }
                    }
                  }}
                  placeholder="#FF5733"
                  className="flex-1"
                  maxLength={7}
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
