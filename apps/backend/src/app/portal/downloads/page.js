"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DownloadsPage;
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const education_data_1 = require("@/lib/education-data");
const table_1 = require("@/components/ui/table");
const link_1 = __importDefault(require("next/link"));
function DownloadsPage() {
    const downloads = education_data_1.educationData.content.downloads;
    const documents = education_data_1.educationData.content.documents;
    const allDownloads = [...downloads, ...documents];
    return (<div className="flex-1 space-y-8">
             <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">İndirmelerim</h2>
                    <p className="text-muted-foreground">
                        Erişiminiz olan tüm dökümanlar ve dosyalar.
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
                 <card_1.CardContent className="p-0">
                    <table_1.Table>
                        <table_1.TableHeader>
                            <table_1.TableRow>
                                <table_1.TableHead>Dosya Adı</table_1.TableHead>
                                <table_1.TableHead>Kategori</table_1.TableHead>
                                <table_1.TableHead className="text-right">İndir</table_1.TableHead>
                            </table_1.TableRow>
                        </table_1.TableHeader>
                        <table_1.TableBody>
                            {allDownloads.map((item, index) => (<table_1.TableRow key={index}>
                                    <table_1.TableCell className="font-medium">{item.title}</table_1.TableCell>
                                    <table_1.TableCell>{item.category}</table_1.TableCell>
                                    <table_1.TableCell className="text-right">
                                        <button_1.Button asChild size="sm" variant="outline">
                                            <link_1.default href={item.ctaLink}>
                                                <lucide_react_1.Download className="mr-2 h-4 w-4"/> İndir
                                            </link_1.default>
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