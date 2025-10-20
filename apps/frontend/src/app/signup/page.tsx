'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { User, Mail, KeyRound, Phone, Building2, UserPlus, AlertCircle, CheckCircle2 } from 'lucide-react';
import { usersService, authService } from '@/lib/api';
import { emailValidationService } from '@/lib/api/emailValidationService';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [emailValidating, setEmailValidating] = useState(false);
  const [emailValidation, setEmailValidation] = useState<{
    isValid: boolean;
    message: string;
    suggestion?: string;
  } | null>(null);
  const [emailExists, setEmailExists] = useState(false);
  
  // Account type checkboxes
  const [accountTypes, setAccountTypes] = useState({
    isCustomer: false,
    isStudent: false,
    isSubscriber: false,
  });
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    
    // Reset email validation when email changes
    if (id === 'email') {
      setEmailValidation(null);
      setEmailExists(false);
    }
  };

  // Email validation with debounce
  useEffect(() => {
    if (!formData.email || formData.email.length < 3) {
      setEmailValidation(null);
      return;
    }

    const timeoutId = setTimeout(async () => {
      await validateEmail(formData.email);
    }, 800); // 800ms debounce

    return () => clearTimeout(timeoutId);
  }, [formData.email]);

  const validateEmail = async (email: string) => {
    setEmailValidating(true);
    try {
      // Step 1: Basic email format validation (syntax check only)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailValidation({
          isValid: false,
          message: 'Geçersiz email formatı',
        });
        setEmailValidating(false);
        return;
      }

      // Step 2: Check for common typos
      const commonTypos: Record<string, string> = {
        'gmail.con': 'gmail.com',
        'gmail.co': 'gmail.com',
        'hotmail.con': 'hotmail.com',
        'yahoo.con': 'yahoo.com',
        'outlook.con': 'outlook.com',
      };
      
      const domain = email.split('@')[1];
      if (domain && commonTypos[domain]) {
        setEmailValidation({
          isValid: false,
          message: `${commonTypos[domain]} mı demek istediniz?`,
          suggestion: email.replace(domain, commonTypos[domain]),
        });
        setEmailValidating(false);
        return;
      }

      // Step 3: Check if email already exists (duplicate check)
      const { exists } = await authService.checkEmailExists(email);
      
      if (exists) {
        setEmailExists(true);
        setEmailValidation({
          isValid: false,
          message: 'Bu email adresi zaten kayıtlı',
        });
        setEmailValidating(false);
        return;
      }

      // Email is valid and available
      setEmailValidation({
        isValid: true,
        message: 'Email kullanılabilir ✓',
      });

    } catch (error: any) {
      console.error('Email validation error:', error);
      setEmailValidation({
        isValid: false,
        message: 'Email doğrulanamadı',
      });
    } finally {
      setEmailValidating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!emailValidation?.isValid) {
      toast({
        title: 'Hata',
        description: 'Lütfen geçerli bir email adresi girin',
        variant: 'destructive',
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Hata',
        description: 'Şifreler eşleşmiyor',
        variant: 'destructive',
      });
      return;
    }

    if (formData.password.length < 8) {
      toast({
        title: 'Hata',
        description: 'Şifre en az 8 karakter olmalıdır',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // Prepare user data
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone || undefined,
        // roleId will be automatically assigned to 'viewer' by backend
        // Store account type selections for profile completion
        metadata: {
          isCustomer: accountTypes.isCustomer,
          isStudent: accountTypes.isStudent,
          isSubscriber: accountTypes.isSubscriber,
        },
      };

      // Register user (creates account and sends verification email)
      const result = await authService.register(userData);

      // Show success message with email verification instructions
      const accountTypeMessage = [];
      if (accountTypes.isCustomer) accountTypeMessage.push('müşteri');
      if (accountTypes.isStudent) accountTypeMessage.push('öğrenci');
      if (accountTypes.isSubscriber) accountTypeMessage.push('abone');
      
      const typesText = accountTypeMessage.length > 0 
        ? ` (${accountTypeMessage.join(', ')} hesabı)` 
        : '';

      toast({
        title: 'Başarılı! 🎉',
        description: `Hesabınız oluşturuldu${typesText}. Email adresinize doğrulama linki gönderildi. Email adresinizi onayladıktan sonra giriş yapabilirsiniz.`,
      });

      // Redirect to login page with registered flag
      setTimeout(() => {
        router.push('/login?registered=true');
      }, 2000);

    } catch (error: any) {
      console.error('Signup error:', error);
      
      // Check for duplicate email error
      if (error.message?.includes('email') || error.message?.includes('duplicate')) {
        toast({
          title: 'Email Zaten Kayıtlı',
          description: 'Bu email adresi ile zaten bir hesap var. Giriş yapmak ister misiniz?',
          variant: 'destructive',
        });
        setEmailExists(true);
      } else {
        toast({
          title: 'Hata',
          description: error.message || 'Kayıt sırasında bir hata oluştu',
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Aluplan'a Katılın</CardTitle>
          <CardDescription className="text-center">
            Yeni bir hesap oluşturun
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Ad *</Label>
                <div className="relative flex items-center">
                  <User className="absolute left-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Ahmet"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Soyad *</Label>
                <div className="relative flex items-center">
                  <User className="absolute left-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Yılmaz"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email with validation */}
            <div className="space-y-2">
              <Label htmlFor="email">E-posta *</Label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="ornek@aluplan.com"
                  className={`pl-10 ${
                    emailValidation?.isValid === false ? 'border-red-500' : 
                    emailValidation?.isValid === true ? 'border-green-500' : ''
                  }`}
                  required
                />
                {emailValidating && (
                  <div className="absolute right-3">
                    <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                  </div>
                )}
                {!emailValidating && emailValidation?.isValid === true && (
                  <CheckCircle2 className="absolute right-3 h-4 w-4 text-green-500" />
                )}
                {!emailValidating && emailValidation?.isValid === false && (
                  <AlertCircle className="absolute right-3 h-4 w-4 text-red-500" />
                )}
              </div>
              {emailValidation && (
                <p className={`text-xs ${emailValidation.isValid ? 'text-green-600' : 'text-red-600'}`}>
                  {emailValidation.message}
                </p>
              )}
              {emailExists && (
                <p className="text-xs text-red-600">
                  Bu email zaten kayıtlı.{' '}
                  <Link href="/login" className="underline font-medium">
                    Giriş yapmak ister misiniz?
                  </Link>
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon</Label>
              <div className="relative flex items-center">
                <Phone className="absolute left-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+90 555 123 4567"
                  className="pl-10"
                />
              </div>
            </div>

            {/* Account Type Selection - 3 Column Layout */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Hesap Türleri</Label>
              <p className="text-sm text-muted-foreground">
                Size uygun olan seçenekleri işaretleyin
              </p>

              <div className="grid grid-cols-3 gap-4">
                {/* Customer */}
                <div className="flex items-start space-x-2 rounded-md border p-4 bg-muted/50">
                  <Checkbox
                    id="isCustomer"
                    checked={accountTypes.isCustomer}
                    onCheckedChange={(checked) => 
                      setAccountTypes(prev => ({ ...prev, isCustomer: checked as boolean }))
                    }
                  />
                  <Label htmlFor="isCustomer" className="text-sm font-medium cursor-pointer">
                    Müşteri
                  </Label>
                </div>

                {/* Student */}
                <div className="flex items-start space-x-2 rounded-md border p-4 bg-muted/50">
                  <Checkbox
                    id="isStudent"
                    checked={accountTypes.isStudent}
                    onCheckedChange={(checked) => 
                      setAccountTypes(prev => ({ ...prev, isStudent: checked as boolean }))
                    }
                  />
                  <Label htmlFor="isStudent" className="text-sm font-medium cursor-pointer">
                    Öğrenci
                  </Label>
                </div>

                {/* Subscriber */}
                <div className="flex items-start space-x-2 rounded-md border p-4 bg-muted/50">
                  <Checkbox
                    id="isSubscriber"
                    checked={accountTypes.isSubscriber}
                    onCheckedChange={(checked) => 
                      setAccountTypes(prev => ({ ...prev, isSubscriber: checked as boolean }))
                    }
                  />
                  <Label htmlFor="isSubscriber" className="text-sm font-medium cursor-pointer">
                    Abone
                  </Label>
                </div>
              </div>

              {/* Information Box - Only when selections made */}
              {(accountTypes.isCustomer || accountTypes.isStudent || accountTypes.isSubscriber) && (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                  <p className="text-xs text-blue-800">
                    Email onayından sonra profil bilgilerinizi tamamlamanız gerekecektir.
                  </p>
                </div>
              )}
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Şifre *</Label>
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
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Şifre Tekrar *</Label>
                <div className="relative flex items-center">
                  <KeyRound className="absolute left-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              * Gerekli alanlar. Şifre en az 8 karakter olmalıdır.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading || emailValidating || emailValidation?.isValid === false}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              {loading ? 'Kaydediliyor...' : 'Kayıt Ol'}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Zaten hesabınız var mı?{' '}
              <Link href="/login" className="text-primary hover:underline">
                Giriş Yap
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
