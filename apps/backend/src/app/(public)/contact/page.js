"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ContactPage;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const textarea_1 = require("@/components/ui/textarea");
const select_1 = require("@/components/ui/select");
const lucide_react_1 = require("lucide-react");
const contactInfo = [
    { icon: lucide_react_1.Mail, text: "info@aluplan.com.tr", href: "mailto:info@aluplan.com.tr" },
    { icon: lucide_react_1.Phone, text: "+90 216 123 45 67", href: "tel:+902161234567" },
    { icon: lucide_react_1.MapPin, text: "Örnek Mah. Teknoloji Cad. No:123, Ataşehir/İstanbul", href: "#" }
];
function ContactPage() {
    return (<div>
            <page_hero_1.PageHero title="İletişim" subtitle="Uzman ekibimizle tanışın ve dijital dönüşüm yolculuğunuzda size nasıl yardımcı olabileceğimizi öğrenin."/>
            <breadcrumb_1.Breadcrumb items={[{ name: 'İletişim', href: '/contact' }]}/>
            <div className="container mx-auto py-16 px-4">
                <div className="grid lg:grid-cols-5 gap-12">
                    {/* Contact Form */}
                    <div className="lg:col-span-3">
                        <card_1.Card>
                            <card_1.CardHeader>
                                <card_1.CardTitle>Bize Mesaj Gönderin</card_1.CardTitle>
                            </card_1.CardHeader>
                            <card_1.CardContent>
                                <form className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label_1.Label htmlFor="name">Adınız Soyadınız</label_1.Label>
                                            <input_1.Input id="name" placeholder="Adınız Soyadınız" icon={lucide_react_1.User}/>
                                        </div>
                                        <div className="space-y-2">
                                            <label_1.Label htmlFor="company">Firma Adı</label_1.Label>
                                            <input_1.Input id="company" placeholder="Firma Adınız" icon={lucide_react_1.Building}/>
                                        </div>
                                    </div>
                                     <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label_1.Label htmlFor="email">E-posta Adresiniz</label_1.Label>
                                            <input_1.Input id="email" type="email" placeholder="E-posta Adresiniz" icon={lucide_react_1.Mail}/>
                                        </div>
                                        <div className="space-y-2">
                                            <label_1.Label htmlFor="phone">Telefon Numaranız</label_1.Label>
                                            <input_1.Input id="phone" type="tel" placeholder="Telefon Numaranız" icon={lucide_react_1.Phone}/>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label_1.Label htmlFor="subject">Konu</label_1.Label>
                                        <select_1.Select>
                                            <select_1.SelectTrigger id="subject">
                                                <select_1.SelectValue placeholder="İletişim nedeninizi seçin..."/>
                                            </select_1.SelectTrigger>
                                            <select_1.SelectContent>
                                                <select_1.SelectItem value="sales">Satış ve Teklif</select_1.SelectItem>
                                                <select_1.SelectItem value="support">Teknik Destek</select_1.SelectItem>
                                                <select_1.SelectItem value="training">Eğitim ve Danışmanlık</select_1.SelectItem>
                                                <select_1.SelectItem value="other">Diğer</select_1.SelectItem>
                                            </select_1.SelectContent>
                                        </select_1.Select>
                                    </div>
                                    <div className="space-y-2">
                                        <label_1.Label htmlFor="message">Mesajınız</label_1.Label>
                                        <textarea_1.Textarea id="message" placeholder="Mesajınızı buraya yazın..." className="min-h-[120px]"/>
                                    </div>
                                    <button_1.Button type="submit" className="w-full">
                                        <lucide_react_1.MailQuestion className="mr-2 h-4 w-4"/>
                                        Mesajı Gönder
                                    </button_1.Button>
                                </form>
                            </card_1.CardContent>
                        </card_1.Card>
                    </div>
                    {/* Contact Details & Map */}
                    <div className="lg:col-span-2 space-y-8">
                        <card_1.Card>
                            <card_1.CardHeader>
                                <card_1.CardTitle>İletişim Bilgilerimiz</card_1.CardTitle>
                            </card_1.CardHeader>
                            <card_1.CardContent className="space-y-4">
                                {contactInfo.map(info => (<a key={info.text} href={info.href} className="flex items-start gap-4 group">
                                        <info.icon className="h-5 w-5 text-primary mt-1 flex-shrink-0"/>
                                        <span className="text-muted-foreground group-hover:text-foreground transition-colors">{info.text}</span>
                                    </a>))}
                            </card_1.CardContent>
                        </card_1.Card>
                        <card_1.Card>
                             <card_1.CardContent className="p-0">
                                <div className="aspect-video w-full">
                                    {/* Replace with a real map component or an iframe */}
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.889923812745!2d29.12345671540916!3d40.99987697930198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac68a127f3f3f%3A0x92cf1a23e5a5966!2sAta%C5%9Fehir%2C%20%C4%B0stanbul!5e0!3m2!1str!2str!4v1678886543210!5m2!1str!2str" width="100%" height="100%" style={{ border: 0 }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-lg"></iframe>
                                </div>
                             </card_1.CardContent>
                        </card_1.Card>
                    </div>
                </div>
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map