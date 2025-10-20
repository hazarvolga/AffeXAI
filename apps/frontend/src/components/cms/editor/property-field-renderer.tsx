/**
 * PropertyFieldRenderer Component
 *
 * Renders appropriate input field based on property schema
 * Includes token support for color, spacing, and typography properties
 */

'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { TokenPicker, CompactTokenPicker } from './token-picker';
import type { TokenCategory } from './token-picker';
import type { BlockPropertySchema, TokenReferenceConfig } from '@/components/cms/blocks/block-configs';

interface PropertyFieldRendererProps {
  propertyKey: string;
  propertySchema: {
    type: 'text' | 'number' | 'boolean' | 'color' | 'select' | 'image' | 'list' | 'textarea' | 'token';
    label: string;
    options?: string[];
    defaultValue?: any;
    tokenReference?: TokenReferenceConfig;
  };
  value: any;
  onChange: (value: any) => void;
  disabled?: boolean;
}

/**
 * Determine if a property should use TokenPicker
 */
function shouldUseTokenPicker(
  type: string,
  tokenReference?: TokenReferenceConfig
): tokenReference is TokenReferenceConfig {
  return !!tokenReference || type === 'token';
}

/**
 * Map property type to token category
 */
function getTokenCategoryFromType(type: string): TokenCategory | null {
  switch (type) {
    case 'color':
      return 'color';
    case 'token':
      return 'color'; // Default to color, will be overridden by tokenReference
    default:
      return null;
  }
}

export function PropertyFieldRenderer({
  propertyKey,
  propertySchema,
  value,
  onChange,
  disabled = false,
}: PropertyFieldRendererProps) {
  const { type, label, options, tokenReference } = propertySchema;

  // Check if this property should use TokenPicker
  if (shouldUseTokenPicker(type, tokenReference)) {
    const category = tokenReference?.category || getTokenCategoryFromType(type) || 'color';

    return (
      <div className="space-y-2">
        <TokenPicker
          category={category}
          value={value || ''}
          onChange={onChange}
          allowCustom={tokenReference?.allowCustom ?? true}
          label={label}
          description={tokenReference?.description}
          disabled={disabled}
        />
      </div>
    );
  }

  // Regular property rendering
  switch (type) {
    case 'text':
      return (
        <div className="space-y-2">
          <Label htmlFor={propertyKey}>{label}</Label>
          <Input
            id={propertyKey}
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
          />
        </div>
      );

    case 'textarea':
      return (
        <div className="space-y-2">
          <Label htmlFor={propertyKey}>{label}</Label>
          <Textarea
            id={propertyKey}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            rows={4}
          />
        </div>
      );

    case 'number':
      return (
        <div className="space-y-2">
          <Label htmlFor={propertyKey}>{label}</Label>
          <Input
            id={propertyKey}
            type="number"
            value={value || ''}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            disabled={disabled}
          />
        </div>
      );

    case 'boolean':
      return (
        <div className="flex items-center space-x-2">
          <Checkbox
            id={propertyKey}
            checked={value || false}
            onCheckedChange={onChange}
            disabled={disabled}
          />
          <Label
            htmlFor={propertyKey}
            className="cursor-pointer"
          >
            {label}
          </Label>
        </div>
      );

    case 'color':
      // Without token reference, just a simple color input
      return (
        <div className="space-y-2">
          <Label htmlFor={propertyKey}>{label}</Label>
          <div className="flex gap-2">
            <Input
              id={propertyKey}
              type="text"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
              placeholder="#000000 or hsl(...)"
            />
            <div
              className="w-10 h-10 rounded border border-border"
              style={{
                backgroundColor: value?.includes(' ') ? `hsl(${value})` : value,
              }}
            />
          </div>
        </div>
      );

    case 'select':
      return (
        <div className="space-y-2">
          <Label htmlFor={propertyKey}>{label}</Label>
          <Select
            value={value || options?.[0]}
            onValueChange={onChange}
            disabled={disabled}
          >
            <SelectTrigger id={propertyKey}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );

    case 'image':
      // This will be handled by the parent component with MediaLibrary
      return (
        <div className="space-y-2">
          <Label htmlFor={propertyKey}>{label}</Label>
          <Input
            id={propertyKey}
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            placeholder="Image URL or media ID"
          />
        </div>
      );

    default:
      return (
        <div className="space-y-2">
          <Label htmlFor={propertyKey}>{label}</Label>
          <Input
            id={propertyKey}
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
          />
        </div>
      );
  }
}

/**
 * Compact version for inline property editing
 */
export function CompactPropertyFieldRenderer({
  propertyKey,
  propertySchema,
  value,
  onChange,
  disabled = false,
}: PropertyFieldRendererProps) {
  const { type, tokenReference } = propertySchema;

  // Check if this property should use CompactTokenPicker
  if (shouldUseTokenPicker(type, tokenReference)) {
    const category = tokenReference?.category || getTokenCategoryFromType(type) || 'color';

    return (
      <CompactTokenPicker
        category={category}
        value={value || ''}
        onChange={onChange}
        allowCustom={tokenReference?.allowCustom ?? true}
      />
    );
  }

  // Fallback to regular field renderer
  return (
    <PropertyFieldRenderer
      propertyKey={propertyKey}
      propertySchema={propertySchema}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
}
