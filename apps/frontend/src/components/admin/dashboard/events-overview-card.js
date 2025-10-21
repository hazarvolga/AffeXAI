"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsOverviewCard = EventsOverviewCard;
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const react_1 = require("react");
const api_1 = require("@/lib/api");
function EventsOverviewCard() {
    const [stats, setStats] = (0, react_1.useState)(null);
    const [upcomingEvents, setUpcomingEvents] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        loadData();
    }, []);
    const loadData = async () => {
        try {
            setLoading(true);
            const [statsData, allEvents] = await Promise.all([
                api_1.eventsService.getDashboardStats(),
                api_1.eventsService.getAll().catch(() => []),
            ]);
            setStats(statsData);
            const upcoming = allEvents.filter(e => new Date(e.startDate) >= new Date());
            setUpcomingEvents(upcoming);
        }
        catch (error) {
            console.error('Error loading events data:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const nextEvent = upcomingEvents[0];
    if (loading) {
        return (<card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle className="flex items-center gap-2">
            <lucide_react_1.Calendar className="h-5 w-5"/>
            Etkinlikler
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
          <lucide_react_1.Calendar className="h-5 w-5"/>
          Etkinlikler
        </card_1.CardTitle>
      </card_1.CardHeader>
      <card_1.CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold">{stats?.upcomingEvents || 0}</p>
            <p className="text-xs text-muted-foreground">Yaklaşan Etkinlik</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{stats?.totalParticipants || 0}</p>
            <p className="text-xs text-muted-foreground">Toplam Katılımcı</p>
          </div>
        </div>

        {nextEvent && (<div className="border-t pt-4">
            <p className="text-sm font-semibold">{nextEvent.title}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(nextEvent.startDate).toLocaleDateString('tr-TR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })}
            </p>
          </div>)}
      </card_1.CardContent>
      <card_1.CardFooter>
        <button_1.Button asChild size="sm" variant="outline" className="w-full">
          <link_1.default href="/admin/events">
            Tümünü Gör <lucide_react_1.ArrowUpRight className="h-4 w-4 ml-2"/>
          </link_1.default>
        </button_1.Button>
      </card_1.CardFooter>
    </card_1.Card>);
}
//# sourceMappingURL=events-overview-card.js.map