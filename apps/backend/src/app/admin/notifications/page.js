"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NotificationsPage;
const card_1 = require("@/components/ui/card");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
const button_1 = require("@/components/ui/button");
const react_1 = require("react");
const initialNotifications = [
    { id: 1, type: 'new_user', title: 'Yeni Kullanıcı Kaydı', message: 'editor@example.com adresiyle yeni bir kullanıcı kayıt oldu.', read: false, time: '5 dakika önce' },
    { id: 2, type: 'system_alert', title: 'Sistem Uyarısı', message: 'Sunucu belleği %90 doluluk oranına ulaştı.', read: false, time: '1 saat önce' },
    { id: 3, type: 'content_approval', title: 'Onay Bekleyen İçerik', message: '"Yeni Allplan Sürümü" başlıklı blog yazısı onayınızı bekliyor.', read: true, time: '3 saat önce' },
    { id: 4, type: 'update_complete', title: 'Güncelleme Başarılı', message: 'Sistem başarıyla v2.1.0 sürümüne güncellendi.', read: true, time: '1 gün önce' },
];
const getNotificationIcon = (type) => {
    switch (type) {
        case 'system_alert': return <lucide_react_1.AlertTriangle className="h-5 w-5 text-destructive"/>;
        case 'new_user': return <lucide_react_1.UserPlus className="h-5 w-5 text-blue-500"/>;
        case 'content_approval': return <lucide_react_1.Info className="h-5 w-5 text-orange-500"/>;
        case 'update_complete': return <lucide_react_1.CheckCircle className="h-5 w-5 text-green-500"/>;
        default: return <lucide_react_1.Bell className="h-5 w-5 text-muted-foreground"/>;
    }
};
function NotificationsPage() {
    const [notifications, setNotifications] = (0, react_1.useState)(initialNotifications);
    const markAsRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };
    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };
    return (<card_1.Card>
      <card_1.CardHeader className="flex flex-row items-center justify-between">
        <div>
            <card_1.CardTitle>Bildirim Merkezi</card_1.CardTitle>
            <card_1.CardDescription>Son sistem ve kullanıcı bildirimleri.</card_1.CardDescription>
        </div>
         <button_1.Button variant="outline" onClick={markAllAsRead} disabled={notifications.every(n => n.read)}>
            Tümünü Okundu Olarak İşaretle
        </button_1.Button>
      </card_1.CardHeader>
      <card_1.CardContent>
        {notifications.length > 0 ? (<div className="space-y-4">
            {notifications.map((notification) => (<div key={notification.id} className={(0, utils_1.cn)("flex items-start gap-4 rounded-lg border p-4 transition-colors", !notification.read && "bg-secondary/50")}>
                <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                <div className="flex-1">
                    <p className="font-semibold">{notification.title}</p>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
                {!notification.read && (<button_1.Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>Okundu olarak işaretle</button_1.Button>)}
                </div>))}
            </div>) : (<div className="text-center py-12 text-muted-foreground">
                <lucide_react_1.Bell className="h-12 w-12 mx-auto mb-4"/>
                <p>Görüntülenecek yeni bildirim yok.</p>
            </div>)}
      </card_1.CardContent>
    </card_1.Card>);
}
//# sourceMappingURL=page.js.map