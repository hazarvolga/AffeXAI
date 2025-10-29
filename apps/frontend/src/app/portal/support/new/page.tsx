'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Loader2,
  Lightbulb,
  ArrowRight,
  ClipboardCheck,
  MessageCircle,
  FileText,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ticketsService, type TicketCategory } from '@/lib/api/ticketsService';
import { authService } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { ChatBox } from '@/components/support/chatbox';
import styles from './support-page.module.css';
import { cn } from '@/lib/utils';
import { DynamicFormRenderer } from '@/components/tickets/dynamic-form-renderer';
import { TicketFormService } from '@/lib/api/ticketFormService';
import type { TicketFormDefinition, FormFieldValue } from '@/types/ticket-form.types';

interface AIAnalysisResult {
  summary?: string;
  suggestedCategory?: string;
  suggestedPriority?: string;
  suggestedTags?: string[];
}

export default function NewSupportTicketPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [categories, setCategories] = useState<TicketCategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Dynamic Form State
  const [formDefinition, setFormDefinition] = useState<TicketFormDefinition | null>(null);
  const [loadingFormDefinition, setLoadingFormDefinition] = useState(true);

  // Multi-step workflow
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<FormFieldValue>({});
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisResult>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // UI State
  const [activeTab, setActiveTab] = useState<'form' | 'chat' | 'both'>('form');
  const [chatVisible, setChatVisible] = useState(true);
  const [chatExpanded, setChatExpanded] = useState(false);

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

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const fetchedCategories = await ticketsService.getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast({
          title: 'Hata',
          description: 'Kategoriler yüklenirken bir hata oluştu',
          variant: 'destructive',
        });
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [toast]);

  // Fetch current user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setLoadingUser(true);
        const user = await authService.getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchCurrentUser();
  }, []);

  // Step 1: AI Analysis
  const handleAnalyze = async (values: FormFieldValue) => {
    setIsAnalyzing(true);

    try {
      // Call AI analysis endpoint
      const response = await ticketsService.analyzeTicket({
        subject: values.subject || values.title || '',
        description: values.description || values.problemDescription || '',
        categoryId: values.categoryId || undefined,
      });

      setAiAnalysis({
        summary: response.summary,
        suggestedCategory: response.suggestedCategory,
        suggestedPriority: response.suggestedPriority,
        suggestedTags: response.suggestedTags || [],
      });

      // Update form data with AI suggestions
      setFormData({
        ...values,
        // Apply AI suggestions if not already set
        categoryId: values.categoryId || response.suggestedCategory,
        priority: values.priority || response.suggestedPriority,
        tags: values.tags || response.suggestedTags,
      });

      setCurrentStep(2);
    } catch (error) {
      console.error('AI analysis error:', error);
      toast({
        title: 'Analiz Hatası',
        description: 'AI analizi sırasında bir hata oluştu. Lütfen tekrar deneyin.',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Step 2: Create Ticket
  const handleCreateTicket = async (values: FormFieldValue) => {
    if (!currentUser) {
      toast({
        title: 'Hata',
        description: 'Kullanıcı bilgisi alınamadı',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const ticketData = {
        ...values,
        userId: currentUser.id,
        formDefinitionId: formDefinition?.id,
      };

      const createdTicket = await ticketsService.createTicket(ticketData);

      toast({
        title: 'Başarılı!',
        description: 'Destek talebiniz başarıyla oluşturuldu.',
      });

      router.push(`/portal/support/${createdTicket.id}`);
    } catch (error) {
      console.error('Error creating ticket:', error);
      toast({
        title: 'Hata',
        description: 'Destek talebi oluşturulurken bir hata oluştu',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Back to Step 1
  const handleBackToEdit = () => {
    setCurrentStep(1);
  };

  // Loading states
  if (loadingFormDefinition || loadingCategories || loadingUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!formDefinition) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertTitle>Hata</AlertTitle>
          <AlertDescription>
            Form tanımı yüklenemedi. Lütfen daha sonra tekrar deneyin.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Yeni Destek Talebi</h1>
          <p className="text-muted-foreground mt-1">
            Sorunuzu detaylı açıklayın, size en kısa sürede yardımcı olalım
          </p>
        </div>
        <Link href="/portal/support">
          <Button variant="outline">Taleplerime Dön</Button>
        </Link>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-4">
        <div className="flex items-center">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full border-2',
              currentStep === 1
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-primary bg-background text-primary'
            )}
          >
            <FileText className="h-5 w-5" />
          </div>
          <span className="ml-2 font-medium">
            1. Bilgilerinizi Girin
          </span>
        </div>
        <ArrowRight className="h-5 w-5 text-muted-foreground" />
        <div className="flex items-center">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full border-2',
              currentStep === 2
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-muted bg-background text-muted-foreground'
            )}
          >
            <ClipboardCheck className="h-5 w-5" />
          </div>
          <span className="ml-2 font-medium text-muted-foreground">
            2. Önizleme ve Onay
          </span>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="form">
            <FileText className="mr-2 h-4 w-4" />
            Form
          </TabsTrigger>
          <TabsTrigger value="chat">
            <MessageCircle className="mr-2 h-4 w-4" />
            Chatbot
          </TabsTrigger>
          <TabsTrigger value="both">
            <Maximize2 className="mr-2 h-4 w-4" />
            İkisi Birden
          </TabsTrigger>
        </TabsList>

        {/* Form Only Tab */}
        <TabsContent value="form" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {currentStep === 1 ? 'Destek Talebi Bilgileri' : 'Önizleme ve Onay'}
              </CardTitle>
              <CardDescription>
                {currentStep === 1
                  ? 'Aşağıdaki formu doldurun. AI asistanımız sizin için en iyi çözümü bulmaya çalışacak.'
                  : 'Bilgilerinizi kontrol edin ve onaylayın'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentStep === 1 ? (
                <DynamicFormRenderer
                  formDefinition={formDefinition}
                  initialValues={formData}
                  onSubmit={handleAnalyze}
                  isSubmitting={isAnalyzing}
                  onCancel={() => router.push('/portal/support')}
                />
              ) : (
                <div className="space-y-6">
                  {/* AI Analysis Results */}
                  {aiAnalysis.summary && (
                    <Alert>
                      <Lightbulb className="h-4 w-4" />
                      <AlertTitle>AI Analiz Özeti</AlertTitle>
                      <AlertDescription>{aiAnalysis.summary}</AlertDescription>
                    </Alert>
                  )}

                  {/* Review Form */}
                  <DynamicFormRenderer
                    formDefinition={formDefinition}
                    initialValues={formData}
                    onSubmit={handleCreateTicket}
                    isSubmitting={isSubmitting}
                    onCancel={handleBackToEdit}
                  />

                  {/* Suggested Tags */}
                  {aiAnalysis.suggestedTags && aiAnalysis.suggestedTags.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">Önerilen Etiketler:</h3>
                      <div className="flex flex-wrap gap-2">
                        {aiAnalysis.suggestedTags.map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBackToEdit}
                      disabled={isSubmitting}
                    >
                      Geri Dön
                    </Button>
                    <Button
                      onClick={() => handleCreateTicket(formData)}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Oluşturuluyor...
                        </>
                      ) : (
                        'Talebi Oluştur'
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Chat Only Tab */}
        <TabsContent value="chat" className="mt-6">
          <Card className="h-[calc(100vh-300px)]">
            <CardHeader>
              <CardTitle>AI Destek Chatbot</CardTitle>
              <CardDescription>
                Sorularınızı chatbot&apos;a sorun, anında yanıt alın
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[calc(100%-80px)]">
              <ChatBox className="h-full" />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Both Tab (Side by Side) */}
        <TabsContent value="both" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>
                    {currentStep === 1 ? 'Destek Talebi Bilgileri' : 'Önizleme ve Onay'}
                  </CardTitle>
                  <CardDescription>
                    {currentStep === 1
                      ? 'Formu doldurun'
                      : 'Bilgilerinizi kontrol edin'}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                {currentStep === 1 ? (
                  <DynamicFormRenderer
                    formDefinition={formDefinition}
                    initialValues={formData}
                    onSubmit={handleAnalyze}
                    isSubmitting={isAnalyzing}
                    onCancel={() => router.push('/portal/support')}
                  />
                ) : (
                  <div className="space-y-6">
                    {/* AI Analysis */}
                    {aiAnalysis.summary && (
                      <Alert>
                        <Lightbulb className="h-4 w-4" />
                        <AlertTitle>AI Analiz Özeti</AlertTitle>
                        <AlertDescription>{aiAnalysis.summary}</AlertDescription>
                      </Alert>
                    )}

                    <DynamicFormRenderer
                      formDefinition={formDefinition}
                      initialValues={formData}
                      onSubmit={handleCreateTicket}
                      isSubmitting={isSubmitting}
                      onCancel={handleBackToEdit}
                    />

                    {aiAnalysis.suggestedTags && aiAnalysis.suggestedTags.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium mb-2">Önerilen Etiketler:</h3>
                        <div className="flex flex-wrap gap-2">
                          {aiAnalysis.suggestedTags.map((tag, index) => (
                            <Badge key={index} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Chat Section */}
            <Card className={cn(chatVisible ? 'block' : 'hidden', 'relative')}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>AI Destek Chatbot</CardTitle>
                  <CardDescription>Anında yanıt alın</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setChatExpanded(!chatExpanded)}
                  >
                    {chatExpanded ? (
                      <Minimize2 className="h-4 w-4" />
                    ) : (
                      <Maximize2 className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setChatVisible(false)}
                  >
                    {chatVisible ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className={cn(chatExpanded ? 'h-[800px]' : 'h-[600px]')}>
                <ChatBox className="h-full" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
