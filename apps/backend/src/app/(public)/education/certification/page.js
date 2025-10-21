"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CertificationPage;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
const card_1 = require("@/components/ui/card");
const input_1 = require("@/components/ui/input");
const button_1 = require("@/components/ui/button");
const label_1 = require("@/components/ui/label");
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
const certificate_data_1 = require("@/lib/certificate-data");
const alert_1 = require("@/components/ui/alert");
const link_1 = __importDefault(require("next/link"));
function CertificationPage() {
    const [searchTerm, setSearchTerm] = (0, react_1.useState)('');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [result, setResult] = (0, react_1.useState)(null);
    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        setTimeout(() => {
            const found = certificate_data_1.certificates.find(c => c.certificateNumber.toLowerCase() === searchTerm.toLowerCase() || c.recipientName.toLowerCase() === searchTerm.toLowerCase());
            setResult(found || 'not_found');
            setLoading(false);
        }, 1000);
    };
    const isCertificateValid = (cert) => {
        if (cert.status === 'Revoked')
            return false;
        if (!cert.validUntil)
            return true;
        return new Date(cert.validUntil) >= new Date();
    };
    return (<div>
            <page_hero_1.PageHero title="Sertifika Sorgulama" subtitle="Aluplan tarafından verilen sertifikaların geçerliliğini anında doğrulayın."/>
            <breadcrumb_1.Breadcrumb items={[
            { name: 'Eğitim & Destek', href: '/education' },
            { name: 'Sertifika Sorgulama', href: '/education/certification' }
        ]}/>
            <div className="container mx-auto py-16 px-4 flex justify-center">
                <div className="w-full max-w-3xl space-y-8">
                    <card_1.Card>
                        <form onSubmit={handleSearch}>
                            <card_1.CardHeader className="text-center">
                                <card_1.CardTitle>Sertifika Doğrulama</card_1.CardTitle>
                                <card_1.CardDescription>Lütfen doğrulamak istediğiniz sertifika numarasını veya katılımcı adını girin.</card_1.CardDescription>
                            </card_1.CardHeader>
                            <card_1.CardContent>
                                <div className="space-y-2">
                                    <label_1.Label htmlFor="certificate-number" className="sr-only">Sertifika Numarası veya Katılımcı Adı</label_1.Label>
                                    <input_1.Input id="certificate-number" placeholder="Örn: ALP-TR-2024-12345 veya Ahmet Yılmaz" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} required/>
                                </div>
                            </card_1.CardContent>
                            <card_1.CardFooter>
                                <button_1.Button className="w-full" type="submit" disabled={loading}>
                                    {loading ? (<><lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/> Sorgulanıyor...</>) : (<><lucide_react_1.Search className="mr-2 h-4 w-4"/> Sorgula</>)}
                                </button_1.Button>
                            </card_1.CardFooter>
                        </form>
                    </card_1.Card>

                    {result && result !== 'not_found' && (isCertificateValid(result) ? (<alert_1.Alert variant="default" className="bg-green-50 border-green-200">
                                <lucide_react_1.CheckCircle className="h-4 w-4 !text-green-600"/>
                                <alert_1.AlertTitle className="text-green-900">Sertifika Geçerli</alert_1.AlertTitle>
                                <alert_1.AlertDescription className="text-green-800">
                                    <p><strong>Sertifika No:</strong> {result.certificateNumber}</p>
                                    <p><strong>Alıcı:</strong> {result.recipientName}</p>
                                    <p><strong>Sertifika:</strong> {result.certificateName}</p>
                                    <p><strong>Veriliş Tarihi:</strong> {new Date(result.issuedAt).toLocaleDateString('tr-TR')}</p>
                                    {result.validUntil && <p><strong>Geçerlilik Tarihi:</strong> {new Date(result.validUntil).toLocaleDateString('tr-TR')}</p>}
                                </alert_1.AlertDescription>
                            </alert_1.Alert>) : (<alert_1.Alert variant="destructive">
                                <lucide_react_1.XCircle className="h-4 w-4"/>
                                <alert_1.AlertTitle>Sertifika Geçerli Değil</alert_1.AlertTitle>
                                <alert_1.AlertDescription>
                                     <p><strong>"{result.certificateNumber}"</strong> numaralı sertifikanın süresi dolmuş veya iptal edilmiştir.</p>
                                     <p>Detaylı bilgi için lütfen <link_1.default href="/contact" className="underline font-semibold">bizimle iletişime geçin.</link_1.default></p>
                                </alert_1.AlertDescription>
                            </alert_1.Alert>))}

                    {result === 'not_found' && (<alert_1.Alert variant="destructive">
                            <lucide_react_1.XCircle className="h-4 w-4"/>
                            <alert_1.AlertTitle>Sertifika veya Katılımcı Bulunamadı</alert_1.AlertTitle>
                            <alert_1.AlertDescription>
                                Girdiğiniz bilgilerle eşleşen bir kayıt bulunamadı. Lütfen bilgileri kontrol edip tekrar deneyin.
                            </alert_1.AlertDescription>
                        </alert_1.Alert>)}
                </div>
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map