"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleForm = RoleForm;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const label_1 = require("@/components/ui/label");
const input_1 = require("@/components/ui/input");
const button_1 = require("@/components/ui/button");
const roles_data_1 = require("@/lib/roles-data");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const checkbox_1 = require("../ui/checkbox");
const textarea_1 = require("../ui/textarea");
function RoleForm({ role }) {
    const isEditing = !!role;
    const [selectedPermissions, setSelectedPermissions] = (0, react_1.useState)(role?.permissionIds || []);
    const handlePermissionChange = (permissionId) => {
        setSelectedPermissions(prev => prev.includes(permissionId)
            ? prev.filter(id => id !== permissionId)
            : [...prev, permissionId]);
    };
    const groupedPermissions = roles_data_1.permissions.reduce((acc, permission) => {
        const category = permission.category || 'Diğer';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(permission);
        return acc;
    }, {});
    // Ensure a consistent order for categories
    const orderedCategories = [
        'Kullanıcı Yönetimi',
        'Etkinlik Yönetimi',
        'Sertifika Yönetimi',
        'Destek Yönetimi',
        'Pazarlama Yönetimi',
        'CMS Yönetimi',
        'Sistem Ayarları',
    ].filter(c => groupedPermissions[c]);
    return (<form>
             <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{isEditing ? `Rolü Düzenle: ${role.name}` : 'Yeni Rol Oluştur'}</h1>
                    <p className="text-muted-foreground">Rolün detaylarını ve izinlerini yapılandırın.</p>
                </div>
                <button_1.Button variant="outline" asChild>
                    <link_1.default href="/admin/users/roles">
                        <lucide_react_1.ArrowLeft className="mr-2 h-4 w-4"/>
                        Geri Dön
                    </link_1.default>
                </button_1.Button>
            </div>
            <card_1.Card>
                <card_1.CardHeader>
                    <card_1.CardTitle>Rol Bilgileri</card_1.CardTitle>
                </card_1.CardHeader>
                <card_1.CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label_1.Label htmlFor="role-name">Rol Adı</label_1.Label>
                        <input_1.Input id="role-name" defaultValue={role?.name} placeholder="Örn: Pazarlama Uzmanı"/>
                    </div>
                    <div className="space-y-2">
                        <label_1.Label htmlFor="role-description">Açıklama</label_1.Label>
                        <textarea_1.Textarea id="role-description" defaultValue={role?.description} placeholder="Bu rolün amacını ve yetkilerini kısaca açıklayın."/>
                    </div>
                </card_1.CardContent>
            </card_1.Card>

            <card_1.Card className="mt-8">
                <card_1.CardHeader>
                    <card_1.CardTitle>İzinler</card_1.CardTitle>
                    <card_1.CardDescription>Bu role atanacak izinleri seçin.</card_1.CardDescription>
                </card_1.CardHeader>
                <card_1.CardContent className="space-y-6">
                     {orderedCategories.map((category) => (<div key={category}>
                             <h4 className="font-medium mb-4 flex items-center gap-2 border-b pb-2"><lucide_react_1.ShieldCheck className="h-5 w-5 text-muted-foreground"/> {category}</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {groupedPermissions[category].map(permission => (<div key={permission.id} className="flex items-center space-x-2">
                                        <checkbox_1.Checkbox id={permission.id} checked={selectedPermissions.includes(permission.id)} onCheckedChange={() => handlePermissionChange(permission.id)}/>
                                        <label_1.Label htmlFor={permission.id} className="font-normal">{permission.name}</label_1.Label>
                                    </div>))}
                            </div>
                        </div>))}
                </card_1.CardContent>
            </card_1.Card>
            
            <div className="mt-8 flex justify-end">
                <button_1.Button type="submit">
                    <lucide_react_1.Save className="mr-2 h-4 w-4"/>
                    {isEditing ? 'Değişiklikleri Kaydet' : 'Rolü Oluştur'}
                </button_1.Button>
            </div>
        </form>);
}
//# sourceMappingURL=role-form.js.map