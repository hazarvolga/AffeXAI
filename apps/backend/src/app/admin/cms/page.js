"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const link_1 = __importDefault(require("next/link"));
const CmsDashboardPage = () => {
    return (<div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">CMS Yönetim Paneli</h1>
        <p className="text-muted-foreground">İçerik yönetim sistemini yönetin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle>Sayfa Yönetimi</card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent>
            <p className="text-muted-foreground mb-4">
              CMS sayfalarını oluşturun, düzenleyin ve yayınlayın.
            </p>
            <link_1.default href="/admin/cms/pages">
              <button_1.Button className="w-full">Sayfaları Yönet</button_1.Button>
            </link_1.default>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle>Görsel Editör</card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent>
            <p className="text-muted-foreground mb-4">
              Görsel arayüz üzerinden sayfalarınızı oluşturun ve düzenleyin.
            </p>
            <link_1.default href="/admin/cms/editor">
              <button_1.Button className="w-full">Editörü Aç</button_1.Button>
            </link_1.default>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle>Medya Yönetimi</card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent>
            <p className="text-muted-foreground mb-4">
              Medya dosyalarınızı yükleyin ve yönetin.
            </p>
            <link_1.default href="/admin/cms/media">
              <button_1.Button className="w-full">Medya Kitaplığı</button_1.Button>
            </link_1.default>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle>İçerik Bileşenleri</card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent>
            <p className="text-muted-foreground mb-4">
              Kullanılabilir içerik bileşenlerini görüntüleyin.
            </p>
            <button_1.Button variant="outline" className="w-full" disabled>
              Bileşenleri Görüntüle
            </button_1.Button>
          </card_1.CardContent>
        </card_1.Card>
      </div>

      <div className="mt-8">
        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle>Hızlı Başlangıç</card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">1. Yeni Sayfa Oluştur</h3>
                <p className="text-sm text-muted-foreground">
                  Sayfa yönetimi bölümünden yeni bir sayfa oluşturun.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">2. Görsel Editörü Kullan</h3>
                <p className="text-sm text-muted-foreground">
                  Sürükle-bırak arayüzü ile sayfanızı tasarllayın.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">3. Yayınla</h3>
                <p className="text-sm text-muted-foreground">
                  Sayfanızı yayınlayarak ziyaretçilerinize gösterin.
                </p>
              </div>
            </div>
          </card_1.CardContent>
        </card_1.Card>
      </div>
    </div>);
};
exports.default = CmsDashboardPage;
//# sourceMappingURL=page.js.map