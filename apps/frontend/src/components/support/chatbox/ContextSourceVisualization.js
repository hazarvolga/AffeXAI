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
exports.ContextSourceVisualization = ContextSourceVisualization;
const react_1 = __importStar(require("react"));
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const collapsible_1 = require("@/components/ui/collapsible");
const progress_1 = require("@/components/ui/progress");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
function ContextSourceVisualization({ sources, className, maxSources = 5, showRelevanceScores = true, onSourceClick }) {
    const [expandedSources, setExpandedSources] = (0, react_1.useState)(new Set());
    if (!sources || sources.length === 0) {
        return null;
    }
    const sortedSources = sources
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .slice(0, maxSources);
    const toggleSourceExpansion = (sourceId) => {
        const newExpanded = new Set(expandedSources);
        if (newExpanded.has(sourceId)) {
            newExpanded.delete(sourceId);
        }
        else {
            newExpanded.add(sourceId);
        }
        setExpandedSources(newExpanded);
    };
    const getSourceIcon = (type) => {
        switch (type) {
            case 'knowledge_base':
                return lucide_react_1.BookOpen;
            case 'faq_learning':
                return lucide_react_1.HelpCircle;
            case 'document':
                return lucide_react_1.FileText;
            case 'url':
                return lucide_react_1.Link;
            default:
                return lucide_react_1.Database;
        }
    };
    const getSourceTypeLabel = (type) => {
        switch (type) {
            case 'knowledge_base':
                return 'Bilgi Bankası';
            case 'faq_learning':
                return 'FAQ Öğrenme';
            case 'document':
                return 'Belge';
            case 'url':
                return 'Web Sayfası';
            default:
                return 'Kaynak';
        }
    };
    const getRelevanceColor = (score) => {
        if (score >= 0.8)
            return 'text-green-600';
        if (score >= 0.6)
            return 'text-yellow-600';
        return 'text-red-600';
    };
    const getRelevanceLabel = (score) => {
        if (score >= 0.8)
            return 'Yüksek';
        if (score >= 0.6)
            return 'Orta';
        return 'Düşük';
    };
    const formatRelevanceScore = (score) => {
        return Math.round(score * 100);
    };
    const handleSourceClick = (source, e) => {
        e.stopPropagation();
        onSourceClick?.(source);
    };
    const renderSourceMetadata = (source) => {
        const { metadata } = source;
        switch (source.type) {
            case 'knowledge_base':
                return (<div className="space-y-2">
            {metadata.categoryName && (<div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">Kategori:</span>
                <badge_1.Badge variant="secondary" className="text-xs">
                  {metadata.categoryName}
                </badge_1.Badge>
              </div>)}
            {metadata.tags && metadata.tags.length > 0 && (<div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">Etiketler:</span>
                <div className="flex flex-wrap gap-1">
                  {metadata.tags.slice(0, 3).map((tag, index) => (<badge_1.Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </badge_1.Badge>))}
                  {metadata.tags.length > 3 && (<badge_1.Badge variant="outline" className="text-xs">
                      +{metadata.tags.length - 3}
                    </badge_1.Badge>)}
                </div>
              </div>)}
          </div>);
            case 'faq_learning':
                return (<div className="space-y-2">
            {metadata.confidence && (<div className="flex items-center space-x-2">
                <lucide_react_1.Brain className="h-3 w-3 text-muted-foreground"/>
                <span className="text-xs text-muted-foreground">Güven:</span>
                <badge_1.Badge variant="secondary" className="text-xs">
                  {Math.round(metadata.confidence * 100)}%
                </badge_1.Badge>
              </div>)}
            {metadata.learningPattern && (<div className="flex items-center space-x-2">
                <lucide_react_1.TrendingUp className="h-3 w-3 text-muted-foreground"/>
                <span className="text-xs text-muted-foreground">Öğrenme Deseni:</span>
                <badge_1.Badge variant="outline" className="text-xs">
                  {metadata.learningPattern}
                </badge_1.Badge>
              </div>)}
          </div>);
            case 'document':
                return (<div className="space-y-2">
            {metadata.fileName && (<div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">Dosya:</span>
                <badge_1.Badge variant="secondary" className="text-xs">
                  {metadata.fileName}
                </badge_1.Badge>
              </div>)}
            <div className="flex items-center space-x-4">
              {metadata.fileType && (<div className="flex items-center space-x-1">
                  <span className="text-xs text-muted-foreground">Tür:</span>
                  <badge_1.Badge variant="outline" className="text-xs">
                    {metadata.fileType.toUpperCase()}
                  </badge_1.Badge>
                </div>)}
              {metadata.pageNumber && (<div className="flex items-center space-x-1">
                  <span className="text-xs text-muted-foreground">Sayfa:</span>
                  <badge_1.Badge variant="outline" className="text-xs">
                    {metadata.pageNumber}
                  </badge_1.Badge>
                </div>)}
            </div>
          </div>);
            case 'url':
                return (<div className="space-y-2">
            {metadata.domain && (<div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">Domain:</span>
                <badge_1.Badge variant="secondary" className="text-xs">
                  {metadata.domain}
                </badge_1.Badge>
              </div>)}
            {metadata.url && (<div className="flex items-center space-x-2">
                <button_1.Button variant="ghost" size="sm" onClick={() => window.open(metadata.url, '_blank')} className="h-6 px-2 text-xs">
                  <lucide_react_1.ExternalLink className="h-3 w-3 mr-1"/>
                  Sayfayı Aç
                </button_1.Button>
              </div>)}
          </div>);
            default:
                return null;
        }
    };
    return (<div className={(0, utils_1.cn)("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium flex items-center space-x-2">
          <lucide_react_1.Database className="h-4 w-4"/>
          <span>Bağlam Kaynakları ({sortedSources.length})</span>
        </h4>
        {showRelevanceScores && (<div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <lucide_react_1.Star className="h-3 w-3"/>
            <span>Alaka Düzeyi</span>
          </div>)}
      </div>

      <div className="space-y-2">
        {sortedSources.map((source) => {
            const SourceIcon = getSourceIcon(source.type);
            const isExpanded = expandedSources.has(source.id);
            return (<card_1.Card key={source.id} className="border-l-4 border-l-primary/20">
              <collapsible_1.Collapsible>
                <collapsible_1.CollapsibleTrigger asChild>
                  <card_1.CardHeader className="pb-2 cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => toggleSourceExpansion(source.id)}>
                    <div className="flex items-start justify-between space-x-3">
                      <div className="flex items-start space-x-3 flex-1 min-w-0">
                        <SourceIcon className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5"/>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <badge_1.Badge variant="outline" className="text-xs">
                              {getSourceTypeLabel(source.type)}
                            </badge_1.Badge>
                            {showRelevanceScores && (<div className="flex items-center space-x-1">
                                <progress_1.Progress value={source.relevanceScore * 100} className="w-12 h-2"/>
                                <span className={(0, utils_1.cn)("text-xs font-medium", getRelevanceColor(source.relevanceScore))}>
                                  {formatRelevanceScore(source.relevanceScore)}%
                                </span>
                              </div>)}
                          </div>
                          <card_1.CardTitle className="text-sm line-clamp-2">
                            {source.title}
                          </card_1.CardTitle>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        {showRelevanceScores && (<badge_1.Badge variant="secondary" className={(0, utils_1.cn)("text-xs", getRelevanceColor(source.relevanceScore))}>
                            {getRelevanceLabel(source.relevanceScore)}
                          </badge_1.Badge>)}
                        {isExpanded ? (<lucide_react_1.ChevronDown className="h-4 w-4 text-muted-foreground"/>) : (<lucide_react_1.ChevronRight className="h-4 w-4 text-muted-foreground"/>)}
                      </div>
                    </div>
                  </card_1.CardHeader>
                </collapsible_1.CollapsibleTrigger>
                
                <collapsible_1.CollapsibleContent>
                  <card_1.CardContent className="pt-0">
                    <div className="space-y-3">
                      {/* Content Preview */}
                      <div className="p-3 bg-muted/50 rounded-md">
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {source.content}
                        </p>
                      </div>
                      
                      {/* Metadata */}
                      {renderSourceMetadata(source)}
                      
                      {/* Actions */}
                      <div className="flex justify-end space-x-2 pt-2 border-t">
                        <button_1.Button variant="outline" size="sm" onClick={(e) => handleSourceClick(source, e)} className="text-xs">
                          Detayları Gör
                        </button_1.Button>
                        {source.type === 'url' && source.metadata.url && (<button_1.Button variant="outline" size="sm" onClick={() => window.open(source.metadata.url, '_blank')} className="text-xs">
                            <lucide_react_1.ExternalLink className="h-3 w-3 mr-1"/>
                            Aç
                          </button_1.Button>)}
                      </div>
                    </div>
                  </card_1.CardContent>
                </collapsible_1.CollapsibleContent>
              </collapsible_1.Collapsible>
            </card_1.Card>);
        })}
      </div>
      
      {sources.length > maxSources && (<div className="text-center">
          <badge_1.Badge variant="secondary" className="text-xs">
            +{sources.length - maxSources} kaynak daha
          </badge_1.Badge>
        </div>)}
    </div>);
}
//# sourceMappingURL=ContextSourceVisualization.js.map