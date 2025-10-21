"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ImportSubscribersPage;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const label_1 = require("@/components/ui/label");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const progress_1 = require("@/components/ui/progress");
const alert_1 = require("@/components/ui/alert");
const separator_1 = require("@/components/ui/separator");
const select_1 = require("@/components/ui/select");
const newsletter_data_1 = require("@/lib/newsletter-data");
const StepIndicator = ({ currentStep }) => {
    const steps = [
        { id: 'upload', title: '1. Yükle ve Ayarla' },
        { id: 'verifying', title: '2. Doğrulama' },
        { id: 'results', title: '3. Sonuçlar ve Onay' },
    ];
    const currentStepIndex = steps.findIndex(s => s.id === currentStep);
    return (<ol className="flex items-center w-full">
            {steps.map((step, index) => (<li key={step.id} className="flex w-full items-center text-sm font-medium after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block">
                    <span className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 ${index <= currentStepIndex ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                        {index < currentStepIndex ? <lucide_react_1.Check /> : index + 1}
                    </span>
                </li>))}
        </ol>);
};
function ImportSubscribersPage() {
    const [step, setStep] = (0, react_1.useState)('upload');
    const [fileName, setFileName] = (0, react_1.useState)('');
    const [progress, setProgress] = (0, react_1.useState)(0);
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        }
    };
    const startVerification = () => {
        setStep('verifying');
        setProgress(0);
        const interval = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev + 10;
                if (newProgress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setStep('results'), 500);
                    return 100;
                }
                return newProgress;
            });
        }, 300);
    };
    return (<div className="space-y-8">
            <div className="flex items-center gap-4">
                <button_1.Button variant="outline" size="icon" asChild>
                    <link_1.default href="/admin/newsletter/subscribers">
                        <lucide_react_1.ArrowLeft className="h-4 w-4"/>
                    </link_1.default>
                </button_1.Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Toplu Abone İçe Aktarma</h1>
                    <p className="text-muted-foreground">Abonelerinizi CSV dosyasıyla içe aktarın ve e-posta adreslerini doğrulayın.</p>
                </div>
            </div>

            <card_1.Card>
                <card_1.CardHeader>
                   <StepIndicator currentStep={step}/>
                </card_1.CardHeader>

                {step === 'upload' && (<>
                        <card_1.CardContent className="space-y-8 pt-6">
                            <div className="space-y-2">
                                <label_1.Label htmlFor="file-upload">1. CSV Dosyasını Yükleyin</label_1.Label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-input px-6 py-10">
                                    <div className="text-center">
                                    <lucide_react_1.FileUp className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true"/>
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-background font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80">
                                        <span>Dosyanızı yükleyin</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".csv"/>
                                        </label>
                                        <p className="pl-1">veya sürükleyip bırakın</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">Sadece CSV dosyaları. En fazla 10MB.</p>
                                    {fileName && <p className="text-sm font-medium mt-4 text-green-600">Yüklendi: {fileName}</p>}
                                    </div>
                                </div>
                            </div>
                            <separator_1.Separator />
                             <div className="space-y-4">
                                <label_1.Label>2. Gruplara veya Segmentlere Ekle (Opsiyonel)</label_1.Label>
                                <div className="grid sm:grid-cols-2 gap-6">
                                     <select_1.Select>
                                        <select_1.SelectTrigger>
                                            <select_1.SelectValue placeholder="Bir Gruba Ekle"/>
                                        </select_1.SelectTrigger>
                                        <select_1.SelectContent>
                                             {newsletter_data_1.groups.map(group => (<select_1.SelectItem key={group.id} value={group.id}>{group.name}</select_1.SelectItem>))}
                                        </select_1.SelectContent>
                                    </select_1.Select>
                                     <select_1.Select>
                                        <select_1.SelectTrigger>
                                            <select_1.SelectValue placeholder="Bir Segmente Ekle"/>
                                        </select_1.SelectTrigger>
                                        <select_1.SelectContent>
                                            {newsletter_data_1.segments.map(segment => (<select_1.SelectItem key={segment.id} value={segment.id}>{segment.name}</select_1.SelectItem>))}
                                        </select_1.SelectContent>
                                    </select_1.Select>
                                </div>
                            </div>
                        </card_1.CardContent>
                        <card_1.CardFooter className="flex justify-end">
                            <button_1.Button onClick={startVerification} disabled={!fileName}>
                                Doğrulamayı Başlat <lucide_react_1.ArrowLeft className="mr-2 h-4 w-4 rotate-180"/>
                            </button_1.Button>
                        </card_1.CardFooter>
                    </>)}

                {step === 'verifying' && (<card_1.CardContent className="flex flex-col items-center justify-center min-h-[40vh] text-center">
                        <lucide_react_1.Loader2 className="h-16 w-16 text-primary animate-spin mb-4"/>
                        <h2 className="text-2xl font-semibold">E-postalar Doğrulanıyor...</h2>
                        <p className="text-muted-foreground mt-2 mb-6">Lütfen bekleyin, aboneleriniz kontrol ediliyor. Bu işlem birkaç dakika sürebilir.</p>
                        <progress_1.Progress value={progress} className="w-full max-w-md"/>
                         <p className="text-sm font-medium mt-2">{progress}%</p>
                    </card_1.CardContent>)}
                
                {step === 'results' && (<>
                    <card_1.CardContent className="space-y-6 pt-6">
                         <alert_1.Alert>
                            <lucide_react_1.CheckCircle className="h-4 w-4"/>
                            <alert_1.AlertTitle>Doğrulama Tamamlandı!</alert_1.AlertTitle>
                            <alert_1.AlertDescription>
                                İşte {fileName} dosyanızın analiz sonuçları. Lütfen sonuçları inceleyip içe aktarma işlemini onaylayın.
                            </alert_1.AlertDescription>
                        </alert_1.Alert>

                         <div className="grid md:grid-cols-3 gap-4 text-center">
                             <card_1.Card>
                                <card_1.CardHeader>
                                    <card_1.CardTitle className="text-green-600 flex items-center justify-center gap-2"><lucide_react_1.CheckCircle />Geçerli</card_1.CardTitle>
                                </card_1.CardHeader>
                                <card_1.CardContent>
                                    <p className="text-3xl font-bold">1,152</p>
                                    <p className="text-xs text-muted-foreground">Abone listeye eklenecek.</p>
                                </card_1.CardContent>
                            </card_1.Card>
                             <card_1.Card>
                                <card_1.CardHeader>
                                    <card_1.CardTitle className="text-red-600 flex items-center justify-center gap-2"><lucide_react_1.XCircle />Geçersiz</card_1.CardTitle>
                                </card_1.CardHeader>
                                <card_1.CardContent>
                                    <p className="text-3xl font-bold">87</p>
                                    <p className="text-xs text-muted-foreground">Geçersiz format, sahte alan adları.</p>
                                </card_1.CardContent>
                            </card_1.Card>
                             <card_1.Card>
                                <card_1.CardHeader>
                                    <card_1.CardTitle className="text-yellow-600 flex items-center justify-center gap-2"><lucide_react_1.ListFilter />Riskli</card_1.CardTitle>
                                </card_1.CardHeader>
                                <card_1.CardContent>
                                    <p className="text-3xl font-bold">11</p>
                                    <p className="text-xs text-muted-foreground">Tek kullanımlık e-postalar, manuel onay bekliyor.</p>
                                </card_1.CardContent>
                            </card_1.Card>
                        </div>
                         <p className="text-sm text-muted-foreground text-center">
                            Sadece "Geçerli" olarak işaretlenen e-postalar abone listenize eklenecektir. Geçersiz ve riskli e-postaların detaylı raporunu indirebilirsiniz.
                        </p>
                    </card_1.CardContent>
                     <card_1.CardFooter className="flex justify-between">
                         <button_1.Button variant="outline" onClick={() => setStep('upload')}>
                            <lucide_react_1.ArrowLeft className="mr-2 h-4 w-4"/> Geri Dön
                        </button_1.Button>
                         <div className='flex gap-2'>
                            <button_1.Button variant="secondary">Detaylı Raporu İndir</button_1.Button>
                            <button_1.Button>
                                1,152 Aboneyi İçe Aktar
                            </button_1.Button>
                        </div>
                    </card_1.CardFooter>
                    </>)}


            </card_1.Card>
        </div>);
}
//# sourceMappingURL=page.js.map