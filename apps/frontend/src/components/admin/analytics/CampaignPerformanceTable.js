"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CampaignPerformanceTable;
const table_1 = require("@/components/ui/table");
const badge_1 = require("@/components/ui/badge");
const lucide_react_1 = require("lucide-react");
function CampaignPerformanceTable({ campaigns, showAllColumns = false }) {
    const formatPercentage = (num) => {
        return `${num.toFixed(2)}%`;
    };
    const formatCurrency = (num) => {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY',
        }).format(num);
    };
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };
    const getPerformanceBadge = (score) => {
        if (score >= 80) {
            return (<badge_1.Badge variant="default" className="bg-green-500">
          <lucide_react_1.Trophy className="w-3 h-3 mr-1"/>
          Mükemmel
        </badge_1.Badge>);
        }
        else if (score >= 60) {
            return (<badge_1.Badge variant="default" className="bg-blue-500">
          <lucide_react_1.TrendingUp className="w-3 h-3 mr-1"/>
          İyi
        </badge_1.Badge>);
        }
        else {
            return (<badge_1.Badge variant="secondary">
          <lucide_react_1.TrendingDown className="w-3 h-3 mr-1"/>
          Ortalama
        </badge_1.Badge>);
        }
    };
    if (!campaigns || campaigns.length === 0) {
        return (<div className="text-center py-8">
        <p className="text-muted-foreground">Kampanya verisi bulunamadı</p>
      </div>);
    }
    return (<div className="rounded-md border">
      <table_1.Table>
        <table_1.TableHeader>
          <table_1.TableRow>
            <table_1.TableHead>Kampanya</table_1.TableHead>
            <table_1.TableHead>Gönderim</table_1.TableHead>
            <table_1.TableHead className="text-right">Açılma</table_1.TableHead>
            <table_1.TableHead className="text-right">Tıklama</table_1.TableHead>
            {showAllColumns && (<>
                <table_1.TableHead className="text-right">Dönüşüm</table_1.TableHead>
                <table_1.TableHead className="text-right">Gelir</table_1.TableHead>
              </>)}
            <table_1.TableHead className="text-right">Performans</table_1.TableHead>
          </table_1.TableRow>
        </table_1.TableHeader>
        <table_1.TableBody>
          {campaigns.map((campaign) => (<table_1.TableRow key={campaign.campaignId}>
              <table_1.TableCell className="font-medium">
                {campaign.campaignName}
              </table_1.TableCell>
              <table_1.TableCell>{formatDate(campaign.sentAt)}</table_1.TableCell>
              <table_1.TableCell className="text-right">
                {formatPercentage(campaign.openRate)}
              </table_1.TableCell>
              <table_1.TableCell className="text-right">
                {formatPercentage(campaign.clickRate)}
              </table_1.TableCell>
              {showAllColumns && (<>
                  <table_1.TableCell className="text-right">
                    {formatPercentage(campaign.conversionRate)}
                  </table_1.TableCell>
                  <table_1.TableCell className="text-right">
                    {formatCurrency(campaign.revenue)}
                  </table_1.TableCell>
                </>)}
              <table_1.TableCell className="text-right">
                {getPerformanceBadge(campaign.score)}
              </table_1.TableCell>
            </table_1.TableRow>))}
        </table_1.TableBody>
      </table_1.Table>
    </div>);
}
//# sourceMappingURL=CampaignPerformanceTable.js.map