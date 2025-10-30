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
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
      // Common properties
      extraInfo: field?.fieldConfig.extraInfo || '',
      defaultValue: field?.fieldConfig.defaultValue || '',
      autoFill: field?.fieldConfig.autoFill || false,
      placeholder: field?.fieldConfig.placeholder || '',
      ticketListWidth: field?.fieldConfig.ticketListWidth || '',
      hasPersonalInfo: field?.fieldConfig.hasPersonalInfo || false,
      // Text/Textarea specific
      characterLimit: field?.fieldConfig.characterLimit || '',
      // Number specific
      numberType: field?.fieldConfig.numberType || 'integer',
      // Date/DateTime/Time specific
      dateRange: field?.fieldConfig.dateRange || '',
      dateFormat: field?.fieldConfig.dateFormat || '',
      timeRange: field?.fieldConfig.timeRange || '',
      timeFormat: field?.fieldConfig.timeFormat || '',
      // HTML specific
      htmlContent: field?.fieldConfig.htmlContent || '',
    },
  });

  const { fields: optionFields, append: appendOption, remove: removeOption } = useFieldArray({
    control,
    name: 'options',
  });

  const selectedType = watch('type');
  const selectedLoadAfter = watch('loadAfter');
  const selectedAutoFill = watch('autoFill');
  const selectedHasPersonalInfo = watch('hasPersonalInfo');

  // Field types that require options
  const needsOptions = ['select', 'multiselect', 'radio', 'checkbox'];
  const showOptionsSection = needsOptions.includes(selectedType);

  // Field types with common properties
  const hasCommonProperties = ['text', 'textarea', 'number', 'email', 'url', 'date', 'datetime', 'time'].includes(selectedType);
  const hasCharacterLimit = ['text', 'textarea'].includes(selectedType);
  const isNumberField = selectedType === 'number';
  const isDateField = selectedType === 'date';
  const isDateTimeField = selectedType === 'datetime';
  const isTimeField = selectedType === 'time';
  const isHtmlField = selectedType === 'html';

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

      // Build FormField configuration with all properties
      const fieldConfig: FormField = {
        id: field?.fieldConfig.id || name,
        name: field?.fieldConfig.name || name,
        label: data.label,
        type: data.type,
        required: false,
        loadAfter: data.loadAfter || undefined,
        options: data.options || undefined,
        // Common properties
        extraInfo: data.extraInfo || undefined,
        defaultValue: data.defaultValue || undefined,
        autoFill: data.autoFill || false,
        placeholder: data.placeholder || undefined,
        ticketListWidth: data.ticketListWidth || undefined,
        hasPersonalInfo: data.hasPersonalInfo || false,
        // Text/Textarea specific
        characterLimit: data.characterLimit || undefined,
        // Number specific
        numberType: data.numberType || undefined,
        // Date/DateTime/Time specific
        dateRange: data.dateRange || undefined,
        dateFormat: data.dateFormat || undefined,
        timeRange: data.timeRange || undefined,
        timeFormat: data.timeFormat || undefined,
        // HTML specific
        htmlContent: data.htmlContent || undefined,
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

      {/* Options Section - For Select/Radio/Checkbox */}
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

      {/* Common Properties Section */}
      {hasCommonProperties && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Field Properties</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Extra Info */}
            <div className="space-y-2">
              <Label htmlFor="extraInfo">Extra Info</Label>
              <Textarea
                id="extraInfo"
                {...register('extraInfo')}
                placeholder="Additional information about this field"
                rows={3}
              />
            </div>

            {/* Default Value */}
            <div className="space-y-2">
              <Label htmlFor="defaultValue">Default Value</Label>
              <Input
                id="defaultValue"
                {...register('defaultValue')}
                placeholder="Default value for this field"
              />
            </div>

            {/* Auto-fill in Ticket Form */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="autoFill"
                checked={selectedAutoFill}
                onCheckedChange={(checked) => setValue('autoFill', checked as boolean)}
              />
              <Label htmlFor="autoFill" className="cursor-pointer">
                Auto-fill in ticket form
              </Label>
            </div>

            {/* Placeholder */}
            <div className="space-y-2">
              <Label htmlFor="placeholder">Placeholder</Label>
              <Input
                id="placeholder"
                {...register('placeholder')}
                placeholder="Placeholder text"
              />
            </div>

            {/* Ticket List Width */}
            <div className="space-y-2">
              <Label htmlFor="ticketListWidth">Ticket List Width (pixels)</Label>
              <Input
                id="ticketListWidth"
                {...register('ticketListWidth')}
                placeholder="e.g., 200"
                type="number"
              />
            </div>

            {/* Has Personal Info */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasPersonalInfo"
                checked={selectedHasPersonalInfo}
                onCheckedChange={(checked) => setValue('hasPersonalInfo', checked as boolean)}
              />
              <Label htmlFor="hasPersonalInfo" className="cursor-pointer">
                Has personal info (GDPR sensitive)
              </Label>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Character Limit - Text/Textarea */}
      {hasCharacterLimit && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Text Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="characterLimit">Character Limit</Label>
              <Input
                id="characterLimit"
                {...register('characterLimit')}
                placeholder="e.g., 500"
                type="number"
              />
              <p className="text-sm text-muted-foreground">
                Maximum number of characters allowed
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Number Type - Number Field */}
      {isNumberField && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Number Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="numberType">Select Type</Label>
              <RadioGroup
                value={watch('numberType')}
                onValueChange={(value) => setValue('numberType', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="integer" id="integer" />
                  <Label htmlFor="integer" className="cursor-pointer">Integer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="float" id="float" />
                  <Label htmlFor="float" className="cursor-pointer">Float</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Date Settings */}
      {isDateField && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Date Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dateRange">Date Range</Label>
              <Input
                id="dateRange"
                {...register('dateRange')}
                placeholder="e.g., 2020-01-01 to 2025-12-31"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateFormat">Date Format</Label>
              <Select value={watch('dateFormat')} onValueChange={(value) => setValue('dateFormat', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* DateTime Settings */}
      {isDateTimeField && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Date Time Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dateRange">Date Range</Label>
              <Input
                id="dateRange"
                {...register('dateRange')}
                placeholder="e.g., 2020-01-01 to 2025-12-31"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateFormat">Date Format</Label>
              <Select value={watch('dateFormat')} onValueChange={(value) => setValue('dateFormat', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DD/MM/YYYY HH:mm">DD/MM/YYYY HH:mm</SelectItem>
                  <SelectItem value="MM/DD/YYYY HH:mm">MM/DD/YYYY HH:mm</SelectItem>
                  <SelectItem value="YYYY-MM-DD HH:mm">YYYY-MM-DD HH:mm</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Time Settings */}
      {isTimeField && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Time Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="timeRange">Time Range</Label>
              <Input
                id="timeRange"
                {...register('timeRange')}
                placeholder="e.g., 09:00 to 18:00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeFormat">Time Format</Label>
              <Select value={watch('timeFormat')} onValueChange={(value) => setValue('timeFormat', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HH:mm">24-hour (HH:mm)</SelectItem>
                  <SelectItem value="hh:mm A">12-hour (hh:mm AM/PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* HTML Content */}
      {isHtmlField && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">HTML Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="htmlContent">
                HTML Content <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="htmlContent"
                {...register('htmlContent', {
                  required: isHtmlField ? 'HTML content is required' : false,
                })}
                placeholder="Enter HTML content here..."
                rows={10}
                className="font-mono text-sm"
              />
              {errors.htmlContent && (
                <p className="text-sm text-destructive">{errors.htmlContent.message as string}</p>
              )}
            </div>
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
