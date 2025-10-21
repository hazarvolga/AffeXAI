"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateForm = CertificateForm;
const card_1 = require("@/components/ui/card");
const label_1 = require("@/components/ui/label");
const input_1 = require("@/components/ui/input");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const popover_1 = require("../ui/popover");
const calendar_1 = require("../ui/calendar");
const date_fns_1 = require("date-fns");
const react_1 = require("react");
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const textarea_1 = require("@/components/ui/textarea");
const select_1 = require("@/components/ui/select");
const alert_1 = require("@/components/ui/alert");
const certificatesService_1 = __importDefault(require("@/lib/api/certificatesService"));
function CertificateForm({ certificate }) {
    const isEditing = !!certificate;
    const searchParams = (0, navigation_1.useSearchParams)();
    const router = (0, navigation_1.useRouter)();
    const [issuedAt, setIssuedAt] = (0, react_1.useState)(certificate ? new Date(certificate.issueDate) : new Date());
    const [validUntil, setValidUntil] = (0, react_1.useState)(certificate?.expiryDate ? new Date(certificate.expiryDate) : undefined);
    const [recipientName, setRecipientName] = (0, react_1.useState)(certificate?.name || '');
    const [recipientEmail, setRecipientEmail] = (0, react_1.useState)(''); // We'll need to fetch user by email
    const [certificateName, setCertificateName] = (0, react_1.useState)(certificate?.name || '');
    const [description, setDescription] = (0, react_1.useState)(certificate?.description || '');
    const [templateId, setTemplateId] = (0, react_1.useState)(certificate?.templateId || 'default');
    const [userId, setUserId] = (0, react_1.useState)(certificate?.userId || '');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const [success, setSuccess] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (!isEditing) {
            setRecipientName(searchParams.get('userName') || '');
            setRecipientEmail(searchParams.get('userEmail') || '');
            setCertificateName(searchParams.get('certificateName') || '');
        }
    }, [searchParams, isEditing]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            // In a real application, you would look up the user by email
            // For now, we'll use a placeholder user ID
            const userIdToUse = userId || '00000000-0000-0000-0000-000000000000'; // Placeholder
            const certificateData = {
                name: certificateName,
                description,
                issueDate: issuedAt?.toISOString() || new Date().toISOString(),
                expiryDate: validUntil?.toISOString() || undefined,
                userId: userIdToUse,
                templateId
            };
            if (isEditing && certificate) {
                // Update existing certificate
                await certificatesService_1.default.updateCertificate(certificate.id, certificateData);
            }
            else {
                // Create new certificate
                await certificatesService_1.default.createCertificate(certificateData);
            }
            setSuccess(true);
            // Redirect to certificates list after a short delay
            setTimeout(() => {
                router.push('/admin/certificates');
            }, 1500);
        }
        catch (err) {
            console.error('Error saving certificate:', err);
            setError('Sertifika kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.');
        }
        finally {
            setLoading(false);
        }
    };
    return (<form className="max-w-4xl mx-auto" onSubmit={handleSubmit}>
            <card_1.Card>
                <card_1.CardHeader>
                    <card_1.CardTitle>{isEditing ? 'Sertifikayı Düzenle' : 'Yeni Sertifika Oluştur'}</card_1.CardTitle>
                    <card_1.CardDescription>
                        {isEditing ? 'Sertifika detaylarını güncelleyin.' : 'Yeni bir katılımcı için sertifika oluşturun.'}
                    </card_1.CardDescription>
                </card_1.CardHeader>
                <card_1.CardContent className="space-y-6">
                    {error && (<alert_1.Alert variant="destructive">
                            <lucide_react_1.AlertCircle className="h-4 w-4"/>
                            <alert_1.AlertTitle>Hata</alert_1.AlertTitle>
                            <alert_1.AlertDescription>{error}</alert_1.AlertDescription>
                        </alert_1.Alert>)}
                    
                    {success && (<alert_1.Alert variant="default" className="border-green-500 text-green-700">
                            <lucide_react_1.AlertCircle className="h-4 w-4"/>
                            <alert_1.AlertTitle>Başarılı</alert_1.AlertTitle>
                            <alert_1.AlertDescription>Sertifika başarıyla kaydedildi. Yönlendiriliyorsunuz...</alert_1.AlertDescription>
                        </alert_1.Alert>)}
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label_1.Label htmlFor="recipientName">Alıcı Adı Soyadı</label_1.Label>
                            <input_1.Input id="recipientName" placeholder="Ahmet Yılmaz" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} required/>
                        </div>
                        <div className="space-y-2">
                            <label_1.Label htmlFor="recipientEmail">Alıcı E-posta</label_1.Label>
                            <input_1.Input id="recipientEmail" type="email" placeholder="ahmet.yilmaz@example.com" value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} required/>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <label_1.Label htmlFor="certificateName">Sertifika / Eğitim Adı</label_1.Label>
                        <input_1.Input id="certificateName" placeholder="Allplan Temel Eğitimi" value={certificateName} onChange={(e) => setCertificateName(e.target.value)} required/>
                    </div>
                    <div className="space-y-2">
                        <label_1.Label htmlFor="description">Açıklama (Opsiyonel)</label_1.Label>
                        <textarea_1.Textarea id="description" placeholder="Sertifika hakkında ek bilgiler..." value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div className="space-y-2">
                        <label_1.Label htmlFor="template">Sertifika Tasarımı</label_1.Label>
                        <select_1.Select value={templateId} onValueChange={setTemplateId}>
                            <select_1.SelectTrigger id="template">
                                <select_1.SelectValue placeholder="Bir tasarım seçin"/>
                            </select_1.SelectTrigger>
                            <select_1.SelectContent>
                                <select_1.SelectItem value="default">Standart Tasarım</select_1.SelectItem>
                                <select_1.SelectItem value="premium">Premium Tasarım</select_1.SelectItem>
                                <select_1.SelectItem value="executive">Yönetici Tasarımı</select_1.SelectItem>
                            </select_1.SelectContent>
                        </select_1.Select>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label_1.Label>Oluşturulma Tarihi</label_1.Label>
                             <popover_1.Popover>
                                <popover_1.PopoverTrigger asChild>
                                <button_1.Button variant={"outline"} className="w-full justify-start text-left font-normal">
                                    <lucide_react_1.Calendar className="mr-2 h-4 w-4"/>
                                    {issuedAt ? (0, date_fns_1.format)(issuedAt, "PPP") : <span>Bir tarih seçin</span>}
                                </button_1.Button>
                                </popover_1.PopoverTrigger>
                                <popover_1.PopoverContent className="w-auto p-0">
                                    <calendar_1.Calendar mode="single" selected={issuedAt} onSelect={setIssuedAt} initialFocus/>
                                </popover_1.PopoverContent>
                            </popover_1.Popover>
                        </div>
                        <div className="space-y-2">
                            <label_1.Label>Geçerlilik Tarihi (Opsiyonel)</label_1.Label>
                            <popover_1.Popover>
                                <popover_1.PopoverTrigger asChild>
                                <button_1.Button variant={"outline"} className="w-full justify-start text-left font-normal">
                                    <lucide_react_1.Calendar className="mr-2 h-4 w-4"/>
                                    {validUntil ? (0, date_fns_1.format)(validUntil, "PPP") : <span>Süresiz</span>}
                                </button_1.Button>
                                </popover_1.PopoverTrigger>
                                <popover_1.PopoverContent className="w-auto p-0">
                                    <calendar_1.Calendar mode="single" selected={validUntil} onSelect={setValidUntil}/>
                                </popover_1.PopoverContent>
                            </popover_1.Popover>
                        </div>
                    </div>
                    
                    {!isEditing && (<alert_1.Alert>
                            <lucide_react_1.AlertCircle className="h-4 w-4"/>
                            <alert_1.AlertTitle>Bilgi</alert_1.AlertTitle>
                            <alert_1.AlertDescription>
                                Sertifika oluşturulduktan sonra alıcıya e-posta ile gönderilecektir. 
                                Ayrıca sertifikayı PDF olarak indirebilirsiniz.
                            </alert_1.AlertDescription>
                        </alert_1.Alert>)}
                </card_1.CardContent>
                <card_1.CardFooter className="flex justify-end gap-2">
                    <button_1.Button variant="outline" asChild type="button">
                        <link_1.default href="/admin/certificates">İptal</link_1.default>
                    </button_1.Button>
                    <button_1.Button type="submit" disabled={loading}>
                        {loading ? (<>
                                <lucide_react_1.FileText className="mr-2 h-4 w-4 animate-spin"/>
                                Kaydediliyor...
                            </>) : (<>
                                <lucide_react_1.Save className="mr-2 h-4 w-4"/>
                                {isEditing ? 'Sertifikayı Güncelle' : 'Sertifikayı Oluştur'}
                            </>)}
                    </button_1.Button>
                </card_1.CardFooter>
            </card_1.Card>
        </form>);
}
//# sourceMappingURL=certificate-form.js.map