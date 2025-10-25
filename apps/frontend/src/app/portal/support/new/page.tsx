
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Send,
  Paperclip,
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
import { analyzeSupportTicket, FormState } from './actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ticketsService, type TicketCategory } from '@/lib/api/ticketsService';
import { authService } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { ChatBox } from '@/components/support/chatbox';
import styles from './support-page.module.css';
import { cn } from '@/lib/utils';

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
  const [activeTab, setActiveTab] = useState<'form' | 'chat' | 'both'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('support-active-tab') as 'form' | 'chat' | 'both') || 'form';
    }
    return 'form';
  });
  const [isChatVisible, setIsChatVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('support-chat-visible') === 'true';
    }
    return false;
  });
  const [isChatMinimized, setIsChatMinimized] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('support-chat-minimized') === 'true';
    }
    return false;
  });
  const [chatSession, setChatSession] = useState<any>(null);
  
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

  const handleChatSessionCreate = (session: any) => {
    setChatSession(session);
    console.log('Chat session created:', session);
  };

  const handleChatMessageSent = (message: any) => {
    console.log('Chat message sent:', message);
  };

  const toggleChatVisibility = () => {
    const newVisibility = !isChatVisible;
    setIsChatVisible(newVisibility);
    localStorage.setItem('support-chat-visible', newVisibility.toString());
    
    if (newVisibility) {
      setIsChatMinimized(false);
      localStorage.setItem('support-chat-minimized', 'false');
      if (activeTab === 'form') {
        setActiveTab('both');
        localStorage.setItem('support-active-tab', 'both');
      }
    } else {
      if (activeTab === 'both') {
        setActiveTab('form');
        localStorage.setItem('support-active-tab', 'form');
      }
    }
  };

  const toggleChatMinimized = () => {
    const newMinimized = !isChatMinimized;
    setIsChatMinimized(newMinimized);
    localStorage.setItem('support-chat-minimized', newMinimized.toString());
  };

  const handleTabChange = (value: string) => {
    const newTab = value as 'form' | 'chat' | 'both';
    setActiveTab(newTab);
    localStorage.setItem('support-active-tab', newTab);
    
    // Auto-show chat when switching to chat or both tabs
    if ((newTab === 'chat' || newTab === 'both') && !isChatVisible) {
      setIsChatVisible(true);
      localStorage.setItem('support-chat-visible', 'true');
    }
    
    // Auto-minimize chat when switching to form only
    if (newTab === 'form' && isChatVisible) {
      setIsChatVisible(false);
      localStorage.setItem('support-chat-visible', 'false');
    }
  };

  return (
    <div className="flex-1 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Destek Merkezi</h2>
          <p className="text-muted-foreground">
            Sorunuzu çözmek için destek talebi oluşturun veya AI asistanımızla sohbet edin.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={activeTab === 'both' ? "default" : "outline"}
            onClick={() => handleTabChange(activeTab === 'both' ? 'form' : 'both')}
            className="flex items-center space-x-2"
          >
            <MessageCircle className="h-4 w-4" />
            <span>{activeTab === 'both' ? 'Yan Yana Görünüm' : 'Form + Chat'}</span>
          </Button>
          <Button
            variant={isChatVisible ? "default" : "outline"}
            onClick={toggleChatVisibility}
            className="flex items-center space-x-2"
          >
            {isChatVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            <span>{isChatVisible ? 'Chat\'i Gizle' : 'AI Chat\'i Göster'}</span>
          </Button>
        </div>
      </div>

      {/* Support Options Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className={`w-full ${styles.mobileTabsGrid}`}>
          <TabsTrigger value="form" className={styles.tabTrigger}>
            <FileText className="h-4 w-4" />
            <span>Destek Formu</span>
          </TabsTrigger>
          <TabsTrigger value="chat" className={styles.tabTrigger}>
            <MessageCircle className="h-4 w-4" />
            <span>AI Sohbet</span>
            {chatSession && (
              <Badge variant="secondary" className="ml-2 hidden sm:inline-flex">
                Aktif
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="both" className={styles.tabTrigger}>
            <div className="flex items-center space-x-1">
              <FileText className="h-3 w-3" />
              <MessageCircle className="h-3 w-3" />
            </div>
            <span>Yan Yana</span>
          </TabsTrigger>
        </TabsList>

        {/* Form Tab Content */}
        <TabsContent value="form" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2">
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

            {/* Sidebar with Tips */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    <span>Hızlı Çözüm İpuçları</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Sık Karşılaşılan Sorunlar</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Giriş yapma sorunları</li>
                      <li>• Şifre sıfırlama</li>
                      <li>• Hesap ayarları</li>
                      <li>• Fatura ve ödeme</li>
                    </ul>
                  </div>
                  <div className="pt-2 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveTab('chat')}
                      className="w-full"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      AI Asistanla Sohbet Et
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Form Doldurma İpuçları</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm space-y-2">
                    <p><strong>Başlık:</strong> Sorununuzu özetleyen kısa bir başlık yazın</p>
                    <p><strong>Kategori:</strong> Sorununuza en uygun kategoriyi seçin</p>
                    <p><strong>Açıklama:</strong> Sorunu detaylı açıklayın, hangi adımları izlediğinizi belirtin</p>
                    <p><strong>Öncelik:</strong> Sorununuzun aciliyet durumunu belirleyin</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Chat Tab Content */}
        <TabsContent value="chat" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Chat Area */}
            <div className="lg:col-span-3">
              <Card className="h-[500px] md:h-[600px] lg:h-[700px] flex flex-col">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5" />
                    <span>AI Destek Asistanı</span>
                    {chatSession && (
                      <Badge variant="outline" className="ml-2">
                        Oturum: {chatSession.id.slice(0, 8)}...
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    Sorularınızı AI asistanımıza sorun. Gerektiğinde destek ekibine yönlendirebilir.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                  {/* Chat component will be embedded here */}
                  <div className="h-full relative">
                    <ChatBox
                      sessionType="support"
                      onSessionCreate={handleChatSessionCreate}
                      onMessageSent={handleChatMessageSent}
                      embedded={true}
                      showHeader={false}
                      height="100%"
                      className="w-full h-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chat Sidebar */}
            <div className="space-y-6 hidden lg:block">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sohbet Özellikleri</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Real-time yanıtlar</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Dosya yükleme</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">URL paylaşma</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sm">Destek ekibine yönlendirme</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Hızlı Başlangıç</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Örnek Sorular:</h4>
                    <div className="space-y-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-left h-auto p-2"
                        onClick={() => {
                          // This would send a predefined message to chat
                          console.log('Quick question clicked');
                        }}
                      >
                        <span className="text-xs">"Hesabıma giriş yapamıyorum"</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-left h-auto p-2"
                        onClick={() => {
                          console.log('Quick question clicked');
                        }}
                      >
                        <span className="text-xs">"Şifremi nasıl sıfırlarım?"</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-left h-auto p-2"
                        onClick={() => {
                          console.log('Quick question clicked');
                        }}
                      >
                        <span className="text-xs">"Fatura ile ilgili sorum var"</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Destek Seçenekleri</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTab('form')}
                    className="w-full"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Forma Geç
                  </Button>
                  <div className="text-xs text-muted-foreground">
                    Karmaşık sorunlar için detaylı form kullanabilirsiniz.
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Mobile Chat Info */}
          <div className="lg:hidden mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Sohbet Özellikleri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Real-time</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Dosya yükleme</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>URL paylaşma</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Destek yönlendirme</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Hızlı Geçiş</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab('form')}
                  className="w-full"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Forma Geç
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Side-by-Side Tab Content */}
        <TabsContent value="both" className="mt-6">
          <div className={styles.sideBySideContainer}>
            {/* Form Section */}
            <div className={styles.formSection}>
              <div className="mb-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Destek Talebi Formu</span>
                </h3>
                <p className="text-sm text-muted-foreground">
                  Detaylı destek talebi oluşturun
                </p>
              </div>
              
              <Card className="flex-1 overflow-auto">
                {state.step === 1 && (
                  <form action={formAction}>
                    <CardHeader>
                      <CardTitle className="text-base">Sorununuzu Anlatın</CardTitle>
                      <CardDescription className="text-sm">
                        Lütfen sorununuzu olabildiğince ayrıntılı açıklayın.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title-both">Başlık *</Label>
                        <Input
                          id="title-both"
                          name="title"
                          placeholder="Kısa ve öz bir başlık yazın"
                          required
                          minLength={10}
                          maxLength={100}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category-both">Kategori *</Label>
                        <Select name="category" required disabled={loadingCategories}>
                          <SelectTrigger id="category-both">
                            <SelectValue placeholder={loadingCategories ? "Yükleniyor..." : "Bir kategori seçin"} />
                          </SelectTrigger>
                          <SelectContent>
                            {renderCategoryOptions(categories)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="problemDescription-both">Açıklama *</Label>
                        <Textarea
                          id="problemDescription-both"
                          name="problemDescription"
                          placeholder="Yaşadığınız sorunu detaylı bir şekilde anlatın..."
                          className="min-h-[200px]"
                          required
                          minLength={50}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="priority-both">Öncelik *</Label>
                        <Select name="priority" defaultValue="medium" required>
                          <SelectTrigger id="priority-both">
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
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
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
                      <CardTitle className="text-base">AI Analizi ve Onay</CardTitle>
                      <CardDescription className="text-sm">
                        Yapay zeka sorununuzu analiz etti. Lütfen inceleyin.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Alert variant="default" className="bg-blue-50 border-blue-200">
                        <Lightbulb className="h-4 w-4 !text-blue-600" />
                        <AlertTitle className="text-blue-800 text-sm">
                          AI Çözüm Önerisi
                        </AlertTitle>
                        <AlertDescription className="text-blue-700 text-sm">
                          {state.data.suggestion}
                        </AlertDescription>
                      </Alert>

                      <Card className="bg-secondary/50">
                        <CardHeader>
                          <CardTitle className="text-base">
                            Destek Ekibi İçin Özet
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <Label className="font-semibold text-sm">Problem Özeti</Label>
                            <p className="text-xs text-muted-foreground">
                              {state.data.summary}
                            </p>
                          </div>
                          <div>
                            <Label className="font-semibold text-sm">Önerilen Öncelik</Label>
                             <p className="text-xs font-semibold text-primary">
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
                              <Button variant="outline" type="submit" name="action" value="back" size="sm">
                                  Geri Dön
                              </Button>
                              <Button type="submit" name="action" value="create_ticket" disabled={state.creating} size="sm">
                                  {state.creating ? (
                                    <>
                                      <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                                      Oluşturuluyor...
                                    </>
                                  ) : (
                                    <>
                                      <ClipboardCheck className="mr-2 h-3 w-3" />
                                      Talebi Oluştur
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

            {/* Chat Section */}
            <div className={styles.chatSection}>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5" />
                    <span>AI Destek Asistanı</span>
                    {chatSession && (
                      <Badge variant="outline" className="ml-2">
                        Aktif
                      </Badge>
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Anında yardım alın veya destek ekibiyle iletişime geçin
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleChatMinimized}
                    className="h-8 w-8"
                  >
                    {isChatMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <Card className={cn(
                styles.responsiveCard,
                "transition-all duration-300",
                isChatMinimized ? styles.chatMinimized : styles.chatExpanded
              )}>
                {isChatMinimized ? (
                  <CardContent className="flex items-center justify-center h-full">
                    <Button
                      variant="ghost"
                      onClick={toggleChatMinimized}
                      className="flex items-center space-x-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Chat'i Genişlet</span>
                    </Button>
                  </CardContent>
                ) : (
                  <CardContent className={styles.responsiveCardContent}>
                    <div className={styles.chatContainer}>
                      <ChatBox
                        sessionType="support"
                        onSessionCreate={handleChatSessionCreate}
                        onMessageSent={handleChatMessageSent}
                        embedded={true}
                        showHeader={false}
                        height="100%"
                        className="w-full h-full"
                      />
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
          </div>

          {/* Mobile Side-by-Side Info */}
          <div className="lg:hidden mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Mobil Kullanım İpucu</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Mobil cihazlarda daha iyi deneyim için "Destek Formu" veya "AI Sohbet" sekmelerini ayrı ayrı kullanmanızı öneririz.
                </p>
                <div className="flex space-x-2 mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTabChange('form')}
                  >
                    Forma Geç
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTabChange('chat')}
                  >
                    Chat'e Geç
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Floating Chat Toggle (Mobile) */}
      {(!isChatVisible || (activeTab !== 'chat' && activeTab !== 'both')) && (
        <div className={styles.floatingButton}>
          <Button
            onClick={() => {
              if (!isChatVisible) {
                toggleChatVisibility();
              }
              handleTabChange('chat');
            }}
            className="rounded-full h-14 w-14 shadow-lg"
            size="icon"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
          {chatSession && (
            <Badge variant="secondary" className="absolute -top-2 -left-2 text-xs">
              Aktif
            </Badge>
          )}
        </div>
      )}

      {/* Floating Chat Minimize Toggle (When chat is visible) */}
      {isChatVisible && activeTab === 'both' && (
        <div className={styles.floatingButtonLeft}>
          <Button
            onClick={toggleChatMinimized}
            variant="outline"
            className="rounded-full h-12 w-12 shadow-lg"
            size="icon"
          >
            {isChatMinimized ? <Maximize2 className="h-5 w-5" /> : <Minimize2 className="h-5 w-5" />}
          </Button>
        </div>
      )}
    </div>
  );
}
