"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TemplatesSection;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const lucide_react_1 = require("lucide-react");
const button_1 = require("@/components/ui/button");
const table_1 = require("@/components/ui/table");
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
const templatesService_1 = __importDefault(require("@/lib/api/templatesService"));
function TemplatesSection() {
    const [templates, setTemplates] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await templatesService_1.default.getAllTemplates();
                setTemplates(data);
            }
            catch (error) {
                console.error('Error fetching templates:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    if (loading) {
        return (<div className="flex items-center justify-center py-8">
                <div className="text-muted-foreground">Şablonlar yükleniyor...</div>
            </div>);
    }
    if (!templates || (templates.dbTemplates.length === 0 && templates.fileTemplates.length === 0)) {
        return (<>
                <div className="text-center text-muted-foreground py-12">
                    <lucide_react_1.LayoutTemplate className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50"/>
                    <h3 className="text-lg font-semibold">Henüz Şablon Oluşturulmadı</h3>
                    <p className="mt-1">"Yeni Şablon Oluştur" butonuna tıklayarak ilk e-posta şablonunuzu tasarlamaya başlayın.</p>
                </div>
                <card_1.CardFooter className="pt-6 border-t bg-muted/50 justify-center">
                    <p className="text-xs text-muted-foreground">
                        Gelecekte burada sürükle-bırak bir şablon editörü yer alacak.
                    </p>
                </card_1.CardFooter>
            </>);
    }
    // Combine db and file templates for display
    const allTemplates = [
        ...templates.dbTemplates.map(template => ({
            id: template.id,
            name: template.name,
            description: template.description || 'Veritabanı şablonu',
            thumbnailUrl: template.thumbnailUrl || '/placeholders/template-default.png',
            createdAt: template.createdAt,
            type: 'db'
        })),
        ...templates.fileTemplates.map(template => ({
            id: template.id,
            name: template.name,
            description: 'Dosya şablonu',
            thumbnailUrl: '/placeholders/template-default.png',
            createdAt: new Date().toISOString(),
            type: 'file'
        }))
    ];
    return (<>
            <table_1.Table>
                <table_1.TableHeader>
                    <table_1.TableRow>
                        <table_1.TableHead className="w-[120px]">Önizleme</table_1.TableHead>
                        <table_1.TableHead>Şablon Adı</table_1.TableHead>
                        <table_1.TableHead>Açıklama</table_1.TableHead>
                        <table_1.TableHead>Oluşturulma Tarihi</table_1.TableHead>
                        <table_1.TableHead className="text-right">Eylemler</table_1.TableHead>
                    </table_1.TableRow>
                </table_1.TableHeader>
                <table_1.TableBody>
                   {allTemplates.map(template => (<table_1.TableRow key={template.id}>
                            <table_1.TableCell>
                                <image_1.default src={template.thumbnailUrl} alt={template.name} width={120} height={90} className="rounded-md border aspect-[4/3] object-cover"/>
                            </table_1.TableCell>
                            <table_1.TableCell className="font-semibold">{template.name}</table_1.TableCell>
                            <table_1.TableCell className="text-muted-foreground">{template.description}</table_1.TableCell>
                            <table_1.TableCell>{new Date(template.createdAt).toLocaleDateString('tr-TR')}</table_1.TableCell>
                            <table_1.TableCell className="text-right">
                                <button_1.Button variant="outline" size="sm" className="mr-2" asChild>
                                    <link_1.default href={`/admin/newsletter/templates/${template.id}/preview`} target="_blank">
                                        <lucide_react_1.Eye className="mr-2 h-4 w-4"/> Önizle
                                    </link_1.default>
                                </button_1.Button>
                                <button_1.Button variant="secondary" size="sm" asChild>
                                    <link_1.default href={`/admin/newsletter/templates/${template.id}/edit`}>
                                        <lucide_react_1.Pen className="mr-2 h-4 w-4"/> Düzenle
                                    </link_1.default>
                                </button_1.Button>
                            </table_1.TableCell>
                       </table_1.TableRow>))}
                </table_1.TableBody>
            </table_1.Table>
            <card_1.CardFooter className="pt-6 border-t bg-muted/50 justify-between items-center">
                 <p className="text-xs text-muted-foreground">
                    Şablonlar React Email kullanılarak <code>src/emails</code> klasöründe yönetilir.
                </p>
                <button_1.Button>
                    <lucide_react_1.PlusCircle className="mr-2 h-4 w-4"/> Yeni Şablon Oluştur
                </button_1.Button>
            </card_1.CardFooter>
        </>);
}
//# sourceMappingURL=templates-section.js.map