'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Settings, Globe, User, Lock, Bell, Palette, Database } from 'lucide-react';

export default function AdminSettingsPage() {
  const settingsCategories = [
    {
      title: 'Site Ayarları',
      description: 'Genel site ayarları, logo, başlık ve meta bilgileri',
      icon: Globe,
      href: '/admin/settings/site',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
    },
    {
      title: 'Profil Ayarları',
      description: 'Kişisel bilgilerinizi ve hesap ayarlarınızı yönetin',
      icon: User,
      href: '/admin/profile',
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950',
    },
    {
      title: 'Güvenlik',
      description: 'Şifre değiştirme ve güvenlik ayarları',
      icon: Lock,
      href: '/admin/settings/security',
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-950',
      comingSoon: true,
    },
    {
      title: 'Bildirimler',
      description: 'E-posta ve push bildirim tercihleri',
      icon: Bell,
      href: '/admin/settings/notifications',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
      comingSoon: true,
    },
    {
      title: 'Tasarım Ayarları',
      description: 'Tema, renkler ve görünüm ayarları',
      icon: Palette,
      href: '/admin/settings/design',
      color: 'text-pink-500',
      bgColor: 'bg-pink-50 dark:bg-pink-950',
      comingSoon: true,
    },
    {
      title: 'Veritabanı',
      description: 'Yedekleme, geri yükleme ve bakım işlemleri',
      icon: Database,
      href: '/admin/settings/database',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-950',
      comingSoon: true,
    },
  ];

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ayarlar</h1>
        <p className="text-muted-foreground">
          Sistem ayarlarınızı ve tercihlerinizi yönetin
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {settingsCategories.map((category) => (
          <Card key={category.href} className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${category.bgColor} mb-4`}>
                <category.icon className={`h-6 w-6 ${category.color}`} />
              </div>
              <CardTitle className="flex items-center gap-2">
                {category.title}
                {category.comingSoon && (
                  <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-700/10">
                    Yakında
                  </span>
                )}
              </CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {category.comingSoon ? (
                <Button variant="outline" disabled className="w-full">
                  Yakında Gelecek
                </Button>
              ) : (
                <Button asChild variant="outline" className="w-full">
                  <Link href={category.href}>
                    <Settings className="mr-2 h-4 w-4" />
                    Ayarları Aç
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
