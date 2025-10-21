"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BulkImportCertificatesPage;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const alert_1 = require("@/components/ui/alert");
const lucide_react_1 = require("lucide-react");
const certificatesService_1 = __importDefault(require("@/lib/api/certificatesService"));
function BulkImportCertificatesPage() {
    const [file, setFile] = (0, react_1.useState)(null);
    const [certificates, setCertificates] = (0, react_1.useState)([]);
    const [isParsing, setIsParsing] = (0, react_1.useState)(false);
    const [isImporting, setIsImporting] = (0, react_1.useState)(false);
    const [result, setResult] = (0, react_1.useState)(null);
    const [error, setError] = (0, react_1.useState)(null);
    const fileInputRef = (0, react_1.useRef)(null);
    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setError(null);
            setResult(null);
        }
    };
    const handleParseFile = async () => {
        if (!file)
            return;
        try {
            setIsParsing(true);
            setError(null);
            const parsedCertificates = await certificatesService_1.default.parseCSVFile(file);
            setCertificates(parsedCertificates);
        }
        catch (err) {
            setError('Dosya okunurken bir hata oluştu: ' + err.message);
        }
        finally {
            setIsParsing(false);
        }
    };
    const handleImport = async () => {
        if (certificates.length === 0)
            return;
        try {
            setIsImporting(true);
            setError(null);
            const importResult = await certificatesService_1.default.bulkImportCertificates(certificates);
            setResult(importResult);
        }
        catch (err) {
            setError('İçe aktarma sırasında bir hata oluştu: ' + err.message);
        }
        finally {
            setIsImporting(false);
        }
    };
    const handleDownloadTemplate = () => {
        const csvContent = `user_email,certificate_name,issue_date,expiry_date,description,file_path
user@example.com,"AWS Certified Developer",2025-01-15,2028-01-15,"AWS Geliştirme Sertifikası",/certificates/aws-dev.pdf
user2@example.com,"Google Cloud Professional",2025-02-20,2028-02-20,"Google Cloud Uzman Sertifikası",/certificates/gcp-pro.pdf`;
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'sertifika_ice_aktarma_sablonu.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (<div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Toplu Sertifika İçe Aktarma</h1>
        <p className="text-muted-foreground">
          CSV dosyası kullanarak birden fazla sertifikayı toplu olarak içe aktarın
        </p>
      </div>

      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle>CSV Dosyası Yükle</card_1.CardTitle>
          <card_1.CardDescription>
            Sertifika verilerinizi içeren CSV dosyasını seçin
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent className="space-y-4">
          <div className="space-y-2">
            <label_1.Label htmlFor="csv-file">CSV Dosyası</label_1.Label>
            <div className="flex items-center gap-2">
              <input_1.Input id="csv-file" type="file" accept=".csv" onChange={handleFileChange} ref={fileInputRef} className="flex-1"/>
              <button_1.Button onClick={handleDownloadTemplate} variant="outline">
                <lucide_react_1.FileText className="mr-2 h-4 w-4"/>
                Şablon İndir
              </button_1.Button>
            </div>
          </div>

          {file && (<div className="flex items-center gap-2">
              <button_1.Button onClick={handleParseFile} disabled={isParsing}>
                {isParsing ? (<>
                    <lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                    Dosya İşleniyor...
                  </>) : (<>
                    <lucide_react_1.Upload className="mr-2 h-4 w-4"/>
                    Dosyayı İncele
                  </>)}
              </button_1.Button>
            </div>)}

          {error && (<alert_1.Alert variant="destructive">
              <lucide_react_1.XCircle className="h-4 w-4"/>
              <alert_1.AlertTitle>Hata</alert_1.AlertTitle>
              <alert_1.AlertDescription>{error}</alert_1.AlertDescription>
            </alert_1.Alert>)}
        </card_1.CardContent>
      </card_1.Card>

      {certificates.length > 0 && (<card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle>İçe Aktarılacak Sertifikalar ({certificates.length})</card_1.CardTitle>
            <card_1.CardDescription>
              Aşağıdaki sertifikalar içe aktarılacak
            </card_1.CardDescription>
          </card_1.CardHeader>
          <card_1.CardContent className="space-y-4">
            <div className="max-h-60 overflow-y-auto border rounded-md">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="p-2 text-left">Kullanıcı E-posta</th>
                    <th className="p-2 text-left">Sertifika Adı</th>
                    <th className="p-2 text-left">Verilme Tarihi</th>
                    <th className="p-2 text-left">Bitiş Tarihi</th>
                  </tr>
                </thead>
                <tbody>
                  {certificates.map((cert, index) => (<tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-2">{cert.userEmail}</td>
                      <td className="p-2">{cert.certificateName}</td>
                      <td className="p-2">{cert.issueDate}</td>
                      <td className="p-2">{cert.expiryDate || '-'}</td>
                    </tr>))}
                </tbody>
              </table>
            </div>

            <button_1.Button onClick={handleImport} disabled={isImporting} className="w-full">
              {isImporting ? (<>
                  <lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                  İçe Aktarılıyor...
                </>) : (`Tüm Sertifikaları İçe Aktar (${certificates.length})`)}
            </button_1.Button>
          </card_1.CardContent>
        </card_1.Card>)}

      {result && (<card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle>İçe Aktarma Sonucu</card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-green-600">
                <lucide_react_1.CheckCircle className="h-5 w-5"/>
                <span>Başarılı: {result.success}</span>
              </div>
              <div className="flex items-center gap-2 text-red-600">
                <lucide_react_1.XCircle className="h-5 w-5"/>
                <span>Başarısız: {result.failed}</span>
              </div>
            </div>

            {result.errors.length > 0 && (<div className="space-y-2">
                <h3 className="font-medium">Hatalar:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-red-600">
                  {result.errors.map((error, index) => (<li key={index}>{error}</li>))}
                </ul>
              </div>)}

            <button_1.Button onClick={() => {
                setFile(null);
                setCertificates([]);
                setResult(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }}>
              Yeni İçe Aktarma Yap
            </button_1.Button>
          </card_1.CardContent>
        </card_1.Card>)}
    </div>);
}
//# sourceMappingURL=page.js.map