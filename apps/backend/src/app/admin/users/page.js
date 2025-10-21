"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UsersPage;
const card_1 = require("@/components/ui/card");
const table_1 = require("@/components/ui/table");
const badge_1 = require("@/components/ui/badge");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const roles_data_1 = require("@/lib/roles-data");
// Örnek kullanıcı verileri
const users = [
    { id: 'usr-001', name: 'Ahmet Yılmaz', email: 'ahmet.yilmaz@example.com', role: 'Admin', createdAt: '2023-01-15', status: 'Active' },
    { id: 'usr-002', name: 'Zeynep Kaya', email: 'zeynep.kaya@example.com', role: 'Editor', createdAt: '2023-02-20', status: 'Active' },
    { id: 'usr-003', name: 'Mehmet Öztürk', email: 'mehmet.ozturk@example.com', role: 'Viewer', createdAt: '2023-03-10', status: 'Inactive' },
    { id: 'usr-004', name: 'Elif Demir', email: 'elif.demir@example.com', role: 'Support Team', createdAt: '2023-04-05', status: 'Active' },
];
function UsersPage() {
    const activeUsers = users.filter(u => u.status === 'Active').length;
    const inactiveUsers = users.filter(u => u.status === 'Inactive').length;
    return (<div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Kullanıcı Yönetimi</h2>
                    <p className="text-muted-foreground">
                    Sistemdeki kullanıcıları ve rollerini yönetin.
                    </p>
                </div>
                 <button_1.Button asChild>
                    <link_1.default href="/admin/users/new">
                        <lucide_react_1.PlusCircle className="mr-2 h-4 w-4"/>
                        Yeni Kullanıcı Ekle
                    </link_1.default>
                </button_1.Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <card_1.Card>
                    <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <card_1.CardTitle className="text-sm font-medium">Toplam Kullanıcı</card_1.CardTitle>
                        <lucide_react_1.Users className="h-4 w-4 text-muted-foreground"/>
                    </card_1.CardHeader>
                    <card_1.CardContent>
                        <div className="text-2xl font-bold">{users.length}</div>
                    </card_1.CardContent>
                </card_1.Card>
                 <card_1.Card>
                    <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <card_1.CardTitle className="text-sm font-medium">Aktif Kullanıcılar</card_1.CardTitle>
                        <lucide_react_1.UserCheck className="h-4 w-4 text-green-500"/>
                    </card_1.CardHeader>
                    <card_1.CardContent>
                        <div className="text-2xl font-bold">{activeUsers}</div>
                    </card_1.CardContent>
                </card_1.Card>
                <card_1.Card>
                    <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <card_1.CardTitle className="text-sm font-medium">Pasif Kullanıcılar</card_1.CardTitle>
                        <lucide_react_1.UserX className="h-4 w-4 text-destructive"/>
                    </card_1.CardHeader>
                    <card_1.CardContent>
                        <div className="text-2xl font-bold">{inactiveUsers}</div>
                    </card_1.CardContent>
                </card_1.Card>
                 <card_1.Card>
                    <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <card_1.CardTitle className="text-sm font-medium">Toplam Rol</card_1.CardTitle>
                        <lucide_react_1.Users className="h-4 w-4 text-muted-foreground"/>
                    </card_1.CardHeader>
                    <card_1.CardContent>
                        <div className="text-2xl font-bold">{roles_data_1.roles.length}</div>
                    </card_1.CardContent>
                </card_1.Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                 <card_1.Card className="lg:col-span-2">
                    <card_1.CardHeader>
                        <card_1.CardTitle>Kullanıcı Listesi</card_1.CardTitle>
                        <card_1.CardDescription>Mevcut tüm kullanıcıları görüntüleyin ve yönetin.</card_1.CardDescription>
                    </card_1.CardHeader>
                    <card_1.CardContent>
                        <table_1.Table>
                            <table_1.TableHeader>
                                <table_1.TableRow>
                                    <table_1.TableHead>Adı Soyadı</table_1.TableHead>
                                    <table_1.TableHead>Rol</table_1.TableHead>
                                    <table_1.TableHead>Durum</table_1.TableHead>
                                    <table_1.TableHead><span className="sr-only">Eylemler</span></table_1.TableHead>
                                </table_1.TableRow>
                            </table_1.TableHeader>
                            <table_1.TableBody>
                                {users.map(user => (<table_1.TableRow key={user.id}>
                                        <table_1.TableCell className="font-medium">
                                            <div>{user.name}</div>
                                            <div className="text-sm text-muted-foreground">{user.email}</div>
                                        </table_1.TableCell>
                                        <table_1.TableCell>
                                            <badge_1.Badge variant={user.role === 'Admin' ? 'destructive' : 'secondary'}>{user.role}</badge_1.Badge>
                                        </table_1.TableCell>
                                        <table_1.TableCell>
                                            <badge_1.Badge variant={user.status === 'Active' ? 'default' : 'outline'} className={user.status === 'Active' ? 'bg-green-500' : ''}>
                                                {user.status}
                                            </badge_1.Badge>
                                        </table_1.TableCell>
                                        <table_1.TableCell>
                                            <dropdown_menu_1.DropdownMenu>
                                                <dropdown_menu_1.DropdownMenuTrigger asChild>
                                                    <button_1.Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Menüyü aç</span>
                                                        <lucide_react_1.MoreHorizontal className="h-4 w-4"/>
                                                    </button_1.Button>
                                                </dropdown_menu_1.DropdownMenuTrigger>
                                                <dropdown_menu_1.DropdownMenuContent align="end">
                                                    <dropdown_menu_1.DropdownMenuItem asChild>
                                                        <link_1.default href={`/admin/users/${user.id}`}>Düzenle</link_1.default>
                                                    </dropdown_menu_1.DropdownMenuItem>
                                                    <dropdown_menu_1.DropdownMenuItem>Şifre Sıfırla</dropdown_menu_1.DropdownMenuItem>
                                                    <dropdown_menu_1.DropdownMenuSeparator />
                                                    <dropdown_menu_1.DropdownMenuItem className="text-destructive focus:text-destructive">
                                                        Sil
                                                    </dropdown_menu_1.DropdownMenuItem>
                                                </dropdown_menu_1.DropdownMenuContent>
                                            </dropdown_menu_1.DropdownMenu>
                                        </table_1.TableCell>
                                    </table_1.TableRow>))}
                            </table_1.TableBody>
                        </table_1.Table>
                    </card_1.CardContent>
                </card_1.Card>
                 <card_1.Card>
                    <card_1.CardHeader className="flex items-center justify-between">
                        <div>
                            <card_1.CardTitle>Kullanıcı Rolleri</card_1.CardTitle>
                            <card_1.CardDescription>Rolleri ve izinleri yönetin.</card_1.CardDescription>
                        </div>
                        <button_1.Button asChild size="sm" variant="outline">
                            <link_1.default href="/admin/users/roles">Tümünü Yönet <lucide_react_1.ArrowRight className="ml-2 h-4 w-4"/></link_1.default>
                        </button_1.Button>
                    </card_1.CardHeader>
                    <card_1.CardContent>
                        <table_1.Table>
                           <table_1.TableHeader>
                               <table_1.TableRow>
                                   <table_1.TableHead>Rol</table_1.TableHead>
                                   <table_1.TableHead>Kullanıcılar</table_1.TableHead>
                               </table_1.TableRow>
                           </table_1.TableHeader>
                            <table_1.TableBody>
                                {roles_data_1.roles.map(role => (<table_1.TableRow key={role.id}>
                                        <table_1.TableCell className="font-medium">{role.name}</table_1.TableCell>
                                        <table_1.TableCell>
                                             <badge_1.Badge variant="secondary">{role.userCount}</badge_1.Badge>
                                        </table_1.TableCell>
                                    </table_1.TableRow>))}
                            </table_1.TableBody>
                        </table_1.Table>
                    </card_1.CardContent>
                 </card_1.Card>
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map