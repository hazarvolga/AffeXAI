'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone, Mail, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { ThemeSettingsService, type TopBarLink, type ThemeSettings } from '@/services/theme-settings.service';
import { cmsMenuService } from '@/lib/cms/menu-service';
import type { CmsMenu } from '@affexai/shared-types';

// Main navigation items
const mainNav = [
  {
    label: 'Çözümler',
    href: '/solutions',
    submenu: [
      { label: 'Mimarlık', href: '/solutions/architecture' },
      { label: 'İnşaat Mühendisliği', href: '/solutions/civil-engineering' },
      { label: 'Yapı Fiziği', href: '/solutions/building-physics' },
    ],
  },
  {
    label: 'Ürünler',
    href: '/products',
    submenu: [
      { label: 'Allplan Architecture', href: '/products/allplan-architecture' },
      { label: 'Allplan Engineering', href: '/products/allplan-engineering' },
      { label: 'Allplan Bimplus', href: '/products/allplan-bimplus' },
    ],
  },
  {
    label: 'Eğitim & Destek',
    href: '/education',
    submenu: [
      { label: 'Eğitim Programları', href: '/education/training' },
      { label: 'Sertifika Programları', href: '/education/certification' },
      { label: 'Teknik Destek', href: '/support' },
    ],
  },
  { label: 'Başarı Hikayeleri', href: '/case-studies' },
  { label: 'İndirme Merkezi', href: '/downloads' },
  { label: 'İletişim', href: '/contact' },
  { label: 'BackupHome', href: '/backup-home' },
  { label: 'BackupProducts', href: '/backup-products' },
  { label: 'BackupSolutions', href: '/backup-solutions' },
  { label: 'BackupDownloads', href: '/backup-downloads' },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Site settings state (existing)
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('ALLPLAN TÜRKİYE');
  const [companyPhone, setCompanyPhone] = useState<string>('');
  const [companyEmail, setCompanyEmail] = useState<string>('');
  const [companyAddress, setCompanyAddress] = useState<string>('');

  // Fetch theme settings
  const { data: themeSettings, isLoading: isLoadingTheme } = useQuery<ThemeSettings>({
    queryKey: ['theme-settings-active'],
    queryFn: () => ThemeSettingsService.getActiveTheme(),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false,
  });

  // Fetch header menu if headerMenuId exists
  const { data: headerMenu } = useQuery<CmsMenu>({
    queryKey: ['header-menu', themeSettings?.headerMenuId],
    queryFn: () => cmsMenuService.getMenu(themeSettings!.headerMenuId!),
    enabled: !!themeSettings?.headerMenuId,
    staleTime: 5 * 60 * 1000,
  });

  // Extract theme data with defaults
  const topBarLinks = themeSettings?.headerConfig?.topBarLinks || [];
  const ctaButtons = themeSettings?.headerConfig?.ctaButtons || {
    contact: { show: true, text: 'İletişim', href: '/contact' },
    demo: { show: true, text: 'Demo İste', href: '#demo' },
  };
  const authLinks = themeSettings?.headerConfig?.authLinks || {
    showLogin: true,
    showSignup: true,
    loginText: 'Giriş Yap',
    signupText: 'Kayıt Ol',
  };
  const layout = themeSettings?.headerConfig?.layout || {
    sticky: true,
    transparent: false,
    shadow: true,
  };

  // Fetch site settings (existing logic - logo, company info)
  useEffect(() => {
    async function fetchSiteSettings() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/settings/site`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success && result.data) {
          const settings = result.data;

          // Site settings
          if (settings.site) {
            if (settings.site.logoUrl) {
              const fullLogoUrl = settings.site.logoUrl.startsWith('http')
                ? settings.site.logoUrl
                : `${process.env.NEXT_PUBLIC_API_URL}${settings.site.logoUrl}`;
              setLogoUrl(fullLogoUrl);
            }
            if (settings.site.companyName) {
              setCompanyName(settings.site.companyName);
            }
            if (settings.site.companyPhone) {
              setCompanyPhone(settings.site.companyPhone);
            }
            if (settings.site.companyEmail) {
              setCompanyEmail(settings.site.companyEmail);
            }
            if (settings.site.companyAddress) {
              setCompanyAddress(settings.site.companyAddress);
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch site settings:', error);
      }
    }

    fetchSiteSettings();
  }, []);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  // Use header menu if available, otherwise fall back to hardcoded mainNav
  const navigationItems = React.useMemo(() => {
    if (headerMenu?.items && Array.isArray(headerMenu.items) && headerMenu.items.length > 0) {
      return headerMenu.items
        .filter(item => item && item.label)
        .map(item => ({
          label: item.label,
          href: item.url || '#',
          submenu: item.children && Array.isArray(item.children)
            ? item.children
                .filter(child => child && child.label)
                .map(child => ({
                  label: child.label,
                  href: child.url || '#',
                }))
            : undefined,
        }));
    }
    return mainNav;
  }, [headerMenu]);

  return (
    <header className={cn(
      "w-full bg-white border-b",
      layout.sticky && "sticky top-0 z-50",
      layout.shadow && "shadow-sm"
    )}>
      {/* Top Bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-sm">
            {/* Top Bar Links */}
            <div className="hidden lg:flex items-center space-x-6">
              {topBarLinks
                .sort((a, b) => a.order - b.order)
                .map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    {link.text}
                  </Link>
                ))}
            </div>

            {/* Contact Info */}
            <div className="hidden md:flex items-center space-x-4 text-gray-600">
              {companyPhone && (
                <a href={`tel:${companyPhone}`} className="flex items-center space-x-1 hover:text-primary">
                  <Phone className="h-3 w-3" />
                  <span>{companyPhone}</span>
                </a>
              )}
              {companyEmail && (
                <a href={`mailto:${companyEmail}`} className="flex items-center space-x-1 hover:text-primary">
                  <Mail className="h-3 w-3" />
                  <span>{companyEmail}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={companyName}
                width={180}
                height={60}
                className="h-12 w-auto object-contain"
                priority
              />
            ) : (
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">{companyName}</span>
              </div>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.submenu ? (
                  <>
                    <button
                      className={cn(
                        "flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors py-2",
                        pathname.startsWith(item.href) && "text-primary font-medium"
                      )}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {/* Dropdown */}
                    <div className="absolute left-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="py-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "text-gray-700 hover:text-primary transition-colors",
                      pathname === item.href && "text-primary font-medium"
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {ctaButtons.contact?.show && (
              <Link
                href={ctaButtons.contact.href}
                className="px-4 py-2 text-gray-700 hover:text-primary transition-colors"
              >
                {ctaButtons.contact.text}
              </Link>
            )}
            {ctaButtons.demo?.show && (
              <Link
                href={ctaButtons.demo.href}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                {ctaButtons.demo.text}
              </Link>
            )}
            {authLinks.showLogin && (
              <Link
                href="/admin"
                className="px-4 py-2 text-gray-700 hover:text-primary transition-colors"
              >
                {authLinks.loginText}
              </Link>
            )}
            {authLinks.showSignup && (
              <Link
                href="/admin/signup"
                className="px-6 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                {authLinks.signupText}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-primary transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {/* Mobile Navigation */}
            {navigationItems.map((item) => (
              <div key={item.label}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className="flex items-center justify-between w-full text-gray-700 hover:text-primary transition-colors py-2"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          openSubmenu === item.label && "rotate-180"
                        )}
                      />
                    </button>
                    {openSubmenu === item.label && (
                      <div className="pl-4 space-y-2 mt-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className="block text-gray-600 hover:text-primary transition-colors py-1"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block text-gray-700 hover:text-primary transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile CTA Buttons */}
            <div className="pt-4 border-t border-gray-200 space-y-2">
              {ctaButtons.contact?.show && (
                <Link
                  href={ctaButtons.contact.href}
                  className="block w-full px-4 py-2 text-center text-gray-700 hover:text-primary transition-colors border border-gray-300 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {ctaButtons.contact.text}
                </Link>
              )}
              {ctaButtons.demo?.show && (
                <Link
                  href={ctaButtons.demo.href}
                  className="block w-full px-4 py-2 text-center bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {ctaButtons.demo.text}
                </Link>
              )}
              {authLinks.showLogin && (
                <Link
                  href="/admin"
                  className="block w-full px-4 py-2 text-center text-gray-700 hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {authLinks.loginText}
                </Link>
              )}
              {authLinks.showSignup && (
                <Link
                  href="/admin/signup"
                  className="block w-full px-4 py-2 text-center border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {authLinks.signupText}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
