"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CampaignsSection;
const react_1 = require("react");
const table_1 = require("@/components/ui/table");
const badge_1 = require("@/components/ui/badge");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const pagination_1 = require("@/components/ui/pagination");
const utils_1 = require("@/lib/utils");
const card_1 = require("@/components/ui/card");
const emailCampaignsService_1 = __importDefault(require("@/lib/api/emailCampaignsService"));
function CampaignsSection() {
    const [campaigns, setCampaigns] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await emailCampaignsService_1.default.getAllCampaigns();
                setCampaigns(data);
            }
            catch (error) {
                console.error('Error fetching campaigns:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const getStatusVariant = (status) => {
        switch (status) {
            case 'sent': return 'default';
            case 'scheduled': return 'secondary';
            case 'draft': return 'outline';
            default: return 'outline';
        }
    };
    const getStatusClass = (status) => {
        switch (status) {
            case 'sent': return 'bg-green-500';
            case 'scheduled': return 'bg-blue-500';
            case 'draft': return '';
            default: return '';
        }
    };
    const getStatusText = (status) => {
        switch (status) {
            case 'sent': return 'gönderildi';
            case 'scheduled': return 'planlandı';
            case 'draft': return 'taslak';
            default: return status;
        }
    };
    if (loading) {
        return (<div className="flex items-center justify-center py-8">
                <div className="text-muted-foreground">Kampanyalar yükleniyor...</div>
            </div>);
    }
    return (<>
            <table_1.Table>
                <table_1.TableHeader>
                    <table_1.TableRow>
                        <table_1.TableHead>Kampanya Başlığı</table_1.TableHead>
                        <table_1.TableHead>Durum</table_1.TableHead>
                        <table_1.TableHead>Tarih</table_1.TableHead>
                        <table_1.TableHead>Alıcı Sayısı</table_1.TableHead>
                        <table_1.TableHead><span className="sr-only">Eylemler</span></table_1.TableHead>
                    </table_1.TableRow>
                </table_1.TableHeader>
                <table_1.TableBody>
                    {campaigns.map(campaign => {
            const dateToShow = campaign.status === 'sent' ? campaign.sentAt : campaign.status === 'scheduled' ? campaign.scheduledAt : campaign.createdAt;
            const dateLabel = campaign.status === 'sent' ? 'Gönderildi' : campaign.status === 'scheduled' ? 'Planlandı' : 'Oluşturuldu';
            return (<table_1.TableRow key={campaign.id}>
                            <table_1.TableCell className="font-medium">
                                 <link_1.default href={`/admin/newsletter/campaigns/${campaign.id}`} className="hover:underline">{campaign.name}</link_1.default>
                                <div className="text-xs text-muted-foreground">{campaign.subject}</div>
                            </table_1.TableCell>
                            <table_1.TableCell>
                                <badge_1.Badge variant={getStatusVariant(campaign.status)} className={(0, utils_1.cn)(getStatusClass(campaign.status))}>
                                    {getStatusText(campaign.status).charAt(0).toUpperCase() + getStatusText(campaign.status).slice(1)}
                                </badge_1.Badge>
                            </table_1.TableCell>
                            <table_1.TableCell>
                                <div>{dateToShow ? new Date(dateToShow).toLocaleDateString('tr-TR') : '-'}</div>
                                <div className="text-xs text-muted-foreground">{dateLabel}</div>
                            </table_1.TableCell>
                            <table_1.TableCell>{campaign.totalRecipients || '-'}</table_1.TableCell>
                            <table_1.TableCell className="text-right">
                                <dropdown_menu_1.DropdownMenu>
                                    <dropdown_menu_1.DropdownMenuTrigger asChild>
                                        <button_1.Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Menüyü aç</span>
                                            <lucide_react_1.MoreHorizontal className="h-4 w-4"/>
                                        </button_1.Button>
                                    </dropdown_menu_1.DropdownMenuTrigger>
                                    <dropdown_menu_1.DropdownMenuContent align="end">
                                        <dropdown_menu_1.DropdownMenuItem asChild>
                                             <link_1.default href={`/admin/newsletter/campaigns/${campaign.id}`}><lucide_react_1.BarChart2 className="mr-2 h-4 w-4"/> İstatistikleri Gör</link_1.default>
                                        </dropdown_menu_1.DropdownMenuItem>
                                        <dropdown_menu_1.DropdownMenuItem asChild>
                                            <link_1.default href={`/admin/newsletter/campaigns/new?clone=${campaign.id}`}><lucide_react_1.Copy className="mr-2 h-4 w-4"/> Kopyala</link_1.default>
                                        </dropdown_menu_1.DropdownMenuItem>
                                        {campaign.status !== 'sent' && (<dropdown_menu_1.DropdownMenuItem asChild>
                                                 <link_1.default href={`/admin/newsletter/campaigns/new?edit=${campaign.id}`}><lucide_react_1.Edit className="mr-2 h-4 w-4"/> Düzenle</link_1.default>
                                            </dropdown_menu_1.DropdownMenuItem>)}
                                        <dropdown_menu_1.DropdownMenuSeparator />
                                        <dropdown_menu_1.DropdownMenuItem className="text-destructive focus:text-destructive">
                                            <lucide_react_1.Trash2 className="mr-2 h-4 w-4"/> Sil
                                        </dropdown_menu_1.DropdownMenuItem>
                                    </dropdown_menu_1.DropdownMenuContent>
                                </dropdown_menu_1.DropdownMenu>
                            </table_1.TableCell>
                        </table_1.TableRow>);
        })}
                </table_1.TableBody>
            </table_1.Table>
            <card_1.CardFooter className="pt-6 border-t bg-muted/50">
                 <pagination_1.Pagination>
                    <pagination_1.PaginationContent>
                        <pagination_1.PaginationItem><pagination_1.PaginationPrevious href="#"/></pagination_1.PaginationItem>
                        <pagination_1.PaginationItem><pagination_1.PaginationLink href="#">1</pagination_1.PaginationLink></pagination_1.PaginationItem>
                        <pagination_1.PaginationItem><pagination_1.PaginationNext href="#"/></pagination_1.PaginationItem>
                    </pagination_1.PaginationContent>
                </pagination_1.Pagination>
            </card_1.CardFooter>
        </>);
}
//# sourceMappingURL=campaigns-section.js.map