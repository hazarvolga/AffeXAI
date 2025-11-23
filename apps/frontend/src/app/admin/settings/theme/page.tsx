'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ThemeSettingsService, type ThemeSettings, type UpdateThemeSettingsDto } from '@/services/theme-settings.service';
import { cmsMenuService } from '@/lib/cms/menu-service';
import type { CmsMenu } from '@affexai/shared-types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Trash2, Save, Eye, Settings as SettingsIcon, Menu as MenuIcon } from 'lucide-react';

export default function ThemeSettingsPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch active theme
  const { data: activeTheme, isLoading } = useQuery<ThemeSettings>({
    queryKey: ['theme-settings-active'],
    queryFn: () => ThemeSettingsService.getActiveTheme(),
  });

  // Fetch all menus
  const { data: menus = [], isLoading: menusLoading } = useQuery<CmsMenu[]>({
    queryKey: ['cms-menus'],
    queryFn: () => cmsMenuService.getMenus(),
  });

  // Local state for editing
  const [editedTheme, setEditedTheme] = useState<UpdateThemeSettingsDto>({});

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: UpdateThemeSettingsDto) => {
      console.log('🚀 Mutation starting with data:', data);
      return ThemeSettingsService.update(activeTheme!.id, data);
    },
    onSuccess: (response) => {
      console.log('✅ Mutation success:', response);
      queryClient.invalidateQueries({ queryKey: ['theme-settings-active'] });
      toast({
        title: 'Başarılı',
        description: 'Theme ayarları güncellendi',
      });
      setEditedTheme({});
    },
    onError: (error: any) => {
      console.error('❌ Mutation error:', error);
      toast({
        title: 'Hata',
        description: error?.response?.data?.message || 'Güncelleme başarısız',
        variant: 'destructive',
      });
    },
  });

  const handleSave = () => {
    if (!activeTheme) {
      console.error('❌ No active theme found!');
      toast({
        title: 'Hata',
        description: 'Aktif tema bulunamadı',
        variant: 'destructive',
      });
      return;
    }

    const updateData: UpdateThemeSettingsDto = {
      headerConfig: {
        ...activeTheme.headerConfig,
        ...editedTheme.headerConfig,
      },
      footerConfig: {
        ...activeTheme.footerConfig,
        ...editedTheme.footerConfig,
      },
      headerMenuId: editedTheme.headerMenuId !== undefined ? editedTheme.headerMenuId : activeTheme.headerMenuId,
    };

    console.log('💾 Saving theme settings:', {
      themeId: activeTheme.id,
      updateData,
      editedTheme,
    });

    updateMutation.mutate(updateData);
  };

  // Header Link handlers
  const addTopBarLink = () => {
    const currentLinks = editedTheme.headerConfig?.topBarLinks || activeTheme?.headerConfig?.topBarLinks || [];
    const newLink = {
      text: 'Yeni Link',
      href: '/',
      order: currentLinks.length + 1,
    };

    setEditedTheme({
      ...editedTheme,
      headerConfig: {
        ...editedTheme.headerConfig,
        topBarLinks: [...currentLinks, newLink],
      },
    });
  };

  const updateTopBarLink = (index: number, field: string, value: any) => {
    const currentLinks = editedTheme.headerConfig?.topBarLinks || activeTheme?.headerConfig?.topBarLinks || [];
    const updatedLinks = [...currentLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };

    setEditedTheme({
      ...editedTheme,
      headerConfig: {
        ...editedTheme.headerConfig,
        topBarLinks: updatedLinks,
      },
    });
  };

  const removeTopBarLink = (index: number) => {
    const currentLinks = editedTheme.headerConfig?.topBarLinks || activeTheme?.headerConfig?.topBarLinks || [];
    const updatedLinks = currentLinks.filter((_, i) => i !== index);

    setEditedTheme({
      ...editedTheme,
      headerConfig: {
        ...editedTheme.headerConfig,
        topBarLinks: updatedLinks,
      },
    });
  };

  // Footer Section handlers
  const addFooterSection = () => {
    const currentSections = activeTheme?.footerConfig?.sections || [];
    const newSection = {
      title: 'Yeni Bölüm',
      customLinks: [
        { name: 'Link 1', href: '/', order: 1 },
      ],
    };

    setEditedTheme({
      ...editedTheme,
      footerConfig: {
        ...editedTheme.footerConfig,
        sections: [...currentSections, newSection],
      },
    });
  };

  const updateFooterSection = (sectionIndex: number, field: string, value: any) => {
    const currentSections = activeTheme?.footerConfig?.sections || [];
    const updatedSections = [...currentSections];
    updatedSections[sectionIndex] = { ...updatedSections[sectionIndex], [field]: value };

    setEditedTheme({
      ...editedTheme,
      footerConfig: {
        ...editedTheme.footerConfig,
        sections: updatedSections,
      },
    });
  };

  const addFooterLink = (sectionIndex: number) => {
    const currentSections = activeTheme?.footerConfig?.sections || [];
    const updatedSections = [...currentSections];
    const currentLinks = updatedSections[sectionIndex].customLinks || [];

    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      customLinks: [
        ...currentLinks,
        { name: 'Yeni Link', href: '/', order: currentLinks.length + 1 },
      ],
    };

    setEditedTheme({
      ...editedTheme,
      footerConfig: {
        ...editedTheme.footerConfig,
        sections: updatedSections,
      },
    });
  };

  const updateFooterLink = (sectionIndex: number, linkIndex: number, field: string, value: any) => {
    const currentSections = activeTheme?.footerConfig?.sections || [];
    const updatedSections = [...currentSections];
    const updatedLinks = [...(updatedSections[sectionIndex].customLinks || [])];
    updatedLinks[linkIndex] = { ...updatedLinks[linkIndex], [field]: value };
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      customLinks: updatedLinks,
    };

    setEditedTheme({
      ...editedTheme,
      footerConfig: {
        ...editedTheme.footerConfig,
        sections: updatedSections,
      },
    });
  };

  const removeFooterLink = (sectionIndex: number, linkIndex: number) => {
    const currentSections = activeTheme?.footerConfig?.sections || [];
    const updatedSections = [...currentSections];
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      customLinks: (updatedSections[sectionIndex].customLinks || []).filter((_, i) => i !== linkIndex),
    };

    setEditedTheme({
      ...editedTheme,
      footerConfig: {
        ...editedTheme.footerConfig,
        sections: updatedSections,
      },
    });
  };

  const removeFooterSection = (index: number) => {
    const currentSections = activeTheme?.footerConfig?.sections || [];
    const updatedSections = currentSections.filter((_, i) => i !== index);

    setEditedTheme({
      ...editedTheme,
      footerConfig: {
        ...editedTheme.footerConfig,
        sections: updatedSections,
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const currentTopBarLinks = editedTheme.headerConfig?.topBarLinks || activeTheme?.headerConfig?.topBarLinks || [];
  const currentCtaButtons = editedTheme.headerConfig?.ctaButtons || activeTheme?.headerConfig?.ctaButtons || {};
  const currentAuthLinks = editedTheme.headerConfig?.authLinks || activeTheme?.headerConfig?.authLinks || {};
  const currentLayout = editedTheme.headerConfig?.layout || activeTheme?.headerConfig?.layout || {};
  const currentFooterSections = editedTheme.footerConfig?.sections || activeTheme?.footerConfig?.sections || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Theme Ayarları</h1>
          <p className="text-muted-foreground">
            Header ve Footer yapılandırmasını yönetin
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => window.open('/', '_blank')}>
            <Eye className="h-4 w-4 mr-2" />
            Önizle
          </Button>
          <Button
            onClick={handleSave}
            disabled={updateMutation.isPending || Object.keys(editedTheme).length === 0}
          >
            {updateMutation.isPending ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Kaydet
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="header" className="w-full">
        <TabsList>
          <TabsTrigger value="header">Header</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
        </TabsList>

        {/* Header Tab */}
        <TabsContent value="header" className="space-y-6">
          {/* Header Menu Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MenuIcon className="h-5 w-5" />
                Aktif Menü
              </CardTitle>
              <CardDescription>
                Header'da görüntülenecek ana navigasyon menüsünü seçin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label>Menü Seçimi</Label>
                <Select
                  value={(editedTheme.headerMenuId !== undefined ? editedTheme.headerMenuId : activeTheme?.headerMenuId) || 'none'}
                  onValueChange={(value) => {
                    setEditedTheme({
                      ...editedTheme,
                      headerMenuId: value === 'none' ? null : value,
                    });
                  }}
                  disabled={menusLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Menü seçiniz..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Menü Yok</SelectItem>
                    {menus.map((menu) => (
                      <SelectItem key={menu.id} value={menu.id}>
                        {menu.name} {menu.isActive && '(Aktif)'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {activeTheme?.headerMenuId && (
                  <p className="text-sm text-muted-foreground">
                    Seçili menü: {menus.find((m) => m.id === (editedTheme.headerMenuId ?? activeTheme.headerMenuId))?.name || 'Yükleniyor...'}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Top Bar Links */}
          <Card>
            <CardHeader>
              <CardTitle>Top Bar Links</CardTitle>
              <CardDescription>
                Header üst çubuğunda görünen hızlı linkler
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentTopBarLinks.map((link, index) => (
                <div key={index} className="flex items-end gap-4 p-4 border rounded-lg">
                  <div className="flex-1 grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Metin</Label>
                      <Input value={link.text || ''}
                        onChange={(e) => updateTopBarLink(index, 'text', e.target.value)}
                        placeholder="Link metni"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>URL</Label>
                      <Input value={link.href || ''}
                        onChange={(e) => updateTopBarLink(index, 'href', e.target.value)}
                        placeholder="/sayfa"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Sıra</Label>
                      <Input type="number" value={link.order || 0}
                        onChange={(e) => updateTopBarLink(index, 'order', parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeTopBarLink(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button onClick={addTopBarLink} variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Link Ekle
              </Button>
            </CardContent>
          </Card>

          {/* CTA Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>CTA Butonları</CardTitle>
              <CardDescription>
                Call-to-action butonları
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Contact Button */}
              <div className="space-y-4 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <Label>İletişim Butonu</Label>
                  <Switch
                    checked={currentCtaButtons.contact?.show ?? true}
                    onCheckedChange={(checked) => {
                      setEditedTheme({
                        ...editedTheme,
                        headerConfig: {
                          ...editedTheme.headerConfig,
                          ctaButtons: {
                            ...currentCtaButtons,
                            contact: { 
                              text: currentCtaButtons.contact?.text || 'İletişim',
                              href: currentCtaButtons.contact?.href || '/contact',
                              show: checked 
                            },
                          },
                        },
                      });
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Buton Metni</Label>
                    <Input
                      value={currentCtaButtons.contact?.text || 'İletişim'}
                      onChange={(e) => {
                        setEditedTheme({
                          ...editedTheme,
                          headerConfig: {
                            ...editedTheme.headerConfig,
                            ctaButtons: {
                              ...currentCtaButtons,
                              contact: { ...currentCtaButtons.contact!, text: e.target.value },
                            },
                          },
                        });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>URL</Label>
                    <Input
                      value={currentCtaButtons.contact?.href || '/contact'}
                      onChange={(e) => {
                        setEditedTheme({
                          ...editedTheme,
                          headerConfig: {
                            ...editedTheme.headerConfig,
                            ctaButtons: {
                              ...currentCtaButtons,
                              contact: { ...currentCtaButtons.contact!, href: e.target.value },
                            },
                          },
                        });
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Demo Button */}
              <div className="space-y-4 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <Label>Demo Butonu</Label>
                  <Switch
                    checked={currentCtaButtons.demo?.show ?? true}
                    onCheckedChange={(checked) => {
                      setEditedTheme({
                        ...editedTheme,
                        headerConfig: {
                          ...editedTheme.headerConfig,
                          ctaButtons: {
                            ...currentCtaButtons,
                            demo: { 
                              text: currentCtaButtons.demo?.text || 'Demo İste',
                              href: currentCtaButtons.demo?.href || '#demo',
                              show: checked 
                            },
                          },
                        },
                      });
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Buton Metni</Label>
                    <Input
                      value={currentCtaButtons.demo?.text || 'Demo İste'}
                      onChange={(e) => {
                        setEditedTheme({
                          ...editedTheme,
                          headerConfig: {
                            ...editedTheme.headerConfig,
                            ctaButtons: {
                              ...currentCtaButtons,
                              demo: { ...currentCtaButtons.demo!, text: e.target.value },
                            },
                          },
                        });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>URL</Label>
                    <Input
                      value={currentCtaButtons.demo?.href || '#demo'}
                      onChange={(e) => {
                        setEditedTheme({
                          ...editedTheme,
                          headerConfig: {
                            ...editedTheme.headerConfig,
                            ctaButtons: {
                              ...currentCtaButtons,
                              demo: { ...currentCtaButtons.demo!, href: e.target.value },
                            },
                          },
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Auth Links */}
          <Card>
            <CardHeader>
              <CardTitle>Giriş & Kayıt</CardTitle>
              <CardDescription>
                Authentication linkleri ve URL yönlendirmeleri
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                {/* Login Section */}
                <div className="space-y-4 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <Label className="font-semibold">Giriş Butonu</Label>
                    <Switch
                      checked={currentAuthLinks.showLogin ?? true}
                      onCheckedChange={(checked) => {
                        setEditedTheme({
                          ...editedTheme,
                          headerConfig: {
                            ...editedTheme.headerConfig,
                            authLinks: { ...currentAuthLinks, showLogin: checked },
                          },
                        });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Buton Metni</Label>
                    <Input
                      value={currentAuthLinks.loginText || 'Giriş Yap'}
                      onChange={(e) => {
                        setEditedTheme({
                          ...editedTheme,
                          headerConfig: {
                            ...editedTheme.headerConfig,
                            authLinks: { ...currentAuthLinks, loginText: e.target.value },
                          },
                        });
                      }}
                      placeholder="Giriş Yap"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Giriş URL</Label>
                    <Input
                      value={currentAuthLinks.loginUrl || '/login'}
                      onChange={(e) => {
                        setEditedTheme({
                          ...editedTheme,
                          headerConfig: {
                            ...editedTheme.headerConfig,
                            authLinks: { ...currentAuthLinks, loginUrl: e.target.value },
                          },
                        });
                      }}
                      placeholder="/login"
                    />
                  </div>
                </div>

                {/* Signup Section */}
                <div className="space-y-4 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <Label className="font-semibold">Kayıt Butonu</Label>
                    <Switch
                      checked={currentAuthLinks.showSignup ?? true}
                      onCheckedChange={(checked) => {
                        setEditedTheme({
                          ...editedTheme,
                          headerConfig: {
                            ...editedTheme.headerConfig,
                            authLinks: { ...currentAuthLinks, showSignup: checked },
                          },
                        });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Buton Metni</Label>
                    <Input
                      value={currentAuthLinks.signupText || 'Kayıt Ol'}
                      onChange={(e) => {
                        setEditedTheme({
                          ...editedTheme,
                          headerConfig: {
                            ...editedTheme.headerConfig,
                            authLinks: { ...currentAuthLinks, signupText: e.target.value },
                          },
                        });
                      }}
                      placeholder="Kayıt Ol"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Kayıt URL</Label>
                    <Input
                      value={currentAuthLinks.signupUrl || '/signup'}
                      onChange={(e) => {
                        setEditedTheme({
                          ...editedTheme,
                          headerConfig: {
                            ...editedTheme.headerConfig,
                            authLinks: { ...currentAuthLinks, signupUrl: e.target.value },
                          },
                        });
                      }}
                      placeholder="/signup"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Footer Tab */}
        <TabsContent value="footer" className="space-y-6">
          {/* Footer Sections */}
          <Card>
            <CardHeader>
              <CardTitle>Footer Bölümleri</CardTitle>
              <CardDescription>
                Footer'da görünen navigasyon bölümleri
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentFooterSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="p-4 border-2 rounded-lg space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Label>Bölüm Başlığı</Label>
                      <Input
                        value={section.title}
                        onChange={(e) => updateFooterSection(sectionIndex, 'title', e.target.value)}
                        placeholder="Bölüm başlığı"
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeFooterSection(sectionIndex)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Links */}
                  <div className="space-y-2 pl-4 border-l-2">
                    {section.customLinks?.map((link, linkIndex) => (
                      <div key={linkIndex} className="flex items-end gap-4 p-3 bg-muted rounded">
                        <div className="flex-1 grid grid-cols-3 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs">Link Adı</Label>
                            <Input
                              value={link.name}
                              onChange={(e) => updateFooterLink(sectionIndex, linkIndex, 'name', e.target.value)}
                              placeholder="Link adı"
                              size={3}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">URL</Label>
                            <Input value={link.href || ''}
                              onChange={(e) => updateFooterLink(sectionIndex, linkIndex, 'href', e.target.value)}
                              placeholder="/sayfa"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">Sıra</Label>
                            <Input type="number" value={link.order || 0}
                              onChange={(e) => updateFooterLink(sectionIndex, linkIndex, 'order', parseInt(e.target.value))}
                            />
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFooterLink(sectionIndex, linkIndex)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      onClick={() => addFooterLink(sectionIndex)}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      <Plus className="h-3 w-3 mr-2" />
                      Link Ekle
                    </Button>
                  </div>
                </div>
              ))}
              <Button onClick={addFooterSection} variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Bölüm Ekle
              </Button>
            </CardContent>
          </Card>

          {/* Footer Bottom */}
          <Card>
            <CardHeader>
              <CardTitle>Footer Alt Bilgiler</CardTitle>
              <CardDescription>
                Copyright ve dil seçici ayarları
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Copyright Metni</Label>
                <Input
                  value={activeTheme?.footerConfig?.copyrightText || 'Tüm hakları saklıdır.'}
                  onChange={(e) => {
                    setEditedTheme({
                      ...editedTheme,
                      footerConfig: {
                        ...editedTheme.footerConfig,
                        copyrightText: e.target.value,
                      },
                    });
                  }}
                  placeholder="Tüm hakları saklıdır."
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Dil Seçici</Label>
                  <Switch
                    checked={activeTheme?.footerConfig?.showLanguageSelector ?? true}
                    onCheckedChange={(checked) => {
                      setEditedTheme({
                        ...editedTheme,
                        footerConfig: {
                          ...editedTheme.footerConfig,
                          showLanguageSelector: checked,
                        },
                      });
                    }}
                  />
                </div>
                <Input
                  value={activeTheme?.footerConfig?.languageText || 'Türkiye (Türkçe)'}
                  onChange={(e) => {
                    setEditedTheme({
                      ...editedTheme,
                      footerConfig: {
                        ...editedTheme.footerConfig,
                        languageText: e.target.value,
                      },
                    });
                  }}
                  placeholder="Türkiye (Türkçe)"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Layout Tab */}
        <TabsContent value="layout" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Header Layout</CardTitle>
              <CardDescription>
                Header görünüm ayarları
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Sticky Header</Label>
                  <p className="text-sm text-muted-foreground">
                    Sayfa kaydırıldığında header sabit kalsın
                  </p>
                </div>
                <Switch
                  checked={currentLayout.sticky ?? true}
                  onCheckedChange={(checked) => {
                    setEditedTheme({
                      ...editedTheme,
                      headerConfig: {
                        ...editedTheme.headerConfig,
                        layout: { ...currentLayout, sticky: checked },
                      },
                    });
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Shadow (Gölge)</Label>
                  <p className="text-sm text-muted-foreground">
                    Header altına gölge efekti ekle
                  </p>
                </div>
                <Switch
                  checked={currentLayout.shadow ?? true}
                  onCheckedChange={(checked) => {
                    setEditedTheme({
                      ...editedTheme,
                      headerConfig: {
                        ...editedTheme.headerConfig,
                        layout: { ...currentLayout, shadow: checked },
                      },
                    });
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Transparent</Label>
                  <p className="text-sm text-muted-foreground">
                    Header arka planını şeffaf yap
                  </p>
                </div>
                <Switch
                  checked={currentLayout.transparent ?? false}
                  onCheckedChange={(checked) => {
                    setEditedTheme({
                      ...editedTheme,
                      headerConfig: {
                        ...editedTheme.headerConfig,
                        layout: { ...currentLayout, transparent: checked },
                      },
                    });
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
