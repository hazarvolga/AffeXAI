'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { DynamicFormRenderer } from '@/components/tickets/dynamic-form-renderer';
import { TicketFormService } from '@/lib/api/ticketFormService';
import { ticketsService } from '@/lib/api/ticketsService';
import type { TicketFormDefinition, FormFieldValue } from '@/types/ticket-form.types';

export default function AdminNewSupportTicketPage() {
  const router = useRouter();
  const { toast } = useToast();

  // Form Definition State
  const [formDefinition, setFormDefinition] = useState<TicketFormDefinition | null>(null);
  const [loadingFormDefinition, setLoadingFormDefinition] = useState(true);

  // User Email Selection (Admin creates ticket for a user)
  const [userEmail, setUserEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch form definition
  useEffect(() => {
    const fetchFormDefinition = async () => {
      try {
        setLoadingFormDefinition(true);
        const defaultForm = await TicketFormService.getDefaultForm();
        setFormDefinition(defaultForm);
      } catch (error) {
        console.error('Error fetching form definition:', error);
        toast({
          title: 'Hata',
          description: 'Form tanımı yüklenirken bir hata oluştu',
          variant: 'destructive',
        });
      } finally {
        setLoadingFormDefinition(false);
      }
    };

    fetchFormDefinition();
  }, [toast]);

  // Handle form submission
  const handleSubmit = async (values: FormFieldValue) => {
    // Validate user email
    if (!userEmail || !userEmail.trim()) {
      toast({
        title: 'Hata',
        description: 'Lütfen kullanıcı e-posta adresini girin',
        variant: 'destructive',
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      toast({
        title: 'Hata',
        description: 'Geçerli bir e-posta adresi girin',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create ticket with form definition ID
      const ticketData = {
        ...values,
        userEmail: userEmail.trim(),
        formDefinitionId: formDefinition?.id,
        // Admin-created tickets are automatically assigned to the admin
        createdByAdmin: true,
      };

      const createdTicket = await ticketsService.createTicket(ticketData);

      toast({
        title: 'Başarılı!',
        description: `Destek talebi başarıyla oluşturuldu (Ticket #${createdTicket.id})`,
      });

      router.push(`/admin/support/${createdTicket.id}`);
    } catch (error: any) {
      console.error('Error creating ticket:', error);
      toast({
        title: 'Hata',
        description: error.message || 'Destek talebi oluşturulurken bir hata oluştu',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (loadingFormDefinition) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Error state
  if (!formDefinition) {
    return (
      <div className="flex-1 space-y-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Hata</AlertTitle>
          <AlertDescription>
            Form tanımı yüklenemedi. Lütfen daha sonra tekrar deneyin.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Yeni Destek Talebi Oluştur</CardTitle>
          <CardDescription>
            Bir kullanıcı adına manuel olarak yeni bir destek talebi oluşturun.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* User Email Selection - Admin-specific field */}
          <div className="space-y-2">
            <Label htmlFor="user-email">
              Kullanıcı E-posta Adresi <span className="text-destructive">*</span>
            </Label>
            <Input
              id="user-email"
              type="email"
              placeholder="kullanici@example.com"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
            <p className="text-sm text-muted-foreground">
              Bu destek talebi belirtilen kullanıcı adına oluşturulacaktır
            </p>
          </div>

          {/* Dynamic Form Fields */}
          <div className="border-t pt-6">
            <DynamicFormRenderer
              formDefinition={formDefinition}
              initialValues={{}}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              onCancel={() => router.push('/admin/support')}
              showAgentOnlyFields={true}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
