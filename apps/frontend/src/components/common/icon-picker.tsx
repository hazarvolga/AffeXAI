'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import * as Icons from 'lucide-react';

interface IconPickerProps {
  value?: string;
  onChange: (iconName: string) => void;
  label?: string;
}

// Commonly used icons for ticket categories
const SUGGESTED_ICONS = [
  'FolderTree', 'Folder', 'FolderOpen', 'FolderClosed',
  'Bug', 'AlertCircle', 'AlertTriangle', 'AlertOctagon',
  'Zap', 'Sparkles', 'Star', 'Heart',
  'Settings', 'Tool', 'Wrench', 'Hammer',
  'Package', 'Box', 'Archive', 'Database',
  'Users', 'User', 'UserCog', 'UserCheck',
  'MessageSquare', 'MessageCircle', 'Mail', 'Send',
  'Check', 'CheckCircle', 'X', 'XCircle',
  'Info', 'HelpCircle', 'CircleDot', 'Circle',
  'Clock', 'Calendar', 'Timer', 'Watch',
  'Shield', 'Lock', 'Unlock', 'Key',
  'FileText', 'File', 'FileCode', 'FileCheck',
  'Search', 'Filter', 'SortAsc', 'SortDesc',
  'Tag', 'Tags', 'Bookmark', 'Flag',
];

export function IconPicker({ value = 'FolderTree', onChange, label }: IconPickerProps) {
  const [search, setSearch] = useState('');

  // Get all icon names
  const allIconNames = Object.keys(Icons).filter(
    (key) => key !== 'createLucideIcon' && key !== 'default'
  );

  // Filter icons based on search
  const filteredSuggested = SUGGESTED_ICONS.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredAll = allIconNames.filter(
    (name) =>
      name.toLowerCase().includes(search.toLowerCase()) &&
      !SUGGESTED_ICONS.includes(name)
  );

  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    if (!IconComponent) return null;
    return <IconComponent className="h-5 w-5" />;
  };

  const SelectedIcon = value ? (Icons as any)[value] : null;

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start text-left font-normal">
            <div className="flex items-center gap-2">
              {SelectedIcon && <SelectedIcon className="h-5 w-5" />}
              <span>{value || 'Select icon'}</span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0">
          <div className="p-4 space-y-4">
            {/* Search input */}
            <Input
              placeholder="Search icons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />

            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {/* Suggested icons */}
                {filteredSuggested.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2 text-muted-foreground">Suggested</p>
                    <div className="grid grid-cols-6 gap-2">
                      {filteredSuggested.map((iconName) => (
                        <button
                          key={iconName}
                          type="button"
                          onClick={() => {
                            onChange(iconName);
                            setSearch('');
                          }}
                          className={`
                            h-10 w-10 rounded border flex items-center justify-center
                            hover:bg-accent hover:border-accent-foreground transition-colors
                            ${value === iconName ? 'bg-primary text-primary-foreground border-primary' : 'border-input'}
                          `}
                          title={iconName}
                        >
                          {renderIcon(iconName)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* All other icons */}
                {filteredAll.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2 text-muted-foreground">All Icons</p>
                    <div className="grid grid-cols-6 gap-2">
                      {filteredAll.map((iconName) => (
                        <button
                          key={iconName}
                          type="button"
                          onClick={() => {
                            onChange(iconName);
                            setSearch('');
                          }}
                          className={`
                            h-10 w-10 rounded border flex items-center justify-center
                            hover:bg-accent hover:border-accent-foreground transition-colors
                            ${value === iconName ? 'bg-primary text-primary-foreground border-primary' : 'border-input'}
                          `}
                          title={iconName}
                        >
                          {renderIcon(iconName)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* No results */}
                {filteredSuggested.length === 0 && filteredAll.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No icons found for &quot;{search}&quot;
                  </p>
                )}
              </div>
            </ScrollArea>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
