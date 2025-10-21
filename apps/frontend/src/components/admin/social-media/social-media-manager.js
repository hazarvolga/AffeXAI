"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialMediaManager = SocialMediaManager;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const label_1 = require("@/components/ui/label");
const textarea_1 = require("@/components/ui/textarea");
const switch_1 = require("@/components/ui/switch");
const input_1 = require("@/components/ui/input");
const social_media_data_1 = require("@/lib/social-media-data");
const utils_1 = require("@/lib/utils");
const checkbox_1 = require("@/components/ui/checkbox");
const lucide_react_1 = require("lucide-react");
const AccountConnection = ({ selectedAccounts, onSelectionChange }) => {
    return (<card_1.Card>
            <card_1.CardHeader>
                <card_1.CardTitle>1. Hesap Seçimi</card_1.CardTitle>
                <card_1.CardDescription>Paylaşım yapılacak sosyal medya hesaplarını seçin.</card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent className="space-y-4">
                {social_media_data_1.socialAccounts.map(account => {
            const PlatformIcon = (0, social_media_data_1.getPlatformIcon)(account.platform);
            const isSelected = selectedAccounts.includes(account.id);
            return (<div key={account.id} className={(0, utils_1.cn)("flex items-center justify-between p-3 rounded-lg border", isSelected && "ring-2 ring-primary border-primary")}>
                            <div className="flex items-center gap-4">
                                <PlatformIcon className="h-6 w-6 text-muted-foreground"/>
                                <div>
                                    <p className="font-semibold">{account.username}</p>
                                    <p className="text-sm text-muted-foreground">{account.platform}</p>
                                </div>
                            </div>
                            {account.isConnected ? (<div className="flex items-center gap-2">
                                    <label_1.Label htmlFor={`select-${account.id}`} className="text-sm">Seç</label_1.Label>
                                    <checkbox_1.Checkbox id={`select-${account.id}`} checked={isSelected} onCheckedChange={() => onSelectionChange(account.id)}/>
                                </div>) : (<button_1.Button variant="outline" size="sm">Bağlan</button_1.Button>)}
                        </div>);
        })}
            </card_1.CardContent>
        </card_1.Card>);
};
const PostScheduler = () => {
    const [isScheduled, setIsScheduled] = (0, react_1.useState)(false);
    return (<card_1.Card>
            <card_1.CardHeader>
                <card_1.CardTitle>2. Gönderim Ayarları</card_1.CardTitle>
                <card_1.CardDescription>Paylaşımın ne zaman yapılacağını ve içeriğini özelleştirin.</card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                    <switch_1.Switch id="schedule-switch" checked={isScheduled} onCheckedChange={setIsScheduled}/>
                    <label_1.Label htmlFor="schedule-switch">Gönderiyi Planla</label_1.Label>
                </div>
                 {isScheduled && (<div className="grid grid-cols-2 gap-2">
                        <input_1.Input type="date"/>
                        <input_1.Input type="time"/>
                    </div>)}
                 <div className="space-y-2">
                    <label_1.Label htmlFor="custom-message">Platforma Özel Mesaj (Opsiyonel)</label_1.Label>
                    <textarea_1.Textarea id="custom-message" placeholder="Her platform için standart metin kullanılacak. Buraya yazarak üzerine yazabilirsiniz."/>
                    <p className="text-xs text-muted-foreground">Twitter için 280 karakter sınırı gibi platform limitlerini göz önünde bulundurun.</p>
                </div>
            </card_1.CardContent>
             <card_1.CardFooter>
                <button_1.Button className="w-full" disabled={!isScheduled}>
                    <lucide_react_1.Clock className="mr-2 h-4 w-4"/> Planla
                </button_1.Button>
            </card_1.CardFooter>
        </card_1.Card>);
};
function SocialMediaManager() {
    const [selectedAccounts, setSelectedAccounts] = (0, react_1.useState)(social_media_data_1.socialAccounts.filter(a => a.isConnected).map(a => a.id));
    const handleAccountSelection = (accountId) => {
        setSelectedAccounts(prev => prev.includes(accountId)
            ? prev.filter(id => id !== accountId)
            : [...prev, accountId]);
    };
    return (<div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <AccountConnection selectedAccounts={selectedAccounts} onSelectionChange={handleAccountSelection}/>
                <div className="space-y-8">
                    <PostScheduler />
                     <card_1.Card>
                        <card_1.CardHeader>
                             <card_1.CardTitle>Şimdi Paylaş</card_1.CardTitle>
                             <card_1.CardDescription>Seçili hesaplarda anında paylaşım yapın.</card_1.CardDescription>
                        </card_1.CardHeader>
                        <card_1.CardFooter>
                            <button_1.Button className="w-full" disabled={selectedAccounts.length === 0}>
                                <lucide_react_1.Send className="mr-2 h-4 w-4"/> Şimdi Paylaş
                            </button_1.Button>
                        </card_1.CardFooter>
                    </card_1.Card>
                </div>
            </div>
        </div>);
}
//# sourceMappingURL=social-media-manager.js.map