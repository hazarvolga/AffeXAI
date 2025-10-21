"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CertificatesDashboardPage;
const card_1 = require("@/components/ui/card");
const table_1 = require("@/components/ui/table");
const badge_1 = require("@/components/ui/badge");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const pagination_1 = require("@/components/ui/pagination");
const input_1 = require("@/components/ui/input");
const react_1 = require("react");
const utils_1 = require("@/lib/utils");
const tabs_1 = require("@/components/ui/tabs");
const certificatesService_1 = __importDefault(require("@/lib/api/certificatesService"));
const CertificateTable = ({ certificatesToShow, onCertificateUpdate }) => {
    if (certificatesToShow.length === 0) {
        return <div className="text-center text-muted-foreground py-12">Bu görünümde gösterilecek sertifika yok.</div>;
    }
    const getStatusVariant = (status) => {
        switch (status) {
            case 'Generated': return 'default';
            case 'Pending': return 'secondary';
            case 'Revoked': return 'destructive';
            default: return 'outline';
        }
    };
    const handleDownloadPdf = async (certificateId) => {
        try {
            const fileUrl = await certificatesService_1.default.generateCertificatePdf(certificateId);
            // Create a temporary link to download the PDF
            const link = document.createElement('a');
            link.href = fileUrl;
            link.target = '_blank';
            link.download = `certificate-${certificateId}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        catch (error) {
            console.error('Error generating PDF:', error);
            // Check if it's a 404 error (certificate not found)
            if (error.response?.status === 404) {
                alert('Sertifika bulunamadı. Bu sertifika henüz sisteme kaydedilmemiş olabilir.');
            }
            else {
                // In a real application, you would show an error message to the user
                alert('PDF oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
            }
        }
    };
    const handleRevokeCertificate = async (certificateId) => {
        // In a real application, you would call an API to revoke the certificate
        // For now, we'll just show an alert
        if (confirm('Bu sertifikayı iptal etmek istediğinizden emin misiniz?')) {
            try {
                // Here you would call the API to revoke the certificate
                // For example: await certificatesService.revokeCertificate(certificateId);
                alert('Sertifika başarıyla iptal edildi.');
                // Update the certificate status in the parent component
                onCertificateUpdate(certificateId, 'Revoked');
            }
            catch (error) {
                console.error('Error revoking certificate:', error);
                alert('Sertifika iptal edilirken bir hata oluştu. Lütfen tekrar deneyin.');
            }
        }
    };
    return (<>
            <table_1.Table>
                <table_1.TableHeader>
                    <table_1.TableRow>
                        <table_1.TableHead>Sertifika Adı</table_1.TableHead>
                        <table_1.TableHead>Alıcı Adı</table_1.TableHead>
                        <table_1.TableHead>Durum</table_1.TableHead>
                        <table_1.TableHead>Veriliş Tarihi</table_1.TableHead>
                        <table_1.TableHead>Geçerlilik Tarihi</table_1.TableHead>
                        <table_1.TableHead><span className="sr-only">Eylemler</span></table_1.TableHead>
                    </table_1.TableRow>
                </table_1.TableHeader>
                <table_1.TableBody>
                    {certificatesToShow.map(cert => (<table_1.TableRow key={cert.id}>
                            <table_1.TableCell className="font-medium">
                                <div>{cert.certificateName}</div>
                                <div className="text-xs text-muted-foreground font-mono">{cert.id}</div>
                            </table_1.TableCell>
                            <table_1.TableCell>
                                <div>{cert.recipientName}</div>
                                <div className="text-xs text-muted-foreground">{cert.recipientEmail}</div>
                            </table_1.TableCell>
                            <table_1.TableCell>
                                <badge_1.Badge variant={getStatusVariant(cert.status)} className={(0, utils_1.cn)(cert.status === 'Generated' && 'bg-green-600')}>{cert.status}</badge_1.Badge>
                            </table_1.TableCell>
                            <table_1.TableCell>{new Date(cert.issuedAt).toLocaleDateString('tr-TR')}</table_1.TableCell>
                            <table_1.TableCell>{cert.validUntil ? new Date(cert.validUntil).toLocaleDateString('tr-TR') : 'Süresiz'}</table_1.TableCell>
                            <table_1.TableCell>
                                <dropdown_menu_1.DropdownMenu>
                                    <dropdown_menu_1.DropdownMenuTrigger asChild>
                                        <button_1.Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Menüyü aç</span>
                                            <lucide_react_1.MoreHorizontal className="h-4 w-4"/>
                                        </button_1.Button>
                                    </dropdown_menu_1.DropdownMenuTrigger>
                                    <dropdown_menu_1.DropdownMenuContent align="end">
                                        <dropdown_menu_1.DropdownMenuItem asChild>
                                            <link_1.default href={`/admin/certificates/${cert.id}`}>Düzenle</link_1.default>
                                        </dropdown_menu_1.DropdownMenuItem>
                                        <dropdown_menu_1.DropdownMenuItem><lucide_react_1.Copy className="mr-2 h-4 w-4"/>Doğrulama Linkini Kopyala</dropdown_menu_1.DropdownMenuItem>
                                        <dropdown_menu_1.DropdownMenuItem onClick={() => handleDownloadPdf(cert.id)}>
                                            <lucide_react_1.FileDown className="mr-2 h-4 w-4"/>PDF Olarak İndir
                                        </dropdown_menu_1.DropdownMenuItem>
                                        <dropdown_menu_1.DropdownMenuSeparator />
                                        <dropdown_menu_1.DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => handleRevokeCertificate(cert.id)}>
                                            İptal Et
                                        </dropdown_menu_1.DropdownMenuItem>
                                    </dropdown_menu_1.DropdownMenuContent>
                                </dropdown_menu_1.DropdownMenu>
                            </table_1.TableCell>
                        </table_1.TableRow>))}
                </table_1.TableBody>
            </table_1.Table>
            <card_1.CardFooter className="pt-6">
                <pagination_1.Pagination>
                    <pagination_1.PaginationContent>
                        <pagination_1.PaginationItem><pagination_1.PaginationPrevious href="#"/></pagination_1.PaginationItem>
                        <pagination_1.PaginationItem><pagination_1.PaginationLink href="#">1</pagination_1.PaginationLink></pagination_1.PaginationItem>
                        <pagination_1.PaginationItem><pagination_1.PaginationNext href="#"/></pagination_1.PaginationItem>
                    </pagination_1.PaginationContent>
                </pagination_1.Pagination>
            </card_1.CardFooter>
        </>);
};
function CertificatesDashboardPage() {
    const [searchTerm, setSearchTerm] = (0, react_1.useState)('');
    const [certificates, setCertificates] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    // Fetch certificates from backend
    (0, react_1.useEffect)(() => {
        const fetchCertificates = async () => {
            try {
                setLoading(true);
                const backendCertificates = await certificatesService_1.default.getAllCertificates();
                // Map backend certificates to frontend format
                const frontendCertificates = backendCertificates.map(cert => ({
                    ...cert,
                    certificateNumber: cert.id,
                    recipientName: cert.userId ? `User ${cert.userId.substring(0, 8)}` : 'Kullanıcı Bilgisi Yok',
                    recipientEmail: 'user@example.com', // In a real app, you'd fetch user details
                    certificateName: cert.name || 'Sertifika Adı Belirtilmemiş',
                    issuedAt: cert.issueDate || new Date().toISOString(),
                    validUntil: cert.expiryDate || undefined,
                    templateId: 'default', // Default template since it's not in backend model
                    verificationUrl: `/certificates/verify/${cert.id}`,
                    status: 'Generated', // In a real app, this would come from the backend
                    generationMethod: 'Auto'
                }));
                setCertificates(frontendCertificates);
                setError(null);
            }
            catch (err) {
                console.error('Error fetching certificates:', err);
                setError('Sertifikalar yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
            }
            finally {
                setLoading(false);
            }
        };
        fetchCertificates();
    }, []);
    const filteredCertificates = certificates.filter(cert => (cert.certificateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase())));
    const generatedCerts = filteredCertificates.filter(c => c.status === 'Generated');
    const revokedCerts = filteredCertificates.filter(c => c.status === 'Revoked');
    const pendingCerts = filteredCertificates.filter(c => c.status === 'Pending');
    const handleCertificateUpdate = (certificateNumber, status) => {
        setCertificates(prev => prev.map(cert => cert.certificateNumber === certificateNumber ? { ...cert, status } : cert));
    };
    if (loading) {
        return <div className="flex justify-center items-center h-64">Yükleniyor...</div>;
    }
    if (error) {
        return <div className="text-center text-red-500 py-12">{error}</div>;
    }
    return (<div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Sertifika Paneli</h1>
                    <p className="text-muted-foreground">Sertifikalarınıza genel bir bakış atın ve yönetin.</p>
                </div>
                 <div className="flex items-center gap-2">
                    <button_1.Button asChild variant="outline">
                        <link_1.default href="/admin/certificates/bulk-import">
                            <lucide_react_1.FileUp className="mr-2 h-4 w-4"/>
                            Toplu İçe Aktar
                        </link_1.default>
                    </button_1.Button>
                    <button_1.Button asChild>
                        <link_1.default href="/admin/certificates/new">
                            <lucide_react_1.PlusCircle className="mr-2 h-4 w-4"/>
                            Yeni Sertifika Oluştur
                        </link_1.default>
                    </button_1.Button>
                </div>
            </div>

             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <card_1.Card>
                    <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <card_1.CardTitle className="text-sm font-medium">Toplam Sertifika</card_1.CardTitle>
                        <lucide_react_1.Award className="h-4 w-4 text-muted-foreground"/>
                    </card_1.CardHeader>
                    <card_1.CardContent>
                        <div className="text-2xl font-bold">{certificates.length}</div>
                        <p className="text-xs text-muted-foreground">Tüm zamanlar</p>
                    </card_1.CardContent>
                </card_1.Card>
                 <card_1.Card>
                    <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <card_1.CardTitle className="text-sm font-medium">Geçerli Sertifikalar</card_1.CardTitle>
                        <lucide_react_1.CheckCircle className="h-4 w-4 text-green-500"/>
                    </card_1.CardHeader>
                    <card_1.CardContent>
                        <div className="text-2xl font-bold">{generatedCerts.length}</div>
                         <p className="text-xs text-muted-foreground">Aktif ve geçerli</p>
                    </card_1.CardContent>
                </card_1.Card>
                 <card_1.Card>
                    <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <card_1.CardTitle className="text-sm font-medium">İptal Edilenler</card_1.CardTitle>
                        <lucide_react_1.XCircle className="h-4 w-4 text-destructive"/>
                    </card_1.CardHeader>
                    <card_1.CardContent>
                        <div className="text-2xl font-bold">{revokedCerts.length}</div>
                         <p className="text-xs text-muted-foreground">Geçersiz kılınmış sertifikalar</p>
                    </card_1.CardContent>
                </card_1.Card>
                 <card_1.Card>
                    <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <card_1.CardTitle className="text-sm font-medium">Beklemede Olanlar</card_1.CardTitle>
                        <lucide_react_1.Clock className="h-4 w-4 text-muted-foreground"/>
                    </card_1.CardHeader>
                    <card_1.CardContent>
                        <div className="text-2xl font-bold">{pendingCerts.length}</div>
                         <p className="text-xs text-muted-foreground">Oluşturulmayı bekliyor</p>
                    </card_1.CardContent>
                </card_1.Card>
            </div>
            
            <card_1.Card>
                <tabs_1.Tabs defaultValue="all">
                     <card_1.CardHeader>
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                             <tabs_1.TabsList>
                                <tabs_1.TabsTrigger value="all">Tümü</tabs_1.TabsTrigger>
                                <tabs_1.TabsTrigger value="generated">Geçerli</tabs_1.TabsTrigger>
                                <tabs_1.TabsTrigger value="pending">Beklemede</tabs_1.TabsTrigger>
                                <tabs_1.TabsTrigger value="revoked">İptal Edilmiş</tabs_1.TabsTrigger>
                            </tabs_1.TabsList>
                            <div className="relative md:w-1/3">
                                <lucide_react_1.Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                                <input_1.Input placeholder="Sertifika, alıcı veya ID ara..." className="pl-8 w-full" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                            </div>
                        </div>
                    </card_1.CardHeader>
                    <card_1.CardContent>
                        <tabs_1.TabsContent value="all">
                           <CertificateTable certificatesToShow={filteredCertificates} onCertificateUpdate={handleCertificateUpdate}/>
                        </tabs_1.TabsContent>
                        <tabs_1.TabsContent value="generated">
                           <CertificateTable certificatesToShow={generatedCerts} onCertificateUpdate={handleCertificateUpdate}/>
                        </tabs_1.TabsContent>
                        <tabs_1.TabsContent value="pending">
                            <CertificateTable certificatesToShow={pendingCerts} onCertificateUpdate={handleCertificateUpdate}/>
                        </tabs_1.TabsContent>
                        <tabs_1.TabsContent value="revoked">
                            <CertificateTable certificatesToShow={revokedCerts} onCertificateUpdate={handleCertificateUpdate}/>
                        </tabs_1.TabsContent>
                    </card_1.CardContent>
                </tabs_1.Tabs>
            </card_1.Card>
        </div>);
}
//# sourceMappingURL=page.js.map