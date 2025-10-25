"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdminProfilePage;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const label_1 = require("@/components/ui/label");
const input_1 = require("@/components/ui/input");
const button_1 = require("@/components/ui/button");
const separator_1 = require("@/components/ui/separator");
const api_1 = require("@/lib/api");
const navigation_1 = require("next/navigation");
const lucide_react_1 = require("lucide-react");
const use_toast_1 = require("@/hooks/use-toast");
function AdminProfilePage() {
    const router = (0, navigation_1.useRouter)();
    const { toast } = (0, use_toast_1.useToast)();
    const [currentUser, setCurrentUser] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [saving, setSaving] = (0, react_1.useState)(false);
    // Profile form state
    const [firstName, setFirstName] = (0, react_1.useState)('');
    const [lastName, setLastName] = (0, react_1.useState)('');
    const [email, setEmail] = (0, react_1.useState)('');
    const [phone, setPhone] = (0, react_1.useState)('');
    const [city, setCity] = (0, react_1.useState)('');
    const [country, setCountry] = (0, react_1.useState)('');
    const [address, setAddress] = (0, react_1.useState)('');
    const [bio, setBio] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        loadUserData();
    }, []);
    const loadUserData = async () => {
        try {
            if (!api_1.authService.isAuthenticated()) {
                router.push('/admin/login');
                return;
            }
            const user = api_1.authService.getUserFromToken();
            if (!user) {
                router.push('/admin/login');
                return;
            }
            setCurrentUser(user);
            // Set form values from user data
            setFirstName(user.firstName || '');
            setLastName(user.lastName || '');
            setEmail(user.email || '');
            setPhone(user.phone || '');
            setCity(user.city || '');
            setCountry(user.country || '');
            setAddress(user.address || '');
            setBio(user.bio || '');
            setLoading(false);
        }
        catch (error) {
            console.error('Error loading user data:', error);
            toast({
                title: 'Hata',
                description: 'Kullanıcı bilgileri yüklenemedi',
                variant: 'destructive',
            });
            setLoading(false);
        }
    };
    const handleSaveProfile = async () => {
        if (!currentUser)
            return;
        setSaving(true);
        try {
            await api_1.usersService.updateUser(currentUser.id, {
                firstName,
                lastName,
                phone,
                city,
                country,
                address,
                bio,
            });
            toast({
                title: 'Başarılı',
                description: 'Profil bilgileriniz güncellendi',
            });
            // Refresh user data
            await loadUserData();
        }
        catch (error) {
            console.error('Error updating profile:', error);
            toast({
                title: 'Hata',
                description: 'Profil güncellenirken bir hata oluştu',
                variant: 'destructive',
            });
        }
        finally {
            setSaving(false);
        }
    };
    if (loading) {
        return (<div className="flex items-center justify-center min-h-[400px]">
        <lucide_react_1.Loader2 className="h-8 w-8 animate-spin text-primary"/>
      </div>);
    }
    return (<div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profilim</h1>
        <p className="text-muted-foreground">
          Kişisel bilgilerinizi görüntüleyin ve düzenleyin
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <card_1.Card className="md:col-span-2">
          <card_1.CardHeader>
            <card_1.CardTitle>Kişisel Bilgiler</card_1.CardTitle>
            <card_1.CardDescription>
              Profil bilgilerinizi güncelleyin
            </card_1.CardDescription>
          </card_1.CardHeader>
          <card_1.CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label_1.Label htmlFor="firstName">
                  <lucide_react_1.User className="inline-block mr-2 h-4 w-4"/>
                  Ad
                </label_1.Label>
                <input_1.Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
              </div>
              <div className="space-y-2">
                <label_1.Label htmlFor="lastName">
                  <lucide_react_1.User className="inline-block mr-2 h-4 w-4"/>
                  Soyad
                </label_1.Label>
                <input_1.Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
              </div>
            </div>

            <div className="space-y-2">
              <label_1.Label htmlFor="email">
                <lucide_react_1.Mail className="inline-block mr-2 h-4 w-4"/>
                E-posta
              </label_1.Label>
              <input_1.Input id="email" type="email" value={email} disabled className="bg-muted"/>
              <p className="text-sm text-muted-foreground">
                E-posta adresi değiştirilemez
              </p>
            </div>

            <div className="space-y-2">
              <label_1.Label htmlFor="phone">
                <lucide_react_1.Phone className="inline-block mr-2 h-4 w-4"/>
                Telefon
              </label_1.Label>
              <input_1.Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label_1.Label htmlFor="city">
                  <lucide_react_1.MapPin className="inline-block mr-2 h-4 w-4"/>
                  Şehir
                </label_1.Label>
                <input_1.Input id="city" value={city} onChange={(e) => setCity(e.target.value)}/>
              </div>
              <div className="space-y-2">
                <label_1.Label htmlFor="country">
                  <lucide_react_1.MapPin className="inline-block mr-2 h-4 w-4"/>
                  Ülke
                </label_1.Label>
                <input_1.Input id="country" value={country} onChange={(e) => setCountry(e.target.value)}/>
              </div>
            </div>

            <div className="space-y-2">
              <label_1.Label htmlFor="address">
                <lucide_react_1.MapPin className="inline-block mr-2 h-4 w-4"/>
                Adres
              </label_1.Label>
              <input_1.Input id="address" value={address} onChange={(e) => setAddress(e.target.value)}/>
            </div>

            <div className="space-y-2">
              <label_1.Label htmlFor="bio">
                <lucide_react_1.FileText className="inline-block mr-2 h-4 w-4"/>
                Hakkında
              </label_1.Label>
              <input_1.Input id="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Kendiniz hakkında kısa bilgi"/>
            </div>

            <separator_1.Separator />

            <div className="flex justify-end">
              <button_1.Button onClick={handleSaveProfile} disabled={saving}>
                {saving ? (<>
                    <lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                    Kaydediliyor...
                  </>) : (<>
                    <lucide_react_1.Save className="mr-2 h-4 w-4"/>
                    Kaydet
                  </>)}
              </button_1.Button>
            </div>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle>Hesap Bilgileri</card_1.CardTitle>
            <card_1.CardDescription>
              Hesabınız hakkında bilgiler
            </card_1.CardDescription>
          </card_1.CardHeader>
          <card_1.CardContent className="space-y-4">
            <div className="space-y-2">
              <label_1.Label>Rol</label_1.Label>
              <div>
                <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-700/10">
                  Admin
                </span>
              </div>
            </div>

            <separator_1.Separator />

            <div className="space-y-2">
              <label_1.Label>Hesap Durumu</label_1.Label>
              <div>
                {currentUser?.isActive ? (<span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10">
                    Aktif
                  </span>) : (<span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-700/10">
                    Pasif
                  </span>)}
              </div>
            </div>

            <separator_1.Separator />

            <div className="space-y-2">
              <label_1.Label>E-posta Doğrulama</label_1.Label>
              <div>
                {currentUser?.emailVerified ? (<span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10">
                    Doğrulanmış
                  </span>) : (<span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-700/10">
                    Doğrulanmamış
                  </span>)}
              </div>
            </div>
          </card_1.CardContent>
        </card_1.Card>
      </div>
    </div>);
}
//# sourceMappingURL=page.js.map