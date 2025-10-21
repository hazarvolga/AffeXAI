"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentSelector = ComponentSelector;
const card_1 = require("@/components/ui/card");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const select_1 = require("@/components/ui/select");
const lucide_react_1 = require("lucide-react");
function ComponentSelector({ componentId, pageUrl, onComponentIdChange, onPageUrlChange, recentComponents = [], }) {
    return (<card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle>Component Seçimi</card_1.CardTitle>
        <card_1.CardDescription>
          Heatmap görmek istediğiniz component'i seçin
        </card_1.CardDescription>
      </card_1.CardHeader>
      <card_1.CardContent className="space-y-4">
        {/* Component ID Input */}
        <div className="space-y-2">
          <label_1.Label htmlFor="component-id">Component ID</label_1.Label>
          <div className="relative">
            <lucide_react_1.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
            <input_1.Input id="component-id" value={componentId} onChange={(e) => onComponentIdChange(e.target.value)} placeholder="örn: hero-banner, cta-button-1" className="pl-9"/>
          </div>
        </div>

        {/* Page URL Input */}
        <div className="space-y-2">
          <label_1.Label htmlFor="page-url">Sayfa URL (Opsiyonel)</label_1.Label>
          <input_1.Input id="page-url" value={pageUrl} onChange={(e) => onPageUrlChange(e.target.value)} placeholder="örn: /products, /about"/>
        </div>

        {/* Recent Components */}
        {recentComponents.length > 0 && (<div className="space-y-2">
            <label_1.Label>Son Kullanılan Component'ler</label_1.Label>
            <select_1.Select value={componentId} onValueChange={(value) => {
                const component = recentComponents.find((c) => c.id === value);
                if (component) {
                    onComponentIdChange(component.id);
                    onPageUrlChange(component.url);
                }
            }}>
              <select_1.SelectTrigger>
                <select_1.SelectValue placeholder="Listeden seçin"/>
              </select_1.SelectTrigger>
              <select_1.SelectContent>
                {recentComponents.map((component) => (<select_1.SelectItem key={component.id} value={component.id}>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs">{component.id}</span>
                      <span className="text-xs text-muted-foreground">
                        ({component.type})
                      </span>
                    </div>
                  </select_1.SelectItem>))}
              </select_1.SelectContent>
            </select_1.Select>
          </div>)}

        {/* Info */}
        <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t">
          <p>💡 Component ID, tracking kodunuzda kullandığınız ID olmalıdır.</p>
          <p>
            📍 Sayfa URL'si belirtmezseniz, tüm sayfalardaki heatmap birleştirilir.
          </p>
        </div>
      </card_1.CardContent>
    </card_1.Card>);
}
//# sourceMappingURL=component-selector.js.map