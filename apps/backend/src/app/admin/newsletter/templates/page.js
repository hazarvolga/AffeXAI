"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TemplatesManagementPage;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const templatesService_1 = __importDefault(require("@/lib/api/templatesService"));
const table_1 = require("@/components/ui/table");
const image_1 = __importDefault(require("next/image"));
const badge_1 = require("@/components/ui/badge");
function TemplatesManagementPage() {
    const [templates, setTemplates] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await templatesService_1.default.getAllTemplates();
                setTemplates(data);
            }
            catch (err) {
                console.error('Error fetching templates:', err);
                setError('Şablonlar yüklenirken bir hata oluştu.');
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const handleCreateFromTemplate = async (fileTemplateName, templateName) => {
        try {
            await templatesService_1.default.createTemplateFromFile(fileTemplateName, templateName);
            // Refresh the template list
            const data = await templatesService_1.default.getAllTemplates();
            setTemplates(data);
        }
        catch (err) {
            console.error('Error creating template from file:', err);
            alert('Şablon oluşturulurken bir hata oluştu.');
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
            <h1 className="text-3xl font-bold tracking-tight">Şablonları Yönet</h1>
            <p className="text-muted-foreground">Yeniden kullanılabilir e-posta şablonları oluşturun ve yönetin.</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-muted-foreground">Şablonlar yükleniyor...</div>
        </div>
      </div>);
    }
    if (error) {
        return (<div className="space-y-8">
        <div className="flex items-center gap-4">
          <button_1.Button variant="outline" size="icon" asChild>
            <link_1.default href="/admin/newsletter">
              <lucide_react_1.ArrowLeft className="h-4 w-4"/>
            </link_1.default>
          </button_1.Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Şablonları Yönet</h1>
            <p className="text-muted-foreground">Yeniden kullanılabilir e-posta şablonları oluşturun ve yönetin.</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-destructive">{error}</div>
        </div>
      </div>);
    }
    // Combine db and file templates for display
    const allTemplates = templates ? [
        ...templates.dbTemplates.map(template => ({
            id: template.id,
            name: template.name,
            description: template.description || 'Veritabanı şablonu',
            thumbnailUrl: template.thumbnailUrl || '/placeholders/template-default.png',
            createdAt: template.createdAt,
            type: 'db',
            templateType: template.type,
            isCustom: template.type === 'custom'
        })),
        ...templates.fileTemplates.map(template => ({
            id: template.id,
            name: template.name,
            description: 'Hazır şablon',
            thumbnailUrl: '/placeholders/template-default.png',
            createdAt: new Date().toISOString(),
            type: 'file',
            templateType: 'file_based',
            isCustom: false
        }))
    ] : [];
    return (<div className="space-y-8">
      <div className="flex items-center gap-4">
        <button_1.Button variant="outline" size="icon" asChild>
          <link_1.default href="/admin/newsletter">
            <lucide_react_1.ArrowLeft className="h-4 w-4"/>
          </link_1.default>
        </button_1.Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Şablonları Yönet</h1>
          <p className="text-muted-foreground">Yeniden kullanılabilir e-posta şablonları oluşturun ve yönetin.</p>
        </div>
      </div>

      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle>Şablonlar</card_1.CardTitle>
          <card_1.CardDescription>
            Mevcut e-posta şablonlarınızı görüntüleyin ve yönetin. Toplam {templates?.total || 0} şablon.
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent>
          {allTemplates.length === 0 ? (<div className="flex flex-col items-center justify-center py-12 gap-4">
              <lucide_react_1.LayoutTemplate className="h-12 w-12 text-muted-foreground"/>
              <div className="text-center">
                <h3 className="text-lg font-semibold">Henüz Şablon Oluşturulmadı</h3>
                <p className="text-muted-foreground">
                  Yeni şablonlar oluşturarak e-posta gönderimlerinizi kolaylaştırın.
                </p>
              </div>
              <button_1.Button>
                <lucide_react_1.PlusCircle className="mr-2 h-4 w-4"/>
                Yeni Şablon Oluştur
              </button_1.Button>
            </div>) : (<table_1.Table>
              <table_1.TableHeader>
                <table_1.TableRow>
                  <table_1.TableHead className="w-[120px]">Önizleme</table_1.TableHead>
                  <table_1.TableHead>Şablon Adı</table_1.TableHead>
                  <table_1.TableHead>Açıklama</table_1.TableHead>
                  <table_1.TableHead>Tür</table_1.TableHead>
                  <table_1.TableHead>Oluşturulma Tarihi</table_1.TableHead>
                  <table_1.TableHead className="text-right">Eylemler</table_1.TableHead>
                </table_1.TableRow>
              </table_1.TableHeader>
              <table_1.TableBody>
                {allTemplates.map((template) => (<table_1.TableRow key={`${template.type}-${template.id}`}>
                    <table_1.TableCell>
                      <image_1.default src={template.thumbnailUrl} alt={template.name} width={120} height={90} className="rounded-md border aspect-[4/3] object-cover"/>
                    </table_1.TableCell>
                    <table_1.TableCell className="font-medium">
                      {template.name}
                      {template.isCustom && (<badge_1.Badge variant="secondary" className="ml-2">Özelleştirilmiş</badge_1.Badge>)}
                    </table_1.TableCell>
                    <table_1.TableCell className="text-muted-foreground">{template.description}</table_1.TableCell>
                    <table_1.TableCell>
                      {template.type === 'file' ? (<badge_1.Badge variant="outline">Hazır Şablon</badge_1.Badge>) : (<badge_1.Badge variant="default">Özel</badge_1.Badge>)}
                    </table_1.TableCell>
                    <table_1.TableCell>{new Date(template.createdAt).toLocaleDateString('tr-TR')}</table_1.TableCell>
                    <table_1.TableCell className="text-right">
                      <button_1.Button variant="outline" size="sm" className="mr-2" asChild>
                        <link_1.default href={`/admin/newsletter/templates/${template.id}/preview?type=${template.type}`}>
                          <lucide_react_1.Eye className="mr-2 h-4 w-4"/> Önizle
                        </link_1.default>
                      </button_1.Button>
                      
                      {template.type === 'file' ? (<button_1.Button variant="secondary" size="sm" onClick={() => handleCreateFromTemplate(template.id, template.name)} className="mr-2">
                          <lucide_react_1.Copy className="mr-2 h-4 w-4"/> Kullan
                        </button_1.Button>) : (<button_1.Button variant="secondary" size="sm" asChild>
                          <link_1.default href={`/admin/newsletter/templates/${template.id}/edit`}>
                            <lucide_react_1.Pen className="mr-2 h-4 w-4"/> Düzenle
                          </link_1.default>
                        </button_1.Button>)}
                    </table_1.TableCell>
                  </table_1.TableRow>))}
              </table_1.TableBody>
            </table_1.Table>)}
        </card_1.CardContent>
      </card_1.Card>
    </div>);
}
//# sourceMappingURL=page.js.map