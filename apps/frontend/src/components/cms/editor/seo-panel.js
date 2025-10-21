"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEOPanel = void 0;
const react_1 = __importDefault(require("react"));
const card_1 = require("@/components/ui/card");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const textarea_1 = require("@/components/ui/textarea");
const switch_1 = require("@/components/ui/switch");
const lucide_react_1 = require("lucide-react");
const SEOPanel = ({ seoData, onSEODataChange, showHeader = true, showFooter = true, onShowHeaderChange, onShowFooterChange }) => {
    const handleChange = (field, value) => {
        onSEODataChange({
            ...seoData,
            [field]: value,
        });
    };
    return (<div className="space-y-4 p-4">
      {/* Layout Options */}
      <card_1.Card>
        <card_1.CardHeader>
          <div className="flex items-center gap-2">
            <lucide_react_1.Layout className="h-5 w-5"/>
            <card_1.CardTitle>Page Layout</card_1.CardTitle>
          </div>
          <card_1.CardDescription>
            Control the visibility of header and footer on this page
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label_1.Label htmlFor="showHeader">Show Header</label_1.Label>
              <p className="text-sm text-muted-foreground">
                Display the site header on this page
              </p>
            </div>
            <switch_1.Switch id="showHeader" checked={showHeader} onCheckedChange={onShowHeaderChange}/>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label_1.Label htmlFor="showFooter">Show Footer</label_1.Label>
              <p className="text-sm text-muted-foreground">
                Display the site footer on this page
              </p>
            </div>
            <switch_1.Switch id="showFooter" checked={showFooter} onCheckedChange={onShowFooterChange}/>
          </div>
        </card_1.CardContent>
      </card_1.Card>

      {/* Basic Meta Tags */}
      <card_1.Card>
        <card_1.CardHeader>
          <div className="flex items-center gap-2">
            <lucide_react_1.FileText className="h-5 w-5"/>
            <card_1.CardTitle>Basic Meta Tags</card_1.CardTitle>
          </div>
          <card_1.CardDescription>
            Essential SEO metadata for search engines
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent className="space-y-4">
          <div className="space-y-2">
            <label_1.Label htmlFor="metaTitle">Meta Title</label_1.Label>
            <input_1.Input id="metaTitle" value={seoData.metaTitle || ''} onChange={(e) => handleChange('metaTitle', e.target.value)} placeholder="Page Title - Brand Name" maxLength={60}/>
            <p className="text-xs text-muted-foreground">
              {seoData.metaTitle?.length || 0}/60 characters (optimal: 50-60)
            </p>
          </div>

          <div className="space-y-2">
            <label_1.Label htmlFor="metaDescription">Meta Description</label_1.Label>
            <textarea_1.Textarea id="metaDescription" value={seoData.metaDescription || ''} onChange={(e) => handleChange('metaDescription', e.target.value)} placeholder="A compelling description of your page content..." rows={3} maxLength={160}/>
            <p className="text-xs text-muted-foreground">
              {seoData.metaDescription?.length || 0}/160 characters (optimal: 150-160)
            </p>
          </div>

          <div className="space-y-2">
            <label_1.Label htmlFor="metaKeywords">Meta Keywords</label_1.Label>
            <input_1.Input id="metaKeywords" value={seoData.metaKeywords || ''} onChange={(e) => handleChange('metaKeywords', e.target.value)} placeholder="keyword1, keyword2, keyword3"/>
            <p className="text-xs text-muted-foreground">
              Comma-separated keywords (less important for modern SEO)
            </p>
          </div>

          <div className="space-y-2">
            <label_1.Label htmlFor="canonicalUrl">Canonical URL</label_1.Label>
            <input_1.Input id="canonicalUrl" value={seoData.canonicalUrl || ''} onChange={(e) => handleChange('canonicalUrl', e.target.value)} placeholder="https://example.com/page" type="url"/>
            <p className="text-xs text-muted-foreground">
              Prevent duplicate content issues
            </p>
          </div>
        </card_1.CardContent>
      </card_1.Card>

      {/* OpenGraph Tags */}
      <card_1.Card>
        <card_1.CardHeader>
          <div className="flex items-center gap-2">
            <lucide_react_1.Globe className="h-5 w-5"/>
            <card_1.CardTitle>OpenGraph (Facebook, LinkedIn)</card_1.CardTitle>
          </div>
          <card_1.CardDescription>
            Social media sharing metadata
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent className="space-y-4">
          <div className="space-y-2">
            <label_1.Label htmlFor="ogTitle">OG Title</label_1.Label>
            <input_1.Input id="ogTitle" value={seoData.ogTitle || ''} onChange={(e) => handleChange('ogTitle', e.target.value)} placeholder="Title for social media shares"/>
          </div>

          <div className="space-y-2">
            <label_1.Label htmlFor="ogDescription">OG Description</label_1.Label>
            <textarea_1.Textarea id="ogDescription" value={seoData.ogDescription || ''} onChange={(e) => handleChange('ogDescription', e.target.value)} placeholder="Description for social media shares" rows={2}/>
          </div>

          <div className="space-y-2">
            <label_1.Label htmlFor="ogImage">OG Image URL</label_1.Label>
            <input_1.Input id="ogImage" value={seoData.ogImage || ''} onChange={(e) => handleChange('ogImage', e.target.value)} placeholder="https://example.com/image.jpg" type="url"/>
            <p className="text-xs text-muted-foreground">
              Recommended: 1200x630px
            </p>
          </div>

          <div className="space-y-2">
            <label_1.Label htmlFor="ogType">OG Type</label_1.Label>
            <input_1.Input id="ogType" value={seoData.ogType || 'website'} onChange={(e) => handleChange('ogType', e.target.value)} placeholder="website, article, product, etc."/>
          </div>

          <div className="space-y-2">
            <label_1.Label htmlFor="ogUrl">OG URL</label_1.Label>
            <input_1.Input id="ogUrl" value={seoData.ogUrl || ''} onChange={(e) => handleChange('ogUrl', e.target.value)} placeholder="https://example.com/page" type="url"/>
          </div>
        </card_1.CardContent>
      </card_1.Card>

      {/* Twitter Cards */}
      <card_1.Card>
        <card_1.CardHeader>
          <div className="flex items-center gap-2">
            <lucide_react_1.Twitter className="h-5 w-5"/>
            <card_1.CardTitle>Twitter Cards</card_1.CardTitle>
          </div>
          <card_1.CardDescription>
            Twitter-specific metadata
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent className="space-y-4">
          <div className="space-y-2">
            <label_1.Label htmlFor="twitterCard">Card Type</label_1.Label>
            <input_1.Input id="twitterCard" value={seoData.twitterCard || 'summary_large_image'} onChange={(e) => handleChange('twitterCard', e.target.value)} placeholder="summary, summary_large_image, player"/>
          </div>

          <div className="space-y-2">
            <label_1.Label htmlFor="twitterTitle">Twitter Title</label_1.Label>
            <input_1.Input id="twitterTitle" value={seoData.twitterTitle || ''} onChange={(e) => handleChange('twitterTitle', e.target.value)} placeholder="Title for Twitter shares"/>
          </div>

          <div className="space-y-2">
            <label_1.Label htmlFor="twitterDescription">Twitter Description</label_1.Label>
            <textarea_1.Textarea id="twitterDescription" value={seoData.twitterDescription || ''} onChange={(e) => handleChange('twitterDescription', e.target.value)} placeholder="Description for Twitter shares" rows={2}/>
          </div>

          <div className="space-y-2">
            <label_1.Label htmlFor="twitterImage">Twitter Image URL</label_1.Label>
            <input_1.Input id="twitterImage" value={seoData.twitterImage || ''} onChange={(e) => handleChange('twitterImage', e.target.value)} placeholder="https://example.com/image.jpg" type="url"/>
          </div>

          <div className="space-y-2">
            <label_1.Label htmlFor="twitterCreator">Twitter Creator</label_1.Label>
            <input_1.Input id="twitterCreator" value={seoData.twitterCreator || ''} onChange={(e) => handleChange('twitterCreator', e.target.value)} placeholder="@username"/>
          </div>
        </card_1.CardContent>
      </card_1.Card>

      {/* Robots Meta */}
      <card_1.Card>
        <card_1.CardHeader>
          <div className="flex items-center gap-2">
            <lucide_react_1.Search className="h-5 w-5"/>
            <card_1.CardTitle>Search Engine Directives</card_1.CardTitle>
          </div>
          <card_1.CardDescription>
            Control how search engines index this page
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label_1.Label htmlFor="robotsIndex">Index Page</label_1.Label>
              <p className="text-xs text-muted-foreground">
                Allow search engines to index this page
              </p>
            </div>
            <switch_1.Switch id="robotsIndex" checked={seoData.robotsIndex !== false} onCheckedChange={(checked) => handleChange('robotsIndex', checked)}/>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label_1.Label htmlFor="robotsFollow">Follow Links</label_1.Label>
              <p className="text-xs text-muted-foreground">
                Allow search engines to follow links on this page
              </p>
            </div>
            <switch_1.Switch id="robotsFollow" checked={seoData.robotsFollow !== false} onCheckedChange={(checked) => handleChange('robotsFollow', checked)}/>
          </div>
        </card_1.CardContent>
      </card_1.Card>

      {/* Structured Data */}
      <card_1.Card>
        <card_1.CardHeader>
          <div className="flex items-center gap-2">
            <lucide_react_1.Code className="h-5 w-5"/>
            <card_1.CardTitle>Structured Data (JSON-LD)</card_1.CardTitle>
          </div>
          <card_1.CardDescription>
            Add structured data for rich snippets
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent className="space-y-4">
          <div className="space-y-2">
            <label_1.Label htmlFor="structuredData">JSON-LD Schema</label_1.Label>
            <textarea_1.Textarea id="structuredData" value={seoData.structuredData || ''} onChange={(e) => handleChange('structuredData', e.target.value)} placeholder={`{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Page Name",
  "description": "Page description"
}`} rows={10} className="font-mono text-xs"/>
            <p className="text-xs text-muted-foreground">
              Valid JSON-LD schema.org markup
            </p>
          </div>
        </card_1.CardContent>
      </card_1.Card>
    </div>);
};
exports.SEOPanel = SEOPanel;
//# sourceMappingURL=seo-panel.js.map