"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GroupsManagementPage;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const textarea_1 = require("@/components/ui/textarea");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const groupsService_1 = __importDefault(require("@/lib/api/groupsService"));
const table_1 = require("@/components/ui/table");
const badge_1 = require("@/components/ui/badge");
const alert_dialog_1 = require("@/components/ui/alert-dialog");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
function GroupsManagementPage() {
    const [isCreating, setIsCreating] = (0, react_1.useState)(false);
    const [groups, setGroups] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [newGroup, setNewGroup] = (0, react_1.useState)({
        name: '',
        description: '',
    });
    (0, react_1.useEffect)(() => {
        fetchGroups();
    }, []);
    const fetchGroups = async () => {
        try {
            setLoading(true);
            const data = await groupsService_1.default.getAllGroups();
            setGroups(data);
        }
        catch (err) {
            console.error('Error fetching groups:', err);
        }
        finally {
            setLoading(false);
        }
    };
    const handleCreateGroup = async () => {
        try {
            await groupsService_1.default.createGroup({
                name: newGroup.name,
                description: newGroup.description,
            });
            // Reset form
            setNewGroup({
                name: '',
                description: '',
            });
            // Refresh groups list
            fetchGroups();
            // Show success message
            alert('Grup başarıyla oluşturuldu!');
            setIsCreating(false);
        }
        catch (err) {
            console.error('Error creating group:', err);
            alert('Grup oluşturulurken bir hata oluştu.');
        }
    };
    const handleDeleteGroup = async (id) => {
        try {
            await groupsService_1.default.deleteGroup(id);
            // Refresh groups list
            fetchGroups();
            alert('Grup başarıyla silindi!');
        }
        catch (err) {
            console.error('Error deleting group:', err);
            alert('Grup silinirken bir hata oluştu.');
        }
    };
    if (loading) {
        return (<div className="space-y-8">
        <div className="flex items-center gap-4">
          <button_1.Button variant="outline" size="icon" asChild>
            <link_1.default href="/admin/newsletter">
              <lucide_react_1.ArrowLeft className="h-4 w-4"/>
            </link_1.default>
          </button_1.Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Grupları Yönet</h1>
            <p className="text-muted-foreground">Abonelerinizi manuel olarak atadığınız statik listeler halinde yönetin.</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-muted-foreground">Gruplar yükleniyor...</div>
        </div>
      </div>);
    }
    return (<div className="space-y-8">
      <div className="flex items-center gap-4">
        <button_1.Button variant="outline" size="icon" asChild>
          <link_1.default href="/admin/newsletter">
            <lucide_react_1.ArrowLeft className="h-4 w-4"/>
          </link_1.default>
        </button_1.Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Grupları Yönet</h1>
          <p className="text-muted-foreground">Abonelerinizi manuel olarak atadığınız statik listeler halinde yönetin.</p>
        </div>
      </div>

      {isCreating ? (<card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle>Yeni Grup Oluştur</card_1.CardTitle>
            <card_1.CardDescription>
              Yeni bir grup tanımlayın.
            </card_1.CardDescription>
          </card_1.CardHeader>
          <card_1.CardContent className="space-y-4">
            <div className="space-y-2">
              <label_1.Label htmlFor="group-name">Grup Adı</label_1.Label>
              <input_1.Input id="group-name" value={newGroup.name} onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })} placeholder="Grup adı"/>
            </div>
            <div className="space-y-2">
              <label_1.Label htmlFor="group-description">Açıklama</label_1.Label>
              <textarea_1.Textarea id="group-description" value={newGroup.description} onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })} placeholder="Grup açıklaması"/>
            </div>
            <div className="flex justify-end gap-2">
              <button_1.Button variant="outline" onClick={() => setIsCreating(false)}>
                İptal
              </button_1.Button>
              <button_1.Button onClick={handleCreateGroup} disabled={!newGroup.name}>
                Grup Oluştur
              </button_1.Button>
            </div>
          </card_1.CardContent>
        </card_1.Card>) : (<div className="space-y-6">
          <card_1.Card>
            <card_1.CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <card_1.CardTitle>Gruplar</card_1.CardTitle>
                  <card_1.CardDescription>
                    Mevcut gruplarınızı görüntüleyin ve yönetin.
                  </card_1.CardDescription>
                </div>
                <button_1.Button onClick={() => setIsCreating(true)}>
                  <lucide_react_1.PlusCircle className="mr-2 h-4 w-4"/>
                  Yeni Grup Oluştur
                </button_1.Button>
              </div>
            </card_1.CardHeader>
            <card_1.CardContent>
              {groups.length === 0 ? (<div className="flex flex-col items-center justify-center py-12 gap-4">
                  <lucide_react_1.Folder className="h-12 w-12 text-muted-foreground"/>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">Henüz hiç grubunuz yok</h3>
                    <p className="text-muted-foreground">
                      Yeni gruplar oluşturarak abonelerinizi organize edin.
                    </p>
                  </div>
                </div>) : (<table_1.Table>
                  <table_1.TableHeader>
                    <table_1.TableRow>
                      <table_1.TableHead>Grup Adı</table_1.TableHead>
                      <table_1.TableHead>Açıklama</table_1.TableHead>
                      <table_1.TableHead>Abone Sayısı</table_1.TableHead>
                      <table_1.TableHead><span className="sr-only">Eylemler</span></table_1.TableHead>
                    </table_1.TableRow>
                  </table_1.TableHeader>
                  <table_1.TableBody>
                    {groups.map((group) => (<table_1.TableRow key={group.id}>
                        <table_1.TableCell className="font-medium">{group.name}</table_1.TableCell>
                        <table_1.TableCell className="text-muted-foreground">{group.description || '-'}</table_1.TableCell>
                        <table_1.TableCell>
                          <badge_1.Badge variant="secondary">{group.subscriberCount}</badge_1.Badge>
                        </table_1.TableCell>
                        <table_1.TableCell className="text-right">
                          <dropdown_menu_1.DropdownMenu>
                            <dropdown_menu_1.DropdownMenuTrigger asChild>
                              <button_1.Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Menüyü aç</span>
                                <span className="text-lg">⋮</span>
                              </button_1.Button>
                            </dropdown_menu_1.DropdownMenuTrigger>
                            <dropdown_menu_1.DropdownMenuContent align="end">
                              <dropdown_menu_1.DropdownMenuItem>
                                <lucide_react_1.Edit className="mr-2 h-4 w-4"/>
                                Düzenle
                              </dropdown_menu_1.DropdownMenuItem>
                              <alert_dialog_1.AlertDialog>
                                <alert_dialog_1.AlertDialogTrigger asChild>
                                  <dropdown_menu_1.DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive">
                                    <lucide_react_1.Trash2 className="mr-2 h-4 w-4"/>
                                    Sil
                                  </dropdown_menu_1.DropdownMenuItem>
                                </alert_dialog_1.AlertDialogTrigger>
                                <alert_dialog_1.AlertDialogContent>
                                  <alert_dialog_1.AlertDialogHeader>
                                    <alert_dialog_1.AlertDialogTitle>Emin misiniz?</alert_dialog_1.AlertDialogTitle>
                                    <alert_dialog_1.AlertDialogDescription>
                                      Bu işlem geri alınamaz. "{group.name}" grubu kalıcı olarak silinecek.
                                    </alert_dialog_1.AlertDialogDescription>
                                  </alert_dialog_1.AlertDialogHeader>
                                  <alert_dialog_1.AlertDialogFooter>
                                    <alert_dialog_1.AlertDialogCancel>İptal</alert_dialog_1.AlertDialogCancel>
                                    <alert_dialog_1.AlertDialogAction onClick={() => handleDeleteGroup(group.id)}>
                                      Sil
                                    </alert_dialog_1.AlertDialogAction>
                                  </alert_dialog_1.AlertDialogFooter>
                                </alert_dialog_1.AlertDialogContent>
                              </alert_dialog_1.AlertDialog>
                            </dropdown_menu_1.DropdownMenuContent>
                          </dropdown_menu_1.DropdownMenu>
                        </table_1.TableCell>
                      </table_1.TableRow>))}
                  </table_1.TableBody>
                </table_1.Table>)}
            </card_1.CardContent>
          </card_1.Card>
        </div>)}
    </div>);
}
//# sourceMappingURL=page.js.map