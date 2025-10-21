"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserForm = UserForm;
const card_1 = require("@/components/ui/card");
const label_1 = require("@/components/ui/label");
const input_1 = require("@/components/ui/input");
const button_1 = require("@/components/ui/button");
const select_1 = require("@/components/ui/select");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const roles_data_1 = require("@/lib/roles-data");
function UserForm({ user = null }) {
    const isEditing = !!user;
    return (<form>
            <card_1.Card>
                <card_1.CardHeader>
                    <card_1.CardTitle>{isEditing ? 'Kullanıcıyı Düzenle' : 'Yeni Kullanıcı Oluştur'}</card_1.CardTitle>
                    <card_1.CardDescription>
                        {isEditing ? 'Kullanıcı bilgilerini ve rolünü güncelleyin.' : 'Sisteme yeni bir kullanıcı ekleyin.'}
                    </card_1.CardDescription>
                </card_1.CardHeader>
                <card_1.CardContent className="space-y-6">
                     <div className="space-y-2">
                        <label_1.Label htmlFor="name">Adı Soyadı</label_1.Label>
                         <div className="relative flex items-center">
                           <lucide_react_1.User className="absolute left-3 h-4 w-4 text-muted-foreground"/>
                           <input_1.Input id="name" defaultValue={user?.name} placeholder="Ahmet Yılmaz" className="pl-10"/>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <label_1.Label htmlFor="email">E-posta</label_1.Label>
                        <div className="relative flex items-center">
                           <lucide_react_1.Mail className="absolute left-3 h-4 w-4 text-muted-foreground"/>
                           <input_1.Input id="email" type="email" defaultValue={user?.email} placeholder="ornek@example.com" className="pl-10"/>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <label_1.Label htmlFor="password">Şifre</label_1.Label>
                        <div className="relative flex items-center">
                           <lucide_react_1.KeyRound className="absolute left-3 h-4 w-4 text-muted-foreground"/>
                           <input_1.Input id="password" type="password" placeholder={user ? 'Değiştirmek için yeni şifre girin' : 'Yeni kullanıcı şifresi'} className="pl-10"/>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <label_1.Label htmlFor="role">Rol</label_1.Label>
                        <select_1.Select defaultValue={user?.role || 'Viewer'}>
                            <select_1.SelectTrigger id="role">
                                <select_1.SelectValue placeholder="Bir rol seçin"/>
                            </select_1.SelectTrigger>
                            <select_1.SelectContent>
                                {roles_data_1.roles.map(role => (<select_1.SelectItem key={role.id} value={role.name}>{role.name}</select_1.SelectItem>))}
                            </select_1.SelectContent>
                        </select_1.Select>
                    </div>
                </card_1.CardContent>
                <card_1.CardFooter className="flex justify-end gap-4">
                     <button_1.Button variant="outline" asChild><link_1.default href="/admin/users">İptal</link_1.default></button_1.Button>
                    <button_1.Button type="submit">
                        <lucide_react_1.Save className="mr-2 h-4 w-4"/>
                        {isEditing ? 'Değişiklikleri Kaydet' : 'Kullanıcıyı Oluştur'}
                    </button_1.Button>
                </card_1.CardFooter>
            </card_1.Card>
        </form>);
}
//# sourceMappingURL=user-form.js.map