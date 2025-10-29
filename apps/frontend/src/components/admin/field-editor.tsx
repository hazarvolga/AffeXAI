'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, X, Save, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ticketFieldLibraryService, {
  type TicketFieldLibrary,
  type CreateFieldLibraryDto,
  type UpdateFieldLibraryDto,
} from '@/lib/api/ticketFieldLibraryService';
import type { FormField } from '@/types/ticket-form.types';

interface FieldEditorProps {
  field: TicketFieldLibrary | null;
  onSave: () => void;
  onCancel: () => void;
}

export function FieldEditor({ field, onSave, onCancel }: FieldEditorProps) {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [tags, setTags] = useState<string[]>(field?.tags || []);
  const [tagInput, setTagInput] = useState('');

  const { register, handleSubmit, watch, setValue, control, formState: { errors } } = useForm({
    defaultValues: {
      name: field?.name || '',
      description: field?.description || '',
      isActive: field?.isActive ?? true,
      isSystemField: field?.isSystemField ?? false,

      // FormField properties
      fieldId: field?.fieldConfig.id || '',
      fieldName: field?.fieldConfig.name || '',
      label: field?.fieldConfig.label || '',
      labelEn: field?.fieldConfig.labelEn || '',
      type: field?.fieldConfig.type || 'text',
      required: field?.fieldConfig.required ?? false,
      placeholder: field?.fieldConfig.placeholder || '',
      placeholderEn: field?.fieldConfig.placeholderEn || '',
      helpText: field?.fieldConfig.helpText || '',
      helpTextEn: field?.fieldConfig.helpTextEn || '',
      defaultValue: field?.fieldConfig.defaultValue || '',

      // Ticket-specific properties
      loadAfter: field?.fieldConfig.loadAfter || '',
      autoFill: field?.fieldConfig.autoFill ?? false,
      ticketListWidth: field?.fieldConfig.ticketListWidth || '',
      dateDisplayAs: field?.fieldConfig.dateDisplayAs || 'date',
      dateFormat: field?.fieldConfig.dateFormat || 'Y-m-d',
      hasPersonalInfo: field?.fieldConfig.hasPersonalInfo ?? false,

      // Metadata
      order: field?.fieldConfig.metadata?.order || 0,
      width: field?.fieldConfig.metadata?.width || 'full',
      category: field?.fieldConfig.metadata?.category || '',
      agentOnly: field?.fieldConfig.metadata?.agentOnly ?? false,
      rows: field?.fieldConfig.metadata?.rows || 3,

      // Validation
      validationMin: field?.fieldConfig.validation?.min || '',
      validationMax: field?.fieldConfig.validation?.max || '',
      validationMinLength: field?.fieldConfig.validation?.minLength || '',
      validationMaxLength: field?.fieldConfig.validation?.maxLength || '',
      validationPattern: field?.fieldConfig.validation?.pattern || '',
      validationMaxFiles: field?.fieldConfig.validation?.maxFiles || '',
      validationMaxFileSize: field?.fieldConfig.validation?.maxFileSize || '',
    },
  });

  const { fields: options, append: appendOption, remove: removeOption } = useFieldArray({
    control,
    name: 'options' as any,
  });

  const selectedType = watch('type');
  const requiresOptions = ['select', 'multiselect', 'radio', 'checkbox'].includes(selectedType);

  useEffect(() => {
    if (field?.fieldConfig.options) {
      setValue('options' as any, field.fieldConfig.options);
    }
  }, [field]);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const onSubmit = async (data: any) => {
    setIsSaving(true);

    try {
      // Build FormField configuration
      const fieldConfig: FormField = {
        id: data.fieldId,
        name: data.fieldName,
        label: data.label,
        labelEn: data.labelEn || undefined,
        type: data.type,
        required: data.required,
        placeholder: data.placeholder || undefined,
        placeholderEn: data.placeholderEn || undefined,
        helpText: data.helpText || undefined,
        helpTextEn: data.helpTextEn || undefined,
        defaultValue: data.defaultValue || undefined,

        // Ticket-specific properties
        loadAfter: data.loadAfter || undefined,
        autoFill: data.autoFill,
        ticketListWidth: data.ticketListWidth ? parseInt(data.ticketListWidth) : undefined,
        dateDisplayAs: data.dateDisplayAs || undefined,
        dateFormat: data.dateFormat || undefined,
        hasPersonalInfo: data.hasPersonalInfo,

        // Options for select/radio/checkbox
        options: requiresOptions ? (data.options || []) : undefined,

        // Validation
        validation: {
          min: data.validationMin ? parseFloat(data.validationMin) : undefined,
          max: data.validationMax ? parseFloat(data.validationMax) : undefined,
          minLength: data.validationMinLength ? parseInt(data.validationMinLength) : undefined,
          maxLength: data.validationMaxLength ? parseInt(data.validationMaxLength) : undefined,
          pattern: data.validationPattern || undefined,
          maxFiles: data.validationMaxFiles ? parseInt(data.validationMaxFiles) : undefined,
          maxFileSize: data.validationMaxFileSize ? parseInt(data.validationMaxFileSize) : undefined,
        },

        // Metadata
        metadata: {
          order: parseInt(data.order),
          width: data.width,
          category: data.category || undefined,
          agentOnly: data.agentOnly,
          rows: data.rows ? parseInt(data.rows) : undefined,
        },
      };

      // Validate field config
      const validation = ticketFieldLibraryService.validateFieldConfig(fieldConfig);
      if (!validation.valid) {
        toast({
          title: 'Doğrulama Hatası',
          description: validation.errors.join(', '),
          variant: 'destructive',
        });
        setIsSaving(false);
        return;
      }

      // Prepare DTO
      const dto = {
        name: data.name,
        description: data.description || undefined,
        fieldConfig,
        isActive: data.isActive,
        isSystemField: data.isSystemField,
        tags: tags.length > 0 ? tags : undefined,
      };

      if (field) {
        // Update existing field
        await ticketFieldLibraryService.updateField(field.id, dto as UpdateFieldLibraryDto);
        toast({
          title: 'Başarılı',
          description: 'Alan şablonu güncellendi',
        });
      } else {
        // Create new field
        await ticketFieldLibraryService.createField(dto as CreateFieldLibraryDto);
        toast({
          title: 'Başarılı',
          description: 'Yeni alan şablonu oluşturuldu',
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Temel Bilgiler</TabsTrigger>
          <TabsTrigger value="properties">Özellikler</TabsTrigger>
          <TabsTrigger value="validation">Doğrulama</TabsTrigger>
          <TabsTrigger value="options">{requiresOptions && <Badge variant="destructive" className="ml-2 h-4 w-4 p-0">!</Badge>} Seçenekler</TabsTrigger>
        </TabsList>

        {/* Basic Tab */}
        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Alan Adı (İçsel)*</Label>
              <Input
                id="name"
                {...register('name', { required: true })}
                placeholder="product_selector"
              />
              {errors.name && <p className="text-sm text-destructive">Alan adı gerekli</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="fieldId">Alan ID*</Label>
              <Input
                id="fieldId"
                {...register('fieldId', { required: true })}
                placeholder="product"
              />
              {errors.fieldId && <p className="text-sm text-destructive">Alan ID gerekli</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="fieldName">Form Field Name*</Label>
              <Input
                id="fieldName"
                {...register('fieldName', { required: true })}
                placeholder="product"
              />
              {errors.fieldName && <p className="text-sm text-destructive">Alan adı gerekli</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Alan Türü*</Label>
              <Select value={watch('type')} onValueChange={(value) => setValue('type', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Metin</SelectItem>
                  <SelectItem value="textarea">Metin Alanı</SelectItem>
                  <SelectItem value="number">Sayı</SelectItem>
                  <SelectItem value="email">E-posta</SelectItem>
                  <SelectItem value="url">URL</SelectItem>
                  <SelectItem value="date">Tarih</SelectItem>
                  <SelectItem value="datetime">Tarih/Saat</SelectItem>
                  <SelectItem value="time">Saat</SelectItem>
                  <SelectItem value="select">Seçim Listesi</SelectItem>
                  <SelectItem value="multiselect">Çoklu Seçim</SelectItem>
                  <SelectItem value="radio">Radyo Düğmesi</SelectItem>
                  <SelectItem value="checkbox">Onay Kutusu</SelectItem>
                  <SelectItem value="file">Dosya</SelectItem>
                  <SelectItem value="file-multiple">Çoklu Dosya</SelectItem>
                  <SelectItem value="file-single">Tek Dosya</SelectItem>
                  <SelectItem value="richtext">Zengin Metin</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="edd-order">EDD Sipariş</SelectItem>
                  <SelectItem value="edd-product">EDD Ürün</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="label">Etiket*</Label>
              <Input
                id="label"
                {...register('label', { required: true })}
                placeholder="Ürün Seçiniz"
              />
              {errors.label && <p className="text-sm text-destructive">Etiket gerekli</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="labelEn">Etiket (EN)</Label>
              <Input
                id="labelEn"
                {...register('labelEn')}
                placeholder="Select Product"
              />
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="description">Açıklama</Label>
              <Textarea
                id="description"
                {...register('description')}
                placeholder="Alan şablonunun açıklaması"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="placeholder">Placeholder</Label>
              <Input
                id="placeholder"
                {...register('placeholder')}
                placeholder="Bir ürün seçin..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="placeholderEn">Placeholder (EN)</Label>
              <Input
                id="placeholderEn"
                {...register('placeholderEn')}
                placeholder="Select a product..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="helpText">Yardım Metni</Label>
              <Input
                id="helpText"
                {...register('helpText')}
                placeholder="Bu alanı doldurmanız gerekir"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="helpTextEn">Yardım Metni (EN)</Label>
              <Input
                id="helpTextEn"
                {...register('helpTextEn')}
                placeholder="You need to fill this field"
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Etiketler</Label>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                placeholder="Etiket ekle..."
              />
              <Button type="button" onClick={handleAddTag} variant="secondary">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2 flex-wrap mt-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                  <X
                    className="h-3 w-3 ml-1 cursor-pointer"
                    onClick={() => handleRemoveTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="required"
                checked={watch('required')}
                onCheckedChange={(checked) => setValue('required', checked)}
              />
              <Label htmlFor="required">Zorunlu Alan</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={watch('isActive')}
                onCheckedChange={(checked) => setValue('isActive', checked)}
              />
              <Label htmlFor="isActive">Aktif</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isSystemField"
                checked={watch('isSystemField')}
                onCheckedChange={(checked) => setValue('isSystemField', checked)}
                disabled={!!field}
              />
              <Label htmlFor="isSystemField">Sistem Alanı</Label>
            </div>
          </div>
        </TabsContent>

        {/* Properties Tab */}
        <TabsContent value="properties" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="defaultValue">Varsayılan Değer</Label>
              <Input
                id="defaultValue"
                {...register('defaultValue')}
                placeholder="Varsayılan değer"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="loadAfter">Sonra Yükle (Field ID)</Label>
              <Input
                id="loadAfter"
                {...register('loadAfter')}
                placeholder="category"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ticketListWidth">Ticket Listesi Genişliği (px)</Label>
              <Input
                id="ticketListWidth"
                type="number"
                {...register('ticketListWidth')}
                placeholder="150"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="order">Sıralama*</Label>
              <Input
                id="order"
                type="number"
                {...register('order', { required: true, valueAsNumber: true })}
                placeholder="0"
              />
              {errors.order && <p className="text-sm text-destructive">Sıralama gerekli</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="width">Genişlik</Label>
              <Select value={watch('width')} onValueChange={(value) => setValue('width', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Tam Genişlik</SelectItem>
                  <SelectItem value="half">Yarım Genişlik</SelectItem>
                  <SelectItem value="third">Üçte Bir</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Kategori</Label>
              <Input
                id="category"
                {...register('category')}
                placeholder="Genel"
              />
            </div>

            {selectedType === 'textarea' && (
              <div className="space-y-2">
                <Label htmlFor="rows">Satır Sayısı</Label>
                <Input
                  id="rows"
                  type="number"
                  {...register('rows')}
                  placeholder="3"
                />
              </div>
            )}

            {['date', 'datetime'].includes(selectedType) && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="dateDisplayAs">Tarih Görünümü</Label>
                  <Select value={watch('dateDisplayAs')} onValueChange={(value) => setValue('dateDisplayAs', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Tarih (2025-01-15)</SelectItem>
                      <SelectItem value="relative">Göreceli (2 gün önce)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Tarih Formatı</Label>
                  <Input
                    id="dateFormat"
                    {...register('dateFormat')}
                    placeholder="Y-m-d H:i:s"
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="autoFill"
                checked={watch('autoFill')}
                onCheckedChange={(checked) => setValue('autoFill', checked)}
              />
              <Label htmlFor="autoFill">Otomatik Doldur</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="agentOnly"
                checked={watch('agentOnly')}
                onCheckedChange={(checked) => setValue('agentOnly', checked)}
              />
              <Label htmlFor="agentOnly">Sadece Agent</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="hasPersonalInfo"
                checked={watch('hasPersonalInfo')}
                onCheckedChange={(checked) => setValue('hasPersonalInfo', checked)}
              />
              <Label htmlFor="hasPersonalInfo">Kişisel Veri (GDPR)</Label>
            </div>
          </div>
        </TabsContent>

        {/* Validation Tab */}
        <TabsContent value="validation" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {selectedType === 'number' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="validationMin">Minimum Değer</Label>
                  <Input
                    id="validationMin"
                    type="number"
                    {...register('validationMin')}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="validationMax">Maximum Değer</Label>
                  <Input
                    id="validationMax"
                    type="number"
                    {...register('validationMax')}
                    placeholder="100"
                  />
                </div>
              </>
            )}

            {['text', 'textarea', 'email', 'url'].includes(selectedType) && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="validationMinLength">Minimum Uzunluk</Label>
                  <Input
                    id="validationMinLength"
                    type="number"
                    {...register('validationMinLength')}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="validationMaxLength">Maximum Uzunluk</Label>
                  <Input
                    id="validationMaxLength"
                    type="number"
                    {...register('validationMaxLength')}
                    placeholder="255"
                  />
                </div>
              </>
            )}

            <div className="space-y-2 col-span-2">
              <Label htmlFor="validationPattern">Regex Pattern</Label>
              <Input
                id="validationPattern"
                {...register('validationPattern')}
                placeholder="^[A-Z]{2,4}$"
              />
            </div>

            {['file', 'file-multiple', 'file-single'].includes(selectedType) && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="validationMaxFiles">Maksimum Dosya Sayısı</Label>
                  <Input
                    id="validationMaxFiles"
                    type="number"
                    {...register('validationMaxFiles')}
                    placeholder="5"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="validationMaxFileSize">Maksimum Dosya Boyutu (bytes)</Label>
                  <Input
                    id="validationMaxFileSize"
                    type="number"
                    {...register('validationMaxFileSize')}
                    placeholder="5242880"
                  />
                </div>
              </>
            )}
          </div>
        </TabsContent>

        {/* Options Tab */}
        <TabsContent value="options" className="space-y-4">
          {requiresOptions ? (
            <>
              <div className="flex justify-between items-center">
                <Label>Seçenekler*</Label>
                <Button
                  type="button"
                  onClick={() => appendOption({ label: '', labelEn: '', value: '' })}
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Seçenek Ekle
                </Button>
              </div>

              {options.map((option, index) => (
                <div key={option.id} className="flex gap-4 items-start">
                  <div className="flex-1 grid grid-cols-3 gap-4">
                    <Input
                      {...register(`options.${index}.label` as any, { required: true })}
                      placeholder="Etiket"
                    />
                    <Input
                      {...register(`options.${index}.labelEn` as any)}
                      placeholder="Etiket (EN)"
                    />
                    <Input
                      {...register(`options.${index}.value` as any, { required: true })}
                      placeholder="Değer"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeOption(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              {options.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Henüz seçenek eklenmedi. En az bir seçenek eklemelisiniz.
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              Bu alan türü için seçenekler gerekli değil.
            </p>
          )}
        </TabsContent>
      </Tabs>

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
