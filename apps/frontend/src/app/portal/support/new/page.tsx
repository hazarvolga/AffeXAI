
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
// import { analyzeSupportTicket, FormState } from './actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  ticketsService, 
  type TicketCategory, 
  TicketPriority,
  type TicketAnalysisRequest,
  type AiAnalysisResponse 
} from '@/lib/api/ticketsService';
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

// Removed SubmitButton component - will use inline button

export default function NewSupportTicketPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [categories, setCategories] = useState<TicketCategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');
  
  // Form data
  const [formData, setFormData] = useState({
    title: '',
    problemDescription: '',
    category: '',
    priority: 'medium'
  });
  
  // AI Analysis results
  const [analysisData, setAnalysisData] = useState<{
    summary: string;
    priority: string;
    suggestion: string;
  } | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

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

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsAnalyzing(true);

    try {
      const analysisRequest: TicketAnalysisRequest = {
        title: formData.title,
        description: formData.problemDescription,
        category: formData.category,
        priority: formData.priority,
      };

      const response: AiAnalysisResponse = await ticketsService.analyzeTicket(analysisRequest);
      
      if (!response.success) {
        if (!response.aiAvailable) {
          // AI not available - show warning and allow direct ticket creation
          setError(response.message || 'AI analizi kullanılamıyor. Doğrudan destek talebi oluşturabilirsiniz.');
          // Skip to step 2 with basic data
          setAnalysisData({
            summary: `${formData.title} - ${formData.problemDescription.substring(0, 100)}...`,
            priority: formData.priority,
            suggestion: 'AI analizi şu anda kullanılamıyor. Destek ekibimiz talebinizi inceleyecek ve size geri dönüş yapacaktır.',
          });
          setStep(2);
          return;
        } else {
          throw new Error(response.message || 'AI analizi başarısız oldu');
        }
      }

      if (response.data) {
        setAnalysisData({
          summary: response.data.summary,
          priority: response.data.suggestedPriority,
          suggestion: response.data.aiSuggestion,
        });
        setStep(2);
      }
    } catch (error: any) {
      setError('Analiz sırasında bir hata oluştu. Lütfen tekrar deneyin veya doğrudan destek talebi oluşturun.');
      console.error('AI Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCreateTicket = async () => {
    setError('');
    setIsCreating(true);

    try {
      const ticketData = {
        title: formData.title,
        description: formData.problemDescription,
        categoryId: formData.category,
        priority: formData.priority as TicketPriority,
        summary: analysisData?.summary || '',
      };

      const response = await ticketsService.createTicket(ticketData);
      
      toast({
        title: 'Başarılı! 🎉',
        description: 'Destek talebiniz başarıyla oluşturuldu. Yönlendiriliyorsunuz...',
      });
      
      setTimeout(() => {
        router.push(`/portal/support/${response.id}`);
      }, 1500);
    } catch (error: any) {
      setError('Talep oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleBack = () => {
    setStep(1);
    setAnalysisData(null);
    setError('');
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
        {step === 1 && (
          <form onSubmit={handleAnalyze}>
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
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori *</Label>
                  <Select 
                    name="category" 
                    required 
                    disabled={loadingCategories}
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
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
                  value={formData.problemDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, problemDescription: e.target.value }))}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="priority">Öncelik *</Label>
                  <Select 
                    name="priority" 
                    required
                    value={formData.priority}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
                  >
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
              {error && (
                <Alert variant="destructive" className="w-full">
                  <AlertTitle>Hata</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" disabled={isAnalyzing} className="w-full sm:w-auto">
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analiz Ediliyor...
                  </>
                ) : (
                  <>
                    <Lightbulb className="mr-2 h-4 w-4" /> Analiz Et ve Devam Et
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        )}

        {step === 2 && analysisData && (
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
                  {analysisData.suggestion}
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
                      {analysisData.summary}
                    </p>
                  </div>
                  <div>
                    <Label className="font-semibold">AI Tarafından Önerilen Öncelik</Label>
                     <p className="text-sm font-semibold text-primary">
                      {analysisData.priority}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleBack}>
                  Geri Dön ve Düzenle
                </Button>
                <Button onClick={handleCreateTicket} disabled={isCreating}>
                  {isCreating ? (
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
            </CardFooter>
          </div>
        )}
      </Card>
    </div>
  );
}
