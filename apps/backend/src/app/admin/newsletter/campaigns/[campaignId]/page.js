"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CampaignDetailPage;
const navigation_1 = require("next/navigation");
const card_1 = require("@/components/ui/card");
const badge_1 = require("@/components/ui/badge");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const separator_1 = require("@/components/ui/separator");
const recharts_1 = require("recharts");
const link_1 = __importDefault(require("next/link"));
const react_1 = require("react");
const react_2 = require("react");
const emailCampaignsService_1 = __importDefault(require("@/lib/api/emailCampaignsService"));
// Mock data for pie chart - in a real app, this would come from the backend
const pieChartData = [
    { name: 'Açıldı', value: 319 }, // 25.5% of 1250
    { name: 'Tıkladı', value: 53 }, // 4.2% of 1250
    { name: 'Açılmadı', value: 878 },
];
const COLORS = ['#10B981', '#F59E0B', '#6B7280'];
function CampaignDetailPage({ params }) {
    // Unwrap the params promise using React.use()
    const unwrappedParams = (0, react_2.use)(params);
    const { campaignId } = unwrappedParams;
    const [campaign, setCampaign] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const hasFetchedCampaign = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        // Prevent multiple fetches
        if (hasFetchedCampaign.current)
            return;
        hasFetchedCampaign.current = true;
        const fetchCampaign = async () => {
            try {
                setLoading(true);
                // Fetch campaign from backend
                const campaignData = await emailCampaignsService_1.default.getCampaignById(campaignId);
                setCampaign(campaignData);
                setError(null);
            }
            catch (err) {
                console.error('Error fetching campaign:', err);
                if (err.response?.status === 404) {
                    (0, navigation_1.notFound)();
                }
                else {
                    setError('Kampanya bilgileri yüklenirken bir hata oluştu.');
                }
            }
            finally {
                setLoading(false);
            }
        };
        fetchCampaign();
    }, []);
    if (loading) {
        return <div className="flex justify-center items-center h-64">Yükleniyor...</div>;
    }
    if (error) {
        return <div className="text-center text-red-500 py-12">{error}</div>;
    }
    if (!campaign) {
        (0, navigation_1.notFound)();
        return null;
    }
    const isSent = campaign.status === 'sent';
    // Calculate rates
    const openRate = campaign.totalRecipients > 0 ? Math.round((campaign.openedCount / campaign.totalRecipients) * 100) : 0;
    const clickRate = campaign.totalRecipients > 0 ? Math.round((campaign.clickedCount / campaign.totalRecipients) * 100) : 0;
    const stats = [
        { name: 'Alıcı Sayısı', value: campaign.totalRecipients || 0, icon: lucide_react_1.Users },
        { name: 'Açılma Oranı', value: isSent ? `${openRate}%` : '-', icon: lucide_react_1.MailOpen },
        { name: 'Tıklanma Oranı', value: isSent ? `${clickRate}%` : '-', icon: lucide_react_1.MousePointerClick },
    ];
    return (<div className="space-y-8">
       <div className="flex items-center gap-4">
        <button_1.Button variant="outline" size="icon" asChild>
            <link_1.default href="/admin/newsletter/campaigns">
                <lucide_react_1.ArrowLeft className="h-4 w-4"/>
            </link_1.default>
        </button_1.Button>
        <div>
            <h1 className="text-3xl font-bold tracking-tight">{campaign.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
                <badge_1.Badge variant={campaign.status === 'sent' ? 'default' : 'secondary'}>
                  {campaign.status === 'draft' ? 'Taslak' : campaign.status === 'scheduled' ? 'Planlandı' : 'Gönderildi'}
                </badge_1.Badge>
                <span>·</span>
                {campaign.status === 'sent' && campaign.sentAt && (<div className="flex items-center gap-1 text-sm"><lucide_react_1.Calendar className="h-3 w-3"/> {new Date(campaign.sentAt).toLocaleString('tr-TR')}</div>)}
                 {campaign.status === 'scheduled' && campaign.scheduledAt && (<div className="flex items-center gap-1 text-sm"><lucide_react_1.Clock className="h-3 w-3"/> {new Date(campaign.scheduledAt).toLocaleString('tr-TR')}</div>)}
                 {campaign.status === 'draft' && (<div className="flex items-center gap-1 text-sm"><lucide_react_1.Calendar className="h-3 w-3"/> {new Date(campaign.createdAt).toLocaleDateString('tr-TR')} tarihinde oluşturuldu</div>)}
            </div>
        </div>
      </div>

      {isSent ? (<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stats.map(stat => (<card_1.Card key={stat.name}>
              <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <card_1.CardTitle className="text-sm font-medium">{stat.name}</card_1.CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground"/>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </card_1.CardContent>
            </card_1.Card>))}
        </div>) : (<card_1.Card>
            <card_1.CardHeader>
                <card_1.CardTitle>Kampanya Önizlemesi</card_1.CardTitle>
                <card_1.CardDescription>
                  Bu kampanya henüz gönderilmedi. 
                  {campaign.status === 'scheduled' && campaign.scheduledAt && ` Planlanan gönderim tarihi: ${new Date(campaign.scheduledAt).toLocaleString('tr-TR')}`}
                  {campaign.status === 'draft' && ' Kampanyayı göndermek için taslağı düzenleyin ve gönderime planlayın.'}
                </card_1.CardDescription>
            </card_1.CardHeader>
        </card_1.Card>)}

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle>E-posta İçeriği</card_1.CardTitle>
              <card_1.CardDescription>Bu kampanyada gönderilen veya gönderilecek olan e-posta içeriği.</card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="aspect-video w-full rounded-lg border bg-muted p-4">
                 <h2 className="text-lg font-semibold">{campaign.subject}</h2>
                 <separator_1.Separator className="my-4"/>
                <div className="prose prose-sm dark:prose-invert" dangerouslySetInnerHTML={{ __html: campaign.content }}/>
              </div>
            </card_1.CardContent>
          </card_1.Card>
        </div>
        <div className="lg:col-span-1 space-y-8">
            <card_1.Card>
                <card_1.CardHeader>
                    <card_1.CardTitle>Etkileşim Dağılımı</card_1.CardTitle>
                </card_1.CardHeader>
                <card_1.CardContent>
                    {isSent ? (<div className="w-full h-52">
                        <recharts_1.ResponsiveContainer>
                            <recharts_1.PieChart>
                                <recharts_1.Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                    {pieChartData.map((entry, index) => (<recharts_1.Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>))}
                                </recharts_1.Pie>
                                <recharts_1.Tooltip formatter={(value, name) => [`${value} abone`, name]}/>
                            </recharts_1.PieChart>
                        </recharts_1.ResponsiveContainer>
                        </div>) : (<div className="text-center text-muted-foreground py-8">İstatistikler, kampanya gönderildikten sonra burada görüntülenecektir.</div>)}
                </card_1.CardContent>
            </card_1.Card>
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=page.js.map