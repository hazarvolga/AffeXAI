'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
import { Save, Loader2 } from 'lucide-react';
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

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      label: field?.fieldConfig.label || '',
      loadAfter: field?.fieldConfig.loadAfter || '',
      type: field?.fieldConfig.type || 'text',
    },
  });

  const selectedType = watch('type');
  const selectedLoadAfter = watch('loadAfter');

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

      // Build minimal FormField configuration
      const fieldConfig: FormField = {
        id: field?.fieldConfig.id || name,
        name: field?.fieldConfig.name || name,
        label: data.label,
        type: data.type,
        required: false,
        loadAfter: data.loadAfter || undefined,
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
    { value: 'text', label: 'Metin' },
    { value: 'textarea', label: 'Metin Alanı' },
    { value: 'number', label: 'Sayı' },
    { value: 'email', label: 'E-posta' },
    { value: 'url', label: 'URL' },
    { value: 'date', label: 'Tarih' },
    { value: 'datetime', label: 'Tarih/Saat' },
    { value: 'time', label: 'Saat' },
    { value: 'select', label: 'Seçim Listesi' },
    { value: 'multiselect', label: 'Çoklu Seçim' },
    { value: 'radio', label: 'Radyo Düğmesi' },
    { value: 'checkbox', label: 'Onay Kutusu' },
    { value: 'file', label: 'Dosya' },
    { value: 'file-multiple', label: 'Çoklu Dosya' },
    { value: 'file-single', label: 'Tek Dosya' },
    { value: 'richtext', label: 'Zengin Metin' },
    { value: 'html', label: 'HTML' },
    { value: 'edd-order', label: 'EDD Sipariş' },
    { value: 'edd-product', label: 'EDD Ürün' },
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
        <Select value={selectedLoadAfter} onValueChange={(value) => setValue('loadAfter', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Seçiniz..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">-- Yok --</SelectItem>
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
