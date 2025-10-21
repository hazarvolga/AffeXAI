"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignsStatsCard = CampaignsStatsCard;
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const react_1 = require("react");
const api_1 = require("@/lib/api");
function CampaignsStatsCard() {
    const [campaigns, setCampaigns] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        loadData();
    }, []);
    const loadData = async () => {
        try {
            setLoading(true);
            const data = await api_1.emailMarketingService.getCampaigns();
            setCampaigns(Array.isArray(data) ? data : []);
        }
        catch (error) {
            console.error('Error loading campaigns data:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const sentCampaigns = campaigns.filter(c => c.status === 'sent' || c.status === 'sending').length;
    const scheduledCampaigns = campaigns.filter(c => c.status === 'scheduled' || c.status === 'draft').length;
    if (loading) {
        return (<card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle className="flex items-center gap-2">
            <lucide_react_1.MailOpen className="h-5 w-5"/>
            Email Kampanyaları
          </card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent>
          <p className="text-muted-foreground">Yükleniyor...</p>
        </card_1.CardContent>
      </card_1.Card>);
    }
    return (<card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle className="flex items-center gap-2">
          <lucide_react_1.MailOpen className="h-5 w-5"/>
          Email Kampanyaları
        </card_1.CardTitle>
      </card_1.CardHeader>
      <card_1.CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold">{sentCampaigns}</p>
            <p className="text-xs text-muted-foreground">Gönderildi</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{scheduledCampaigns}</p>
            <p className="text-xs text-muted-foreground">Planlandı</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <p className="text-sm text-muted-foreground">
            Toplam {campaigns.length} kampanya
          </p>
        </div>
      </card_1.CardContent>
      <card_1.CardFooter>
        <button_1.Button asChild size="sm" variant="outline" className="w-full">
          <link_1.default href="/admin/email-marketing">
            Tümünü Gör <lucide_react_1.ArrowUpRight className="h-4 w-4 ml-2"/>
          </link_1.default>
        </button_1.Button>
      </card_1.CardFooter>
    </card_1.Card>);
}
//# sourceMappingURL=campaigns-stats-card.js.map