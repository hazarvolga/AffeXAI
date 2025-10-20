
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Send,
  Paperclip,
  Loader2,
  Lightbulb,
  ArrowRight,
  ClipboardCheck,
} from 'lucide-react';
import Link from 'next/link';
import { analyzeSupportTicket, FormState } from './actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ticketsService, type TicketCategory } from '@/lib/api/ticketsService';
import { authService } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const renderCategoryOptions = (
  categories: TicketCategory[],
  parentId: string | null = null,
  level = 0
): React.ReactNode[] => {
  const options: React.ReactNode[] = [];
  const children = categories.filter(c => c.parentId === parentId);

  for (const category of children) {
    options.push(
      <SelectItem
        key={category.id}
        value={category.id}
        style={{ paddingLeft: `${level * 1.5 + 1}rem` }}
      >
        {category.name}
      </SelectItem>
    );
    if (categories.some(c => c.parentId === category.id)) {
      options.push(
        ...renderCategoryOptions(categories, category.id, level + 1)
      );
    }
  }
  return options;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analiz Ediliyor...
        </>
      ) : (
        <>
          <Lightbulb className="mr-2 h-4 w-4" /> Analiz Et ve Devam Et
        </>
      )}
    </Button>
  );
}

export default function NewSupportTicketPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [categories, setCategories] = useState<TicketCategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  
  const initialState: FormState = {
    step: 1,
    message: '',
  };
  const [state, formAction] = useFormState(analyzeSupportTicket, initialState);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    // Check if ticket was created successfully
    if (state.ticketCreated && state.ticketId) {
      toast({
        title: 'Başarılı! 🎉',
        description: 'Destek talebiniz başarıyla oluşturuldu. Yönlendiriliyorsunuz...',
      });
      setTimeout(() => {
        router.push(`/portal/support/${state.ticketId}`);
      }, 1500);
    }
  }, [state.ticketCreated, state.ticketId, router, toast]);

  const loadCategories = async () => {
    try {
      if (!authService.isAuthenticated()) {
        router.push('/login');
        return;
      }

      const data = await ticketsService.getCategories();
      setCategories(data);
    } catch (error: any) {
      console.error('Error loading categories:', error);
      toast({
        title: 'Hata',
        description: 'Kategoriler yüklenirken bir hata oluştu',
        variant: 'destructive',
      });
    } finally {
      setLoadingCategories(false);
    }
  };

  return (
    <div className="flex-1 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Yeni Destek Talebi</h2>
          <p className="text-muted-foreground">
            Sorunuzu veya sorununuzu bize bildirin, ekibimiz size yardımcı
            olsun.
          </p>
        </div>
      </div>

      <Card>
        {state.step === 1 && (
          <form action={formAction}>
            <CardHeader>
              <CardTitle>1. Adım: Sorununuzu Anlatın</CardTitle>
              <CardDescription>
                Lütfen sorununuzu olabildiğince ayrıntılı açıklayın. AI,
                destek ekibimiz için bir özet oluşturacaktır.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Başlık *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Kısa ve öz bir başlık yazın"
                    required
                    minLength={10}
                    maxLength={100}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori *</Label>
                  <Select name="category" required disabled={loadingCategories}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder={loadingCategories ? "Yükleniyor..." : "Bir kategori seçin"} />
                    </SelectTrigger>
                    <SelectContent>
                      {renderCategoryOptions(categories)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="problemDescription">Açıklama *</Label>
                <Textarea
                  id="problemDescription"
                  name="problemDescription"
                  placeholder="Yaşadığınız sorunu detaylı bir şekilde anlatın... Hangi işletim sistemini kullanıyorsunuz, hangi adımları izlediniz ve neyle karşılaştınız?"
                  className="min-h-[250px]"
                  required
                  minLength={50}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="priority">Öncelik *</Label>
                  <Select name="priority" defaultValue="medium" required>
                    <SelectTrigger id="priority">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Düşük</SelectItem>
                      <SelectItem value="medium">Orta</SelectItem>
                      <SelectItem value="high">Yüksek</SelectItem>
                      <SelectItem value="urgent">Acil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-end gap-4">
              {state.message && !state.data && (
                <Alert variant="destructive" className="w-full">
                  <AlertTitle>Hata</AlertTitle>
                  <AlertDescription>{state.message}</AlertDescription>
                </Alert>
              )}
              <SubmitButton />
            </CardFooter>
          </form>
        )}

        {state.step === 2 && state.data && (
          <div>
            <CardHeader>
              <CardTitle>2. Adım: AI Analizi ve Onay</CardTitle>
              <CardDescription>
                Yapay zeka sorununuzu analiz etti. Devam etmeden önce lütfen
                aşağıdaki bilgileri inceleyin.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert variant="default" className="bg-blue-50 border-blue-200">
                <Lightbulb className="h-4 w-4 !text-blue-600" />
                <AlertTitle className="text-blue-800">
                  AI Çözüm Önerisi
                </AlertTitle>
                <AlertDescription className="text-blue-700">
                  {state.data.suggestion}
                </AlertDescription>
              </Alert>

              <Card className="bg-secondary/50">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Destek Ekibi İçin Oluşturulan Özet
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="font-semibold">Problem Özeti</Label>
                    <p className="text-sm text-muted-foreground">
                      {state.data.summary}
                    </p>
                  </div>
                  <div>
                    <Label className="font-semibold">AI Tarafından Önerilen Öncelik</Label>
                     <p className="text-sm font-semibold text-primary">
                      {state.data.priority}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <form action={formAction}>
                    {/* Hidden fields to pass data to the next step */}
                    <input type="hidden" name="title" value={state.originalInput?.title} />
                    <input type="hidden" name="problemDescription" value={state.originalInput?.problemDescription} />
                    <input type="hidden" name="category" value={state.originalInput?.category} />
                    <input type="hidden" name="priority" value={state.originalInput?.priority} />
                    <input type="hidden" name="summary" value={state.data.summary} />
                    <input type="hidden" name="aiPriority" value={state.data.priority} />
                    <div className="flex gap-2">
                      <Button variant="outline" type="submit" name="action" value="back">
                          Geri Dön ve Düzenle
                      </Button>
                      <Button type="submit" name="action" value="create_ticket" disabled={state.creating}>
                          {state.creating ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Oluşturuluyor...
                            </>
                          ) : (
                            <>
                              <ClipboardCheck className="mr-2 h-4 w-4" />
                              Destek Talebi Oluştur
                            </>
                          )}
                      </Button>
                    </div>
                </form>
            </CardFooter>
          </div>
        )}
      </Card>
    </div>
  );
}
