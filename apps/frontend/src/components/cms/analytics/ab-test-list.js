"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ABTestList = ABTestList;
const card_1 = require("@/components/ui/card");
const table_1 = require("@/components/ui/table");
const badge_1 = require("@/components/ui/badge");
const button_1 = require("@/components/ui/button");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const lucide_react_1 = require("lucide-react");
const STATUS_CONFIG = {
    draft: {
        label: 'Taslak',
        variant: 'secondary',
        color: 'text-gray-600',
    },
    running: {
        label: 'Çalışıyor',
        variant: 'default',
        color: 'text-green-600',
    },
    paused: {
        label: 'Duraklatıldı',
        variant: 'outline',
        color: 'text-yellow-600',
    },
    completed: {
        label: 'Tamamlandı',
        variant: 'outline',
        color: 'text-blue-600',
    },
};
function ABTestList({ tests, isLoading, onStart, onPause, onComplete, onEdit, onDelete, }) {
    if (isLoading) {
        return (<card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle>
            <div className="h-6 w-48 bg-muted animate-pulse rounded"/>
          </card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (<div key={i} className="h-16 bg-muted animate-pulse rounded"/>))}
          </div>
        </card_1.CardContent>
      </card_1.Card>);
    }
    const getWinnerVariant = (test) => {
        if (!test.winnerVariantId)
            return null;
        return test.variants.find((v) => v.id === test.winnerVariantId);
    };
    const getBestVariant = (test) => {
        return test.variants.reduce((best, current) => current.conversionRate > best.conversionRate ? current : best);
    };
    return (<card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle>A/B Testleri</card_1.CardTitle>
        <card_1.CardDescription>
          {tests.length} test · Aktif testlerinizi yönetin
        </card_1.CardDescription>
      </card_1.CardHeader>
      <card_1.CardContent>
        <table_1.Table>
          <table_1.TableHeader>
            <table_1.TableRow>
              <table_1.TableHead>Test Adı</table_1.TableHead>
              <table_1.TableHead>Component</table_1.TableHead>
              <table_1.TableHead>Durum</table_1.TableHead>
              <table_1.TableHead>Variant Sayısı</table_1.TableHead>
              <table_1.TableHead>En İyi Performans</table_1.TableHead>
              <table_1.TableHead>Güven Seviyesi</table_1.TableHead>
              <table_1.TableHead className="text-right">İşlemler</table_1.TableHead>
            </table_1.TableRow>
          </table_1.TableHeader>
          <table_1.TableBody>
            {tests.length === 0 ? (<table_1.TableRow>
                <table_1.TableCell colSpan={7} className="text-center text-muted-foreground">
                  Henüz A/B testi oluşturulmamış
                </table_1.TableCell>
              </table_1.TableRow>) : (tests.map((test) => {
            const statusConfig = STATUS_CONFIG[test.status];
            const winner = getWinnerVariant(test);
            const bestVariant = getBestVariant(test);
            return (<table_1.TableRow key={test.id}>
                    <table_1.TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{test.name}</span>
                        {test.description && (<span className="text-xs text-muted-foreground line-clamp-1">
                            {test.description}
                          </span>)}
                      </div>
                    </table_1.TableCell>
                    <table_1.TableCell>
                      <div className="flex flex-col">
                        <code className="text-xs font-mono">{test.componentId}</code>
                        <span className="text-xs text-muted-foreground">
                          {test.componentType}
                        </span>
                      </div>
                    </table_1.TableCell>
                    <table_1.TableCell>
                      <badge_1.Badge variant={statusConfig.variant} className={statusConfig.color}>
                        {statusConfig.label}
                      </badge_1.Badge>
                    </table_1.TableCell>
                    <table_1.TableCell>{test.variants.length} variant</table_1.TableCell>
                    <table_1.TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{bestVariant.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {bestVariant.conversionRate.toFixed(2)}% dönüşüm
                        </span>
                      </div>
                    </table_1.TableCell>
                    <table_1.TableCell>
                      {test.confidenceLevel ? (<div className="flex items-center gap-1">
                          <lucide_react_1.TrendingUp className="h-3 w-3 text-green-600"/>
                          <span className="font-medium">{test.confidenceLevel}%</span>
                        </div>) : (<span className="text-muted-foreground text-xs">-</span>)}
                    </table_1.TableCell>
                    <table_1.TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Quick Actions */}
                        {test.status === 'draft' && onStart && (<button_1.Button size="sm" variant="outline" onClick={() => onStart(test.id)}>
                            <lucide_react_1.Play className="h-3 w-3 mr-1"/>
                            Başlat
                          </button_1.Button>)}
                        {test.status === 'running' && onPause && (<button_1.Button size="sm" variant="outline" onClick={() => onPause(test.id)}>
                            <lucide_react_1.Pause className="h-3 w-3 mr-1"/>
                            Duraklat
                          </button_1.Button>)}
                        {test.status === 'running' && onComplete && test.confidenceLevel && test.confidenceLevel >= 95 && (<button_1.Button size="sm" variant="default" onClick={() => onComplete(test.id, bestVariant.id)}>
                            <lucide_react_1.CheckCircle className="h-3 w-3 mr-1"/>
                            Tamamla
                          </button_1.Button>)}

                        {/* More Menu */}
                        <dropdown_menu_1.DropdownMenu>
                          <dropdown_menu_1.DropdownMenuTrigger asChild>
                            <button_1.Button size="sm" variant="ghost">
                              <lucide_react_1.MoreVertical className="h-4 w-4"/>
                            </button_1.Button>
                          </dropdown_menu_1.DropdownMenuTrigger>
                          <dropdown_menu_1.DropdownMenuContent align="end">
                            {onEdit && (<dropdown_menu_1.DropdownMenuItem onClick={() => onEdit(test)}>
                                <lucide_react_1.Edit className="h-4 w-4 mr-2"/>
                                Düzenle
                              </dropdown_menu_1.DropdownMenuItem>)}
                            {onDelete && (<dropdown_menu_1.DropdownMenuItem onClick={() => onDelete(test.id)} className="text-destructive">
                                <lucide_react_1.Trash2 className="h-4 w-4 mr-2"/>
                                Sil
                              </dropdown_menu_1.DropdownMenuItem>)}
                          </dropdown_menu_1.DropdownMenuContent>
                        </dropdown_menu_1.DropdownMenu>
                      </div>
                    </table_1.TableCell>
                  </table_1.TableRow>);
        }))}
          </table_1.TableBody>
        </table_1.Table>
      </card_1.CardContent>
    </card_1.Card>);
}
//# sourceMappingURL=ab-test-list.js.map