"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SubscribersSection;
const react_1 = require("react");
const table_1 = require("@/components/ui/table");
const badge_1 = require("@/components/ui/badge");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const alert_dialog_1 = require("@/components/ui/alert-dialog");
const utils_1 = require("@/lib/utils");
const card_1 = require("@/components/ui/card");
const pagination_1 = require("@/components/ui/pagination");
const subscribersService_1 = __importDefault(require("@/lib/api/subscribersService"));
const navigation_1 = require("next/navigation");
const link_1 = __importDefault(require("next/link"));
function SubscribersSection() {
    const [subscribers, setSubscribers] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const router = (0, navigation_1.useRouter)();
    (0, react_1.useEffect)(() => {
        const fetchSubscribers = async () => {
            try {
                setLoading(true);
                const data = await subscribersService_1.default.getAllSubscribers();
                setSubscribers(data);
                setError(null);
            }
            catch (err) {
                console.error('Error fetching subscribers:', err);
                setError('Aboneler yüklenirken bir hata oluştu.');
            }
            finally {
                setLoading(false);
            }
        };
        fetchSubscribers();
    }, []);
    const getStatusVariant = (status) => {
        switch (status) {
            case 'active': return 'default';
            case 'pending': return 'secondary';
            case 'unsubscribed': return 'outline';
            default: return 'outline';
        }
    };
    const getStatusClass = (status) => {
        switch (status) {
            case 'active': return 'bg-green-500';
            case 'pending': return 'bg-yellow-500';
            case 'unsubscribed': return '';
            default: return '';
        }
    };
    const handleDelete = async (id) => {
        try {
            await subscribersService_1.default.deleteSubscriber(id);
            setSubscribers(subscribers.filter(sub => sub.id !== id));
        }
        catch (err) {
            console.error('Error deleting subscriber:', err);
            // In a real app, you would show an error message to the user
        }
    };
    if (loading) {
        return <div className="flex justify-center items-center h-64">Yükleniyor...</div>;
    }
    if (error) {
        return <div className="text-center text-red-500 py-12">{error}</div>;
    }
    return (<>
            <table_1.Table>
                <table_1.TableHeader>
                    <table_1.TableRow>
                        <table_1.TableHead>E-posta</table_1.TableHead>
                        <table_1.TableHead>Durum</table_1.TableHead>
                        <table_1.TableHead>Gruplar / Segmentler</table_1.TableHead>
                        <table_1.TableHead>Kayıt Tarihi</table_1.TableHead>
                        <table_1.TableHead><span className="sr-only">Eylemler</span></table_1.TableHead>
                    </table_1.TableRow>
                </table_1.TableHeader>
                <table_1.TableBody>
                    {subscribers.map(sub => (<table_1.TableRow key={sub.id}>
                            <table_1.TableCell className="font-medium">
                              <link_1.default href={`/admin/newsletter/subscribers/${sub.id}/detail`} className="hover:underline">
                                {sub.email}
                              </link_1.default>
                            </table_1.TableCell>
                            <table_1.TableCell>
                                <badge_1.Badge variant={getStatusVariant(sub.status)} className={(0, utils_1.cn)(getStatusClass(sub.status))}>
                                    {sub.status === 'active' ? 'Aktif' : sub.status === 'pending' ? 'Onay Bekliyor' : 'İptal Edilmiş'}
                                </badge_1.Badge>
                            </table_1.TableCell>
                             <table_1.TableCell>
                                <div className="flex flex-wrap gap-1">
                                    {sub.groups.map(group => <badge_1.Badge key={group} variant="outline" className="flex items-center gap-1"><lucide_react_1.Folder className="h-3 w-3"/>{group.replace('grp-', 'Grup ')}</badge_1.Badge>)}
                                    {sub.segments.map(segment => <badge_1.Badge key={segment} variant="secondary" className="flex items-center gap-1"><lucide_react_1.Filter className="h-3 w-3"/>{segment}</badge_1.Badge>)}
                                </div>
                            </table_1.TableCell>
                            <table_1.TableCell>{new Date(sub.subscribedAt).toLocaleDateString('tr-TR')}</table_1.TableCell>
                            <table_1.TableCell className="text-right">
                                <dropdown_menu_1.DropdownMenu>
                                    <dropdown_menu_1.DropdownMenuTrigger asChild>
                                        <button_1.Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Menüyü aç</span>
                                            <lucide_react_1.MoreHorizontal className="h-4 w-4"/>
                                        </button_1.Button>
                                    </dropdown_menu_1.DropdownMenuTrigger>
                                    <dropdown_menu_1.DropdownMenuContent align="end">
                                        <dropdown_menu_1.DropdownMenuItem onClick={() => router.push(`/admin/newsletter/subscribers/${sub.id}/detail`)}>
                                          <lucide_react_1.Eye className="mr-2 h-4 w-4"/> Detay
                                        </dropdown_menu_1.DropdownMenuItem>
                                        <dropdown_menu_1.DropdownMenuItem onClick={() => router.push(`/admin/newsletter/subscribers/${sub.id}`)}>
                                          <lucide_react_1.Edit className="mr-2 h-4 w-4"/> Düzenle
                                        </dropdown_menu_1.DropdownMenuItem>
                                        <dropdown_menu_1.DropdownMenuItem>
                                          <lucide_react_1.Mail className="mr-2 h-4 w-4"/> E-posta Gönder
                                        </dropdown_menu_1.DropdownMenuItem>
                                        <dropdown_menu_1.DropdownMenuSeparator />
                                         <alert_dialog_1.AlertDialog>
                                            <alert_dialog_1.AlertDialogTrigger asChild>
                                                <dropdown_menu_1.DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive">
                                                     <lucide_react_1.Trash2 className="mr-2 h-4 w-4"/> Aboneyi Sil
                                                </dropdown_menu_1.DropdownMenuItem>
                                            </alert_dialog_1.AlertDialogTrigger>
                                            <alert_dialog_1.AlertDialogContent>
                                                <alert_dialog_1.AlertDialogHeader>
                                                <alert_dialog_1.AlertDialogTitle>Emin misiniz?</alert_dialog_1.AlertDialogTitle>
                                                <alert_dialog_1.AlertDialogDescription>
                                                    Bu işlem geri alınamaz. Bu abone kalıcı olarak silinecek ve verileri sunucularımızdan kaldırılacaktır.
                                                </alert_dialog_1.AlertDialogDescription>
                                                </alert_dialog_1.AlertDialogHeader>
                                                <alert_dialog_1.AlertDialogFooter>
                                                <alert_dialog_1.AlertDialogCancel>İptal</alert_dialog_1.AlertDialogCancel>
                                                <alert_dialog_1.AlertDialogAction onClick={() => handleDelete(sub.id)}>Sil</alert_dialog_1.AlertDialogAction>
                                                </alert_dialog_1.AlertDialogFooter>
                                            </alert_dialog_1.AlertDialogContent>
                                        </alert_dialog_1.AlertDialog>
                                    </dropdown_menu_1.DropdownMenuContent>
                                </dropdown_menu_1.DropdownMenu>
                            </table_1.TableCell>
                        </table_1.TableRow>))}
                </table_1.TableBody>
            </table_1.Table>
            <card_1.CardFooter className="pt-6 border-t bg-muted/50">
                <div className="text-xs text-muted-foreground">
                    Toplam <strong>{subscribers.length}</strong> abone.
                </div>
                <pagination_1.Pagination className="ml-auto">
                    <pagination_1.PaginationContent>
                        <pagination_1.PaginationItem><pagination_1.PaginationPrevious href="#"/></pagination_1.PaginationItem>
                        <pagination_1.PaginationItem><pagination_1.PaginationLink href="#">1</pagination_1.PaginationLink></pagination_1.PaginationItem>
                        <pagination_1.PaginationItem><pagination_1.PaginationNext href="#"/></pagination_1.PaginationItem>
                    </pagination_1.PaginationContent>
                </pagination_1.Pagination>
            </card_1.CardFooter>
        </>);
}
//# sourceMappingURL=subscribers-section.js.map