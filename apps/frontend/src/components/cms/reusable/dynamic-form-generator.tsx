'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, X } from 'lucide-react';
import { BlockPropertySchema } from '@/components/cms/blocks/block-configs';
import { MediaPicker } from '@/components/cms/editor/media-picker';
import { useToast } from '@/hooks/use-toast';
import NextImage from 'next/image';

interface DynamicFormGeneratorProps {
  schema: BlockPropertySchema;
  values: Record<string, any>;
  onChange: (key: string, value: any) => void;
}

/**
 * DynamicFormGenerator - Automatically generates form fields from BlockPropertySchema
 *
 * Supports all property types from prebuild block configs:
 * - text, number, boolean, color, select, image, textarea, token, list
 * - Design token integration
 * - Media library integration (planned)
 * - Nested list structures
 */
export const DynamicFormGenerator: React.FC<DynamicFormGeneratorProps> = ({
  schema,
  values,
  onChange,
}) => {
  const { toast } = useToast();

  /**
   * Helper function to identify style properties
   * These will be shown in Style tab instead of Content tab
   */
  const isStyleProperty = (propName: string): boolean => {
    const styleKeywords = [
      'color', 'background', 'padding', 'margin', 'width', 'height',
      'size', 'variant', 'align', 'weight', 'border', 'shadow',
      'opacity', 'radius', 'rounded', 'spacing', 'gap', 'font'
    ];

    const lowerProp = propName.toLowerCase();
    return styleKeywords.some(keyword => lowerProp.includes(keyword));
  };

  /**
   * Render a single form field based on property type
   */
  const renderField = (
    key: string,
    config: BlockPropertySchema[string],
    currentValue: any,
    parentPath: string = ''
  ) => {
    const fieldKey = parentPath ? `${parentPath}.${key}` : key;
    const value = currentValue ?? config.defaultValue ?? '';

    // Special handling for mediaId fields (e.g., imageMediaId, logoMediaId, mediaId)
    if (key.toLowerCase().includes('mediaid')) {
      // Determine corresponding URL field name
      const urlFieldName = key.replace(/MediaId$/i, 'Url').replace(/mediaid$/i, 'url');

      // For list items, we need to get the URL from the parent item
      // Extract index from parentPath if exists (e.g., "items[0]" -> index 0)
      let currentUrl = '';
      if (parentPath.includes('[')) {
        const match = parentPath.match(/\[(\d+)\]/);
        if (match) {
          const index = parseInt(match[1]);
          const listKey = parentPath.split('[')[0];
          const items = values[listKey];
          if (items && items[index]) {
            currentUrl = items[index][urlFieldName] || '';
          }
        }
      } else {
        currentUrl = values[urlFieldName] || '';
      }

      return (
        <div key={fieldKey} className="space-y-2">
          <Label>{config.label}</Label>
          <div className="border rounded-lg p-3 bg-gray-50">
            <MediaPicker
              value={value || undefined}
              onChange={async (mediaId) => {
                if (mediaId) {
                  // Update mediaId
                  onChange(key, mediaId);

                  // Fetch and update corresponding URL field
                  try {
                    const response = await fetch(`/api/media/${mediaId}`);

                    if (!response.ok) {
                      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                    }

                    const data = await response.json();

                    if (data.url) {
                      // For list items, we need to update the URL in the parent onChange
                      if (parentPath.includes('[')) {
                        const match = parentPath.match(/\[(\d+)\]/);
                        if (match) {
                          const index = parseInt(match[1]);
                          const listKey = parentPath.split('[')[0];
                          const items = [...(values[listKey] || [])];
                          if (items[index]) {
                            items[index] = { ...items[index], [urlFieldName]: data.url };
                            onChange(listKey, items);
                          }
                        }
                      } else {
                        onChange(urlFieldName, data.url);
                      }
                    } else {
                      throw new Error('Media URL not found in response');
                    }
                  } catch (err) {
                    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
                    console.error('Error fetching media URL:', errorMessage, err);
                    toast({
                      title: 'Error',
                      description: `Failed to load media URL: ${errorMessage}`,
                      variant: 'destructive',
                    });
                  }
                } else {
                  // Clear both mediaId and URL
                  onChange(key, null);
                  if (parentPath.includes('[')) {
                    const match = parentPath.match(/\[(\d+)\]/);
                    if (match) {
                      const index = parseInt(match[1]);
                      const listKey = parentPath.split('[')[0];
                      const items = [...(values[listKey] || [])];
                      if (items[index]) {
                        items[index] = { ...items[index], [urlFieldName]: '' };
                        onChange(listKey, items);
                      }
                    }
                  } else {
                    onChange(urlFieldName, '');
                  }
                }
              }}
              placeholder={`Select ${config.label || 'media'}`}
            />
          </div>
          {currentUrl && (
            <div className="relative group">
              <NextImage
                src={currentUrl}
                alt="Preview"
                width={300}
                height={128}
                className="w-full h-32 object-contain rounded border bg-white"
              />
              <button
                onClick={() => {
                  onChange(key, null);
                  if (parentPath.includes('[')) {
                    const match = parentPath.match(/\[(\d+)\]/);
                    if (match) {
                      const index = parseInt(match[1]);
                      const listKey = parentPath.split('[')[0];
                      const items = [...(values[listKey] || [])];
                      if (items[index]) {
                        items[index] = { ...items[index], [urlFieldName]: '' };
                        onChange(listKey, items);
                      }
                    }
                  } else {
                    onChange(urlFieldName, '');
                  }
                }}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-80 hover:opacity-100"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {value && (
            <div className="text-xs text-muted-foreground">
              Media ID: {value}
            </div>
          )}
        </div>
      );
    }

    switch (config.type) {
      case 'text':
        return (
          <div key={fieldKey} className="space-y-2">
            <Label htmlFor={fieldKey}>{config.label}</Label>
            <Input
              id={fieldKey}
              type="text"
              value={value}
              onChange={(e) => onChange(key, e.target.value)}
              placeholder={config.defaultValue || ''}
            />
            {config.tokenReference && (
              <p className="text-xs text-muted-foreground">
                💡 Can use design token: {config.tokenReference.suggestedPath || config.tokenReference.category}
              </p>
            )}
          </div>
        );

      case 'textarea':
        return (
          <div key={fieldKey} className="space-y-2">
            <Label htmlFor={fieldKey}>{config.label}</Label>
            <Textarea
              id={fieldKey}
              value={value}
              onChange={(e) => onChange(key, e.target.value)}
              placeholder={config.defaultValue || ''}
              rows={4}
            />
          </div>
        );

      case 'number':
        return (
          <div key={fieldKey} className="space-y-2">
            <Label htmlFor={fieldKey}>{config.label}</Label>
            <Input
              id={fieldKey}
              type="number"
              value={value}
              onChange={(e) => onChange(key, parseFloat(e.target.value) || 0)}
              placeholder={config.defaultValue?.toString() || '0'}
            />
            {config.tokenReference && (
              <p className="text-xs text-muted-foreground">
                💡 Can use design token: {config.tokenReference.suggestedPath || config.tokenReference.category}
              </p>
            )}
          </div>
        );

      case 'boolean':
        return (
          <div key={fieldKey} className="flex items-center space-x-2">
            <Checkbox
              id={fieldKey}
              checked={value || false}
              onCheckedChange={(checked) => onChange(key, checked)}
            />
            <Label htmlFor={fieldKey} className="cursor-pointer">
              {config.label}
            </Label>
          </div>
        );

      case 'color':
        return (
          <div key={fieldKey} className="space-y-2">
            <Label htmlFor={fieldKey}>{config.label}</Label>
            <div className="flex gap-2">
              <Input
                id={fieldKey}
                type="color"
                value={value || '#000000'}
                onChange={(e) => onChange(key, e.target.value)}
                className="w-20 h-10"
              />
              <Input
                type="text"
                value={value || ''}
                onChange={(e) => onChange(key, e.target.value)}
                placeholder="#000000"
                className="flex-1"
              />
            </div>
            {config.tokenReference && (
              <p className="text-xs text-muted-foreground">
                💡 Can use design token: {config.tokenReference.suggestedPath || 'color.primary'}
              </p>
            )}
          </div>
        );

      case 'select':
        return (
          <div key={fieldKey} className="space-y-2">
            <Label htmlFor={fieldKey}>{config.label}</Label>
            <Select
              value={value || config.defaultValue || ''}
              onValueChange={(val) => onChange(key, val)}
            >
              <SelectTrigger id={fieldKey}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {config.options?.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'image':
        return (
          <div key={fieldKey} className="space-y-2">
            <Label htmlFor={fieldKey}>{config.label}</Label>
            <div className="border rounded-lg p-3 bg-gray-50">
              <MediaPicker
                value={undefined}
                onChange={async (mediaId) => {
                  if (mediaId) {
                    try {
                      const response = await fetch(`/api/media/${mediaId}`);
                      if (!response.ok) {
                        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                      }
                      const data = await response.json();
                      if (data.url) {
                        onChange(key, data.url);
                      } else {
                        throw new Error('Media URL not found in response');
                      }
                    } catch (err) {
                      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
                      console.error('Error fetching media URL:', errorMessage, err);
                      toast({
                        title: 'Error',
                        description: `Failed to load media URL: ${errorMessage}`,
                        variant: 'destructive',
                      });
                    }
                  } else {
                    onChange(key, '');
                  }
                }}
                placeholder={`Select ${config.label || 'image'}`}
                filterType="image"
              />
            </div>
            {value && (
              <div className="relative group">
                <NextImage
                  src={value}
                  alt={config.label || 'Image'}
                  width={300}
                  height={128}
                  className="w-full h-32 object-contain rounded border bg-white"
                />
                <button
                  onClick={() => onChange(key, '')}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-80 hover:opacity-100"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        );

      case 'token':
        return (
          <div key={fieldKey} className="space-y-2">
            <Label htmlFor={fieldKey}>{config.label}</Label>
            <Input
              id={fieldKey}
              type="text"
              value={value}
              onChange={(e) => onChange(key, e.target.value)}
              placeholder={config.tokenReference?.suggestedPath || 'token.path'}
            />
            <p className="text-xs text-muted-foreground">
              🎨 Design token: {config.tokenReference?.category} - {config.tokenReference?.description}
            </p>
          </div>
        );

      case 'list':
        return renderListField(key, config, value || [], fieldKey);

      default:
        return (
          <div key={fieldKey} className="space-y-2">
            <Label>{config.label}</Label>
            <p className="text-sm text-muted-foreground">
              Unsupported field type: {config.type}
            </p>
          </div>
        );
    }
  };

  /**
   * Render list field with add/remove items
   */
  const renderListField = (
    key: string,
    config: BlockPropertySchema[string],
    items: any[],
    fieldKey: string
  ) => {
    const addItem = () => {
      const newItem: any = {};
      if (config.itemSchema) {
        Object.keys(config.itemSchema).forEach((subKey) => {
          newItem[subKey] = config.itemSchema![subKey].defaultValue ?? '';
        });
      }
      onChange(key, [...items, newItem]);
    };

    const removeItem = (index: number) => {
      const newItems = items.filter((_, i) => i !== index);
      onChange(key, newItems);
    };

    const updateItem = (index: number, subKey: string, subValue: any) => {
      const newItems = [...items];
      newItems[index] = { ...newItems[index], [subKey]: subValue };
      onChange(key, newItems);
    };

    return (
      <div key={fieldKey} className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>{config.label}</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addItem}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Item
          </Button>
        </div>

        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">
            No items yet. Click "Add Item" to create one.
          </p>
        ) : (
          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={`${fieldKey}-${index}`}
                className="p-4 border rounded-lg space-y-3 relative"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Item {index + 1}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(index)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {config.itemSchema &&
                  Object.entries(config.itemSchema).map(([subKey, subConfig]) =>
                    renderField(
                      subKey,
                      subConfig,
                      item[subKey],
                      `${fieldKey}[${index}]`
                    )
                  )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {Object.entries(schema)
        .filter(([key]) => !isStyleProperty(key) && key !== 'className')
        .map(([key, config]) =>
          renderField(key, config, values[key])
        )}
    </div>
  );
};
