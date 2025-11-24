'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import { getDefaultRedirectForRole, UserRole } from '@/lib/permissions/constants';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { KeyRound, LogIn, Mail, Terminal } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const loginResponse = await login({ email, password });

      console.log('✅ Login successful, cookies set by server');

      // Determine redirect destination based on user role
      const userRole = loginResponse.user.roleId as UserRole;
      const redirectPath = getDefaultRedirectForRole(userRole);

      console.log(`↪️  Redirecting ${userRole} to ${redirectPath}`);

      // Redirect to role-appropriate destination
      router.push(redirectPath);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Yönetim Paneli Girişi</CardTitle>
        <CardDescription>Hesabınıza erişmek için e-posta ve şifrenizi girin.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">E-posta Adresi</Label>
             <div className="relative flex items-center">
                <Mail className="absolute left-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ornek@example.com"
                  required
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
                <Label htmlFor="password">Şifre</Label>
                <Link href="/admin/forgot-password" className="text-sm font-medium text-primary hover:underline">
                    Şifrenizi mi unuttunuz?
                </Link>
            </div>
            <div className="relative flex items-center">
                <KeyRound className="absolute left-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
           {error && (
             <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Hata</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
           )}
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Giriş Yapılıyor...' : <><LogIn className="mr-2 h-4 w-4"/> Giriş Yap</>}
          </Button>
           <div className="text-center text-sm text-muted-foreground">
                Hesabınız yok mu? <Link href="/signup" className="font-medium text-primary hover:underline">Kayıt Olun</Link>
            </div>
        </CardFooter>
      </form>
    </Card>
  );
}