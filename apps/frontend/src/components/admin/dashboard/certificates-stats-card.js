"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificatesStatsCard = CertificatesStatsCard;
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const react_1 = require("react");
function CertificatesStatsCard() {
    const [stats, setStats] = (0, react_1.useState)({
        issued: 0,
        pending: 0,
        total: 0,
    });
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        loadData();
    }, []);
    const loadData = async () => {
        try {
            setLoading(true);
            // TODO: Replace with real API call when backend ready
            // const data = await certificatesService.getStats();
            // setStats(data);
            // Mock data for now
            setStats({
                issued: 45,
                pending: 12,
                total: 57,
            });
        }
        catch (error) {
            console.error('Error loading certificates data:', error);
        }
        finally {
            setLoading(false);
        }
    };
    if (loading) {
        return (<card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle className="flex items-center gap-2">
            <lucide_react_1.Award className="h-5 w-5"/>
            Sertifikalar
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
          <lucide_react_1.Award className="h-5 w-5"/>
          Sertifikalar
        </card_1.CardTitle>
      </card_1.CardHeader>
      <card_1.CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold">{stats.issued}</p>
            <p className="text-xs text-muted-foreground">Verildi</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{stats.pending}</p>
            <p className="text-xs text-muted-foreground">Beklemede</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <p className="text-sm text-muted-foreground">
            Toplam {stats.total} sertifika oluşturuldu
          </p>
        </div>
      </card_1.CardContent>
      <card_1.CardFooter>
        <button_1.Button asChild size="sm" variant="outline" className="w-full">
          <link_1.default href="/admin/certificates">
            Tümünü Gör <lucide_react_1.ArrowUpRight className="h-4 w-4 ml-2"/>
          </link_1.default>
        </button_1.Button>
      </card_1.CardFooter>
    </card_1.Card>);
}
//# sourceMappingURL=certificates-stats-card.js.map