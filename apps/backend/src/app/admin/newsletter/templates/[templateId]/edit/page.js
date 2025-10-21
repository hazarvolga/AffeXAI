"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditEmailTemplatePage;
const newsletter_data_1 = require("@/lib/newsletter-data");
const navigation_1 = require("next/navigation");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const textarea_1 = require("@/components/ui/textarea");
const react_1 = require("react");
const react_2 = require("react");
// This is a client component that reads the template data
function EditEmailTemplatePage({ params }) {
    // Unwrap the params promise using React.use()
    const unwrappedParams = (0, react_2.use)(params);
    const { templateId } = unwrappedParams;
    const [template, setTemplate] = (0, react_1.useState)(undefined);
    const [fileContent, setFileContent] = (0, react_1.useState)('');
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const hasFetchedTemplate = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        // Prevent multiple fetches
        if (hasFetchedTemplate.current)
            return;
        hasFetchedTemplate.current = true;
        const fetchTemplate = async () => {
            try {
                setLoading(true);
                // In a real app, you would fetch the template data from an API
                // For now, we're using mock data
                const templateData = newsletter_data_1.templates.find(t => t.id === templateId);
                if (!templateData) {
                    (0, navigation_1.notFound)();
                    return;
                }
                setTemplate(templateData);
                // In a real app, you would fetch the file content from an API
                // For now, we're using mock content
                setFileContent(`// Bu alan şu an için sadece bir konsepttir. 
// Gerçek bir uygulamada burada e-posta şablonunun HTML içeriği olacak.
// Şablon dosyası: src/emails/${templateData.content}`);
                setError(null);
            }
            catch (err) {
                console.error('Error fetching template:', err);
                setError('Şablon bilgileri yüklenirken bir hata oluştu.');
            }
            finally {
                setLoading(false);
            }
        };
        fetchTemplate();
    }, [templateId]);
    if (loading) {
        return <div className="flex justify-center items-center h-64">Yükleniyor...</div>;
    }
    if (error) {
        return <div className="text-center text-red-500 py-12">{error}</div>;
    }
    if (!template) {
        (0, navigation_1.notFound)();
        return null;
    }
    return (<card_1.Card>
        <card_1.CardHeader>
            <card_1.CardTitle className="flex items-center gap-2"><lucide_react_1.Code /> Kod Editörü: {template.name}</card_1.CardTitle>
            <card_1.CardDescription>
                <code>src/emails/{template.content}</code> dosyasının içeriği. Bu arayüz sadece gösterim amaçlıdır.
            </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent>
            <textarea_1.Textarea readOnly value={fileContent} className="w-full h-[60vh] font-mono text-xs bg-muted"/>
        </card_1.CardContent>
        <card_1.CardFooter className="flex justify-end gap-2">
            <button_1.Button variant="outline" asChild>
                <link_1.default href="/admin/newsletter">Geri Dön</link_1.default>
            </button_1.Button>
            <button_1.Button disabled>
                <lucide_react_1.Save className="mr-2 h-4 w-4"/> Kaydet (Devre Dışı)
            </button_1.Button>
        </card_1.CardFooter>
    </card_1.Card>);
}
//# sourceMappingURL=page.js.map