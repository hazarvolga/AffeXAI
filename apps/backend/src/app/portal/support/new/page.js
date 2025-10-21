"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NewSupportTicketPage;
const react_1 = __importDefault(require("react"));
const react_dom_1 = require("react-dom");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const label_1 = require("@/components/ui/label");
const select_1 = require("@/components/ui/select");
const textarea_1 = require("@/components/ui/textarea");
const lucide_react_1 = require("lucide-react");
const support_data_1 = require("@/lib/support-data");
const actions_1 = require("./actions");
const alert_1 = require("@/components/ui/alert");
const renderCategoryOptions = (categories, parentId = null, level = 0) => {
    const options = [];
    const children = categories.filter(c => c.parentId === parentId);
    for (const category of children) {
        options.push(<select_1.SelectItem key={category.id} value={category.id} style={{ paddingLeft: `${level * 1.5 + 1}rem` }}>
        {category.name}
      </select_1.SelectItem>);
        if (categories.some(c => c.parentId === category.id)) {
            options.push(...renderCategoryOptions(categories, category.id, level + 1));
        }
    }
    return options;
};
function SubmitButton() {
    const { pending } = (0, react_dom_1.useFormStatus)();
    return (<button_1.Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (<>
          <lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/> Analiz Ediliyor...
        </>) : (<>
          <lucide_react_1.Lightbulb className="mr-2 h-4 w-4"/> Analiz Et ve Devam Et
        </>)}
    </button_1.Button>);
}
function NewSupportTicketPage() {
    const initialState = {
        step: 1,
        message: '',
    };
    const [state, formAction] = (0, react_dom_1.useFormState)(actions_1.analyzeSupportTicket, initialState);
    return (<div className="flex-1 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Yeni Destek Talebi</h2>
          <p className="text-muted-foreground">
            Sorunuzu veya sorununuzu bize bildirin, ekibimiz size yardımcı
            olsun.
          </p>
        </div>
      </div>

      <card_1.Card>
        {state.step === 1 && (<form action={formAction}>
            <card_1.CardHeader>
              <card_1.CardTitle>1. Adım: Sorununuzu Anlatın</card_1.CardTitle>
              <card_1.CardDescription>
                Lütfen sorununuzu olabildiğince ayrıntılı açıklayın. AI,
                destek ekibimiz için bir özet oluşturacaktır.
              </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label_1.Label htmlFor="category">Kategori</label_1.Label>
                  <select_1.Select name="category" required>
                    <select_1.SelectTrigger id="category">
                      <select_1.SelectValue placeholder="Bir kategori seçin"/>
                    </select_1.SelectTrigger>
                    <select_1.SelectContent>
                      {renderCategoryOptions(support_data_1.supportCategories)}
                    </select_1.SelectContent>
                  </select_1.Select>
                </div>
              </div>
              <div className="space-y-2">
                <label_1.Label htmlFor="problemDescription">Açıklama</label_1.Label>
                <textarea_1.Textarea id="problemDescription" name="problemDescription" placeholder="Yaşadığınız sorunu detaylı bir şekilde anlatın... Hangi işletim sistemini kullanıyorsunuz, Allplan sürümünüz nedir, hangi adımları izlediniz ve neyle karşılaştınız?" className="min-h-[250px]" required minLength={50}/>
              </div>
            </card_1.CardContent>
            <card_1.CardFooter className="flex flex-col items-end gap-4">
              {state.message && (<alert_1.Alert variant="destructive" className="w-full">
                  <alert_1.AlertTitle>Hata</alert_1.AlertTitle>
                  <alert_1.AlertDescription>{state.message}</alert_1.AlertDescription>
                </alert_1.Alert>)}
              <SubmitButton />
            </card_1.CardFooter>
          </form>)}

        {state.step === 2 && state.data && (<div>
            <card_1.CardHeader>
              <card_1.CardTitle>2. Adım: AI Analizi ve Onay</card_1.CardTitle>
              <card_1.CardDescription>
                Yapay zeka sorununuzu analiz etti. Devam etmeden önce lütfen
                aşağıdaki bilgileri inceleyin.
              </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent className="space-y-6">
              <alert_1.Alert variant="default" className="bg-blue-50 border-blue-200">
                <lucide_react_1.Lightbulb className="h-4 w-4 !text-blue-600"/>
                <alert_1.AlertTitle className="text-blue-800">
                  AI Çözüm Önerisi
                </alert_1.AlertTitle>
                <alert_1.AlertDescription className="text-blue-700">
                  {state.data.suggestion}
                </alert_1.AlertDescription>
              </alert_1.Alert>

              <card_1.Card className="bg-secondary/50">
                <card_1.CardHeader>
                  <card_1.CardTitle className="text-lg">
                    Destek Ekibi İçin Oluşturulan Özet
                  </card_1.CardTitle>
                </card_1.CardHeader>
                <card_1.CardContent className="space-y-4">
                  <div>
                    <label_1.Label className="font-semibold">Problem Özeti</label_1.Label>
                    <p className="text-sm text-muted-foreground">
                      {state.data.summary}
                    </p>
                  </div>
                  <div>
                    <label_1.Label className="font-semibold">AI Tarafından Önerilen Öncelik</label_1.Label>
                     <p className="text-sm font-semibold text-primary">
                      {state.data.priority}
                    </p>
                  </div>
                </card_1.CardContent>
              </card_1.Card>
            </card_1.CardContent>
            <card_1.CardFooter className="flex justify-end gap-2">
                <form action={formAction}>
                    {/* Hidden fields to pass data to the next step */}
                    <input type="hidden" name="problemDescription" value={state.originalInput?.problemDescription}/>
                    <input type="hidden" name="category" value={state.originalInput?.category}/>
                    <input type="hidden" name="summary" value={state.data.summary}/>
                    <input type="hidden" name="priority" value={state.data.priority}/>
                    <button_1.Button variant="outline" type="submit" name="action" value="back">
                        Geri Dön ve Düzenle
                    </button_1.Button>
                    <button_1.Button type="submit" name="action" value="create_ticket">
                        <lucide_react_1.ClipboardCheck className="mr-2 h-4 w-4"/> Yine de Destek Talebi Oluştur
                    </button_1.Button>
                </form>
            </card_1.CardFooter>
          </div>)}
      </card_1.Card>
    </div>);
}
//# sourceMappingURL=page.js.map