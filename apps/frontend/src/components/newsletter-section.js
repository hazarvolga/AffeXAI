"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterSection = NewsletterSection;
const button_1 = require("./ui/button");
const card_1 = require("./ui/card");
const input_1 = require("./ui/input");
const checkbox_1 = require("./ui/checkbox");
const label_1 = require("./ui/label");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
function NewsletterSection() {
    return (<section className="w-full py-16 md:py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-5 gap-8">
                    {/* Newsletter Panel */}
                    <div className="lg:col-span-3">
                        <card_1.Card className="h-full flex flex-col">
                            <card_1.CardHeader>
                                <div className="flex items-center gap-3 mb-2">
                                    <lucide_react_1.Mail className="h-6 w-6 text-primary"/>
                                    <card_1.CardTitle className="text-2xl font-headline">Bültenimize Abone Olun</card_1.CardTitle>
                                </div>
                                <card_1.CardDescription>
                                    ALLPLAN güncellemelerini ilk öğrenen siz olun.
                                </card_1.CardDescription>
                            </card_1.CardHeader>
                            <card_1.CardContent className="flex-grow space-y-6">
                                <ul className="space-y-3 text-muted-foreground">
                                    <li className="flex items-start gap-2">
                                        <lucide_react_1.Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0"/>
                                        <span>En son sürüm duyuruları ve yenilikler</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <lucide_react_1.Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0"/>
                                        <span>Etkinliklere, eğitimlere ve webinarlara özel davetiyeler</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <lucide_react_1.Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0"/>
                                        <span>Sektör, şirket ve ürün haberleri</span>
                                    </li>
                                </ul>
                                <form className="space-y-4">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <input_1.Input placeholder="Adınız Soyadınız" type="text"/>
                                        <input_1.Input placeholder="E-posta Adresiniz" type="email"/>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <checkbox_1.Checkbox id="terms"/>
                                        <label_1.Label htmlFor="terms" className="text-xs text-muted-foreground">
                                            <link_1.default href="/privacy" className="underline hover:text-primary">Gizlilik politikamızı</link_1.default> okudum ve kabul ediyorum.
                                        </label_1.Label>
                                    </div>
                                    <button_1.Button type="submit" className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                                        Şimdi Abone Ol
                                    </button_1.Button>
                                </form>
                            </card_1.CardContent>
                        </card_1.Card>
                    </div>

                    {/* Offers Panel */}
                    <div className="lg:col-span-2 space-y-8">
                        <card_1.Card>
                            <card_1.CardHeader>
                                <card_1.CardTitle className="text-xl font-headline flex items-center gap-3">
                                    <lucide_react_1.Rocket className="h-6 w-6 text-accent"/>
                                    ALLPLAN'ı Deneyin veya Teklif Alın
                                </card_1.CardTitle>
                            </card_1.CardHeader>
                            <card_1.CardContent className="flex flex-col sm:flex-row lg:flex-col gap-4">
                                <button_1.Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                                    14 Günlük Ücretsiz Deneme
                                </button_1.Button>
                                <button_1.Button size="lg" variant="outline" className="w-full">
                                    Teklif İste
                                </button_1.Button>
                            </card_1.CardContent>
                        </card_1.Card>
                        <card_1.Card>
                             <card_1.CardHeader>
                                <card_1.CardTitle className="text-xl font-headline flex items-center gap-3">
                                    <lucide_react_1.FileText className="h-6 w-6 text-primary"/>
                                    Paketleri Karşılaştırın
                                </card_1.CardTitle>
                            </card_1.CardHeader>
                            <card_1.CardContent className="flex flex-col gap-2">
                                <link_1.default href="#" className="text-sm font-medium text-primary hover:underline">Allplan Paket Karşılaştırması</link_1.default>
                                <link_1.default href="#" className="text-sm font-medium text-primary hover:underline">BIMPLUS Paket Karşılaştırması</link_1.default>
                            </card_1.CardContent>
                        </card_1.Card>
                    </div>
                </div>
            </div>
        </section>);
}
//# sourceMappingURL=newsletter-section.js.map