'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Eye, FileCode, Send } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface EmailTemplate {
  name: string;
  displayName: string;
  description: string;
  category: string;
  variables: string[];
  usedBy: string[];
}

const emailMarketingTemplates: EmailTemplate[] = [
  {
    name: "abandoned-cart",
    displayName: "Terk Edilmiş Sepet",
    description: "Sepetini terk eden kullanıcılara hatırlatma emaili",
    category: "E-commerce",
    variables: ["userName", "cartItems", "totalAmount", "cartUrl", "expiryDate"],
    usedBy: ["EmailCampaignService.sendAbandonedCartEmail()"]
  },
  {
    name: "flash-sale",
    displayName: "Flaş İndirim",
    description: "Sınırlı süreli indirim duyurusu",
    category: "Promotion",
    variables: ["userName", "saleName", "discount", "startTime", "endTime", "products", "saleUrl"],
    usedBy: ["EmailCampaignService.sendFlashSaleEmail()"]
  },
  {
    name: "loyalty-program",
    displayName: "Sadakat Programı",
    description: "Sadakat programı bilgilendirmesi ve ödüller",
    category: "Loyalty",
    variables: ["userName", "points", "tier", "rewards", "benefits", "dashboardUrl"],
    usedBy: ["LoyaltyService.sendProgramEmail()"]
  },
  {
    name: "monthly-newsletter",
    displayName: "Aylık Bülten",
    description: "Aylık haber bülteni ve güncellemeler",
    category: "Newsletter",
    variables: ["userName", "month", "highlights", "articles", "events", "unsubscribeUrl"],
    usedBy: ["NewsletterService.sendMonthlyNewsletter()"]
  },
  {
    name: "product-launch",
    displayName: "Ürün Lansmanı",
    description: "Yeni ürün lansmanı duyurusu",
    category: "Product",
    variables: ["userName", "productName", "description", "price", "launchDate", "productUrl", "features"],
    usedBy: ["EmailCampaignService.sendProductLaunchEmail()"]
  },
  {
    name: "product-recommendation",
    displayName: "Ürün Önerisi",
    description: "Kişiselleştirilmiş ürün önerileri",
    category: "Product",
    variables: ["userName", "recommendations", "categoryName", "reason", "shopUrl"],
    usedBy: ["RecommendationService.sendRecommendations()"]
  },
  {
    name: "seasonal-campaign",
    displayName: "Mevsimsel Kampanya",
    description: "Mevsimsel ve özel gün kampanyaları",
    category: "Campaign",
    variables: ["userName", "season", "campaignName", "offers", "validUntil", "campaignUrl"],
    usedBy: ["EmailCampaignService.sendSeasonalCampaign()"]
  },
];

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    "E-commerce": "bg-indigo-500",
    "Promotion": "bg-pink-500",
    "Loyalty": "bg-amber-500",
    "Newsletter": "bg-cyan-500",
    "Product": "bg-emerald-500",
    "Campaign": "bg-violet-500",
  };
  return colors[category] || "bg-gray-500";
};

export default function EmailMarketingTemplatesPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Email Marketing Şablonları</h1>
          <p className="text-muted-foreground mt-2">
            Email marketing kampanyaları için kullanılan {emailMarketingTemplates.length} email şablonu
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/email-marketing">
            <Send className="mr-2 h-4 w-4" />
            Email Marketing'e Dön
          </Link>
        </Button>
      </div>

      {/* Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>📧 Modüler Email Mimarisi</CardTitle>
          <CardDescription>
            Her modül kendi email template'lerini yönetir. Tüm template'ler <code>apps/backend/src/modules/email-marketing/templates/</code> klasöründe bulunur.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start space-x-3">
              <FileCode className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">React Email (.tsx)</p>
                <p className="text-sm text-muted-foreground">TypeScript + React components</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FileCode className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Compiled (.html)</p>
                <p className="text-sm text-muted-foreground">Handlebars templates</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Shared Components</p>
                <p className="text-sm text-muted-foreground">EmailFooter (tüm modüller)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {emailMarketingTemplates.map((template) => (
          <Card key={template.name} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{template.displayName}</CardTitle>
                  <CardDescription className="mt-1">{template.description}</CardDescription>
                </div>
                <Badge className={getCategoryColor(template.category)}>
                  {template.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Variables */}
              <div>
                <p className="text-sm font-medium mb-2">Template Variables:</p>
                <div className="flex flex-wrap gap-1">
                  {template.variables.slice(0, 4).map((variable) => (
                    <Badge key={variable} variant="outline" className="text-xs">
                      {`{{${variable}}}`}
                    </Badge>
                  ))}
                  {template.variables.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{template.variables.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Used By */}
              <div>
                <p className="text-sm font-medium mb-2">Kullanıldığı Servisler:</p>
                {template.usedBy.map((service) => (
                  <code key={service} className="text-xs bg-muted px-2 py-1 rounded block">
                    {service}
                  </code>
                ))}
              </div>

              {/* File Paths */}
              <div className="text-xs text-muted-foreground space-y-1">
                <p>📄 <code>templates/{template.name}.tsx</code></p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <a
                    href={`vscode://file/Users/hazarekiz/Projects/v06/Affexai/apps/backend/src/modules/email-marketing/templates/${template.name}.tsx`}
                    target="_blank"
                  >
                    <FileCode className="mr-2 h-3 w-3" />
                    TSX Aç
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
