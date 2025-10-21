"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionImpactLevel = void 0;
exports.default = ApprovalSettings;
const card_1 = require("@/components/ui/card");
const label_1 = require("@/components/ui/label");
const switch_1 = require("@/components/ui/switch");
const select_1 = require("@/components/ui/select");
const alert_1 = require("@/components/ui/alert");
const badge_1 = require("@/components/ui/badge");
const lucide_react_1 = require("lucide-react");
var ActionImpactLevel;
(function (ActionImpactLevel) {
    ActionImpactLevel["LOW"] = "low";
    ActionImpactLevel["MEDIUM"] = "medium";
    ActionImpactLevel["HIGH"] = "high";
    ActionImpactLevel["CRITICAL"] = "critical";
})(ActionImpactLevel || (exports.ActionImpactLevel = ActionImpactLevel = {}));
const impactLevelConfig = {
    [ActionImpactLevel.LOW]: {
        label: 'Düşük Etki',
        description: 'Otomatik onaylama - Düşük riskli işlemler (bildirimler, iç kayıtlar)',
        color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        icon: lucide_react_1.CheckCircle,
        requiredApprovals: 0,
        expirationTime: '-',
        examples: [
            'İç bildirim gönderme',
            'Aktivite kaydı oluşturma',
            'Dashboard verisi güncelleme',
        ],
    },
    [ActionImpactLevel.MEDIUM]: {
        label: 'Orta Etki',
        description: 'Tek onay gerekli - Standart işlemler (e-posta, içerik)',
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        icon: lucide_react_1.Shield,
        requiredApprovals: 1,
        expirationTime: '24 saat',
        examples: [
            'E-posta kampanyası gönderme',
            'CMS içeriği yayınlama',
            'Etkinlik yayınlama',
        ],
    },
    [ActionImpactLevel.HIGH]: {
        label: 'Yüksek Etki',
        description: 'Çift onay gerekli - Kritik işlemler (toplu işlemler, dış sistemler)',
        color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
        icon: lucide_react_1.AlertTriangle,
        requiredApprovals: 2,
        expirationTime: '4 saat',
        examples: [
            'Toplu e-posta gönderimi (>1000 alıcı)',
            'Webhook tetikleme',
            'Sertifika toplu gönderimi',
        ],
    },
    [ActionImpactLevel.CRITICAL]: {
        label: 'Kritik Etki',
        description: 'Üçlü onay gerekli - Çok kritik işlemler (veri silme, sistem değişiklikleri)',
        color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        icon: lucide_react_1.AlertTriangle,
        requiredApprovals: 3,
        expirationTime: '1 saat',
        examples: [
            'Toplu veri silme',
            'Sistem ayarı değişikliği',
            'Yüksek bütçeli kampanya',
        ],
    },
};
function ApprovalSettings({ requiresApproval, impactLevel, onRequiresApprovalChange, onImpactLevelChange, }) {
    const config = impactLevelConfig[impactLevel];
    const Icon = config.icon;
    return (<card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle className="flex items-center gap-2">
          <lucide_react_1.Shield className="h-5 w-5"/>
          Onay Ayarları
        </card_1.CardTitle>
        <card_1.CardDescription>
          Otomasyonun çalışması için onay gerektirip gerektirmediğini ayarlayın
        </card_1.CardDescription>
      </card_1.CardHeader>
      <card_1.CardContent className="space-y-6">
        {/* Requires Approval Toggle */}
        <div className="flex items-center justify-between space-x-2">
          <div className="space-y-0.5 flex-1">
            <label_1.Label htmlFor="requires-approval" className="text-base font-medium">
              Onay Gerektir
            </label_1.Label>
            <p className="text-sm text-muted-foreground">
              Bu otomasyon çalışmadan önce yetkili bir kullanıcının onayını al
            </p>
          </div>
          <switch_1.Switch id="requires-approval" checked={requiresApproval} onCheckedChange={onRequiresApprovalChange}/>
        </div>

        {requiresApproval && (<>
            <div className="space-y-3">
              <label_1.Label htmlFor="impact-level">Etki Seviyesi</label_1.Label>
              <select_1.Select value={impactLevel} onValueChange={(value) => onImpactLevelChange(value)}>
                <select_1.SelectTrigger id="impact-level">
                  <select_1.SelectValue placeholder="Etki seviyesi seçin"/>
                </select_1.SelectTrigger>
                <select_1.SelectContent>
                  {Object.entries(impactLevelConfig).map(([level, cfg]) => (<select_1.SelectItem key={level} value={level}>
                      <div className="flex items-center gap-2">
                        <cfg.icon className="h-4 w-4"/>
                        {cfg.label}
                      </div>
                    </select_1.SelectItem>))}
                </select_1.SelectContent>
              </select_1.Select>
              <p className="text-sm text-muted-foreground">
                {config.description}
              </p>
            </div>

            {/* Impact Level Details */}
            <alert_1.Alert>
              <Icon className="h-4 w-4"/>
              <alert_1.AlertDescription>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Seçilen Seviye:</span>
                    <badge_1.Badge className={config.color}>
                      {config.label}
                    </badge_1.Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <lucide_react_1.Users className="h-4 w-4 text-muted-foreground"/>
                      <div>
                        <p className="font-medium">Gerekli Onay</p>
                        <p className="text-muted-foreground">
                          {config.requiredApprovals === 0
                ? 'Otomatik'
                : `${config.requiredApprovals} kişi`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <lucide_react_1.Clock className="h-4 w-4 text-muted-foreground"/>
                      <div>
                        <p className="font-medium">Süre Aşımı</p>
                        <p className="text-muted-foreground">
                          {config.expirationTime}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium mb-2">Kullanım Örnekleri:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {config.examples.map((example, idx) => (<li key={idx}>{example}</li>))}
                    </ul>
                  </div>
                </div>
              </alert_1.AlertDescription>
            </alert_1.Alert>

            {/* Warning for Critical */}
            {impactLevel === ActionImpactLevel.CRITICAL && (<alert_1.Alert variant="destructive">
                <lucide_react_1.AlertTriangle className="h-4 w-4"/>
                <alert_1.AlertDescription>
                  <strong>Dikkat!</strong> Kritik seviye otomasyonlar 3 farklı yetkili
                  kullanıcının onayını gerektirir ve 1 saat içinde onaylanmazsa iptal olur.
                  Sadece gerçekten kritik işlemler için kullanın.
                </alert_1.AlertDescription>
              </alert_1.Alert>)}

            {/* Info for Low */}
            {impactLevel === ActionImpactLevel.LOW && (<alert_1.Alert>
                <lucide_react_1.CheckCircle className="h-4 w-4"/>
                <alert_1.AlertDescription>
                  Düşük etki seviyesinde "Onay Gerektir" açık olsa bile, otomasyon
                  otomatik olarak onaylanıp çalıştırılır. Bu ayar sadece kayıt tutma
                  amaçlıdır.
                </alert_1.AlertDescription>
              </alert_1.Alert>)}
          </>)}
      </card_1.CardContent>
    </card_1.Card>);
}
//# sourceMappingURL=ApprovalSettings.js.map