'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { BlockPropertySchema } from '@/components/cms/blocks/block-configs';

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
            <Input
              id={fieldKey}
              type="text"
              value={value}
              onChange={(e) => onChange(key, e.target.value)}
              placeholder="https://example.com/image.jpg or /uploads/..."
            />
            <p className="text-xs text-muted-foreground">
              📁 Media library integration coming soon
            </p>
            {value && (
              <img
                src={value}
                alt={config.label}
                className="mt-2 max-w-xs rounded border"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
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
      {Object.entries(schema).map(([key, config]) =>
        renderField(key, config, values[key])
      )}
    </div>
  );
};
