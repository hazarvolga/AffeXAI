'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Plus,
  Trash2,
  GripVertical,
  Edit,
  Save,
  X,
  Eye,
  Settings,
  Library,
} from 'lucide-react';
import type { TicketFormDefinition, FormField as FormFieldType } from '@/types/ticket-form.types';
import { FieldEditor } from './field-editor';
import { DynamicFormRenderer } from '@/components/tickets/dynamic-form-renderer';
import ticketFieldLibraryService, { type TicketFieldLibrary } from '@/lib/api/ticketFieldLibraryService';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(1, 'Form adı gerekli'),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  isDefault: z.boolean().default(false),
});

interface TicketFormBuilderProps {
  initialData?: TicketFormDefinition | null;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export function TicketFormBuilder({ initialData, onSave, onCancel }: TicketFormBuilderProps) {
  const { toast } = useToast();
  const [fields, setFields] = useState<FormFieldType[]>(
    initialData?.schema.fields || []
  );
  const [editingField, setEditingField] = useState<FormFieldType | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'builder' | 'preview'>('builder');

  // Field Library integration
  const [showFieldLibrary, setShowFieldLibrary] = useState(false);
  const [libraryFields, setLibraryFields] = useState<TicketFieldLibrary[]>([]);
  const [loadingLibrary, setLoadingLibrary] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      isActive: initialData?.isActive ?? true,
      isDefault: initialData?.isDefault ?? false,
    },
  });

  // Load Field Library
  useEffect(() => {
    if (showFieldLibrary && libraryFields.length === 0) {
      loadFieldLibrary();
    }
  }, [showFieldLibrary]);

  const loadFieldLibrary = async () => {
    try {
      setLoadingLibrary(true);
      const response = await ticketFieldLibraryService.getAllFields({
        isActive: true,
        limit: 100
      });
      setLibraryFields(response.items);
    } catch (error) {
      console.error('Failed to load field library:', error);
      toast({
        title: 'Hata',
        description: 'Alan kütüphanesi yüklenirken bir hata oluştu',
        variant: 'destructive',
      });
    } finally {
      setLoadingLibrary(false);
    }
  };

  // Add field from library
  const handleAddFromLibrary = (libraryField: TicketFieldLibrary) => {
    const newField: FormFieldType = {
      ...libraryField.fieldConfig,
      id: `field_${Date.now()}`,
      metadata: {
        ...(libraryField.fieldConfig.metadata || {}),
        order: fields.length,
      },
    };
    setFields([...fields, newField]);
    setShowFieldLibrary(false);
    toast({
      title: 'Başarılı',
      description: `"${newField.label}" alanı forma eklendi`,
    });
  };

  // Add new custom field
  const handleAddField = () => {
    const newField: FormFieldType = {
      id: `field_${Date.now()}`,
      name: `field_${fields.length + 1}`,
      label: 'Yeni Alan',
      type: 'text',
      required: false,
      metadata: {
        order: fields.length,
        width: 'full',
      },
    };
    setEditingField(newField);
    setEditingIndex(null);
  };

  // Edit existing field
  const handleEditField = (field: FormFieldType, index: number) => {
    setEditingField({ ...field });
    setEditingIndex(index);
  };

  // Save edited field
  const handleSaveField = (field: FormFieldType) => {
    if (editingIndex !== null) {
      // Update existing
      const updated = [...fields];
      updated[editingIndex] = field;
      setFields(updated);
    } else {
      // Add new
      setFields([...fields, field]);
    }
    setEditingField(null);
    setEditingIndex(null);
  };

  // Delete field
  const handleDeleteField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  // Move field up/down
  const handleMoveField = (index: number, direction: 'up' | 'down') => {
    const newFields = [...fields];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newFields.length) return;

    [newFields[index], newFields[targetIndex]] = [newFields[targetIndex], newFields[index]];

    // Update order metadata
    newFields.forEach((field, i) => {
      if (!field.metadata) {
        field.metadata = { order: i, width: 'full' };
      } else {
        field.metadata.order = i;
      }
    });

    setFields(newFields);
  };

  // Submit form
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const formData = {
      ...values,
      schema: {
        formId: initialData?.schema?.formId || `form_${Date.now()}`,
        formName: values.name,
        version: initialData?.version ? initialData.version + 1 : 1,
        fields: fields.map((field, index) => ({
          ...field,
          metadata: {
            ...(field.metadata || {}),
            order: index,
          },
        })),
      },
    };

    onSave(formData);
  };

  // Preview form definition
  const previewFormDefinition: TicketFormDefinition = {
    id: initialData?.id || 'preview',
    name: form.watch('name') || 'Önizleme',
    description: form.watch('description'),
    version: 1,
    schema: {
      formId: initialData?.schema?.formId || 'preview',
      formName: form.watch('name') || 'Önizleme',
      version: 1,
      fields: fields,
    },
    isActive: form.watch('isActive'),
    isDefault: form.watch('isDefault'),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="builder">
            <Settings className="mr-2 h-4 w-4" />
            Form Builder
          </TabsTrigger>
          <TabsTrigger value="preview">
            <Eye className="mr-2 h-4 w-4" />
            Önizleme
          </TabsTrigger>
        </TabsList>

        {/* Builder Tab */}
        <TabsContent value="builder" className="space-y-6 mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Form Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Form Ayarları</CardTitle>
                  <CardDescription>
                    Form genel bilgilerini ve ayarlarını yapılandırın
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Form Adı *</FormLabel>
                        <FormControl>
                          <Input placeholder="Örn: Teknik Destek Formu" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Açıklama</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Form hakkında kısa açıklama"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="isActive"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Aktif</FormLabel>
                            <FormDescription>
                              Formu kullanıma açık tut
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="isDefault"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Varsayılan</FormLabel>
                            <FormDescription>
                              Ana form olarak kullan
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Fields List */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Form Alanları</CardTitle>
                      <CardDescription>
                        Formda görünecek alanları ekleyin ve düzenleyin
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        onClick={() => setShowFieldLibrary(true)}
                        variant="outline"
                      >
                        <Library className="mr-2 h-4 w-4" />
                        Kütüphaneden Ekle
                      </Button>
                      <Button type="button" onClick={handleAddField} variant="outline">
                        <Plus className="mr-2 h-4 w-4" />
                        Alan Ekle
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {fields.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      Henüz alan eklenmedi. "Alan Ekle" butonuna tıklayarak başlayın.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {fields.map((field, index) => (
                        <div
                          key={field.id}
                          className="flex items-center gap-2 p-4 border rounded-lg hover:bg-muted/50"
                        >
                          <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{field.label}</span>
                              <Badge variant="outline">{field.type}</Badge>
                              {field.required && (
                                <Badge variant="destructive">Zorunlu</Badge>
                              )}
                              {field.metadata?.agentOnly && (
                                <Badge variant="secondary">Agent Only</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {field.name} • Genişlik: {field.metadata?.width || 'full'}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => handleMoveField(index, 'up')}
                              disabled={index === 0}
                            >
                              ↑
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => handleMoveField(index, 'down')}
                              disabled={index === fields.length - 1}
                            >
                              ↓
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditField(field, index)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteField(index)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2">
                <Button type="button" variant="outline" onClick={onCancel}>
                  <X className="mr-2 h-4 w-4" />
                  İptal
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  {initialData ? 'Güncelle' : 'Oluştur'}
                </Button>
              </div>
            </form>
          </Form>
        </TabsContent>

        {/* Preview Tab */}
        <TabsContent value="preview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Form Önizleme</CardTitle>
              <CardDescription>
                Formun son kullanıcılar için nasıl görüneceğini inceleyin
              </CardDescription>
            </CardHeader>
            <CardContent>
              {fields.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Önizlemek için en az bir alan ekleyin
                </div>
              ) : (
                <DynamicFormRenderer
                  formDefinition={previewFormDefinition}
                  initialValues={{}}
                  onSubmit={(values) => {
                    console.log('Preview form values:', values);
                  }}
                  readOnly={true}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Field Editor Dialog */}
      {editingField && (
        <FieldEditor
          field={editingField}
          onSave={handleSaveField}
          onCancel={() => {
            setEditingField(null);
            setEditingIndex(null);
          }}
        />
      )}

      {/* Field Library Dialog */}
      <Dialog open={showFieldLibrary} onOpenChange={setShowFieldLibrary}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Alan Kütüphanesi</DialogTitle>
            <DialogDescription>
              Hazır alan şablonlarından seçim yapın
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {loadingLibrary ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Alan kütüphanesi yükleniyor...</p>
              </div>
            ) : libraryFields.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Henüz kütüphanede alan bulunmuyor</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {libraryFields.map((libraryField) => (
                  <Card
                    key={libraryField.id}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleAddFromLibrary(libraryField)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-base">{libraryField.name}</CardTitle>
                          {libraryField.description && (
                            <CardDescription className="mt-1">
                              {libraryField.description}
                            </CardDescription>
                          )}
                        </div>
                        <Badge variant="outline">{libraryField.fieldConfig.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {libraryField.fieldConfig.label}
                        </Badge>
                        {libraryField.fieldConfig.required && (
                          <Badge variant="destructive" className="text-xs">
                            Zorunlu
                          </Badge>
                        )}
                        {libraryField.fieldConfig.metadata?.agentOnly && (
                          <Badge variant="secondary" className="text-xs">
                            Agent Only
                          </Badge>
                        )}
                        {libraryField.tags && libraryField.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {libraryField.tags && libraryField.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{libraryField.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
