"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AbTestCreator;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const textarea_1 = require("@/components/ui/textarea");
const select_1 = require("@/components/ui/select");
const switch_1 = require("@/components/ui/switch");
const badge_1 = require("@/components/ui/badge");
const tabs_1 = require("@/components/ui/tabs");
const dialog_1 = require("@/components/ui/dialog");
const alert_1 = require("@/components/ui/alert");
const lucide_react_1 = require("lucide-react");
const abTestService_1 = __importDefault(require("@/lib/api/abTestService"));
const use_toast_1 = require("@/hooks/use-toast");
function AbTestCreator({ campaignId, campaignName, open, onOpenChange, onTestCreated }) {
    const { toast } = (0, use_toast_1.useToast)();
    const [creating, setCreating] = (0, react_1.useState)(false);
    const [currentStep, setCurrentStep] = (0, react_1.useState)(1);
    // Test Configuration
    const [testType, setTestType] = (0, react_1.useState)('subject');
    const [winnerCriteria, setWinnerCriteria] = (0, react_1.useState)('open_rate');
    const [autoSelectWinner, setAutoSelectWinner] = (0, react_1.useState)(true);
    const [testDuration, setTestDuration] = (0, react_1.useState)(24);
    const [confidenceLevel, setConfidenceLevel] = (0, react_1.useState)(95);
    const [minSampleSize, setMinSampleSize] = (0, react_1.useState)(100);
    // Variants
    const [variants, setVariants] = (0, react_1.useState)([
        {
            label: 'A',
            subject: '',
            content: '',
            fromName: '',
            sendTimeOffset: 0,
            splitPercentage: 50,
        },
        {
            label: 'B',
            subject: '',
            content: '',
            fromName: '',
            sendTimeOffset: 0,
            splitPercentage: 50,
        },
    ]);
    const addVariant = () => {
        if (variants.length >= 5)
            return;
        const nextLabel = String.fromCharCode(65 + variants.length); // A, B, C, D, E
        const newSplitPercentage = Math.floor(100 / (variants.length + 1));
        // Redistribute percentages
        const updatedVariants = variants.map(v => ({
            ...v,
            splitPercentage: newSplitPercentage,
        }));
        setVariants([
            ...updatedVariants,
            {
                label: nextLabel,
                subject: '',
                content: '',
                fromName: '',
                sendTimeOffset: 0,
                splitPercentage: newSplitPercentage,
            },
        ]);
    };
    const removeVariant = (index) => {
        if (variants.length <= 2)
            return;
        const newVariants = variants.filter((_, i) => i !== index);
        const newSplitPercentage = Math.floor(100 / newVariants.length);
        setVariants(newVariants.map(v => ({
            ...v,
            splitPercentage: newSplitPercentage,
        })));
    };
    const updateVariant = (index, field, value) => {
        setVariants(prev => prev.map((variant, i) => i === index ? { ...variant, [field]: value } : variant));
    };
    const updateSplitPercentage = (index, percentage) => {
        const newVariants = [...variants];
        newVariants[index].splitPercentage = percentage;
        // Ensure total is 100%
        const total = newVariants.reduce((sum, v) => sum + v.splitPercentage, 0);
        if (total !== 100) {
            // Adjust other variants proportionally
            const remaining = 100 - percentage;
            const otherVariants = newVariants.filter((_, i) => i !== index);
            const otherTotal = otherVariants.reduce((sum, v) => sum + v.splitPercentage, 0);
            if (otherTotal > 0) {
                otherVariants.forEach((variant, i) => {
                    const otherIndex = newVariants.findIndex(v => v === variant);
                    newVariants[otherIndex].splitPercentage = Math.round((variant.splitPercentage / otherTotal) * remaining);
                });
            }
        }
        setVariants(newVariants);
    };
    const validateTest = () => {
        const errors = [];
        // Check split percentages
        const totalSplit = variants.reduce((sum, v) => sum + v.splitPercentage, 0);
        if (Math.abs(totalSplit - 100) > 0.01) {
            errors.push('Split yüzdeleri toplamı 100% olmalıdır');
        }
        // Check variant content based on test type
        if (testType === 'subject') {
            variants.forEach((variant, i) => {
                if (!variant.subject.trim()) {
                    errors.push(`Variant ${variant.label} için konu satırı gereklidir`);
                }
            });
        }
        else if (testType === 'content') {
            variants.forEach((variant, i) => {
                if (!variant.content.trim()) {
                    errors.push(`Variant ${variant.label} için içerik gereklidir`);
                }
            });
        }
        else if (testType === 'from_name') {
            variants.forEach((variant, i) => {
                if (!variant.fromName.trim()) {
                    errors.push(`Variant ${variant.label} için gönderen adı gereklidir`);
                }
            });
        }
        return errors;
    };
    const handleCreateTest = async () => {
        const errors = validateTest();
        if (errors.length > 0) {
            toast({
                title: 'Validation Hatası',
                description: errors.join(', '),
                variant: 'destructive',
            });
            return;
        }
        try {
            setCreating(true);
            const testData = {
                campaignId,
                testType,
                winnerCriteria,
                autoSelectWinner,
                testDuration,
                confidenceLevel,
                minSampleSize,
                variants: variants.map(v => ({
                    label: v.label,
                    subject: testType === 'subject' ? v.subject : undefined,
                    content: testType === 'content' ? v.content : undefined,
                    fromName: testType === 'from_name' ? v.fromName : undefined,
                    sendTimeOffset: testType === 'send_time' ? v.sendTimeOffset : undefined,
                    splitPercentage: v.splitPercentage,
                })),
            };
            await abTestService_1.default.createAbTest(testData);
            toast({
                title: 'A/B Test Oluşturuldu',
                description: 'A/B test başarıyla oluşturuldu ve test edilmeye hazır.',
            });
            onOpenChange(false);
            onTestCreated?.();
        }
        catch (error) {
            console.error('Error creating A/B test:', error);
            toast({
                title: 'Hata',
                description: 'A/B test oluşturulurken bir hata oluştu.',
                variant: 'destructive',
            });
        }
        finally {
            setCreating(false);
        }
    };
    const getTestTypeDescription = () => {
        switch (testType) {
            case 'subject':
                return 'Farklı konu satırlarını test edin ve hangisinin daha yüksek açılma oranı sağladığını görün.';
            case 'content':
                return 'Farklı email içeriklerini test edin ve hangisinin daha iyi performans gösterdiğini öğrenin.';
            case 'send_time':
                return 'Farklı gönderim zamanlarını test edin ve optimal zamanı bulun.';
            case 'from_name':
                return 'Farklı gönderen adlarını test edin ve hangisinin daha güvenilir göründüğünü öğrenin.';
            case 'combined':
                return 'Birden fazla elementi birlikte test edin (konu, içerik, gönderen vb.).';
            default:
                return '';
        }
    };
    return (<dialog_1.Dialog open={open} onOpenChange={onOpenChange}>
      <dialog_1.DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <dialog_1.DialogHeader>
          <dialog_1.DialogTitle className="flex items-center gap-2">
            <lucide_react_1.TestTube className="h-5 w-5"/>
            A/B Test Oluştur
          </dialog_1.DialogTitle>
          <dialog_1.DialogDescription>
            "{campaignName}" kampanyası için A/B test oluşturun
          </dialog_1.DialogDescription>
        </dialog_1.DialogHeader>

        <tabs_1.Tabs value={currentStep.toString()} onValueChange={(value) => setCurrentStep(parseInt(value))}>
          <tabs_1.TabsList className="grid w-full grid-cols-3">
            <tabs_1.TabsTrigger value="1">1. Test Türü</tabs_1.TabsTrigger>
            <tabs_1.TabsTrigger value="2">2. Varyantlar</tabs_1.TabsTrigger>
            <tabs_1.TabsTrigger value="3">3. Ayarlar</tabs_1.TabsTrigger>
          </tabs_1.TabsList>

          <tabs_1.TabsContent value="1" className="space-y-4">
            <card_1.Card>
              <card_1.CardHeader>
                <card_1.CardTitle className="flex items-center gap-2">
                  <lucide_react_1.Target className="h-4 w-4"/>
                  Test Türü Seçin
                </card_1.CardTitle>
                <card_1.CardDescription>
                  Hangi elementi test etmek istediğinizi seçin
                </card_1.CardDescription>
              </card_1.CardHeader>
              <card_1.CardContent className="space-y-4">
                <div className="space-y-2">
                  <label_1.Label>Test Türü</label_1.Label>
                  <select_1.Select value={testType} onValueChange={(value) => setTestType(value)}>
                    <select_1.SelectTrigger>
                      <select_1.SelectValue />
                    </select_1.SelectTrigger>
                    <select_1.SelectContent>
                      <select_1.SelectItem value="subject">Konu Satırı</select_1.SelectItem>
                      <select_1.SelectItem value="content">Email İçeriği</select_1.SelectItem>
                      <select_1.SelectItem value="send_time">Gönderim Zamanı</select_1.SelectItem>
                      <select_1.SelectItem value="from_name">Gönderen Adı</select_1.SelectItem>
                      <select_1.SelectItem value="combined">Kombine Test</select_1.SelectItem>
                    </select_1.SelectContent>
                  </select_1.Select>
                </div>

                <alert_1.Alert>
                  <lucide_react_1.AlertCircle className="h-4 w-4"/>
                  <alert_1.AlertDescription>
                    {getTestTypeDescription()}
                  </alert_1.AlertDescription>
                </alert_1.Alert>

                <div className="space-y-2">
                  <label_1.Label>Kazanan Kriterleri</label_1.Label>
                  <select_1.Select value={winnerCriteria} onValueChange={(value) => setWinnerCriteria(value)}>
                    <select_1.SelectTrigger>
                      <select_1.SelectValue />
                    </select_1.SelectTrigger>
                    <select_1.SelectContent>
                      <select_1.SelectItem value="open_rate">Açılma Oranı</select_1.SelectItem>
                      <select_1.SelectItem value="click_rate">Tıklama Oranı</select_1.SelectItem>
                      <select_1.SelectItem value="conversion_rate">Dönüşüm Oranı</select_1.SelectItem>
                      <select_1.SelectItem value="revenue">Gelir</select_1.SelectItem>
                    </select_1.SelectContent>
                  </select_1.Select>
                </div>
              </card_1.CardContent>
            </card_1.Card>
          </tabs_1.TabsContent>

          <tabs_1.TabsContent value="2" className="space-y-4">
            <card_1.Card>
              <card_1.CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <card_1.CardTitle className="flex items-center gap-2">
                      <lucide_react_1.Users className="h-4 w-4"/>
                      Test Varyantları
                    </card_1.CardTitle>
                    <card_1.CardDescription>
                      Test edilecek varyantları oluşturun (2-5 arası)
                    </card_1.CardDescription>
                  </div>
                  <button_1.Button variant="outline" size="sm" onClick={addVariant} disabled={variants.length >= 5}>
                    <lucide_react_1.Plus className="h-4 w-4 mr-2"/>
                    Varyant Ekle
                  </button_1.Button>
                </div>
              </card_1.CardHeader>
              <card_1.CardContent className="space-y-4">
                {variants.map((variant, index) => (<card_1.Card key={variant.label} className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <badge_1.Badge variant="outline">Varyant {variant.label}</badge_1.Badge>
                        <span className="text-sm text-muted-foreground">
                          {variant.splitPercentage}% trafik
                        </span>
                      </div>
                      {variants.length > 2 && (<button_1.Button variant="ghost" size="sm" onClick={() => removeVariant(index)}>
                          <lucide_react_1.Trash2 className="h-4 w-4"/>
                        </button_1.Button>)}
                    </div>

                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <label_1.Label>Trafik Yüzdesi</label_1.Label>
                        <input_1.Input type="number" min="1" max="100" value={variant.splitPercentage} onChange={(e) => updateSplitPercentage(index, parseInt(e.target.value) || 0)}/>
                      </div>

                      {testType === 'subject' && (<div className="space-y-2">
                          <label_1.Label>Konu Satırı</label_1.Label>
                          <input_1.Input value={variant.subject} onChange={(e) => updateVariant(index, 'subject', e.target.value)} placeholder="Email konu satırı"/>
                        </div>)}

                      {testType === 'content' && (<div className="space-y-2">
                          <label_1.Label>Email İçeriği</label_1.Label>
                          <textarea_1.Textarea value={variant.content} onChange={(e) => updateVariant(index, 'content', e.target.value)} placeholder="Email içeriği" rows={4}/>
                        </div>)}

                      {testType === 'from_name' && (<div className="space-y-2">
                          <label_1.Label>Gönderen Adı</label_1.Label>
                          <input_1.Input value={variant.fromName} onChange={(e) => updateVariant(index, 'fromName', e.target.value)} placeholder="Gönderen adı"/>
                        </div>)}

                      {testType === 'send_time' && (<div className="space-y-2">
                          <label_1.Label>Gönderim Zamanı Offset (dakika)</label_1.Label>
                          <input_1.Input type="number" value={variant.sendTimeOffset} onChange={(e) => updateVariant(index, 'sendTimeOffset', parseInt(e.target.value) || 0)} placeholder="0"/>
                        </div>)}
                    </div>
                  </card_1.Card>))}

                <div className="text-sm text-muted-foreground">
                  Toplam: {variants.reduce((sum, v) => sum + v.splitPercentage, 0)}%
                </div>
              </card_1.CardContent>
            </card_1.Card>
          </tabs_1.TabsContent>

          <tabs_1.TabsContent value="3" className="space-y-4">
            <card_1.Card>
              <card_1.CardHeader>
                <card_1.CardTitle className="flex items-center gap-2">
                  <lucide_react_1.Clock className="h-4 w-4"/>
                  Test Ayarları
                </card_1.CardTitle>
                <card_1.CardDescription>
                  Test süresini ve istatistiksel ayarları yapılandırın
                </card_1.CardDescription>
              </card_1.CardHeader>
              <card_1.CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label_1.Label>Test Süresi (saat)</label_1.Label>
                    <input_1.Input type="number" min="1" max="168" value={testDuration} onChange={(e) => setTestDuration(parseInt(e.target.value) || 24)}/>
                  </div>

                  <div className="space-y-2">
                    <label_1.Label>Güven Seviyesi (%)</label_1.Label>
                    <input_1.Input type="number" min="90" max="99.9" step="0.1" value={confidenceLevel} onChange={(e) => setConfidenceLevel(parseFloat(e.target.value) || 95)}/>
                  </div>
                </div>

                <div className="space-y-2">
                  <label_1.Label>Minimum Örnek Boyutu</label_1.Label>
                  <input_1.Input type="number" min="50" value={minSampleSize} onChange={(e) => setMinSampleSize(parseInt(e.target.value) || 100)}/>
                  <p className="text-xs text-muted-foreground">
                    Her varyant için minimum gönderim sayısı
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <switch_1.Switch id="auto-select" checked={autoSelectWinner} onCheckedChange={setAutoSelectWinner}/>
                  <label_1.Label htmlFor="auto-select">Otomatik kazanan seçimi</label_1.Label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Test süresi dolduğunda ve istatistiksel anlamlılık sağlandığında otomatik olarak kazanan seçilir
                </p>
              </card_1.CardContent>
            </card_1.Card>
          </tabs_1.TabsContent>
        </tabs_1.Tabs>

        <dialog_1.DialogFooter className="flex justify-between">
          <div className="flex gap-2">
            {currentStep > 1 && (<button_1.Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                Önceki
              </button_1.Button>)}
            {currentStep < 3 && (<button_1.Button onClick={() => setCurrentStep(currentStep + 1)}>
                Sonraki
              </button_1.Button>)}
          </div>
          
          <div className="flex gap-2">
            <button_1.Button variant="outline" onClick={() => onOpenChange(false)}>
              İptal
            </button_1.Button>
            {currentStep === 3 && (<button_1.Button onClick={handleCreateTest} disabled={creating}>
                <lucide_react_1.TestTube className="h-4 w-4 mr-2"/>
                {creating ? 'Oluşturuluyor...' : 'A/B Test Oluştur'}
              </button_1.Button>)}
          </div>
        </dialog_1.DialogFooter>
      </dialog_1.DialogContent>
    </dialog_1.Dialog>);
}
//# sourceMappingURL=AbTestCreator.js.map