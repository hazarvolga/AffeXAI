"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmsStatsCard = CmsStatsCard;
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const react_1 = require("react");
function CmsStatsCard() {
    const [stats, setStats] = (0, react_1.useState)({
        publishedPages: 0,
        draftPages: 0,
        totalPages: 0,
    });
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        loadData();
    }, []);
    const loadData = async () => {
        try {
            setLoading(true);
            // TODO: Replace with real API call when backend ready
            // const data = await cmsService.getStats();
            // setStats(data);
            // Mock data for now
            setStats({
                publishedPages: 24,
                draftPages: 8,
                totalPages: 32,
            });
        }
        catch (error) {
            console.error('Error loading CMS data:', error);
        }
        finally {
            setLoading(false);
        }
    };
    if (loading) {
        return (<card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle className="flex items-center gap-2">
            <lucide_react_1.FileText className="h-5 w-5"/>
            CMS İçerik
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
          <lucide_react_1.FileText className="h-5 w-5"/>
          CMS İçerik
        </card_1.CardTitle>
      </card_1.CardHeader>
      <card_1.CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold">{stats.publishedPages}</p>
            <p className="text-xs text-muted-foreground">Yayında</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{stats.draftPages}</p>
            <p className="text-xs text-muted-foreground">Taslak</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <p className="text-sm text-muted-foreground">
            Toplam {stats.totalPages} sayfa
          </p>
        </div>
      </card_1.CardContent>
      <card_1.CardFooter>
        <button_1.Button asChild size="sm" variant="outline" className="w-full">
          <link_1.default href="/admin/cms">
            Yönet <lucide_react_1.ArrowUpRight className="h-4 w-4 ml-2"/>
          </link_1.default>
        </button_1.Button>
      </card_1.CardFooter>
    </card_1.Card>);
}
//# sourceMappingURL=cms-stats-card.js.map