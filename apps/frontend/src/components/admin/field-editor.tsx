'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Loader2, Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ticketFieldLibraryService, {
  type TicketFieldLibrary,
  type CreateFieldLibraryDto,
  type UpdateFieldLibraryDto,
} from '@/lib/api/ticketFieldLibraryService';
import type { FormField } from '@/types/ticket-form.types';
import { useQuery } from '@tanstack/react-query';

interface FieldEditorProps {
  field: TicketFieldLibrary | null;
  onSave: () => void;
  onCancel: () => void;
}

export function FieldEditor({ field, onSave, onCancel }: FieldEditorProps) {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  // Fetch existing fields for "Load After" dropdown
  const { data: existingFields } = useQuery({
    queryKey: ['ticket-field-library-all'],
    queryFn: () => ticketFieldLibraryService.getAllFields({ limit: 1000 }),
  });

  const { register, handleSubmit, watch, setValue, control, formState: { errors } } = useForm({
    defaultValues: {
      label: field?.fieldConfig.label || '',
      loadAfter: field?.fieldConfig.loadAfter || '',
      type: field?.fieldConfig.type || 'text',
      options: field?.fieldConfig.options || [],
    },
  });

  const { fields: optionFields, append: appendOption, remove: removeOption } = useFieldArray({
    control,
    name: 'options',
  });

  const selectedType = watch('type');
  const selectedLoadAfter = watch('loadAfter');

  // Field types that require options
  const needsOptions = ['select', 'multiselect', 'radio', 'checkbox'];
  const showOptionsSection = needsOptions.includes(selectedType);

  const onSubmit = async (data: any) => {
    setIsSaving(true);

    try {
      // Generate unique name from label
      const name = data.label
        .toLowerCase()
        .replace(/ı/g, 'i')
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9]/g, '_')
        .replace(/_+/g, '_');

      // Build FormField configuration with options if needed
      const fieldConfig: FormField = {
        id: field?.fieldConfig.id || name,
        name: field?.fieldConfig.name || name,
        label: data.label,
        type: data.type,
        required: false,
        loadAfter: data.loadAfter || undefined,
        options: data.options || undefined,
        metadata: {
          order: field?.fieldConfig.metadata?.order || 0,
        },
      };

      // Prepare DTO
      const dto = {
        name: field?.name || name,
        fieldConfig,
        isActive: field?.isActive ?? true,
        isSystemField: field?.isSystemField ?? false,
      };

      if (field) {
        // Update existing field
        await ticketFieldLibraryService.updateField(field.id, dto as UpdateFieldLibraryDto);
        toast({
          title: 'Başarılı',
          description: 'Alan güncellendi',
        });
      } else {
        // Create new field
        await ticketFieldLibraryService.createField(dto as CreateFieldLibraryDto);
        toast({
          title: 'Başarılı',
          description: 'Yeni alan oluşturuldu',
        });
      }

      onSave();
    } catch (error: any) {
      toast({
        title: 'Hata',
        description: error.response?.data?.message || 'İşlem başarısız',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const fieldTypes = [
    { value: 'text', label: 'Text' },
    { value: 'textarea', label: 'Textarea' },
    { value: 'number', label: 'Number' },
    { value: 'email', label: 'Email' },
    { value: 'url', label: 'URL' },
    { value: 'date', label: 'Date' },
    { value: 'datetime', label: 'Date Time' },
    { value: 'time', label: 'Time' },
    { value: 'select', label: 'Select (Single)' },
    { value: 'multiselect', label: 'Select (Multiple)' },
    { value: 'radio', label: 'Radio Button' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'file', label: 'File' },
    { value: 'file-multiple', label: 'File (Multiple)' },
    { value: 'file-single', label: 'File (Single)' },
    { value: 'richtext', label: 'Rich Text' },
    { value: 'html', label: 'HTML' },
    { value: 'edd-order', label: 'EDD Order' },
    { value: 'edd-product', label: 'EDD Product' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Label */}
      <div className="space-y-2">
        <Label htmlFor="label">
          Alanın Adı <span className="text-destructive">*</span>
        </Label>
        <Input
          id="label"
          {...register('label', { required: 'Alan adı zorunludur' })}
          placeholder="Örn: Ürün Seçiniz"
          className="text-base"
        />
        {errors.label && (
          <p className="text-sm text-destructive">{errors.label.message as string}</p>
        )}
      </div>

      {/* Load After */}
      <div className="space-y-2">
        <Label htmlFor="loadAfter">Load After (Hangi alandan sonra gelecek?)</Label>
        <Select
          value={selectedLoadAfter || 'none'}
          onValueChange={(value) => setValue('loadAfter', value === 'none' ? '' : value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seçiniz..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">-- Yok --</SelectItem>
            {existingFields?.items.map((f) => (
              <SelectItem key={f.id} value={f.fieldConfig.id}>
                {f.fieldConfig.label} ({f.fieldConfig.id})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          Bu alan, seçilen alandan sonra form üzerinde görünür
        </p>
      </div>

      {/* Field Type */}
      <div className="space-y-2">
        <Label htmlFor="type">
          Alan Tipi <span className="text-destructive">*</span>
        </Label>
        <Select value={selectedType} onValueChange={(value) => setValue('type', value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fieldTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Options Section - Conditional */}
      {showOptionsSection && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Options (Seçenekler)</CardTitle>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => appendOption({ label: '', value: '' })}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Option
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {optionFields.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                <p>No options added yet</p>
                <p className="text-sm mt-2">Click "Add Option" to create choices for this field</p>
              </div>
            ) : (
              optionFields.map((option, index) => (
                <div key={option.id} className="flex gap-2 items-start border rounded-lg p-4">
                  <div className="flex-1 space-y-2">
                    <div>
                      <Label htmlFor={`options.${index}.label`}>Label (Görünen İsim)</Label>
                      <Input
                        id={`options.${index}.label`}
                        {...register(`options.${index}.label`, {
                          required: 'Label is required',
                        })}
                        placeholder="Örn: Seçenek 1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`options.${index}.value`}>Value (İç Değer)</Label>
                      <Input
                        id={`options.${index}.value`}
                        {...register(`options.${index}.value`, {
                          required: 'Value is required',
                        })}
                        placeholder="Örn: option_1"
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeOption(index)}
                    className="mt-6"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}

      {/* Footer */}
      <div className="flex justify-end gap-4 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSaving}>
          İptal
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Kaydediliyor...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Kaydet
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
