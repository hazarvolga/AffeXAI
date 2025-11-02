'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { TicketFormBuilder } from '@/components/admin/forms/ticket-form-builder';
import { TicketFormService } from '@/lib/api/ticketFormService';
import { useToast } from '@/hooks/use-toast';
import type { TicketFormDefinition } from '@/types/ticket-form.types';

export default function EditFormPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const formId = params.id as string;

  const [form, setForm] = useState<TicketFormDefinition | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        setLoading(true);
        const response = await TicketFormService.getFormDefinition(formId);
        setForm(response.formDefinition || response);
      } catch (error: any) {
        toast({
          title: 'Hata',
          description: error.message || 'Form yüklenirken bir hata oluştu',
          variant: 'destructive',
        });
        router.push('/admin/support/forms');
      } finally {
        setLoading(false);
      }
    };

    if (formId) {
      fetchForm();
    }
  }, [formId, router, toast]);

  const handleSave = async (formData: any) => {
    try {
      await TicketFormService.updateFormDefinition(formId, formData);
      toast({
        title: 'Başarılı',
        description: 'Form güncellendi',
      });
      router.push('/admin/support/forms');
    } catch (error: any) {
      toast({
        title: 'Hata',
        description: error.message || 'Form kaydedilirken bir hata oluştu',
        variant: 'destructive',
      });
    }
  };

  const handleCancel = () => {
    router.push('/admin/support/forms');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!form) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] gap-4">
        <p className="text-muted-foreground">Form bulunamadı</p>
        <Button onClick={() => router.push('/admin/support/forms')}>
          Form Listesine Dön
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Form Düzenle</h1>
          <p className="text-muted-foreground mt-1">
            {form.name} - Formu aşağıdaki araçlarla özelleştirin
          </p>
        </div>
      </div>

      {/* Ticket Form Builder */}
      <TicketFormBuilder
        initialData={form}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}
