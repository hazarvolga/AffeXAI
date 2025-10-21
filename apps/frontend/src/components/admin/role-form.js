"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleForm = RoleForm;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const card_1 = require("@/components/ui/card");
const label_1 = require("@/components/ui/label");
const input_1 = require("@/components/ui/input");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const checkbox_1 = require("../ui/checkbox");
const textarea_1 = require("../ui/textarea");
const api_1 = require("@/lib/api");
const use_toast_1 = require("@/hooks/use-toast");
// Available permissions - Backend'de bunları bir endpoint'ten alabiliriz ileride
const AVAILABLE_PERMISSIONS = [
    // User Management
    { id: 'users.view', name: 'Kullanıcıları Görüntüle', category: 'Kullanıcı Yönetimi' },
    { id: 'users.create', name: 'Kullanıcı Oluştur', category: 'Kullanıcı Yönetimi' },
    { id: 'users.update', name: 'Kullanıcı Düzenle', category: 'Kullanıcı Yönetimi' },
    { id: 'users.delete', name: 'Kullanıcı Sil', category: 'Kullanıcı Yönetimi' },
    { id: 'roles.view', name: 'Rolleri Görüntüle', category: 'Kullanıcı Yönetimi' },
    { id: 'roles.manage', name: 'Rolleri Yönet', category: 'Kullanıcı Yönetimi' },
    // Event Management
    { id: 'events.view', name: 'Etkinlikleri Görüntüle', category: 'Etkinlik Yönetimi' },
    { id: 'events.create', name: 'Etkinlik Oluştur', category: 'Etkinlik Yönetimi' },
    { id: 'events.update', name: 'Etkinlik Düzenle', category: 'Etkinlik Yönetimi' },
    { id: 'events.delete', name: 'Etkinlik Sil', category: 'Etkinlik Yönetimi' },
    { id: 'events.participants', name: 'Katılımcıları Yönet', category: 'Etkinlik Yönetimi' },
    // Certificate Management
    { id: 'certificates.view', name: 'Sertifikaları Görüntüle', category: 'Sertifika Yönetimi' },
    { id: 'certificates.create', name: 'Sertifika Oluştur', category: 'Sertifika Yönetimi' },
    { id: 'certificates.update', name: 'Sertifika Düzenle', category: 'Sertifika Yönetimi' },
    { id: 'certificates.revoke', name: 'Sertifika İptal Et', category: 'Sertifika Yönetimi' },
    // Support Management
    { id: 'support.view', name: 'Destek Taleplerini Görüntüle', category: 'Destek Yönetimi' },
    { id: 'support.respond', name: 'Talep Yanıtla', category: 'Destek Yönetimi' },
    { id: 'support.assign', name: 'Talep Ata', category: 'Destek Yönetimi' },
    // Marketing Management
    { id: 'marketing.manage', name: 'Pazarlama İçeriklerini Yönet', category: 'Pazarlama Yönetimi' },
    { id: 'marketing.campaigns', name: 'Kampanya Yönet', category: 'Pazarlama Yönetimi' },
    // CMS Management
    { id: 'cms.pages.view', name: 'Sayfaları Görüntüle', category: 'CMS Yönetimi' },
    { id: 'cms.pages.create', name: 'Sayfa Oluştur', category: 'CMS Yönetimi' },
    { id: 'cms.pages.update', name: 'Sayfa Düzenle', category: 'CMS Yönetimi' },
    { id: 'cms.pages.delete', name: 'Sayfa Sil', category: 'CMS Yönetimi' },
    { id: 'cms.menus.manage', name: 'Menüleri Yönet', category: 'CMS Yönetimi' },
    // System Settings
    { id: 'system.settings', name: 'Sistem Ayarlarını Yönet', category: 'Sistem Ayarları' },
    { id: 'system.logs', name: 'Sistem Loglarını Görüntüle', category: 'Sistem Ayarları' },
];
function RoleForm({ role }) {
    const router = (0, navigation_1.useRouter)();
    const { toast } = (0, use_toast_1.useToast)();
    const isEditing = !!role;
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [formData, setFormData] = (0, react_1.useState)({
        name: role?.name || '',
        displayName: role?.displayName || '',
        description: role?.description || '',
    });
    const [selectedPermissions, setSelectedPermissions] = (0, react_1.useState)(role?.permissions || []);
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        const field = id.replace('role-', '');
        setFormData(prev => ({ ...prev, [field]: value }));
    };
    const handlePermissionChange = (permissionId) => {
        setSelectedPermissions(prev => prev.includes(permissionId)
            ? prev.filter(id => id !== permissionId)
            : [...prev, permissionId]);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEditing && role) {
                // Update existing role
                const updateData = {
                    displayName: formData.displayName,
                    description: formData.description,
                };
                await api_1.rolesService.updateRole(role.id, updateData);
                // Update permissions separately
                await api_1.rolesService.updateRolePermissions(role.id, selectedPermissions);
                toast({
                    title: 'Başarılı',
                    description: 'Rol başarıyla güncellendi',
                });
            }
            else {
                // Create new role
                const createData = {
                    name: formData.name,
                    displayName: formData.displayName,
                    description: formData.description,
                    permissions: selectedPermissions,
                };
                await api_1.rolesService.createRole(createData);
                toast({
                    title: 'Başarılı',
                    description: 'Rol başarıyla oluşturuldu',
                });
            }
            router.push('/admin/users/roles');
        }
        catch (error) {
            console.error('Failed to save role:', error);
            toast({
                title: 'Hata',
                description: error.message || 'Rol kaydedilirken bir hata oluştu',
                variant: 'destructive',
            });
        }
        finally {
            setLoading(false);
        }
    };
    const handleDelete = async () => {
        if (!role)
            return;
        if (role.isSystem) {
            toast({
                title: 'Uyarı',
                description: 'Sistem rolleri silinemez',
                variant: 'destructive',
            });
            return;
        }
        if (!confirm('Bu rolü silmek istediğinizden emin misiniz?'))
            return;
        try {
            setLoading(true);
            await api_1.rolesService.deleteRole(role.id);
            toast({
                title: 'Başarılı',
                description: 'Rol başarıyla silindi',
            });
            router.push('/admin/users/roles');
        }
        catch (error) {
            console.error('Failed to delete role:', error);
            toast({
                title: 'Hata',
                description: error.message || 'Rol silinirken bir hata oluştu',
                variant: 'destructive',
            });
            setLoading(false);
        }
    };
    const groupedPermissions = AVAILABLE_PERMISSIONS.reduce((acc, permission) => {
        const category = permission.category || 'Diğer';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(permission);
        return acc;
    }, {});
    const orderedCategories = [
        'Kullanıcı Yönetimi',
        'Etkinlik Yönetimi',
        'Sertifika Yönetimi',
        'Destek Yönetimi',
        'Pazarlama Yönetimi',
        'CMS Yönetimi',
        'Sistem Ayarları',
    ].filter(c => groupedPermissions[c]);
    return (<form onSubmit={handleSubmit}>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        {isEditing ? `Rolü Düzenle: ${role.displayName}` : 'Yeni Rol Oluştur'}
                    </h1>
                    <p className="text-muted-foreground">Rolün detaylarını ve izinlerini yapılandırın.</p>
                </div>
                <div className="flex gap-2">
                    {isEditing && !role?.isSystem && (<button_1.Button type="button" variant="destructive" onClick={handleDelete} disabled={loading}>
                            <lucide_react_1.Trash2 className="mr-2 h-4 w-4"/>
                            Rolü Sil
                        </button_1.Button>)}
                    <button_1.Button variant="outline" asChild type="button">
                        <link_1.default href="/admin/users/roles">
                            <lucide_react_1.ArrowLeft className="mr-2 h-4 w-4"/>
                            Geri Dön
                        </link_1.default>
                    </button_1.Button>
                </div>
            </div>
            
            <card_1.Card>
                <card_1.CardHeader>
                    <card_1.CardTitle>Rol Bilgileri</card_1.CardTitle>
                </card_1.CardHeader>
                <card_1.CardContent className="space-y-4">
                    {!isEditing && (<div className="space-y-2">
                            <label_1.Label htmlFor="role-name">Rol Adı (Sistem İçi) *</label_1.Label>
                            <input_1.Input id="role-name" value={formData.name} onChange={handleInputChange} placeholder="Örn: marketing_specialist" required/>
                            <p className="text-xs text-muted-foreground">
                                Küçük harf, alt çizgi ile. Oluşturulduktan sonra değiştirilemez.
                            </p>
                        </div>)}
                    <div className="space-y-2">
                        <label_1.Label htmlFor="role-displayName">Görünen Ad *</label_1.Label>
                        <input_1.Input id="role-displayName" value={formData.displayName} onChange={handleInputChange} placeholder="Örn: Pazarlama Uzmanı" required/>
                    </div>
                    <div className="space-y-2">
                        <label_1.Label htmlFor="role-description">Açıklama</label_1.Label>
                        <textarea_1.Textarea id="role-description" value={formData.description} onChange={handleInputChange} placeholder="Bu rolün amacını ve yetkilerini kısaca açıklayın." className="min-h-[100px]"/>
                    </div>
                </card_1.CardContent>
            </card_1.Card>

            <card_1.Card className="mt-8">
                <card_1.CardHeader>
                    <card_1.CardTitle>İzinler</card_1.CardTitle>
                    <card_1.CardDescription>
                        Bu role atanacak izinleri seçin. {selectedPermissions.length} izin seçildi.
                    </card_1.CardDescription>
                </card_1.CardHeader>
                <card_1.CardContent className="space-y-6">
                    {orderedCategories.map((category) => (<div key={category}>
                            <h4 className="font-medium mb-4 flex items-center gap-2 border-b pb-2">
                                <lucide_react_1.ShieldCheck className="h-5 w-5 text-muted-foreground"/> 
                                {category}
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {groupedPermissions[category].map(permission => (<div key={permission.id} className="flex items-center space-x-2">
                                        <checkbox_1.Checkbox id={permission.id} checked={selectedPermissions.includes(permission.id)} onCheckedChange={() => handlePermissionChange(permission.id)}/>
                                        <label_1.Label htmlFor={permission.id} className="font-normal cursor-pointer">
                                            {permission.name}
                                        </label_1.Label>
                                    </div>))}
                            </div>
                        </div>))}
                </card_1.CardContent>
            </card_1.Card>
            
            <div className="mt-8 flex justify-end">
                <button_1.Button type="submit" disabled={loading}>
                    <lucide_react_1.Save className="mr-2 h-4 w-4"/>
                    {loading ? 'Kaydediliyor...' : (isEditing ? 'Değişiklikleri Kaydet' : 'Rolü Oluştur')}
                </button_1.Button>
            </div>
        </form>);
}
//# sourceMappingURL=role-form.js.map