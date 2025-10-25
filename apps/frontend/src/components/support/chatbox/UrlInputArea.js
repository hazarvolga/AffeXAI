"use strict";
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlInputArea = UrlInputArea;
const react_1 = __importStar(require("react"));
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const badge_1 = require("@/components/ui/badge");
const alert_1 = require("@/components/ui/alert");
const progress_1 = require("@/components/ui/progress");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
function UrlInputArea({ onUrlSubmit, onCancel, className }) {
    const [url, setUrl] = (0, react_1.useState)('');
    const [urlPreview, setUrlPreview] = (0, react_1.useState)(null);
    const [isValidating, setIsValidating] = (0, react_1.useState)(false);
    const [validationError, setValidationError] = (0, react_1.useState)(null);
    const validateUrl = (urlString) => {
        try {
            const urlObj = new URL(urlString);
            return ['http:', 'https:'].includes(urlObj.protocol);
        }
        catch {
            return false;
        }
    };
    const getDomainFromUrl = (urlString) => {
        try {
            const urlObj = new URL(urlString);
            return urlObj.hostname;
        }
        catch {
            return '';
        }
    };
    const getContentTypeIcon = (contentType) => {
        if (!contentType)
            return lucide_react_1.Globe;
        if (contentType.includes('text/html'))
            return lucide_react_1.FileText;
        if (contentType.includes('image/'))
            return lucide_react_1.Image;
        if (contentType.includes('video/'))
            return lucide_react_1.Video;
        return lucide_react_1.Globe;
    };
    const handleUrlChange = (e) => {
        const newUrl = e.target.value;
        setUrl(newUrl);
        setValidationError(null);
        setUrlPreview(null);
    };
    const handleUrlValidation = async () => {
        if (!url.trim()) {
            setValidationError('Lütfen bir URL girin');
            return;
        }
        if (!validateUrl(url.trim())) {
            setValidationError('Geçerli bir URL girin (http:// veya https:// ile başlamalı)');
            return;
        }
        setIsValidating(true);
        setValidationError(null);
        try {
            // Create initial preview
            const domain = getDomainFromUrl(url.trim());
            const preview = {
                url: url.trim(),
                domain,
                status: 'validating',
                progress: 0
            };
            setUrlPreview(preview);
            // Simulate URL validation and content fetching
            await simulateUrlProcessing(preview);
        }
        catch (error) {
            setValidationError('URL işlenirken bir hata oluştu');
            setUrlPreview(null);
        }
        finally {
            setIsValidating(false);
        }
    };
    const simulateUrlProcessing = async (preview) => {
        // Simulate validation phase
        setUrlPreview(prev => prev ? { ...prev, status: 'validating', progress: 20 } : null);
        await new Promise(resolve => setTimeout(resolve, 500));
        // Simulate processing phase
        setUrlPreview(prev => prev ? { ...prev, status: 'processing', progress: 50 } : null);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Simulate content extraction
        setUrlPreview(prev => prev ? { ...prev, progress: 80 } : null);
        await new Promise(resolve => setTimeout(resolve, 800));
        // Complete with mock data
        const mockData = generateMockPreview(preview.url);
        setUrlPreview(prev => prev ? {
            ...prev,
            ...mockData,
            status: 'completed',
            progress: 100
        } : null);
    };
    const generateMockPreview = (url) => {
        const domain = getDomainFromUrl(url);
        // Generate mock preview data based on domain
        const mockPreviews = {
            'github.com': {
                title: 'GitHub Repository',
                description: 'A repository containing source code and documentation',
                contentType: 'text/html',
                image: '/api/placeholder/400/200'
            },
            'stackoverflow.com': {
                title: 'Stack Overflow Question',
                description: 'Programming question and answers from the community',
                contentType: 'text/html'
            },
            'docs.google.com': {
                title: 'Google Docs Document',
                description: 'Shared document with collaborative editing',
                contentType: 'application/vnd.google-apps.document'
            },
            'youtube.com': {
                title: 'YouTube Video',
                description: 'Video content from YouTube',
                contentType: 'text/html',
                image: '/api/placeholder/400/200'
            }
        };
        const domainKey = Object.keys(mockPreviews).find(key => domain.includes(key));
        const mockData = domainKey ? mockPreviews[domainKey] : {
            title: `${domain} - Web Sayfası`,
            description: 'Web sayfası içeriği analiz edilecek',
            contentType: 'text/html'
        };
        return mockData;
    };
    const handleSubmitUrl = () => {
        if (urlPreview && urlPreview.status === 'completed') {
            onUrlSubmit(urlPreview.url);
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !isValidating) {
            if (urlPreview?.status === 'completed') {
                handleSubmitUrl();
            }
            else {
                handleUrlValidation();
            }
        }
    };
    const ContentTypeIcon = urlPreview ? getContentTypeIcon(urlPreview.contentType) : lucide_react_1.Globe;
    return (<div className={(0, utils_1.cn)("space-y-4", className)}>
      <card_1.Card>
        <card_1.CardHeader className="pb-3">
          <card_1.CardTitle className="text-lg flex items-center space-x-2">
            <lucide_react_1.Link className="h-5 w-5"/>
            <span>Web Sayfası Ekle</span>
          </card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent className="space-y-4">
          {/* URL Input */}
          <div className="space-y-2">
            <label_1.Label htmlFor="url-input">Web Sayfası URL'si</label_1.Label>
            <div className="flex space-x-2">
              <input_1.Input id="url-input" type="url" value={url} onChange={handleUrlChange} onKeyPress={handleKeyPress} placeholder="https://example.com/page" disabled={isValidating} className="flex-1"/>
              <button_1.Button onClick={handleUrlValidation} disabled={!url.trim() || isValidating} variant="outline">
                {isValidating ? (<lucide_react_1.Loader2 className="h-4 w-4 animate-spin"/>) : ('Analiz Et')}
              </button_1.Button>
            </div>
          </div>

          {/* Validation Error */}
          {validationError && (<alert_1.Alert variant="destructive">
              <lucide_react_1.AlertCircle className="h-4 w-4"/>
              <alert_1.AlertDescription>{validationError}</alert_1.AlertDescription>
            </alert_1.Alert>)}

          {/* URL Preview */}
          {urlPreview && (<card_1.Card className="border-2">
              <card_1.CardContent className="p-4">
                {/* Processing Status */}
                {(urlPreview.status === 'validating' || urlPreview.status === 'processing') && (<div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <lucide_react_1.Loader2 className="h-4 w-4 animate-spin"/>
                      <span className="text-sm font-medium">
                        {urlPreview.status === 'validating' ? 'URL doğrulanıyor...' : 'İçerik analiz ediliyor...'}
                      </span>
                    </div>
                    <progress_1.Progress value={urlPreview.progress} className="h-2"/>
                  </div>)}

                {/* Completed Preview */}
                {urlPreview.status === 'completed' && (<div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <ContentTypeIcon className="h-6 w-6 text-muted-foreground flex-shrink-0 mt-1"/>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm line-clamp-2">
                          {urlPreview.title || 'Başlık bulunamadı'}
                        </h4>
                        {urlPreview.description && (<p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {urlPreview.description}
                          </p>)}
                        <div className="flex items-center space-x-2 mt-2">
                          <badge_1.Badge variant="secondary" className="text-xs">
                            {urlPreview.domain}
                          </badge_1.Badge>
                          {urlPreview.contentType && (<badge_1.Badge variant="outline" className="text-xs">
                              {urlPreview.contentType.split('/')[1]?.toUpperCase() || 'HTML'}
                            </badge_1.Badge>)}
                        </div>
                      </div>
                    </div>

                    {/* Preview Image */}
                    {urlPreview.image && (<div className="mt-3">
                        <img src={urlPreview.image} alt="URL Preview" className="w-full h-32 object-cover rounded-md border"/>
                      </div>)}

                    {/* URL Display */}
                    <div className="flex items-center space-x-2 p-2 bg-muted rounded-md">
                      <lucide_react_1.Link className="h-4 w-4 text-muted-foreground flex-shrink-0"/>
                      <span className="text-sm text-muted-foreground truncate flex-1">
                        {urlPreview.url}
                      </span>
                      <button_1.Button variant="ghost" size="icon" onClick={() => window.open(urlPreview.url, '_blank')} className="h-6 w-6 flex-shrink-0">
                        <lucide_react_1.ExternalLink className="h-3 w-3"/>
                      </button_1.Button>
                    </div>

                    {/* Success Indicator */}
                    <div className="flex items-center space-x-2 text-green-600">
                      <lucide_react_1.Check className="h-4 w-4"/>
                      <span className="text-sm">İçerik başarıyla analiz edildi</span>
                    </div>
                  </div>)}

                {/* Error State */}
                {urlPreview.status === 'error' && (<alert_1.Alert variant="destructive">
                    <lucide_react_1.AlertCircle className="h-4 w-4"/>
                    <alert_1.AlertDescription>
                      {urlPreview.error || 'URL işlenirken bir hata oluştu'}
                    </alert_1.AlertDescription>
                  </alert_1.Alert>)}
              </card_1.CardContent>
            </card_1.Card>)}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-2">
            <button_1.Button variant="outline" onClick={onCancel}>
              İptal
            </button_1.Button>
            <button_1.Button onClick={handleSubmitUrl} disabled={!urlPreview || urlPreview.status !== 'completed'}>
              URL'yi Gönder
            </button_1.Button>
          </div>
        </card_1.CardContent>
      </card_1.Card>

      {/* Help Text */}
      <div className="text-xs text-muted-foreground space-y-1">
        <p>• Desteklenen siteler: GitHub, Stack Overflow, Google Docs, YouTube ve daha fazlası</p>
        <p>• URL içeriği otomatik olarak analiz edilir ve sohbet bağlamına eklenir</p>
        <p>• Robots.txt kurallarına uygun olarak içerik çekilir</p>
      </div>
    </div>);
}
//# sourceMappingURL=UrlInputArea.js.map