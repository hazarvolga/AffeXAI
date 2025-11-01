'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import type { FormField as FormFieldType, FieldOption } from '@/types/ticket-form.types';
import { useState } from 'react';

const fieldSchema = z.object({
  name: z.string().min(1, 'Field name is required').regex(/^[a-zA-Z_][a-zA-Z0-9_]*$/, 'Invalid field name (only letters, numbers, and underscores)'),
  label: z.string().min(1, 'Label is required'),
  type: z.enum(['text', 'textarea', 'number', 'email', 'url', 'date', 'select', 'multiselect', 'radio', 'checkbox', 'file', 'richtext']),
  required: z.boolean().default(false),
  placeholder: z.string().optional(),
  defaultValue: z.any().optional(),
  helpText: z.string().optional(),
  width: z.enum(['full', 'half', 'third']).default('full'),
  agentOnly: z.boolean().default(false),
});

interface FieldEditorProps {
  field: FormFieldType;
  onSave: (field: FormFieldType) => void;
  onCancel: () => void;
}

export function FieldEditor({ field, onSave, onCancel }: FieldEditorProps) {
  const [options, setOptions] = useState<FieldOption[]>(field.options || []);
  const [newOption, setNewOption] = useState({ label: '', value: '' });

  const form = useForm({
    resolver: zodResolver(fieldSchema),
    defaultValues: {
      name: field.name,
      label: field.label,
      type: field.type,
      required: field.required,
      placeholder: field.placeholder || '',
      defaultValue: field.defaultValue || '',
      helpText: field.helpText || '',
      width: field.metadata.width || 'full',
      agentOnly: field.metadata.agentOnly || false,
    },
  });

  const fieldType = form.watch('type');
  const hasOptions = ['select', 'multiselect', 'radio', 'checkbox'].includes(fieldType);

  // Add option
  const handleAddOption = () => {
    if (!newOption.label || !newOption.value) return;

    setOptions([
      ...options,
      {
        label: newOption.label,
        value: newOption.value,
      },
    ]);
    setNewOption({ label: '', value: '' });
  };

  // Remove option
  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  // Submit
  const handleSubmit = (values: z.infer<typeof fieldSchema>) => {
    const updatedField: FormFieldType = {
      ...field,
      name: values.name,
      label: values.label,
      type: values.type,
      required: values.required,
      placeholder: values.placeholder,
      defaultValue: values.defaultValue,
      helpText: values.helpText,
      options: hasOptions ? options : undefined,
      metadata: {
        ...field.metadata,
        width: values.width,
        agentOnly: values.agentOnly,
      },
    };

    onSave(updatedField);
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Field</DialogTitle>
          <DialogDescription>
            Configure the properties of this form field
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Field Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., subject, priority, status" {...field} />
                    </FormControl>
                    <FormDescription>
                      Internal field name used in API (not recommended to change)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Field Type *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select field type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="textarea">Textarea</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="url">URL</SelectItem>
                        <SelectItem value="date">Date</SelectItem>
                        <SelectItem value="select">Select (Dropdown)</SelectItem>
                        <SelectItem value="multiselect">Multi Select</SelectItem>
                        <SelectItem value="radio">Radio</SelectItem>
                        <SelectItem value="checkbox">Checkbox</SelectItem>
                        <SelectItem value="file">File Upload</SelectItem>
                        <SelectItem value="richtext">Rich Text</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Label */}
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Subject, Priority, Description" {...field} />
                  </FormControl>
                  <FormDescription>
                    Display label for this field in the ticket form
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Placeholder */}
            <FormField
              control={form.control}
              name="placeholder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Placeholder</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Enter ticket subject..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Placeholder text shown in empty field
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Help Text */}
            <FormField
              control={form.control}
              name="helpText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Help Text</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Provide guidance about this field..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Optional help text displayed below the field
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Options (for select, radio, checkbox) */}
            {hasOptions && (
              <div className="space-y-2 border rounded-lg p-4">
                <FormLabel>Options</FormLabel>
                <FormDescription>
                  {fieldType === 'select' || fieldType === 'multiselect'
                    ? 'Options for dropdown selection'
                    : fieldType === 'radio'
                    ? 'Options for radio buttons'
                    : 'Options for checkboxes'}
                </FormDescription>

                {/* Existing options */}
                {options.map((option, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 border rounded">
                    <div className="flex-1">
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-muted-foreground">
                        Value: {option.value}
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveOption(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}

                {/* Add new option */}
                <div className="flex items-end gap-2 pt-2 border-t">
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-sm">Label</label>
                      <Input
                        placeholder="e.g., Low Priority"
                        value={newOption.label}
                        onChange={(e) =>
                          setNewOption({ ...newOption, label: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm">Value</label>
                      <Input
                        placeholder="e.g., low"
                        value={newOption.value}
                        onChange={(e) =>
                          setNewOption({ ...newOption, value: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleAddOption}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Settings */}
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="required"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Required</FormLabel>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="width"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Width</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="full">Full (100%)</SelectItem>
                        <SelectItem value="half">Half (50%)</SelectItem>
                        <SelectItem value="third">Third (33%)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="agentOnly"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Agent Only</FormLabel>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
