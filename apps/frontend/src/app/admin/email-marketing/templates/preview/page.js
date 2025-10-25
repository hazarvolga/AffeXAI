"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EmailTemplatePreview;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const select_1 = require("@/components/ui/select");
const tabs_1 = require("@/components/ui/tabs");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
// Import all email templates
const welcome_1 = require("@/emails/welcome");
const password_reset_1 = require("@/emails/password-reset");
const order_confirmation_1 = require("@/emails/order-confirmation");
const abandoned_cart_1 = require("@/emails/abandoned-cart");
const monthly_newsletter_1 = require("@/emails/monthly-newsletter");
const invoice_1 = require("@/emails/invoice");
const shipping_updates_1 = require("@/emails/shipping-updates");
const security_alert_1 = require("@/emails/security-alert");
const templates = [
    { id: 'welcome', name: 'Hoş Geldin', component: welcome_1.WelcomeEmail, category: 'transactional' },
    { id: 'password-reset', name: 'Şifre Sıfırlama', component: password_reset_1.PasswordResetEmail, category: 'transactional' },
    { id: 'order-confirmation', name: 'Sipariş Onayı', component: order_confirmation_1.OrderConfirmationEmail, category: 'transactional' },
    { id: 'abandoned-cart', name: 'Terk Edilmiş Sepet', component: abandoned_cart_1.AbandonedCartEmail, category: 'marketing' },
    { id: 'newsletter', name: 'Aylık Bülten', component: monthly_newsletter_1.MonthlyNewsletterEmail, category: 'marketing' },
    { id: 'invoice', name: 'Fatura', component: invoice_1.InvoiceEmail, category: 'transactional' },
    { id: 'shipping', name: 'Kargo Güncelleme', component: shipping_updates_1.ShippingUpdatesEmail, category: 'transactional' },
    { id: 'security', name: 'Güvenlik Uyarısı', component: security_alert_1.SecurityAlertEmail, category: 'transactional' },
];
function EmailTemplatePreview() {
    const [selectedTemplate, setSelectedTemplate] = (0, react_1.useState)('welcome');
    const [userName, setUserName] = (0, react_1.useState)('Ahmet Yılmaz');
    const [category, setCategory] = (0, react_1.useState)('all');
    const filteredTemplates = templates.filter(t => category === 'all' || t.category === category);
    const currentTemplate = templates.find(t => t.id === selectedTemplate);
    const EmailComponent = currentTemplate?.component;
    return (<div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Email Template Önizleme</h1>
          <p className="text-muted-foreground">
            Tüm email template'lerinizi burada önizleyebilir ve test edebilirsiniz
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sol Panel - Template Listesi */}
        <div className="col-span-3">
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle>Template Seçimi</card_1.CardTitle>
              <card_1.CardDescription>Önizlemek için bir template seçin</card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent className="space-y-4">
              <div className="space-y-2">
                <label_1.Label>Kategori</label_1.Label>
                <select_1.Select value={category} onValueChange={setCategory}>
                  <select_1.SelectTrigger>
                    <select_1.SelectValue />
                  </select_1.SelectTrigger>
                  <select_1.SelectContent>
                    <select_1.SelectItem value="all">Tümü</select_1.SelectItem>
                    <select_1.SelectItem value="transactional">İşlemsel</select_1.SelectItem>
                    <select_1.SelectItem value="marketing">Pazarlama</select_1.SelectItem>
                  </select_1.SelectContent>
                </select_1.Select>
              </div>

              <div className="space-y-2">
                <label_1.Label>Template</label_1.Label>
                <div className="space-y-2">
                  {filteredTemplates.map((template) => (<button_1.Button key={template.id} variant={selectedTemplate === template.id ? 'default' : 'outline'} className="w-full justify-start" onClick={() => setSelectedTemplate(template.id)}>
                      {template.name}
                    </button_1.Button>))}
                </div>
              </div>

              <div className="space-y-2">
                <label_1.Label>Test Verileri</label_1.Label>
                <input_1.Input placeholder="Kullanıcı Adı" value={userName} onChange={(e) => setUserName(e.target.value)}/>
              </div>
            </card_1.CardContent>
          </card_1.Card>
        </div>

        {/* Sağ Panel - Template Önizleme */}
        <div className="col-span-9">
          <card_1.Card className="h-full">
            <card_1.CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <card_1.CardTitle>{currentTemplate?.name} Önizleme</card_1.CardTitle>
                  <card_1.CardDescription>
                    Site ayarlarınızdaki bilgiler otomatik olarak kullanılıyor
                  </card_1.CardDescription>
                </div>
                <button_1.Button variant="outline">Test Email Gönder</button_1.Button>
              </div>
            </card_1.CardHeader>
            <card_1.CardContent>
              <tabs_1.Tabs defaultValue="desktop" className="w-full">
                <tabs_1.TabsList className="grid w-full grid-cols-2">
                  <tabs_1.TabsTrigger value="desktop">Masaüstü</tabs_1.TabsTrigger>
                  <tabs_1.TabsTrigger value="mobile">Mobil</tabs_1.TabsTrigger>
                </tabs_1.TabsList>
                <tabs_1.TabsContent value="desktop" className="mt-6">
                  <div className="border rounded-lg bg-gray-50 p-8">
                    <div className="bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
                      {EmailComponent && (<div dangerouslySetInnerHTML={{
                __html: renderEmailToHtml(<EmailComponent userName={userName}/>)
            }}/>)}
                    </div>
                  </div>
                </tabs_1.TabsContent>
                <tabs_1.TabsContent value="mobile" className="mt-6">
                  <div className="border rounded-lg bg-gray-50 p-8">
                    <div className="bg-white rounded-lg shadow-lg max-w-sm mx-auto">
                      {EmailComponent && (<div dangerouslySetInnerHTML={{
                __html: renderEmailToHtml(<EmailComponent userName={userName}/>)
            }}/>)}
                    </div>
                  </div>
                </tabs_1.TabsContent>
              </tabs_1.Tabs>
            </card_1.CardContent>
          </card_1.Card>
        </div>
      </div>
    </div>);
}
// Helper function to render React Email component to HTML
function renderEmailToHtml(component) {
    // This is a simplified version - in production you'd use @react-email/render
    return '<div>Email Preview Loading...</div>';
}
//# sourceMappingURL=page.js.map