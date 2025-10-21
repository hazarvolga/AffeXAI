'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { authService, usersService, type CurrentUser } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Loader2, Save, User, Mail, Phone, MapPin, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Profile form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      if (!authService.isAuthenticated()) {
        router.push('/admin/login');
        return;
      }

      const tokenUser = authService.getUserFromToken();
      if (!tokenUser) {
        router.push('/admin/login');
        return;
      }

      console.log('🔄 Loading fresh user data from API...');
      // IMPORTANT: Fetch fresh data from API, not from cached JWT token!
      // The JWT token contains user data from login time, not current database state
      const freshUser = await usersService.getCurrentUser();
      console.log('✅ Fresh user data loaded:', freshUser);

      setCurrentUser(freshUser);

      // Set form values from FRESH user data
      setFirstName(freshUser.firstName || '');
      setLastName(freshUser.lastName || '');
      setEmail(freshUser.email || '');
      setPhone(freshUser.phone || '');
      setCity(freshUser.city || '');
      setCountry(freshUser.country || '');
      setAddress(freshUser.address || '');
      setBio(freshUser.bio || '');

      setLoading(false);
    } catch (error) {
      console.error('❌ Error loading user data:', error);
      toast({
        title: 'Hata',
        description: 'Kullanıcı bilgileri yüklenemedi',
        variant: 'destructive',
      });
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!currentUser) {
      console.log('❌ No currentUser - cannot save profile');
      return;
    }

    console.log('💾 PROFILE SAVE - Starting:', {
      userId: currentUser.id,
      updateData: {
        firstName,
        lastName,
        phone,
        city,
        country,
        address,
        bio,
      },
    });

    setSaving(true);
    try {
      console.log('📡 Calling usersService.updateUser...');
      await usersService.updateUser(currentUser.id, {
        firstName,
        lastName,
        phone,
        city,
        country,
        address,
        bio,
      });

      console.log('✅ Profile update successful');
      toast({
        title: 'Başarılı',
        description: 'Profil bilgileriniz güncellendi',
      });

      // Refresh user data
      console.log('🔄 Refreshing user data...');
      await loadUserData();
    } catch (error) {
      console.error('❌ Error updating profile:', error);
      toast({
        title: 'Hata',
        description: 'Profil güncellenirken bir hata oluştu',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profilim</h1>
        <p className="text-muted-foreground">
          Kişisel bilgilerinizi görüntüleyin ve düzenleyin
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Kişisel Bilgiler</CardTitle>
            <CardDescription>
              Profil bilgilerinizi güncelleyin
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  <User className="inline-block mr-2 h-4 w-4" />
                  Ad
                </Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">
                  <User className="inline-block mr-2 h-4 w-4" />
                  Soyad
                </Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                <Mail className="inline-block mr-2 h-4 w-4" />
                E-posta
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                disabled
                className="bg-muted"
              />
              <p className="text-sm text-muted-foreground">
                E-posta adresi değiştirilemez
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                <Phone className="inline-block mr-2 h-4 w-4" />
                Telefon
              </Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">
                  <MapPin className="inline-block mr-2 h-4 w-4" />
                  Şehir
                </Label>
                <Input
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">
                  <MapPin className="inline-block mr-2 h-4 w-4" />
                  Ülke
                </Label>
                <Input
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">
                <MapPin className="inline-block mr-2 h-4 w-4" />
                Adres
              </Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">
                <FileText className="inline-block mr-2 h-4 w-4" />
                Hakkında
              </Label>
              <Input
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Kendiniz hakkında kısa bilgi"
              />
            </div>

            <Separator />

            <div className="flex justify-end">
              <Button onClick={handleSaveProfile} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Kaydediliyor...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Kaydet
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hesap Bilgileri</CardTitle>
            <CardDescription>
              Hesabınız hakkında bilgiler
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Rol</Label>
              <div>
                <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-700/10">
                  Admin
                </span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Hesap Durumu</Label>
              <div>
                {currentUser?.isActive ? (
                  <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10">
                    Aktif
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-700/10">
                    Pasif
                  </span>
                )}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>E-posta Doğrulama</Label>
              <div>
                {currentUser?.emailVerified ? (
                  <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10">
                    Doğrulanmış
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-700/10">
                    Doğrulanmamış
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
