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
exports.AICategorySuggestions = AICategorySuggestions;
const react_1 = __importStar(require("react"));
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const lucide_react_1 = require("lucide-react");
const progress_1 = require("@/components/ui/progress");
function AICategorySuggestions({ ticketId, currentCategoryId, onCategorySelect, }) {
    const [suggestions, setSuggestions] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [applying, setApplying] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        fetchSuggestions();
    }, [ticketId]);
    const fetchSuggestions = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`/api/tickets/ai/${ticketId}/suggestions`);
            if (!response.ok) {
                throw new Error('Failed to fetch suggestions');
            }
            const data = await response.json();
            setSuggestions(Array.isArray(data) ? data : []);
        }
        catch (error) {
            console.error('Failed to fetch AI suggestions:', error);
            setError(error.message || 'Failed to load AI suggestions');
            setSuggestions([]);
        }
        finally {
            setLoading(false);
        }
    };
    const handleAutoCategorizе = async () => {
        try {
            setApplying(true);
            setError(null);
            const response = await fetch(`/api/tickets/ai/${ticketId}/categorize`, {
                method: 'POST',
            });
            if (!response.ok) {
                throw new Error('Failed to apply category');
            }
            const result = await response.json();
            if (result.success && result.category) {
                if (onCategorySelect) {
                    onCategorySelect(result.category.categoryId);
                }
                // Refresh suggestions
                await fetchSuggestions();
            }
            else {
                setError(result.message || 'Could not categorize with sufficient confidence');
            }
        }
        catch (error) {
            console.error('Failed to apply category:', error);
            setError(error.message || 'Failed to apply category');
        }
        finally {
            setApplying(false);
        }
    };
    const handleSelectSuggestion = (categoryId) => {
        if (onCategorySelect) {
            onCategorySelect(categoryId);
        }
    };
    const getConfidenceColor = (confidence) => {
        if (confidence >= 80)
            return 'text-green-600 bg-green-50 border-green-200';
        if (confidence >= 60)
            return 'text-yellow-600 bg-yellow-50 border-yellow-200';
        return 'text-orange-600 bg-orange-50 border-orange-200';
    };
    const getConfidenceLabel = (confidence) => {
        if (confidence >= 80)
            return 'Yüksek Güven';
        if (confidence >= 60)
            return 'Orta Güven';
        return 'Düşük Güven';
    };
    if (loading) {
        return (<card_1.Card>
        <card_1.CardContent className="flex items-center justify-center py-8">
          <lucide_react_1.Loader2 className="h-8 w-8 animate-spin text-primary"/>
          <span className="ml-3 text-muted-foreground">AI önerileri yükleniyor...</span>
        </card_1.CardContent>
      </card_1.Card>);
    }
    if (error) {
        return (<card_1.Card>
        <card_1.CardContent className="flex items-center justify-center py-8">
          <lucide_react_1.XCircle className="h-8 w-8 text-destructive"/>
          <span className="ml-3 text-destructive">{error}</span>
        </card_1.CardContent>
      </card_1.Card>);
    }
    if (suggestions.length === 0) {
        return (<card_1.Card>
        <card_1.CardContent className="flex flex-col items-center justify-center py-8">
          <lucide_react_1.Brain className="h-12 w-12 text-muted-foreground mb-4"/>
          <p className="text-muted-foreground text-center">
            AI kategori önerisi bulunamadı
          </p>
          <button_1.Button variant="outline" onClick={fetchSuggestions} className="mt-4">
            Yeniden Dene
          </button_1.Button>
        </card_1.CardContent>
      </card_1.Card>);
    }
    return (<card_1.Card>
      <card_1.CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <lucide_react_1.Sparkles className="h-5 w-5 text-purple-600"/>
            <card_1.CardTitle className="text-lg">AI Kategori Önerileri</card_1.CardTitle>
          </div>
          <button_1.Button size="sm" onClick={handleAutoCategorizе} disabled={applying || suggestions[0]?.confidence < 60}>
            {applying ? (<>
                <lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                Uygulanıyor...
              </>) : (<>
                <lucide_react_1.CheckCircle className="mr-2 h-4 w-4"/>
                Otomatik Uygula
              </>)}
          </button_1.Button>
        </div>
        <card_1.CardDescription>
          AI tarafından analiz edilen kategori önerileri
        </card_1.CardDescription>
      </card_1.CardHeader>

      <card_1.CardContent className="space-y-4">
        {suggestions.map((suggestion, index) => (<div key={suggestion.categoryId} className={`p-4 border rounded-lg transition-all hover:shadow-md cursor-pointer ${currentCategoryId === suggestion.categoryId
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-primary/50'}`} onClick={() => handleSelectSuggestion(suggestion.categoryId)}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-lg">
                    {index + 1}. {suggestion.categoryName}
                  </span>
                  {currentCategoryId === suggestion.categoryId && (<badge_1.Badge variant="default">Seçili</badge_1.Badge>)}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm px-2 py-1 rounded border ${getConfidenceColor(suggestion.confidence)}`}>
                    {getConfidenceLabel(suggestion.confidence)}
                  </span>
                  <span className="text-sm font-medium">
                    {suggestion.confidence}% Güven
                  </span>
                </div>
              </div>
            </div>

            {/* Confidence Progress Bar */}
            <div className="mb-3">
              <progress_1.Progress value={suggestion.confidence} className="h-2"/>
            </div>

            {/* Matched Keywords */}
            {suggestion.reasons && suggestion.reasons.length > 0 && (<div>
                <p className="text-xs text-muted-foreground mb-2">
                  Eşleşen anahtar kelimeler:
                </p>
                <div className="flex flex-wrap gap-1">
                  {suggestion.reasons.slice(0, 5).map((reason, idx) => (<badge_1.Badge key={idx} variant="secondary" className="text-xs">
                      {reason}
                    </badge_1.Badge>))}
                  {suggestion.reasons.length > 5 && (<badge_1.Badge variant="outline" className="text-xs">
                      +{suggestion.reasons.length - 5} daha
                    </badge_1.Badge>)}
                </div>
              </div>)}
          </div>))}

        {/* Info Footer */}
        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground text-center">
            💡 AI önerileri, ticket içeriği analiz edilerek oluşturulur. %60+ güven ile
            otomatik uygulanabilir.
          </p>
        </div>
      </card_1.CardContent>
    </card_1.Card>);
}
//# sourceMappingURL=AICategorySuggestions.js.map