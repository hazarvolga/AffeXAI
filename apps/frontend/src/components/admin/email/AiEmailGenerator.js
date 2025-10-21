"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AiEmailGenerator;
const react_1 = require("react");
const dialog_1 = require("@/components/ui/dialog");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const textarea_1 = require("@/components/ui/textarea");
const select_1 = require("@/components/ui/select");
const alert_1 = require("@/components/ui/alert");
const progress_1 = require("@/components/ui/progress");
const lucide_react_1 = require("lucide-react");
const use_toast_1 = require("@/hooks/use-toast");
const aiService_1 = __importDefault(require("@/lib/api/aiService"));
const TONES = [
    { value: 'professional', label: 'Profesyonel' },
    { value: 'friendly', label: 'Samimi' },
    { value: 'formal', label: 'Resmi' },
    { value: 'casual', label: 'Gündelik' },
    { value: 'enthusiastic', label: 'Heyecanlı' },
    { value: 'informative', label: 'Bilgilendirici' },
];
function AiEmailGenerator({ open, onOpenChange, onGenerated, defaultCampaignName = '', }) {
    const { toast } = (0, use_toast_1.useToast)();
    const [isGenerating, setIsGenerating] = (0, react_1.useState)(false);
    const [progress, setProgress] = (0, react_1.useState)(0);
    const [generatingStep, setGeneratingStep] = (0, react_1.useState)('');
    const [campaignName, setCampaignName] = (0, react_1.useState)(defaultCampaignName);
    const [product, setProduct] = (0, react_1.useState)('');
    const [targetAudience, setTargetAudience] = (0, react_1.useState)('');
    const [tone, setTone] = (0, react_1.useState)('professional');
    const [keywords, setKeywords] = (0, react_1.useState)('');
    const [errors, setErrors] = (0, react_1.useState)({});
    // Update campaign name when prop changes
    (0, react_1.useEffect)(() => {
        if (defaultCampaignName) {
            setCampaignName(defaultCampaignName);
        }
    }, [defaultCampaignName]);
    // Validate form
    const validateForm = () => {
        const newErrors = {};
        if (!campaignName.trim()) {
            newErrors.campaignName = 'Kampanya adı zorunludur';
        }
        else if (campaignName.trim().length < 3) {
            newErrors.campaignName = 'Kampanya adı en az 3 karakter olmalıdır';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleGenerate = async () => {
        // Validate form
        if (!validateForm()) {
            return;
        }
        setIsGenerating(true);
        setProgress(0);
        setGeneratingStep('Hazırlanıyor...');
        try {
            const keywordsArray = keywords
                .split(',')
                .map(k => k.trim())
                .filter(k => k.length > 0);
            // Simulate progress
            setProgress(20);
            setGeneratingStep('AI modeline bağlanılıyor...');
            await new Promise(resolve => setTimeout(resolve, 300));
            setProgress(40);
            setGeneratingStep('Konu satırı oluşturuluyor...');
            const result = await aiService_1.default.generateEmailBoth({
                campaignName: campaignName.trim(),
                product: product.trim() || undefined,
                targetAudience: targetAudience.trim() || undefined,
                tone: tone || undefined,
                keywords: keywordsArray.length > 0 ? keywordsArray : undefined,
            });
            setProgress(80);
            setGeneratingStep('E-posta içeriği hazırlanıyor...');
            await new Promise(resolve => setTimeout(resolve, 300));
            setProgress(100);
            setGeneratingStep('Tamamlandı!');
            // Call the callback with generated content
            onGenerated(result.subject, result.bodyHtml, result.subjectAlternatives);
            // Show success message
            toast({
                title: '✨ Başarılı!',
                description: 'AI ile e-posta içeriği oluşturuldu. Alternatif konu satırlarını görmek için konu alanının altına bakın.',
            });
            // Close dialog
            onOpenChange(false);
            // Reset form
            setCampaignName('');
            setProduct('');
            setTargetAudience('');
            setTone('professional');
            setKeywords('');
            setProgress(0);
            setGeneratingStep('');
            setErrors({});
        }
        catch (error) {
            console.error('AI generation error:', error);
            let errorMessage = 'AI ile içerik oluşturulurken bir hata oluştu';
            let errorTitle = 'Hata';
            if (error?.message?.includes('API key') || error?.message?.includes('not configured')) {
                errorTitle = 'AI Ayarları Eksik';
                errorMessage = 'AI ayarları yapılmamış. Lütfen önce Ayarlar > AI Ayarları bölümünden OpenAI API anahtarınızı ekleyin.';
            }
            else if (error?.message?.includes('rate limit') || error?.message?.includes('429')) {
                errorTitle = 'API Limiti';
                errorMessage = 'API kullanım limitine ulaşıldı. Lütfen birkaç dakika bekleyip tekrar deneyin veya OpenAI hesabınıza kredi ekleyin.';
            }
            else if (error?.message?.includes('network') || error?.message?.includes('fetch')) {
                errorTitle = 'Bağlantı Hatası';
                errorMessage = 'Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.';
            }
            else if (error?.message) {
                errorMessage = error.message;
            }
            toast({
                title: errorTitle,
                description: errorMessage,
                variant: 'destructive',
            });
        }
        finally {
            setIsGenerating(false);
            setProgress(0);
            setGeneratingStep('');
        }
    };
    return (<dialog_1.Dialog open={open} onOpenChange={onOpenChange}>
      <dialog_1.DialogContent className="sm:max-w-[600px]">
        <dialog_1.DialogHeader>
          <dialog_1.DialogTitle className="flex items-center gap-2">
            <lucide_react_1.Wand2 className="h-5 w-5 text-primary"/>
            AI ile E-posta Oluştur
          </dialog_1.DialogTitle>
          <dialog_1.DialogDescription>
            Kampanya bilgilerinizi girin, AI sizin için profesyonel bir e-posta oluştursun.
          </dialog_1.DialogDescription>
        </dialog_1.DialogHeader>

        {isGenerating && (<div className="space-y-2 px-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{generatingStep}</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <progress_1.Progress value={progress} className="h-2"/>
          </div>)}

        {!isGenerating && (<alert_1.Alert className="mx-6">
            <lucide_react_1.Info className="h-4 w-4"/>
            <alert_1.AlertDescription>
              AI, kampanya bilgilerinize göre özelleştirilmiş e-posta içeriği oluşturacak. 
              Daha detaylı bilgi verirseniz daha iyi sonuçlar alırsınız.
            </alert_1.AlertDescription>
          </alert_1.Alert>)}

        <div className="grid gap-4 py-4 px-6">
          <div className="grid gap-2">
            <label_1.Label htmlFor="ai-campaign-name">
              Kampanya Adı <span className="text-destructive">*</span>
            </label_1.Label>
            <input_1.Input id="ai-campaign-name" placeholder="Örn: Sonbahar İndirimleri 2024" value={campaignName} onChange={(e) => {
            setCampaignName(e.target.value);
            if (errors.campaignName) {
                setErrors({ ...errors, campaignName: undefined });
            }
        }} disabled={isGenerating} className={errors.campaignName ? 'border-destructive' : ''}/>
            {errors.campaignName && (<p className="text-xs text-destructive flex items-center gap-1">
                <lucide_react_1.AlertCircle className="h-3 w-3"/>
                {errors.campaignName}
              </p>)}
          </div>

          <div className="grid gap-2">
            <label_1.Label htmlFor="ai-product">Ürün/Hizmet (Opsiyonel)</label_1.Label>
            <input_1.Input id="ai-product" placeholder="Örn: Alüminyum Doğramalar" value={product} onChange={(e) => setProduct(e.target.value)} disabled={isGenerating}/>
          </div>

          <div className="grid gap-2">
            <label_1.Label htmlFor="ai-audience">Hedef Kitle (Opsiyonel)</label_1.Label>
            <input_1.Input id="ai-audience" placeholder="Örn: Müteahhitler ve inşaat firmaları" value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} disabled={isGenerating}/>
          </div>

          <div className="grid gap-2">
            <label_1.Label htmlFor="ai-tone">Ton</label_1.Label>
            <select_1.Select value={tone} onValueChange={setTone} disabled={isGenerating}>
              <select_1.SelectTrigger id="ai-tone">
                <select_1.SelectValue />
              </select_1.SelectTrigger>
              <select_1.SelectContent>
                {TONES.map((toneOption) => (<select_1.SelectItem key={toneOption.value} value={toneOption.value}>
                    {toneOption.label}
                  </select_1.SelectItem>))}
              </select_1.SelectContent>
            </select_1.Select>
          </div>

          <div className="grid gap-2">
            <label_1.Label htmlFor="ai-keywords">Anahtar Kelimeler (Opsiyonel)</label_1.Label>
            <textarea_1.Textarea id="ai-keywords" placeholder="Virgülle ayırarak girin: kalite, dayanıklılık, uygun fiyat" value={keywords} onChange={(e) => setKeywords(e.target.value)} disabled={isGenerating} rows={2}/>
            <p className="text-xs text-muted-foreground">
              İçerikte vurgulanmasını istediğiniz kelimeleri virgülle ayırarak girin
            </p>
          </div>
        </div>

        <dialog_1.DialogFooter className="px-6">
          <button_1.Button variant="outline" onClick={() => {
            onOpenChange(false);
            setErrors({});
        }} disabled={isGenerating}>
            İptal
          </button_1.Button>
          <button_1.Button onClick={handleGenerate} disabled={isGenerating || !campaignName.trim()}>
            {isGenerating ? (<>
                <lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                Oluşturuluyor...
              </>) : (<>
                <lucide_react_1.Sparkles className="mr-2 h-4 w-4"/>
                Oluştur
              </>)}
          </button_1.Button>
        </dialog_1.DialogFooter>
      </dialog_1.DialogContent>
    </dialog_1.Dialog>);
}
//# sourceMappingURL=AiEmailGenerator.js.map