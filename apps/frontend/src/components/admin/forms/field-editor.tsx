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
  name: z.string().min(1, 'Alan adı gerekli').regex(/^[a-zA-Z_][a-zA-Z0-9_]*$/, 'Geçersiz alan adı (sadece harfler, rakamlar ve alt çizgi)'),
  label: z.string().min(1, 'Etiket gerekli'),
  labelEn: z.string().optional(),
  type: z.enum(['text', 'textarea', 'number', 'email', 'url', 'date', 'select', 'multiselect', 'radio', 'checkbox', 'file', 'richtext']),
  required: z.boolean().default(false),
  placeholder: z.string().optional(),
  placeholderEn: z.string().optional(),
  defaultValue: z.any().optional(),
  helpText: z.string().optional(),
  helpTextEn: z.string().optional(),
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
  const [newOption, setNewOption] = useState({ label: '', labelEn: '', value: '' });

  const form = useForm({
    resolver: zodResolver(fieldSchema),
    defaultValues: {
      name: field.name,
      label: field.label,
      labelEn: field.labelEn || '',
      type: field.type,
      required: field.required,
      placeholder: field.placeholder || '',
      placeholderEn: field.placeholderEn || '',
      defaultValue: field.defaultValue || '',
      helpText: field.helpText || '',
      helpTextEn: field.helpTextEn || '',
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
        labelEn: newOption.labelEn || newOption.label,
        value: newOption.value,
      },
    ]);
    setNewOption({ label: '', labelEn: '', value: '' });
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
      labelEn: values.labelEn,
      type: values.type,
      required: values.required,
      placeholder: values.placeholder,
      placeholderEn: values.placeholderEn,
      defaultValue: values.defaultValue,
      helpText: values.helpText,
      helpTextEn: values.helpTextEn,
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
          <DialogTitle>Alan Düzenle</DialogTitle>
          <DialogDescription>
            Form alanının özelliklerini yapılandırın
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
                    <FormLabel>Alan Adı (name) *</FormLabel>
                    <FormControl>
                      <Input placeholder="subject" {...field} />
                    </FormControl>
                    <FormDescription>
                      API'de kullanılacak alan adı (değiştirmemek önerilir)
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
                    <FormLabel>Alan Tipi *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Tip seçin" />
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

            {/* Labels */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Etiket (TR) *</FormLabel>
                    <FormControl>
                      <Input placeholder="Konu" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="labelEn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Etiket (EN)</FormLabel>
                    <FormControl>
                      <Input placeholder="Subject" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Placeholders */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="placeholder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Placeholder (TR)</FormLabel>
                    <FormControl>
                      <Input placeholder="Örn: Sorunumu anlat..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="placeholderEn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Placeholder (EN)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g: Describe your issue..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Help Text */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="helpText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Yardım Metni (TR)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Alan hakkında açıklama..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="helpTextEn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Yardım Metni (EN)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description about field..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Options (for select, radio, checkbox) */}
            {hasOptions && (
              <div className="space-y-2 border rounded-lg p-4">
                <FormLabel>Seçenekler</FormLabel>
                <FormDescription>
                  {fieldType === 'select' || fieldType === 'multiselect'
                    ? 'Dropdown için seçenekler'
                    : fieldType === 'radio'
                    ? 'Radio butonlar için seçenekler'
                    : 'Checkbox için seçenekler'}
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
                  <div className="flex-1 grid grid-cols-3 gap-2">
                    <div className="space-y-1">
                      <label className="text-sm">Etiket (TR)</label>
                      <Input
                        placeholder="Düşük"
                        value={newOption.label}
                        onChange={(e) =>
                          setNewOption({ ...newOption, label: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm">Etiket (EN)</label>
                      <Input
                        placeholder="Low"
                        value={newOption.labelEn}
                        onChange={(e) =>
                          setNewOption({ ...newOption, labelEn: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm">Value</label>
                      <Input
                        placeholder="low"
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
                      <FormLabel>Zorunlu</FormLabel>
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
                    <FormLabel>Genişlik</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="full">Tam (100%)</SelectItem>
                        <SelectItem value="half">Yarım (50%)</SelectItem>
                        <SelectItem value="third">Üçte Bir (33%)</SelectItem>
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
                İptal
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Kaydet
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
