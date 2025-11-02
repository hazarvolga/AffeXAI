'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { TicketFormBuilder } from '@/components/admin/forms/ticket-form-builder';
import { TicketFormService } from '@/lib/api/ticketFormService';
import { useToast } from '@/hooks/use-toast';

export default function NewFormPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSave = async (formData: any) => {
    try {
      await TicketFormService.createFormDefinition(formData);
      toast({
        title: 'Başarılı',
        description: 'Yeni form oluşturuldu',
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
          <h1 className="text-3xl font-bold tracking-tight">Yeni Form Oluştur</h1>
          <p className="text-muted-foreground mt-1">
            Destek talep formunu aşağıdaki araçlarla özelleştirin
          </p>
        </div>
      </div>

      {/* Ticket Form Builder */}
      <TicketFormBuilder
        initialData={null}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}
