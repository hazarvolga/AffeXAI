"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LicensesPage;
const card_1 = require("@/components/ui/card");
const table_1 = require("@/components/ui/table");
const badge_1 = require("@/components/ui/badge");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const licenses = [
    {
        product: "Allplan Professional",
        licenseKey: "XXXX-XXXX-XXXX-1234",
        type: "Yıllık Abonelik",
        expiresAt: "2025-08-01T00:00:00.000Z",
        status: "active",
    },
    {
        product: "Allplan Bridge",
        licenseKey: "XXXX-XXXX-XXXX-5678",
        type: "Kalıcı Lisans",
        expiresAt: null,
        status: "active",
    },
    {
        product: "Bimplus Professional",
        licenseKey: "XXXX-XXXX-XXXX-9101",
        type: "Aylık Abonelik",
        expiresAt: "2024-07-20T00:00:00.000Z",
        status: "expired",
    }
];
function LicensesPage() {
    return (<div className="flex-1 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Lisanslarım</h2>
                    <p className="text-muted-foreground">
                        Satın aldığınız tüm lisansları ve abonelikleri burada yönetin.
                    </p>
                </div>
                <button_1.Button asChild variant="outline">
                    <link_1.default href="/portal/dashboard">
                        <lucide_react_1.ArrowLeft className="mr-2 h-4 w-4"/>
                        Geri Dön
                    </link_1.default>
                </button_1.Button>
            </div>
            <card_1.Card>
                <card_1.CardHeader>
                    <card_1.CardTitle>Aktif Lisanslar ve Abonelikler</card_1.CardTitle>
                </card_1.CardHeader>
                <card_1.CardContent>
                    <table_1.Table>
                        <table_1.TableHeader>
                            <table_1.TableRow>
                                <table_1.TableHead>Ürün</table_1.TableHead>
                                <table_1.TableHead>Lisans Tipi</table_1.TableHead>
                                <table_1.TableHead>Durum</table_1.TableHead>
                                <table_1.TableHead>Bitiş Tarihi</table_1.TableHead>
                                <table_1.TableHead className="text-right">Eylemler</table_1.TableHead>
                            </table_1.TableRow>
                        </table_1.TableHeader>
                        <table_1.TableBody>
                            {licenses.map((license) => (<table_1.TableRow key={license.licenseKey}>
                                    <table_1.TableCell className="font-medium">{license.product}</table_1.TableCell>
                                    <table_1.TableCell>{license.type}</table_1.TableCell>
                                    <table_1.TableCell>
                                        <badge_1.Badge variant={license.status === 'active' ? 'default' : 'destructive'} className={license.status === 'active' ? 'bg-green-600' : ''}>
                                            {license.status === 'active' ? 'Aktif' : 'Süresi Dolmuş'}
                                        </badge_1.Badge>
                                    </table_1.TableCell>
                                    <table_1.TableCell>
                                        {license.expiresAt ? new Date(license.expiresAt).toLocaleDateString('tr-TR') : 'Süresiz'}
                                    </table_1.TableCell>
                                    <table_1.TableCell className="text-right">
                                        <button_1.Button variant="outline" size="sm">
                                            <lucide_react_1.KeyRound className="mr-2 h-4 w-4"/>
                                            Anahtarı Göster
                                        </button_1.Button>
                                    </table_1.TableCell>
                                </table_1.TableRow>))}
                        </table_1.TableBody>
                    </table_1.Table>
                </card_1.CardContent>
            </card_1.Card>
        </div>);
}
//# sourceMappingURL=page.js.map