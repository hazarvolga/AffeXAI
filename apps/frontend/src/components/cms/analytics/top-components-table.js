"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopComponentsTable = TopComponentsTable;
const card_1 = require("@/components/ui/card");
const table_1 = require("@/components/ui/table");
const badge_1 = require("@/components/ui/badge");
const lucide_react_1 = require("lucide-react");
function TopComponentsTable({ components, isLoading }) {
    if (isLoading) {
        return (<card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle>
            <div className="h-6 w-48 bg-muted animate-pulse rounded"/>
          </card_1.CardTitle>
          <card_1.CardDescription>
            <div className="h-4 w-64 bg-muted animate-pulse rounded mt-2"/>
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (<div key={i} className="h-12 bg-muted animate-pulse rounded"/>))}
          </div>
        </card_1.CardContent>
      </card_1.Card>);
    }
    const getInteractionRateColor = (rate) => {
        if (rate >= 75)
            return 'bg-green-500/10 text-green-600 dark:text-green-400';
        if (rate >= 50)
            return 'bg-blue-500/10 text-blue-600 dark:text-blue-400';
        if (rate >= 25)
            return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400';
        return 'bg-muted text-muted-foreground';
    };
    return (<card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle>En Çok Etkileşim Alan Component'ler</card_1.CardTitle>
        <card_1.CardDescription>
          Kullanıcı etkileşim oranına göre sıralanmış component'ler
        </card_1.CardDescription>
      </card_1.CardHeader>
      <card_1.CardContent>
        <table_1.Table>
          <table_1.TableHeader>
            <table_1.TableRow>
              <table_1.TableHead className="w-[50px]">Sıra</table_1.TableHead>
              <table_1.TableHead>Component ID</table_1.TableHead>
              <table_1.TableHead>Tip</table_1.TableHead>
              <table_1.TableHead>Sayfa</table_1.TableHead>
              <table_1.TableHead className="text-right">Etkileşim Oranı</table_1.TableHead>
              <table_1.TableHead className="text-right">Dönüşüm</table_1.TableHead>
            </table_1.TableRow>
          </table_1.TableHeader>
          <table_1.TableBody>
            {components.length === 0 ? (<table_1.TableRow>
                <table_1.TableCell colSpan={6} className="text-center text-muted-foreground">
                  Henüz veri yok
                </table_1.TableCell>
              </table_1.TableRow>) : (components.map((component, index) => (<table_1.TableRow key={component.componentId}>
                  <table_1.TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {index + 1}
                      {index < 3 && (<lucide_react_1.TrendingUp className="h-3 w-3 text-primary"/>)}
                    </div>
                  </table_1.TableCell>
                  <table_1.TableCell className="font-mono text-sm">
                    {component.componentId}
                  </table_1.TableCell>
                  <table_1.TableCell>
                    <badge_1.Badge variant="outline">{component.componentType}</badge_1.Badge>
                  </table_1.TableCell>
                  <table_1.TableCell className="max-w-xs truncate">
                    <a href={component.pageUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                      {component.pageUrl}
                      <lucide_react_1.ExternalLink className="h-3 w-3"/>
                    </a>
                  </table_1.TableCell>
                  <table_1.TableCell className="text-right">
                    <badge_1.Badge variant="secondary" className={getInteractionRateColor(component.interactionRate)}>
                      {component.interactionRate.toFixed(1)}%
                    </badge_1.Badge>
                  </table_1.TableCell>
                  <table_1.TableCell className="text-right font-medium">
                    {component.conversions}
                  </table_1.TableCell>
                </table_1.TableRow>)))}
          </table_1.TableBody>
        </table_1.Table>
      </card_1.CardContent>
    </card_1.Card>);
}
//# sourceMappingURL=top-components-table.js.map