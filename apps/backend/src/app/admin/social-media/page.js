"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SocialMediaDashboardPage;
const card_1 = require("@/components/ui/card");
const table_1 = require("@/components/ui/table");
const badge_1 = require("@/components/ui/badge");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const social_media_data_1 = require("@/lib/social-media-data");
const utils_1 = require("@/lib/utils");
const react_1 = require("react");
const link_1 = __importDefault(require("next/link"));
const collapsible_1 = require("@/components/ui/collapsible");
const content_calendar_1 = require("@/components/admin/social-media/content-calendar");
const tooltip_1 = require("@/components/ui/tooltip");
const getStatusVariant = (status) => {
    switch (status) {
        case 'Yayınlandı':
            return 'bg-green-500';
        case 'Planlandı':
            return 'bg-blue-500';
        case 'Hata':
            return 'bg-red-500';
        default:
            return 'bg-gray-500';
    }
};
function SocialMediaDashboardPage() {
    const connectedAccounts = social_media_data_1.socialAccounts.filter(a => a.isConnected).length;
    const scheduledPosts = social_media_data_1.socialPosts.filter(p => p.status === 'Planlandı').length;
    const publishedPosts = social_media_data_1.socialPosts.filter(p => p.status === 'Yayınlandı').length;
    const failedPosts = social_media_data_1.socialPosts.filter(p => p.status === 'Hata').length;
    const [isCalendarOpen, setIsCalendarOpen] = (0, react_1.useState)(false);
    const [isClient, setIsClient] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        setIsClient(true);
    }, []);
    return (<div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sosyal Medya Paneli</h1>
          <p className="text-muted-foreground">
            Planlanmış ve yayınlanmış gönderilerinize genel bir bakış.
          </p>
        </div>
        <button_1.Button asChild size="lg">
            <link_1.default href="/admin/social-media/composer">
                <lucide_react_1.PlusCircle className="mr-2 h-4 w-4"/> Yeni Gönderi Oluştur
            </link_1.default>
        </button_1.Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <card_1.Card>
          <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card_1.CardTitle className="text-sm font-medium">Bağlı Hesaplar</card_1.CardTitle>
            <lucide_react_1.Share2 className="h-4 w-4 text-muted-foreground"/>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-2xl font-bold">{connectedAccounts} / {social_media_data_1.socialAccounts.length}</div>
          </card_1.CardContent>
        </card_1.Card>
        <card_1.Card>
          <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card_1.CardTitle className="text-sm font-medium">Planlanmış Gönderiler</card_1.CardTitle>
            <lucide_react_1.Clock className="h-4 w-4 text-muted-foreground"/>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-2xl font-bold">{scheduledPosts}</div>
          </card_1.CardContent>
        </card_1.Card>
        <card_1.Card>
          <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card_1.CardTitle className="text-sm font-medium">Yayınlanmış (Bu Ay)</card_1.CardTitle>
            <lucide_react_1.CheckCircle2 className="h-4 w-4 text-muted-foreground"/>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-2xl font-bold">{publishedPosts}</div>
          </card_1.CardContent>
        </card_1.Card>
         <card_1.Card>
          <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card_1.CardTitle className="text-sm font-medium">Hatalı Gönderiler</card_1.CardTitle>
            <lucide_react_1.XCircle className="h-4 w-4 text-muted-foreground"/>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-2xl font-bold text-red-500">{failedPosts}</div>
          </card_1.CardContent>
        </card_1.Card>
      </div>
      
       <div className="flex items-center justify-between gap-4 rounded-lg border bg-card text-card-foreground p-3 shadow-sm">
            <div className='flex items-center gap-2'>
                 <tooltip_1.TooltipProvider>
                    {social_media_data_1.socialAccounts.map(account => {
            const PlatformIcon = (0, social_media_data_1.getPlatformIcon)(account.platform);
            return (<tooltip_1.Tooltip key={account.id}>
                                <tooltip_1.TooltipTrigger asChild>
                                    <button_1.Button variant="ghost" size="icon" className={(0, utils_1.cn)(!account.isConnected && 'opacity-30 hover:opacity-100')}>
                                        <PlatformIcon className={(0, utils_1.cn)('h-5 w-5', account.isConnected && 'text-primary')}/>
                                    </button_1.Button>
                                </tooltip_1.TooltipTrigger>
                                <tooltip_1.TooltipContent>
                                    <p>{account.username}</p>
                                    <p>{account.isConnected ? 'Bağlı' : 'Bağlı Değil'}</p>
                                </tooltip_1.TooltipContent>
                            </tooltip_1.Tooltip>);
        })}
                </tooltip_1.TooltipProvider>
                <button_1.Button variant="outline" size="icon">
                    <lucide_react_1.PlusCircle className="h-5 w-5 text-muted-foreground"/>
                </button_1.Button>
            </div>
             <collapsible_1.Collapsible open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <collapsible_1.CollapsibleTrigger asChild>
                    <button_1.Button variant="outline" size="sm">
                        {isCalendarOpen ? <lucide_react_1.EyeOff className="mr-2 h-4 w-4"/> : <lucide_react_1.Eye className="mr-2 h-4 w-4"/>}
                        {isCalendarOpen ? 'Takvimi Gizle' : 'Takvimi Göster'}
                    </button_1.Button>
                </collapsible_1.CollapsibleTrigger>
            </collapsible_1.Collapsible>
        </div>


      <collapsible_1.Collapsible open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <collapsible_1.CollapsibleContent className="space-y-4 pt-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <content_calendar_1.ContentCalendar />
        </collapsible_1.CollapsibleContent>
      </collapsible_1.Collapsible>


      <card_1.Card>
        <card_1.CardHeader>
            <card_1.CardTitle>Son Gönderiler</card_1.CardTitle>
            <card_1.CardDescription>
                En son planlanan ve yayınlanan gönderileriniz.
            </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent>
            <table_1.Table>
            <table_1.TableHeader>
                <table_1.TableRow>
                <table_1.TableHead>Platform</table_1.TableHead>
                <table_1.TableHead>İçerik</table_1.TableHead>
                <table_1.TableHead>Durum</table_1.TableHead>
                <table_1.TableHead>Tarih</table_1.TableHead>
                </table_1.TableRow>
            </table_1.TableHeader>
            <table_1.TableBody>
                {social_media_data_1.socialPosts.map(post => {
            const account = social_media_data_1.socialAccounts.find(a => a.id === post.accountId);
            const PlatformIcon = account ? (0, social_media_data_1.getPlatformIcon)(account.platform) : lucide_react_1.Share2;
            const date = post.status === 'Yayınlandı' ? post.publishedAt : post.scheduledAt;
            return (<table_1.TableRow key={post.id}>
                    <table_1.TableCell>
                    {account && (<div className="flex items-center gap-2">
                        <PlatformIcon className="h-5 w-5 text-muted-foreground"/>
                        <span className="font-medium">{account.platform}</span>
                        </div>)}
                    </table_1.TableCell>
                    <table_1.TableCell>
                    <p className="font-medium line-clamp-1">{post.content}</p>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <lucide_react_1.Link className="h-3 w-3"/>
                        {(0, social_media_data_1.getSourceContentName)(post.sourceContentType, post.sourceContentId)}
                    </span>
                    </table_1.TableCell>
                    <table_1.TableCell>
                    <badge_1.Badge className={(0, utils_1.cn)(getStatusVariant(post.status))}>
                        {post.status}
                    </badge_1.Badge>
                    </table_1.TableCell>
                    <table_1.TableCell className="text-xs text-muted-foreground">
                      {isClient && date ? new Date(date).toLocaleString('tr-TR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : '-'}
                    </table_1.TableCell>
                </table_1.TableRow>);
        })}
            </table_1.TableBody>
            </table_1.Table>
        </card_1.CardContent>
        </card_1.Card>
    </div>);
}
//# sourceMappingURL=page.js.map