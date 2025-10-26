'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, KeyRound, LogIn } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('🔐 LoginPage: Starting login process');
      const result = await login(formData);

      toast({
        title: 'Başarılı',
        description: `Giriş başarılı!`,
      });

      const user = result?.user;
      const metadata = user?.metadata;

      // Get role name from multiple possible sources
      const primaryRoleName = user?.primaryRole?.name || user?.roleEntity?.name || '';
      const userRoles = user?.roles || [];

      console.log('🔄 Login successful, checking profile completion and role:', {
        primaryRoleName,
        roles: userRoles.map((r: any) => r.name),
        metadata
      });

      // CRITICAL: Staff roles should bypass profile completion entirely
      const staffRoles = ['admin', 'editor', 'content editor', 'marketing manager',
                         'social media manager', 'event coordinator', 'support manager',
                         'support agent', 'support', 'support team'];

      const hasStaffRole = userRoles.some((role: any) =>
        staffRoles.includes(role.name?.toLowerCase())
      ) || staffRoles.includes(primaryRoleName.toLowerCase());

      // Staff users → Admin Panel (NO profile completion check)
      if (hasStaffRole) {
        console.log('✅ Staff role detected, redirecting to Admin Panel (bypass profile check)');
        router.push('/admin');
        return;
      }

      // CRITICAL: Check if profile completion is required BEFORE portal redirect
      // This prevents security vulnerability where users bypass /complete-profile
      const isCustomer = metadata?.isCustomer;
      const isStudent = metadata?.isStudent;

      // Check if profile is incomplete
      const customerIncomplete = isCustomer && (!metadata?.customerNumber || !metadata?.companyName);
      const studentIncomplete = isStudent && (!metadata?.schoolName || !metadata?.studentId);

      if (customerIncomplete || studentIncomplete) {
        console.log('⚠️ Profile incomplete, redirecting to /complete-profile');
        toast({
          title: 'Profil Tamamlama',
          description: 'Lütfen profil bilgilerinizi tamamlayın',
          variant: 'default',
        });
        router.push('/complete-profile');
        return; // Stop here, don't redirect to portal
      }

      // Profile is complete, redirect to portal
      console.log('✅ Profile complete, redirecting to User Portal');
      router.push('/portal/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: 'Hata',
        description: error.message || 'Giriş yapılırken bir hata oluştu',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Aluplan CMS</CardTitle>
          <CardDescription className="text-center">
            Sisteme giriş yapmak için bilgilerinizi girin
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="ornek@aluplan.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Şifre</Label>
                <a 
                  href="/forgot-password" 
                  className="text-xs text-primary hover:underline"
                >
                  Şifremi Unuttum?
                </a>
              </div>
              <div className="relative flex items-center">
                <KeyRound className="absolute left-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={loading}>
              <LogIn className="mr-2 h-4 w-4" />
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              Hesabınız yok mu?{' '}
              <a href="/signup" className="text-primary hover:underline font-medium">
                Kayıt Olun
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
