"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EventLogViewer;
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const table_1 = require("@/components/ui/table");
const select_1 = require("@/components/ui/select");
const input_1 = require("@/components/ui/input");
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
const integrationService_1 = require("@/lib/api/integrationService");
const use_toast_1 = require("@/hooks/use-toast");
const sourceLabels = {
    events: 'Etkinlikler',
    'email-marketing': 'E-posta Pazarlama',
    cms: 'CMS',
    certificates: 'Sertifikalar',
    media: 'Medya',
};
const sourceColors = {
    events: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'email-marketing': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    cms: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    certificates: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    media: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
};
function EventLogViewer() {
    const [events, setEvents] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [refreshing, setRefreshing] = (0, react_1.useState)(false);
    const [selectedSource, setSelectedSource] = (0, react_1.useState)('all');
    const [searchQuery, setSearchQuery] = (0, react_1.useState)('');
    const { toast } = (0, use_toast_1.useToast)();
    (0, react_1.useEffect)(() => {
        loadEvents();
    }, [selectedSource]);
    const loadEvents = async () => {
        try {
            setLoading(true);
            let data;
            if (selectedSource === 'all') {
                data = await integrationService_1.integrationService.getEvents(100);
            }
            else {
                data = await integrationService_1.integrationService.getEventsBySource(selectedSource, 100);
            }
            setEvents(data);
        }
        catch (error) {
            console.error('Failed to load events:', error);
            toast({
                title: 'Hata',
                description: 'Olaylar yüklenemedi',
                variant: 'destructive',
            });
        }
        finally {
            setLoading(false);
        }
    };
    const refreshEvents = async () => {
        try {
            setRefreshing(true);
            await loadEvents();
            toast({
                title: 'Başarılı',
                description: 'Olaylar güncellendi',
            });
        }
        catch (error) {
            // Error already handled in loadEvents
        }
        finally {
            setRefreshing(false);
        }
    };
    const filteredEvents = events?.filter(event => {
        if (!searchQuery)
            return true;
        const search = searchQuery.toLowerCase();
        return (event.eventType.toLowerCase().includes(search) ||
            event.source.toLowerCase().includes(search) ||
            JSON.stringify(event.payload).toLowerCase().includes(search));
    }) || [];
    const eventsWithAutomation = events?.filter(e => e.triggeredRules.length > 0) || [];
    return (<div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <card_1.Card>
          <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card_1.CardTitle className="text-sm font-medium">Toplam Olay</card_1.CardTitle>
            <lucide_react_1.Activity className="h-4 w-4 text-muted-foreground"/>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-2xl font-bold">{events?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Son 100 olay
            </p>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card>
          <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card_1.CardTitle className="text-sm font-medium">Otomasyon Tetikleyen</card_1.CardTitle>
            <lucide_react_1.Zap className="h-4 w-4 text-yellow-500"/>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-2xl font-bold">{eventsWithAutomation?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {(events?.length || 0) > 0
            ? `%${Math.round(((eventsWithAutomation?.length || 0) / (events?.length || 1)) * 100)} tetikleme oranı`
            : 'Veri yok'}
            </p>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card>
          <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card_1.CardTitle className="text-sm font-medium">Son Olay</card_1.CardTitle>
            <lucide_react_1.Clock className="h-4 w-4 text-muted-foreground"/>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-2xl font-bold">
              {(events?.length || 0) > 0 && events?.[0]
            ? new Date(events[0].createdAt).toLocaleTimeString('tr-TR', {
                hour: '2-digit',
                minute: '2-digit',
            })
            : '-'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {(events?.length || 0) > 0 && events?.[0] ? events[0].eventType : 'Olay yok'}
            </p>
          </card_1.CardContent>
        </card_1.Card>
      </div>

      {/* Filters and Search */}
      <card_1.Card>
        <card_1.CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <card_1.CardTitle>Platform Olayları</card_1.CardTitle>
              <card_1.CardDescription>
                Platform genelindeki tüm olayları takip edin
              </card_1.CardDescription>
            </div>
            <button_1.Button variant="outline" size="sm" onClick={refreshEvents} disabled={refreshing}>
              <lucide_react_1.RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`}/>
              Yenile
            </button_1.Button>
          </div>
        </card_1.CardHeader>
        <card_1.CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <lucide_react_1.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
              <input_1.Input placeholder="Olay ara (tip, kaynak, içerik)..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9"/>
            </div>
            <select_1.Select value={selectedSource} onValueChange={setSelectedSource}>
              <select_1.SelectTrigger className="w-[200px]">
                <lucide_react_1.Filter className="h-4 w-4 mr-2"/>
                <select_1.SelectValue placeholder="Kaynak filtrele"/>
              </select_1.SelectTrigger>
              <select_1.SelectContent>
                <select_1.SelectItem value="all">Tüm Kaynaklar</select_1.SelectItem>
                <select_1.SelectItem value="events">Etkinlikler</select_1.SelectItem>
                <select_1.SelectItem value="email-marketing">E-posta Pazarlama</select_1.SelectItem>
                <select_1.SelectItem value="cms">CMS</select_1.SelectItem>
                <select_1.SelectItem value="certificates">Sertifikalar</select_1.SelectItem>
                <select_1.SelectItem value="media">Medya</select_1.SelectItem>
              </select_1.SelectContent>
            </select_1.Select>
          </div>

          {loading ? (<div className="flex items-center justify-center py-12">
              <lucide_react_1.RefreshCw className="h-8 w-8 animate-spin text-muted-foreground"/>
            </div>) : filteredEvents.length === 0 ? (<div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <lucide_react_1.Activity className="h-12 w-12 mb-4 opacity-50"/>
              <p className="text-lg font-medium">Olay bulunamadı</p>
              <p className="text-sm">Henüz kayıtlı olay yok veya filtrelerinize uygun sonuç yok</p>
            </div>) : (<div className="border rounded-lg">
              <table_1.Table>
                <table_1.TableHeader>
                  <table_1.TableRow>
                    <table_1.TableHead>Zaman</table_1.TableHead>
                    <table_1.TableHead>Kaynak</table_1.TableHead>
                    <table_1.TableHead>Olay Tipi</table_1.TableHead>
                    <table_1.TableHead>İçerik</table_1.TableHead>
                    <table_1.TableHead>Otomasyon</table_1.TableHead>
                  </table_1.TableRow>
                </table_1.TableHeader>
                <table_1.TableBody>
                  {filteredEvents.map((event) => (<table_1.TableRow key={event.id}>
                      <table_1.TableCell className="font-mono text-sm">
                        {new Date(event.createdAt).toLocaleString('tr-TR', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                })}
                      </table_1.TableCell>
                      <table_1.TableCell>
                        <badge_1.Badge className={sourceColors[event.source] || 'bg-gray-100'}>
                          {sourceLabels[event.source] || event.source}
                        </badge_1.Badge>
                      </table_1.TableCell>
                      <table_1.TableCell className="font-medium">
                        {event.eventType}
                      </table_1.TableCell>
                      <table_1.TableCell className="max-w-xs">
                        <div className="truncate text-sm text-muted-foreground">
                          {JSON.stringify(event.payload).substring(0, 100)}...
                        </div>
                      </table_1.TableCell>
                      <table_1.TableCell>
                        {event.triggeredRules.length > 0 ? (<badge_1.Badge variant="outline" className="gap-1">
                            <lucide_react_1.Zap className="h-3 w-3"/>
                            {event.triggeredRules.length} kural
                          </badge_1.Badge>) : (<span className="text-sm text-muted-foreground">-</span>)}
                      </table_1.TableCell>
                    </table_1.TableRow>))}
                </table_1.TableBody>
              </table_1.Table>
            </div>)}
        </card_1.CardContent>
      </card_1.Card>
    </div>);
}
//# sourceMappingURL=EventLogViewer.js.map