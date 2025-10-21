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
const mediaService_1 = require("@/lib/api/mediaService");
const dialog_1 = require("@/components/ui/dialog");
const use_toast_1 = require("@/hooks/use-toast");
const site_settings_data_1 = require("@/lib/site-settings-data");
function CertificateForm({ certificate }) {
    const isEditing = !!certificate;
    const searchParams = (0, navigation_1.useSearchParams)();
    const router = (0, navigation_1.useRouter)();
    // Helper function to get company name from site settings
    const getCompanyName = () => {
        return site_settings_data_1.siteSettingsData.companyName || 'Aluplan';
    };
    // Helper function to generate default description
    const generateDefaultDescription = (programName) => {
        const companyName = getCompanyName();
        return `${programName} eğitimini başarıyla tamamladınız.
Gösterdiğiniz özveri, ilgi ve öğrenme isteğiniz için teşekkür ederiz.

Bu sertifika, eğitim sürecinde edindiğiniz bilgi ve yetkinliklerin bir göstergesidir.
${companyName} olarak, sürekli gelişim yolculuğunuzda yanınızda olmaktan memnuniyet duyuyoruz.

Başarılarınızın devamını diler, gelecekteki çalışmalarınızda üstün başarılar temenni ederiz.

Saygılarımızla,
${companyName}`;
    };
    const [issuedAt, setIssuedAt] = (0, react_1.useState)(certificate ? new Date(certificate.issueDate) : new Date());
    const [validUntil, setValidUntil] = (0, react_1.useState)(certificate?.expiryDate ? new Date(certificate.expiryDate) : undefined);
    const [recipientName, setRecipientName] = (0, react_1.useState)(certificate?.recipientName || '');
    const [recipientEmail, setRecipientEmail] = (0, react_1.useState)(certificate?.recipientEmail || '');
    const [certificateName, setCertificateName] = (0, react_1.useState)(certificate?.trainingTitle || certificate?.name || '');
    // Initialize description with default template for new certificates
    const getInitialDescription = () => {
        if (certificate?.description) {
            return certificate.description;
        }
        // For new certificates, generate default description
        const initialName = certificate?.trainingTitle || certificate?.name || '[Eğitim Programı Adı]';
        return generateDefaultDescription(initialName);
    };
    const [description, setDescription] = (0, react_1.useState)(getInitialDescription());
    const [templateId, setTemplateId] = (0, react_1.useState)(certificate?.templateId || '');
    const [userId, setUserId] = (0, react_1.useState)(certificate?.userId || '');
    const [logoMediaId, setLogoMediaId] = (0, react_1.useState)(certificate?.logoMediaId || null);
    const [logoPreviewUrl, setLogoPreviewUrl] = (0, react_1.useState)(null);
    const [uploadingLogo, setUploadingLogo] = (0, react_1.useState)(false);
    const [showMediaLibrary, setShowMediaLibrary] = (0, react_1.useState)(false);
    const [mediaItems, setMediaItems] = (0, react_1.useState)([]);
    const [loadingMedia, setLoadingMedia] = (0, react_1.useState)(false);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const [success, setSuccess] = (0, react_1.useState)(false);
    const [templates, setTemplates] = (0, react_1.useState)([]);
    const [loadingTemplates, setLoadingTemplates] = (0, react_1.useState)(true);
    const { toast } = (0, use_toast_1.useToast)();
    (0, react_1.useEffect)(() => {
        if (!isEditing) {
            setRecipientName(searchParams.get('userName') || '');
            setRecipientEmail(searchParams.get('userEmail') || '');
            const certName = searchParams.get('certificateName') || '';
            setCertificateName(certName);
            // Auto-generate description if certificate name is provided and description is empty
            if (certName && !description) {
                setDescription(generateDefaultDescription(certName));
            }
        }
    }, [searchParams, isEditing]);
    (0, react_1.useEffect)(() => {
        const fetchTemplates = async () => {
            try {
                const data = await certificatesService_1.default.getTemplates();
                setTemplates(data);
                // Set first template as default if no template selected
                if (!templateId && data.length > 0) {
                    setTemplateId(data[0].id);
                }
            }
            catch (err) {
                console.error('Error fetching templates:', err);
            }
            finally {
                setLoadingTemplates(false);
            }
        };
        fetchTemplates();
    }, [templateId]);
    // Load logo preview if logoMediaId exists
    (0, react_1.useEffect)(() => {
        const loadLogoPreview = async () => {
            if (logoMediaId) {
                try {
                    const url = await mediaService_1.mediaService.getMediaUrl(logoMediaId);
                    setLogoPreviewUrl(url);
                }
                catch (err) {
                    console.error('Error loading logo preview:', err);
                }
            }
        };
        loadLogoPreview();
    }, [logoMediaId]);
    // Load media library when dialog opens
    (0, react_1.useEffect)(() => {
        const loadMediaLibrary = async () => {
            if (showMediaLibrary) {
                setLoadingMedia(true);
                try {
                    const media = await mediaService_1.mediaService.getAll();
                    setMediaItems(media);
                }
                catch (err) {
                    console.error('Error loading media:', err);
                    toast({
                        title: "Hata",
                        description: "Media kütüphanesi yüklenirken bir hata oluştu",
                        variant: "destructive",
                    });
                }
                finally {
                    setLoadingMedia(false);
                }
            }
        };
        loadMediaLibrary();
    }, [showMediaLibrary, toast]);
    const handleOpenMediaLibrary = () => {
        setShowMediaLibrary(true);
    };
    const handleSelectMedia = async (media) => {
        setLogoMediaId(media.id);
        const url = await mediaService_1.mediaService.getMediaUrl(media.id);
        setLogoPreviewUrl(url);
        setShowMediaLibrary(false);
        toast({
            title: "Başarılı",
            description: "Logo seçildi",
        });
    };
    const handleLogoUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast({
                title: "Hata",
                description: "Lütfen sadece resim dosyası yükleyin",
                variant: "destructive",
            });
            return;
        }
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast({
                title: "Hata",
                description: "Dosya boyutu 5MB'dan küçük olmalıdır",
                variant: "destructive",
            });
            return;
        }
        try {
            setUploadingLogo(true);
            const media = await mediaService_1.mediaService.uploadFile(file);
            setLogoMediaId(media.id);
            const url = await mediaService_1.mediaService.getMediaUrl(media.id);
            setLogoPreviewUrl(url);
            // Refresh media library
            const updatedMedia = await mediaService_1.mediaService.getAll();
            setMediaItems(updatedMedia);
            toast({
                title: "Başarılı",
                description: "Logo yüklendi",
            });
        }
        catch (err) {
            console.error('Logo upload error:', err);
            toast({
                title: "Hata",
                description: "Logo yüklenirken bir hata oluştu",
                variant: "destructive",
            });
        }
        finally {
            setUploadingLogo(false);
            e.target.value = ''; // Reset input
        }
    };
    const handleRemoveLogo = () => {
        setLogoMediaId(null);
        setLogoPreviewUrl(null);
        toast({
            title: "Başarılı",
            description: "Logo kaldırıldı",
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const certificateData = {
                recipientName,
                recipientEmail,
                trainingTitle: certificateName,
                description: description || undefined, // Send undefined instead of empty string
                templateId,
                issuedAt: issuedAt?.toISOString() || new Date().toISOString(),
                validUntil: validUntil?.toISOString() || null,
                userId: userId || undefined,
                logoMediaId: logoMediaId || undefined // Add logo media ID
            };
            if (isEditing && certificate) {
                // Update existing certificate
                await certificatesService_1.default.update(certificate.id, certificateData);
            }
            else {
                // Create new certificate
                await certificatesService_1.default.create(certificateData);
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
                        <input_1.Input id="certificateName" placeholder="Allplan Temel Eğitimi" value={certificateName} onChange={(e) => {
            const newName = e.target.value;
            setCertificateName(newName);
            // Update description when name changes (only if not editing existing certificate)
            if (!isEditing && newName) {
                setDescription(generateDefaultDescription(newName));
            }
        }} required/>
                    </div>
                    <div className="space-y-2">
                        <label_1.Label htmlFor="description">Açıklama (Opsiyonel)</label_1.Label>
                        <textarea_1.Textarea id="description" placeholder="Sertifika hakkında ek bilgiler..." value={description} onChange={(e) => setDescription(e.target.value)} rows={8}/>
                        <p className="text-xs text-gray-500">Bu metin sertifika PDF&apos;inde kullanılacaktır. Kullanıcı isteğe göre düzenleyebilir.</p>
                    </div>

                    {/* Logo Upload Section */}
                    <div className="space-y-2">
                        <label_1.Label htmlFor="certificateLogo">Sertifika Logosu (Opsiyonel)</label_1.Label>
                        <div className="flex items-start gap-4">
                            {/* Preview Area */}
                            {logoPreviewUrl ? (<div className="relative group">
                                    <div className="w-32 h-32 border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                                        <img src={logoPreviewUrl} alt="Sertifika Logosu" className="max-w-full max-h-full object-contain"/>
                                    </div>
                                    <button_1.Button type="button" variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" onClick={handleRemoveLogo}>
                                        <lucide_react_1.X className="h-3 w-3"/>
                                    </button_1.Button>
                                </div>) : (<div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                                    <lucide_react_1.Image className="h-8 w-8 text-gray-400"/>
                                </div>)}

                            {/* Select Button */}
                            <div className="flex-1 space-y-2">
                                <button_1.Button type="button" variant="outline" onClick={handleOpenMediaLibrary} className="w-full">
                                    <lucide_react_1.Image className="mr-2 h-4 w-4"/>
                                    {logoPreviewUrl ? 'Logoyu Değiştir' : 'Logo Seç'}
                                </button_1.Button>
                                <p className="text-xs text-gray-500">
                                    Bu logo sertifika tasarımında ürün/konu logosu olarak kullanılacaktır.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label_1.Label htmlFor="template">Sertifika Tasarımı</label_1.Label>
                        <select_1.Select value={templateId} onValueChange={setTemplateId} disabled={loadingTemplates}>
                            <select_1.SelectTrigger id="template">
                                <select_1.SelectValue placeholder={loadingTemplates ? "Yükleniyor..." : "Bir tasarım seçin"}/>
                            </select_1.SelectTrigger>
                            <select_1.SelectContent>
                                {templates.map((template) => (<select_1.SelectItem key={template.id} value={template.id}>
                                        {template.name}
                                    </select_1.SelectItem>))}
                                {templates.length === 0 && !loadingTemplates && (<select_1.SelectItem value="none" disabled>Tasarım bulunamadı</select_1.SelectItem>)}
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

            {/* Media Library Dialog */}
            <dialog_1.Dialog open={showMediaLibrary} onOpenChange={setShowMediaLibrary}>
                <dialog_1.DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
                    <dialog_1.DialogHeader>
                        <dialog_1.DialogTitle>Media Kütüphanesi</dialog_1.DialogTitle>
                        <dialog_1.DialogDescription>
                            Mevcut bir logo seçin veya yeni bir logo yükleyin
                        </dialog_1.DialogDescription>
                    </dialog_1.DialogHeader>
                    
                    <div className="flex-1 overflow-y-auto">
                        {/* Upload Section */}
                        <div className="mb-4 p-4 border-2 border-dashed rounded-lg bg-gray-50">
                            <input_1.Input id="mediaLibraryUpload" type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} disabled={uploadingLogo}/>
                            <label_1.Label htmlFor="mediaLibraryUpload">
                                <button_1.Button type="button" variant="outline" disabled={uploadingLogo} className="cursor-pointer w-full" asChild>
                                    <span>
                                        <lucide_react_1.Upload className="mr-2 h-4 w-4"/>
                                        {uploadingLogo ? 'Yükleniyor...' : 'Yeni Logo Yükle'}
                                    </span>
                                </button_1.Button>
                            </label_1.Label>
                        </div>

                        {/* Media Grid */}
                        {loadingMedia ? (<div className="flex items-center justify-center py-12">
                                <div className="text-center">
                                    <lucide_react_1.FileText className="h-8 w-8 animate-spin mx-auto mb-2 text-gray-400"/>
                                    <p className="text-sm text-gray-500">Medya yükleniyor...</p>
                                </div>
                            </div>) : mediaItems.length === 0 ? (<div className="text-center py-12">
                                <lucide_react_1.Image className="h-12 w-12 mx-auto mb-3 text-gray-400"/>
                                <p className="text-gray-500">Henüz medya bulunamadı</p>
                                <p className="text-sm text-gray-400 mt-1">Yukarıdan yeni bir logo yükleyin</p>
                            </div>) : (<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {mediaItems.map((media) => (<button key={media.id} type="button" onClick={() => handleSelectMedia(media)} className={`relative group aspect-square border-2 rounded-lg overflow-hidden hover:border-primary transition-colors cursor-pointer ${logoMediaId === media.id ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200'}`}>
                                        <img src={media.url} alt={media.originalName} className="w-full h-full object-cover" onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZTwvdGV4dD48L3N2Zz4=';
                }}/>
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"/>
                                        {logoMediaId === media.id && (<div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                                                </svg>
                                            </div>)}
                                    </button>))}
                            </div>)}
                    </div>
                </dialog_1.DialogContent>
            </dialog_1.Dialog>
        </form>);
}
//# sourceMappingURL=certificate-form.js.map