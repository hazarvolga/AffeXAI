"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportGaugeChart = SupportGaugeChart;
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const react_1 = require("react");
const recharts_1 = require("recharts");
const ticketsService_1 = require("@/lib/api/ticketsService");
function SupportGaugeChart() {
    const [stats, setStats] = (0, react_1.useState)({
        open: 0,
        pending: 0,
        resolved: 0,
        avgResponseTime: 0,
        slaTarget: 95,
        currentSLA: 0,
    });
    const [highPriorityTickets, setHighPriorityTickets] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        loadData();
    }, []);
    const loadData = async () => {
        try {
            setLoading(true);
            // Get real ticket statistics
            const ticketStats = await ticketsService_1.ticketsService.getStats();
            // Get high priority tickets
            const allTickets = await ticketsService_1.ticketsService.getAll({
                status: ticketsService_1.TicketStatus.OPEN
            }).catch(() => []);
            // Filter high priority tickets
            const highPriorityList = allTickets
                .filter(ticket => ticket.priority === 'high' || ticket.priority === 'urgent')
                .slice(0, 3)
                .map(ticket => {
                const createdDate = new Date(ticket.createdAt);
                const now = new Date();
                const hoursDiff = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60));
                return {
                    id: `#${ticket.id.substring(0, 8)}`,
                    title: ticket.subject.length > 30 ? ticket.subject.substring(0, 30) + '...' : ticket.subject,
                    priority: ticket.priority,
                    age: hoursDiff < 1 ? 'Az önce' : hoursDiff < 24 ? `${hoursDiff} saat` : `${Math.floor(hoursDiff / 24)} gün`,
                };
            });
            setHighPriorityTickets(highPriorityList.length > 0 ? highPriorityList : []);
            // Map stats to our format
            const openCount = ticketStats.byStatus[ticketsService_1.TicketStatus.OPEN] || 0;
            const inProgressCount = ticketStats.byStatus[ticketsService_1.TicketStatus.IN_PROGRESS] || 0;
            const waitingCount = (ticketStats.byStatus[ticketsService_1.TicketStatus.WAITING_CUSTOMER] || 0) +
                (ticketStats.byStatus[ticketsService_1.TicketStatus.PENDING_THIRD_PARTY] || 0);
            const resolvedCount = (ticketStats.byStatus[ticketsService_1.TicketStatus.RESOLVED] || 0) +
                (ticketStats.byStatus[ticketsService_1.TicketStatus.CLOSED] || 0);
            setStats({
                open: openCount,
                pending: inProgressCount + waitingCount,
                resolved: resolvedCount,
                avgResponseTime: ticketStats.averageResponseTime || 0,
                slaTarget: ticketStats.sla?.target || 95,
                currentSLA: ticketStats.sla?.complianceRate || 0,
            });
        }
        catch (error) {
            console.error('Error loading support tickets data:', error);
            // Fallback to empty state
            setStats({
                open: 0,
                pending: 0,
                resolved: 0,
                avgResponseTime: 0,
                slaTarget: 95,
                currentSLA: 0,
            });
            setHighPriorityTickets([]);
        }
        finally {
            setLoading(false);
        }
    };
    // Gauge data for RadialBarChart
    const gaugeData = [
        {
            name: 'SLA',
            value: stats.currentSLA,
            fill: stats.currentSLA >= stats.slaTarget ? 'hsl(142, 71%, 45%)' : stats.currentSLA >= 80 ? 'hsl(48, 96%, 53%)' : 'hsl(0, 84%, 60%)',
        },
    ];
    if (loading) {
        return (<card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle className="flex items-center gap-2">
            <lucide_react_1.LifeBuoy className="h-5 w-5"/>
            Destek Performansı
          </card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">Yükleniyor...</p>
        </card_1.CardContent>
      </card_1.Card>);
    }
    return (<card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle className="flex items-center gap-2">
          <lucide_react_1.LifeBuoy className="h-5 w-5"/>
          Destek Performansı
        </card_1.CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          SLA Hedefi: %{stats.slaTarget}
        </p>
      </card_1.CardHeader>
      <card_1.CardContent>
        {/* Gauge + Stats */}
        <div className="flex items-center gap-6">
          {/* Gauge Chart */}
          <div className="flex-shrink-0 relative">
            <recharts_1.ResponsiveContainer width={140} height={140}>
              <recharts_1.RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={gaugeData} startAngle={180} endAngle={0}>
                <recharts_1.PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false}/>
                <recharts_1.RadialBar background dataKey="value" cornerRadius={10} animationDuration={1500} animationEasing="ease-out"/>
              </recharts_1.RadialBarChart>
            </recharts_1.ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-2xl font-bold">{stats.currentSLA}%</p>
              <p className="text-[10px] text-muted-foreground">SLA Başarı</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="flex-1 grid grid-cols-2 gap-3">
            <div className="text-center p-2 rounded-lg bg-red-50 dark:bg-red-950/20">
              <p className="text-xl font-bold text-red-600">{stats.open}</p>
              <p className="text-xs text-muted-foreground">Açık</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
              <p className="text-xl font-bold text-yellow-600">{stats.pending}</p>
              <p className="text-xs text-muted-foreground">Beklemede</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-green-50 dark:bg-green-950/20">
              <p className="text-xl font-bold text-green-600">{stats.resolved}</p>
              <p className="text-xs text-muted-foreground">Çözüldü</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-blue-50 dark:bg-blue-950/20">
              <p className="text-xl font-bold text-blue-600">{stats.avgResponseTime}h</p>
              <p className="text-xs text-muted-foreground">Ort. Yanıt</p>
            </div>
          </div>
        </div>

        {/* High Priority Tickets List */}
        <div className="mt-4 border-t pt-4">
          <div className="flex items-center gap-2 mb-2">
            <lucide_react_1.AlertCircle className="h-4 w-4 text-red-500"/>
            <p className="text-sm font-semibold">Yüksek Öncelikli</p>
          </div>
          <div className="space-y-2">
            {highPriorityTickets.map((ticket) => (<div key={ticket.id} className="flex items-center justify-between text-xs p-2 rounded bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex-1">
                  <p className="font-medium">{ticket.title}</p>
                  <p className="text-muted-foreground">{ticket.id}</p>
                </div>
                <div className="flex items-center gap-2">
                  <lucide_react_1.Clock className="h-3 w-3 text-muted-foreground"/>
                  <span className="text-muted-foreground">{ticket.age}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${ticket.priority === 'urgent'
                ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400'
                : 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400'}`}>
                    {ticket.priority === 'urgent' ? 'ACİL' : 'YÜKSEK'}
                  </span>
                </div>
              </div>))}
          </div>
        </div>
      </card_1.CardContent>
      <card_1.CardFooter>
        <button_1.Button asChild size="sm" variant="outline" className="w-full">
          <link_1.default href="/admin/support">
            Tüm Talepler <lucide_react_1.ArrowUpRight className="h-4 w-4 ml-2"/>
          </link_1.default>
        </button_1.Button>
      </card_1.CardFooter>
    </card_1.Card>);
}
//# sourceMappingURL=support-gauge-chart.js.map