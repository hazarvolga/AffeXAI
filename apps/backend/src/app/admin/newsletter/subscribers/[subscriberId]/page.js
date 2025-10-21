"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditSubscriberPage;
const react_1 = require("react");
const react_2 = require("react");
const navigation_1 = require("next/navigation");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const select_1 = require("@/components/ui/select");
const separator_1 = require("@/components/ui/separator");
const badge_1 = require("@/components/ui/badge");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const subscribersService_1 = __importDefault(require("@/lib/api/subscribersService"));
const groupsService_1 = __importDefault(require("@/lib/api/groupsService"));
const segmentsService_1 = __importDefault(require("@/lib/api/segmentsService"));
const emailValidationService_1 = __importDefault(require("@/lib/api/emailValidationService"));
function EditSubscriberPage({ params }) {
    // Unwrap the params promise using React.use()
    const unwrappedParams = (0, react_2.use)(params);
    const { subscriberId } = unwrappedParams;
    const [subscriber, setSubscriber] = (0, react_1.useState)(null);
    const [newGroup, setNewGroup] = (0, react_1.useState)("");
    const [newSegment, setNewSegment] = (0, react_1.useState)("");
    const [showGroupSuggestions, setShowGroupSuggestions] = (0, react_1.useState)(false);
    const [showSegmentSuggestions, setShowSegmentSuggestions] = (0, react_1.useState)(false);
    const [availableGroups, setAvailableGroups] = (0, react_1.useState)([]);
    const [availableSegments, setAvailableSegments] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [saving, setSaving] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const [validatingEmail, setValidatingEmail] = (0, react_1.useState)(false);
    const [emailValidationResult, setEmailValidationResult] = (0, react_1.useState)(null);
    const emailValidationTimeout = (0, react_1.useRef)(null);
    const hasFetchedSubscriber = (0, react_1.useRef)(false);
    const router = (0, navigation_1.useRouter)();
    (0, react_1.useEffect)(() => {
        const fetchSubscriber = async () => {
            if (hasFetchedSubscriber.current)
                return;
            hasFetchedSubscriber.current = true;
            try {
                setLoading(true);
                const [subscriberData, groupsData, segmentsData] = await Promise.all([
                    subscribersService_1.default.getSubscriberById(subscriberId),
                    groupsService_1.default.getAllGroups(),
                    segmentsService_1.default.getAllSegments()
                ]);
                setSubscriber(subscriberData);
                setAvailableGroups(groupsData);
                setAvailableSegments(segmentsData);
                setEmailValidationResult({
                    email: subscriberData.email,
                    isValid: true,
                    status: subscriberData.mailerCheckResult || 'unknown',
                    confidence: 100
                });
            }
            catch (err) {
                console.error('Error fetching subscriber:', err);
                setError('Abone bilgileri yüklenirken bir hata oluştu.');
                if (err.response?.status === 404) {
                    (0, navigation_1.notFound)();
                }
            }
            finally {
                setLoading(false);
            }
        };
        fetchSubscriber();
    }, [subscriberId]);
    const validateEmail = async (email) => {
        if (!email) {
            setEmailValidationResult(null);
            return;
        }
        setValidatingEmail(true);
        try {
            const result = await emailValidationService_1.default.validateEmail(email);
            setEmailValidationResult(result);
            // Automatically update the mailerCheckResult field
            if (subscriber) {
                setSubscriber({
                    ...subscriber,
                    mailerCheckResult: result.status
                });
            }
        }
        catch (err) {
            console.error('Error validating email:', err);
            setEmailValidationResult({
                email,
                isValid: false,
                status: 'unknown',
                confidence: 0
            });
        }
        finally {
            setValidatingEmail(false);
        }
    };
    const handleEmailChange = (value) => {
        if (!subscriber)
            return;
        setSubscriber({
            ...subscriber,
            email: value
        });
        // Clear any existing timeout
        if (emailValidationTimeout.current) {
            clearTimeout(emailValidationTimeout.current);
        }
        // Set new timeout to validate email after user stops typing
        if (value) {
            emailValidationTimeout.current = setTimeout(() => {
                validateEmail(value);
            }, 500);
        }
    };
    const handleInputChange = (field, value) => {
        if (!subscriber)
            return;
        setSubscriber({
            ...subscriber,
            [field]: value,
        });
    };
    const handleStatusChange = (value) => {
        if (!subscriber)
            return;
        setSubscriber({
            ...subscriber,
            status: value,
        });
    };
    const addGroup = () => {
        if (!subscriber || newGroup.trim() === "" || subscriber.groups.includes(newGroup.trim()))
            return;
        setSubscriber({
            ...subscriber,
            groups: [...subscriber.groups, newGroup.trim()],
        });
        setNewGroup("");
        setShowGroupSuggestions(false);
    };
    const removeGroup = (group) => {
        if (!subscriber)
            return;
        setSubscriber({
            ...subscriber,
            groups: subscriber.groups.filter(g => g !== group),
        });
    };
    const addSegment = () => {
        if (!subscriber || newSegment.trim() === "" || subscriber.segments.includes(newSegment.trim()))
            return;
        setSubscriber({
            ...subscriber,
            segments: [...subscriber.segments, newSegment.trim()],
        });
        setNewSegment("");
        setShowSegmentSuggestions(false);
    };
    const removeSegment = (segment) => {
        if (!subscriber)
            return;
        setSubscriber({
            ...subscriber,
            segments: subscriber.segments.filter(s => s !== segment),
        });
    };
    const handleSave = async () => {
        if (!subscriber)
            return;
        try {
            setSaving(true);
            await subscribersService_1.default.updateSubscriber(subscriber.id, {
                email: subscriber.email,
                status: subscriber.status,
                groups: subscriber.groups,
                segments: subscriber.segments,
                firstName: subscriber.firstName,
                lastName: subscriber.lastName,
                company: subscriber.company,
                phone: subscriber.phone,
                customerStatus: subscriber.customerStatus,
                subscriptionType: subscriber.subscriptionType,
                mailerCheckResult: subscriber.mailerCheckResult
            });
            router.push('/admin/newsletter/subscribers');
        }
        catch (err) {
            console.error('Error updating subscriber:', err);
            setError('Abone güncellenirken bir hata oluştu.');
        }
        finally {
            setSaving(false);
        }
    };
    const getValidationIcon = () => {
        if (validatingEmail) {
            return <div className="h-4 w-4 rounded-full border-2 border-muted-foreground border-t-transparent animate-spin"/>;
        }
        if (!emailValidationResult)
            return null;
        switch (emailValidationResult.status) {
            case 'valid':
                return <lucide_react_1.CheckCircle className="h-4 w-4 text-green-500"/>;
            case 'invalid':
                return <lucide_react_1.XCircle className="h-4 w-4 text-red-500"/>;
            case 'risky':
                return <lucide_react_1.AlertTriangle className="h-4 w-4 text-yellow-500"/>;
            default:
                return <lucide_react_1.HelpCircle className="h-4 w-4 text-muted-foreground"/>;
        }
    };
    const getValidationText = () => {
        if (validatingEmail)
            return 'Doğrulanıyor...';
        if (!emailValidationResult)
            return '';
        switch (emailValidationResult.status) {
            case 'valid': return 'Geçerli';
            case 'invalid': return 'Geçersiz';
            case 'risky': return 'Riskli';
            default: return 'Bilinmiyor';
        }
    };
    const getValidationColor = () => {
        if (!emailValidationResult)
            return '';
        switch (emailValidationResult.status) {
            case 'valid': return 'text-green-500';
            case 'invalid': return 'text-red-500';
            case 'risky': return 'text-yellow-500';
            default: return 'text-muted-foreground';
        }
    };
    if (loading) {
        return (<div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>);
    }
    if (error) {
        return (<div className="space-y-8">
        <div className="flex items-center gap-4">
          <button_1.Button variant="outline" size="icon" asChild>
            <link_1.default href="/admin/newsletter/subscribers">
              <lucide_react_1.ArrowLeft className="h-4 w-4"/>
            </link_1.default>
          </button_1.Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Abone Düzenle</h1>
            <p className="text-muted-foreground">Bir bülten abonesini düzenleyin.</p>
          </div>
        </div>
        
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-destructive">
          <p>{error}</p>
        </div>
      </div>);
    }
    if (!subscriber) {
        return (0, navigation_1.notFound)();
    }
    return (<div className="space-y-8">
      <div className="flex items-center gap-4">
        <button_1.Button variant="outline" size="icon" asChild>
          <link_1.default href="/admin/newsletter/subscribers">
            <lucide_react_1.ArrowLeft className="h-4 w-4"/>
          </link_1.default>
        </button_1.Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Abone Düzenle</h1>
          <p className="text-muted-foreground">{subscriber.email}</p>
        </div>
      </div>

      {error && (<div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-destructive">
          <p>{error}</p>
        </div>)}

      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle>Abone Bilgileri</card_1.CardTitle>
          <card_1.CardDescription>Abonenin iletişim ve profil bilgilerini düzenleyin.</card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent className="space-y-6">
          {/* Email and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label_1.Label htmlFor="email">E-posta *</label_1.Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input_1.Input id="email" value={subscriber.email} onChange={(e) => handleEmailChange(e.target.value)} className="flex-1 pr-10"/>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    {getValidationIcon()}
                  </div>
                </div>
              </div>
              {emailValidationResult && (<div className="space-y-1">
                  <p className={`text-sm ${getValidationColor()}`}>
                    {getValidationText()}
                    {emailValidationResult.confidence !== undefined && ` (Güven: ${emailValidationResult.confidence}%)`}
                  </p>
                  {emailValidationResult.checks?.typo?.suggestion && (<p className="text-sm text-muted-foreground">
                      Muhtemel yazım hatası: {emailValidationResult.checks.typo.suggestion}
                    </p>)}
                </div>)}
            </div>
            
            <div className="space-y-2">
              <label_1.Label htmlFor="status">Durum</label_1.Label>
              <select_1.Select value={subscriber.status} onValueChange={handleStatusChange}>
                <select_1.SelectTrigger id="status">
                  <select_1.SelectValue placeholder="Durum seçin"/>
                </select_1.SelectTrigger>
                <select_1.SelectContent>
                  <select_1.SelectItem value="active">Aktif</select_1.SelectItem>
                  <select_1.SelectItem value="pending">Onay Bekliyor</select_1.SelectItem>
                  <select_1.SelectItem value="unsubscribed">İptal Edilmiş</select_1.SelectItem>
                </select_1.SelectContent>
              </select_1.Select>
            </div>
          </div>

          <separator_1.Separator />

          {/* Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label_1.Label htmlFor="firstName">Ad</label_1.Label>
              <input_1.Input id="firstName" value={subscriber.firstName || ''} onChange={(e) => handleInputChange('firstName', e.target.value)} placeholder="Ad"/>
            </div>
            
            <div className="space-y-2">
              <label_1.Label htmlFor="lastName">Soyad</label_1.Label>
              <input_1.Input id="lastName" value={subscriber.lastName || ''} onChange={(e) => handleInputChange('lastName', e.target.value)} placeholder="Soyad"/>
            </div>
          </div>

          {/* Company and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label_1.Label htmlFor="company">Şirket</label_1.Label>
              <input_1.Input id="company" value={subscriber.company || ''} onChange={(e) => handleInputChange('company', e.target.value)} placeholder="Şirket adı"/>
            </div>
            
            <div className="space-y-2">
              <label_1.Label htmlFor="phone">Telefon</label_1.Label>
              <input_1.Input id="phone" value={subscriber.phone || ''} onChange={(e) => handleInputChange('phone', e.target.value)} placeholder="Telefon numarası"/>
            </div>
          </div>

          <separator_1.Separator />

          {/* Customer Status and Subscription Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label_1.Label htmlFor="customerStatus">Müşteri Durumu</label_1.Label>
              <input_1.Input id="customerStatus" value={subscriber.customerStatus || ''} onChange={(e) => handleInputChange('customerStatus', e.target.value)} placeholder="Müşteri durumu"/>
            </div>
            
            <div className="space-y-2">
              <label_1.Label htmlFor="subscriptionType">Kalıcı/SUB/SSA</label_1.Label>
              <input_1.Input id="subscriptionType" value={subscriber.subscriptionType || ''} onChange={(e) => handleInputChange('subscriptionType', e.target.value)} placeholder="Abonelik Türü"/>
            </div>
          </div>

          <separator_1.Separator />

          {/* Groups */}
          <div className="space-y-2">
            <label_1.Label htmlFor="groups">Gruplar</label_1.Label>
            <div className="flex gap-2">
              <input_1.Input id="groups" value={newGroup} onChange={(e) => setNewGroup(e.target.value)} onKeyDown={(e) => {
            if (e.key === 'Enter') {
                addGroup();
            }
        }} placeholder="Grup adı girin"/>
              <button_1.Button type="button" onClick={addGroup} size="icon">
                <lucide_react_1.Plus className="h-4 w-4"/>
              </button_1.Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {subscriber.groups.map((group) => (<badge_1.Badge key={group} variant="secondary" className="gap-1 pr-1">
                  {group}
                  <button type="button" onClick={() => removeGroup(group)} className="rounded-full hover:bg-secondary-foreground/20 p-0.5">
                    <lucide_react_1.X className="h-3 w-3"/>
                  </button>
                </badge_1.Badge>))}
            </div>
          </div>

          {/* Segments */}
          <div className="space-y-2">
            <label_1.Label htmlFor="segments">Segmentler</label_1.Label>
            <div className="flex gap-2">
              <input_1.Input id="segments" value={newSegment} onChange={(e) => setNewSegment(e.target.value)} onKeyDown={(e) => {
            if (e.key === 'Enter') {
                addSegment();
            }
        }} placeholder="Segment adı girin"/>
              <button_1.Button type="button" onClick={addSegment} size="icon">
                <lucide_react_1.Plus className="h-4 w-4"/>
              </button_1.Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {subscriber.segments.map((segment) => (<badge_1.Badge key={segment} variant="secondary" className="gap-1 pr-1">
                  {segment}
                  <button type="button" onClick={() => removeSegment(segment)} className="rounded-full hover:bg-secondary-foreground/20 p-0.5">
                    <lucide_react_1.X className="h-3 w-3"/>
                  </button>
                </badge_1.Badge>))}
            </div>
          </div>

          <separator_1.Separator />

          {/* MailerCheck Result */}
          <div className="space-y-2">
            <label_1.Label htmlFor="mailerCheckResult">MailerCheck result</label_1.Label>
            <input_1.Input id="mailerCheckResult" value={subscriber.mailerCheckResult || ''} onChange={(e) => handleInputChange('mailerCheckResult', e.target.value)} placeholder="MailerCheck Sonucu"/>
            <p className="text-sm text-muted-foreground">
              E-posta doğrulama sonucu otomatik olarak doldurulur, ancak manuel olarak da düzenleyebilirsiniz.
            </p>
          </div>
        </card_1.CardContent>
        <card_1.CardFooter className="flex justify-end gap-2">
          <button_1.Button variant="outline" asChild>
            <link_1.default href="/admin/newsletter/subscribers">İptal</link_1.default>
          </button_1.Button>
          <button_1.Button onClick={handleSave} disabled={saving}>
            <lucide_react_1.Save className="mr-2 h-4 w-4"/>
            {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
          </button_1.Button>
        </card_1.CardFooter>
      </card_1.Card>
    </div>);
}
//# sourceMappingURL=page.js.map