"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const certificate_data_1 = require("@/lib/certificate-data");
const badge_1 = require("@/components/ui/badge");
const UserCertificatesPage = () => {
    // In a real app, you would filter these by the logged-in user's ID
    const userCertificates = certificate_data_1.certificates.filter(c => c.recipientEmail === 'ahmet.yilmaz@example.com');
    const getStatus = (cert) => {
        if (cert.status === 'Revoked') {
            return { text: "İptal Edildi", variant: "destructive" };
        }
        if (cert.validUntil) {
            const expiry = new Date(cert.validUntil);
            if (new Date() > expiry)
                return { text: "Süresi Dolmuş", variant: "destructive" };
        }
        return { text: "Geçerli", variant: "default" };
    };
    return (<div className="flex-1 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Sertifikalarım</h2>
                    <p className="text-muted-foreground">
                        Kazandığınız tüm sertifikaları burada görüntüleyebilir ve yönetebilirsiniz.
                    </p>
                </div>
            </div>

            <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {userCertificates.length > 0 ? userCertificates.map(cert => {
            const status = getStatus(cert);
            return (<card_1.Card key={cert.certificateNumber} className="flex flex-col">
                        <card_1.CardHeader>
                            <div className="flex items-start justify-between">
                                <lucide_react_1.Award className="h-8 w-8 text-primary"/>
                                <badge_1.Badge variant={status.variant} className={status.variant === 'default' ? 'bg-green-600' : ''}>{status.text}</badge_1.Badge>
                            </div>
                        </card_1.CardHeader>
                        <card_1.CardContent className="flex-grow">
                            <card_1.CardTitle className="mb-2">{cert.certificateName}</card_1.CardTitle>
                            <card_1.CardDescription>Sertifika No: {cert.certificateNumber}</card_1.CardDescription>
                            <p className="text-sm text-muted-foreground mt-2">
                                Veriliş Tarihi: {new Date(cert.issuedAt).toLocaleDateString('tr-TR')}
                            </p>
                            {cert.validUntil && (<p className="text-sm text-muted-foreground">
                                    Geçerlilik Tarihi: {new Date(cert.validUntil).toLocaleDateString('tr-TR')}
                                </p>)}
                        </card_1.CardContent>
                        <card_1.CardFooter className="grid grid-cols-2 gap-2">
                            <button_1.Button variant="outline"><lucide_react_1.Download className="mr-2 h-4 w-4"/> PDF İndir</button_1.Button>
                            <button_1.Button><lucide_react_1.Share2 className="mr-2 h-4 w-4"/> Paylaş</button_1.Button>
                        </card_1.CardFooter>
                    </card_1.Card>);
        }) : (<div className="col-span-full text-center py-12">
                        <p className="text-muted-foreground">Henüz kazanılmış bir sertifikanız bulunmuyor.</p>
                    </div>)}
            </div>
        </div>);
};
exports.default = UserCertificatesPage;
//# sourceMappingURL=page.js.map