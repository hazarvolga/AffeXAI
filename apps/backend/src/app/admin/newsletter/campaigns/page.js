"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CampaignsManagementPage;
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const campaign_performance_chart_1 = require("@/app/admin/newsletter/_components/campaign-performance-chart");
function CampaignsManagementPage() {
    return (<div className="space-y-8">
      <div className="flex items-center gap-4">
        <button_1.Button variant="outline" size="icon" asChild>
          <link_1.default href="/admin/newsletter">
            <lucide_react_1.ArrowLeft className="h-4 w-4"/>
          </link_1.default>
        </button_1.Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kampanyaları Yönet</h1>
          <p className="text-muted-foreground">Bülten kampanyalarınızı oluşturun, gönderin ve takip edin.</p>
        </div>
      </div>

      {/* Campaign Performance Chart */}
      <campaign_performance_chart_1.CampaignPerformanceChart />

      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle>Kampanya Yönetimi</card_1.CardTitle>
          <card_1.CardDescription>
            Bu sayfa henüz tamamlanmadı. Burada kampanyalarınızı oluşturacak, düzenleyecek ve yönetebileceksiniz.
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent className="flex flex-col items-center justify-center py-12 gap-4">
          <lucide_react_1.Send className="h-12 w-12 text-muted-foreground"/>
          <p className="text-center text-muted-foreground">
            Kampanya yönetimi sayfası geliştirme aşamasında. Yakında burada tüm kampanyalarınızı oluşturabilecek ve yönetebileceksiniz.
          </p>
          <button_1.Button asChild className="mt-4">
            <link_1.default href="/admin/newsletter/campaigns/new">
              <lucide_react_1.PlusCircle className="mr-2 h-4 w-4"/>
              Yeni Kampanya Oluştur
            </link_1.default>
          </button_1.Button>
        </card_1.CardContent>
      </card_1.Card>
    </div>);
}
//# sourceMappingURL=page.js.map