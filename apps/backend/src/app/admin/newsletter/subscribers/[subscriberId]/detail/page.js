"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SubscriberDetailPage;
const react_1 = require("react");
const react_2 = require("react");
const navigation_1 = require("next/navigation");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const separator_1 = require("@/components/ui/separator");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const subscribersService_1 = __importDefault(require("@/lib/api/subscribersService"));
function SubscriberDetailPage({ params }) {
    // Unwrap the params promise using React.use()
    const unwrappedParams = (0, react_2.use)(params);
    const { subscriberId } = unwrappedParams;
    const [subscriber, setSubscriber] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const hasFetchedSubscriber = (0, react_1.useRef)(false);
    const router = (0, navigation_1.useRouter)();
    (0, react_1.useEffect)(() => {
        // Prevent multiple fetches
        if (hasFetchedSubscriber.current)
            return;
        hasFetchedSubscriber.current = true;
        const fetchSubscriber = async () => {
            try {
                setLoading(true);
                const subscriberData = await subscribersService_1.default.getSubscriberById(subscriberId);
                setSubscriber(subscriberData);
                setError(null);
            }
            catch (err) {
                console.error('Error fetching subscriber:', err);
                if (err.response?.status === 404) {
                    (0, navigation_1.notFound)();
                }
                else {
                    setError('Abone bilgileri yüklenirken bir hata oluştu.');
                }
            }
            finally {
                setLoading(false);
            }
        };
        fetchSubscriber();
    }, [subscriberId]);
    if (loading) {
        return <div className="flex justify-center items-center h-64">Yükleniyor...</div>;
    }
    if (error) {
        return <div className="text-center text-red-500 py-12">{error}</div>;
    }
    if (!subscriber) {
        (0, navigation_1.notFound)();
        return null;
    }
    const getStatusVariant = (status) => {
        switch (status) {
            case 'active': return 'default';
            case 'pending': return 'secondary';
            case 'unsubscribed': return 'outline';
            default: return 'outline';
        }
    };
    const getStatusText = (status) => {
        switch (status) {
            case 'active': return 'Aktif';
            case 'pending': return 'Onay Bekliyor';
            case 'unsubscribed': return 'İptal Edilmiş';
            default: return status;
        }
    };
    const getMailerCheckIcon = (result) => {
        if (!result)
            return <lucide_react_1.HelpCircle className="h-4 w-4 text-muted-foreground"/>;
        switch (result.toLowerCase()) {
            case 'valid':
                return <lucide_react_1.CheckCircle className="h-4 w-4 text-green-500"/>;
            case 'invalid':
                return <lucide_react_1.XCircle className="h-4 w-4 text-red-500"/>;
            default:
                return <lucide_react_1.HelpCircle className="h-4 w-4 text-yellow-500"/>;
        }
    };
    const getMailerCheckText = (result) => {
        if (!result)
            return 'Bilinmiyor';
        return result.charAt(0).toUpperCase() + result.slice(1);
    };
    return (<div className="space-y-8">
      <div className="flex items-center gap-4">
        <button_1.Button variant="outline" size="icon" asChild>
          <link_1.default href="/admin/newsletter">
            <lucide_react_1.ArrowLeft className="h-4 w-4"/>
          </link_1.default>
        </button_1.Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Abone Detayı</h1>
          <p className="text-muted-foreground">{subscriber.email}</p>
        </div>
      </div>

      <card_1.Card>
        <card_1.CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <card_1.CardTitle>Abone Bilgileri</card_1.CardTitle>
              <card_1.CardDescription>
                Abonenin detaylı bilgileri ve tercihleri.
              </card_1.CardDescription>
            </div>
            <button_1.Button asChild>
              <link_1.default href={`/admin/newsletter/subscribers/${subscriberId}`}>
                <lucide_react_1.Edit className="mr-2 h-4 w-4"/>
                Düzenle
              </link_1.default>
            </button_1.Button>
          </div>
        </card_1.CardHeader>
        <card_1.CardContent className="space-y-6">
          {/* Email and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <lucide_react_1.Mail className="h-4 w-4 text-muted-foreground"/>
                <span className="text-sm font-medium">Email</span>
              </div>
              <p className="text-lg">{subscriber.email}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <lucide_react_1.User className="h-4 w-4 text-muted-foreground"/>
                <span className="text-sm font-medium">Durum</span>
              </div>
              <badge_1.Badge variant={getStatusVariant(subscriber.status)}>
                {getStatusText(subscriber.status)}
              </badge_1.Badge>
            </div>
          </div>

          <separator_1.Separator />

          {/* Groups */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <lucide_react_1.Folder className="h-4 w-4 text-muted-foreground"/>
              <span className="text-sm font-medium">Gruplar</span>
            </div>
            {subscriber.groups.length > 0 ? (<div className="flex flex-wrap gap-2">
                {subscriber.groups.map((group, index) => (<badge_1.Badge key={index} variant="outline" className="flex items-center gap-1">
                    {group}
                  </badge_1.Badge>))}
              </div>) : (<p className="text-muted-foreground text-sm">Bu abone hiçbir gruba eklenmemiş.</p>)}
          </div>

          <separator_1.Separator />

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <lucide_react_1.User className="h-4 w-4 text-muted-foreground"/>
                <span className="text-sm font-medium">Ad</span>
              </div>
              <p>{subscriber.firstName || 'Belirtilmemiş'}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <lucide_react_1.User className="h-4 w-4 text-muted-foreground"/>
                <span className="text-sm font-medium">Soyad</span>
              </div>
              <p>{subscriber.lastName || 'Belirtilmemiş'}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <lucide_react_1.Building className="h-4 w-4 text-muted-foreground"/>
                <span className="text-sm font-medium">Şirket</span>
              </div>
              <p>{subscriber.company || 'Belirtilmemiş'}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <lucide_react_1.Phone className="h-4 w-4 text-muted-foreground"/>
                <span className="text-sm font-medium">Telefon</span>
              </div>
              <p>{subscriber.phone || 'Belirtilmemiş'}</p>
            </div>
          </div>

          <separator_1.Separator />

          {/* Customer Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <lucide_react_1.User className="h-4 w-4 text-muted-foreground"/>
                <span className="text-sm font-medium">Müşteri Durumu</span>
              </div>
              <p>{subscriber.customerStatus || 'Bilinmiyor'}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <lucide_react_1.Tag className="h-4 w-4 text-muted-foreground"/>
                <span className="text-sm font-medium">Kalıcı/SUB/SSA</span>
              </div>
              <p>{subscriber.subscriptionType || 'Belirtilmemiş'}</p>
            </div>
          </div>

          <separator_1.Separator />

          {/* MailerCheck Result */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {getMailerCheckIcon(subscriber.mailerCheckResult)}
              <span className="text-sm font-medium">MailerCheck result</span>
            </div>
            <p>{getMailerCheckText(subscriber.mailerCheckResult)}</p>
          </div>

          <separator_1.Separator />

          {/* Subscription Date */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <lucide_react_1.Calendar className="h-4 w-4 text-muted-foreground"/>
              <span className="text-sm font-medium">Abonelik Tarihi</span>
            </div>
            <p>{new Date(subscriber.subscribedAt).toLocaleDateString('tr-TR')}</p>
          </div>
        </card_1.CardContent>
      </card_1.Card>
    </div>);
}
//# sourceMappingURL=page.js.map