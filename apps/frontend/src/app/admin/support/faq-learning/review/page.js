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
exports.default = ReviewQueuePage;
const react_1 = __importStar(require("react"));
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const textarea_1 = require("@/components/ui/textarea");
const checkbox_1 = require("@/components/ui/checkbox");
const select_1 = require("@/components/ui/select");
const dialog_1 = require("@/components/ui/dialog");
const alert_1 = require("@/components/ui/alert");
const tabs_1 = require("@/components/ui/tabs");
const lucide_react_1 = require("lucide-react");
function ReviewQueuePage() {
    const [reviewItems, setReviewItems] = (0, react_1.useState)([]);
    const [selectedItems, setSelectedItems] = (0, react_1.useState)([]);
    const [currentItem, setCurrentItem] = (0, react_1.useState)(null);
    const [isReviewModalOpen, setIsReviewModalOpen] = (0, react_1.useState)(false);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [currentPage, setCurrentPage] = (0, react_1.useState)(1);
    const [totalPages, setTotalPages] = (0, react_1.useState)(1);
    const [filters, setFilters] = (0, react_1.useState)({
        status: ['pending_review'],
        confidence: { min: 0, max: 100 },
        source: [],
        category: [],
        search: ''
    });
    // Stats state
    const [stats, setStats] = (0, react_1.useState)({
        total: 0,
        pendingReview: 0,
        approved: 0,
        rejected: 0,
        published: 0,
        averageConfidence: 0
    });
    // Review form state
    const [reviewAction, setReviewAction] = (0, react_1.useState)('approve');
    const [reviewReason, setReviewReason] = (0, react_1.useState)('');
    const [editedAnswer, setEditedAnswer] = (0, react_1.useState)('');
    const [editedCategory, setEditedCategory] = (0, react_1.useState)('');
    const [editedKeywords, setEditedKeywords] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        loadReviewQueue();
        loadStats();
    }, [currentPage, filters]);
    const loadStats = async () => {
        try {
            const { FaqLearningService } = await Promise.resolve().then(() => __importStar(require('@/services/faq-learning.service')));
            const data = await FaqLearningService.getReviewStats();
            setStats(data);
        }
        catch (error) {
            console.error('Review stats yüklenemedi:', error);
        }
    };
    const loadReviewQueue = async () => {
        setIsLoading(true);
        try {
            const { FaqLearningService } = await Promise.resolve().then(() => __importStar(require('@/services/faq-learning.service')));
            const data = await FaqLearningService.getReviewQueue({
                status: filters.status,
                confidence: filters.confidence,
                source: filters.source,
                category: filters.category,
                page: currentPage,
                limit: 10
            });
            setReviewItems(data.items);
            setTotalPages(data.totalPages);
            setIsLoading(false);
        }
        catch (error) {
            console.error('Review queue yüklenemedi:', error);
            setReviewItems([]);
            setTotalPages(1);
            setIsLoading(false);
        }
    };
    const handleItemSelect = (itemId, checked) => {
        if (checked) {
            setSelectedItems([...selectedItems, itemId]);
        }
        else {
            setSelectedItems(selectedItems.filter(id => id !== itemId));
        }
    };
    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedItems(reviewItems.map(item => item.id));
        }
        else {
            setSelectedItems([]);
        }
    };
    const openReviewModal = (item) => {
        setCurrentItem(item);
        setEditedAnswer(item.answer);
        setEditedCategory(item.category || '');
        setEditedKeywords(item.keywords);
        setReviewAction('approve');
        setReviewReason('');
        setIsReviewModalOpen(true);
    };
    const handleReview = async () => {
        if (!currentItem)
            return;
        try {
            const { FaqLearningService } = await Promise.resolve().then(() => __importStar(require('@/services/faq-learning.service')));
            const result = await FaqLearningService.reviewFaq(currentItem.id, reviewAction, {
                reason: reviewReason,
                editedAnswer: reviewAction === 'edit' ? editedAnswer : undefined,
                editedCategory: reviewAction === 'edit' ? editedCategory : undefined,
                editedKeywords: reviewAction === 'edit' ? editedKeywords : undefined
            });
            if (result.success) {
                console.log('FAQ başarıyla incelendi:', result.message);
                setIsReviewModalOpen(false);
                loadReviewQueue(); // Refresh the list
                loadStats(); // Refresh stats
            }
        }
        catch (error) {
            console.error('Review işlemi başarısız:', error);
        }
    };
    const handleBulkAction = async (action) => {
        if (selectedItems.length === 0)
            return;
        try {
            const { FaqLearningService } = await Promise.resolve().then(() => __importStar(require('@/services/faq-learning.service')));
            const result = await FaqLearningService.bulkReview(selectedItems, action, `Toplu ${action === 'approve' ? 'onay' : 'red'}`);
            if (result.success) {
                console.log('Toplu işlem başarılı:', result.message);
                setSelectedItems([]);
                loadReviewQueue(); // Refresh the list
                loadStats(); // Refresh stats
            }
        }
        catch (error) {
            console.error('Toplu işlem başarısız:', error);
        }
    };
    const getConfidenceColor = (confidence) => {
        if (confidence >= 85)
            return 'text-green-600 bg-green-50';
        if (confidence >= 70)
            return 'text-yellow-600 bg-yellow-50';
        return 'text-red-600 bg-red-50';
    };
    const getSourceIcon = (source) => {
        return source === 'chat' ? <lucide_react_1.MessageSquare className="h-4 w-4"/> : <lucide_react_1.User className="h-4 w-4"/>;
    };
    if (isLoading) {
        return (<div className="flex items-center justify-center h-64">
        <lucide_react_1.RefreshCw className="h-8 w-8 animate-spin"/>
        <span className="ml-2">İnceleme kuyruğu yükleniyor...</span>
      </div>);
    }
    return (<div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">FAQ İnceleme Kuyruğu</h1>
          <p className="text-muted-foreground">
            AI tarafından oluşturulan FAQ'ları inceleyin ve onaylayın
          </p>
        </div>
        <div className="flex gap-2">
          <button_1.Button variant="outline" onClick={loadReviewQueue}>
            <lucide_react_1.RefreshCw className="h-4 w-4 mr-2"/>
            Yenile
          </button_1.Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <card_1.Card>
          <card_1.CardContent className="p-4">
            <div className="flex items-center gap-2">
              <lucide_react_1.Clock className="h-4 w-4 text-yellow-600"/>
              <div>
                <div className="text-2xl font-bold">{stats.pendingReview}</div>
                <div className="text-sm text-muted-foreground">İnceleme Bekleyen</div>
              </div>
            </div>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card>
          <card_1.CardContent className="p-4">
            <div className="flex items-center gap-2">
              <lucide_react_1.CheckCircle className="h-4 w-4 text-green-600"/>
              <div>
                <div className="text-2xl font-bold">{stats.approved}</div>
                <div className="text-sm text-muted-foreground">Onaylanmış</div>
              </div>
            </div>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card>
          <card_1.CardContent className="p-4">
            <div className="flex items-center gap-2">
              <lucide_react_1.TrendingUp className="h-4 w-4 text-blue-600"/>
              <div>
                <div className="text-2xl font-bold">{stats.averageConfidence}%</div>
                <div className="text-sm text-muted-foreground">Ortalama Güven</div>
              </div>
            </div>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card>
          <card_1.CardContent className="p-4">
            <div className="flex items-center gap-2">
              <lucide_react_1.CheckCircle className="h-4 w-4 text-green-600"/>
              <div>
                <div className="text-2xl font-bold">{stats.published}</div>
                <div className="text-sm text-muted-foreground">Yayınlanmış</div>
              </div>
            </div>
          </card_1.CardContent>
        </card_1.Card>
      </div>

      {/* Filters */}
      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle className="flex items-center gap-2">
            <lucide_react_1.Filter className="h-5 w-5"/>
            Filtreler
          </card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label_1.Label>Arama</label_1.Label>
              <div className="relative">
                <lucide_react_1.Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
                <input_1.Input placeholder="Soru veya cevap ara..." value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} className="pl-10"/>
              </div>
            </div>

            <div>
              <label_1.Label>Durum</label_1.Label>
              <select_1.Select value={filters.status[0]} onValueChange={(value) => setFilters({ ...filters, status: [value] })}>
                <select_1.SelectTrigger>
                  <select_1.SelectValue />
                </select_1.SelectTrigger>
                <select_1.SelectContent>
                  <select_1.SelectItem value="pending_review">İnceleme Bekleyen</select_1.SelectItem>
                  <select_1.SelectItem value="approved">Onaylanmış</select_1.SelectItem>
                  <select_1.SelectItem value="rejected">Reddedilmiş</select_1.SelectItem>
                </select_1.SelectContent>
              </select_1.Select>
            </div>

            <div>
              <label_1.Label>Kaynak</label_1.Label>
              <select_1.Select>
                <select_1.SelectTrigger>
                  <select_1.SelectValue placeholder="Tüm kaynaklar"/>
                </select_1.SelectTrigger>
                <select_1.SelectContent>
                  <select_1.SelectItem value="chat">Chat</select_1.SelectItem>
                  <select_1.SelectItem value="ticket">Ticket</select_1.SelectItem>
                </select_1.SelectContent>
              </select_1.Select>
            </div>

            <div>
              <label_1.Label>Kategori</label_1.Label>
              <select_1.Select>
                <select_1.SelectTrigger>
                  <select_1.SelectValue placeholder="Tüm kategoriler"/>
                </select_1.SelectTrigger>
                <select_1.SelectContent>
                  <select_1.SelectItem value="account">Hesap Yönetimi</select_1.SelectItem>
                  <select_1.SelectItem value="technical">Teknik Destek</select_1.SelectItem>
                  <select_1.SelectItem value="billing">Faturalandırma</select_1.SelectItem>
                </select_1.SelectContent>
              </select_1.Select>
            </div>
          </div>
        </card_1.CardContent>
      </card_1.Card>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (<alert_1.Alert>
          <lucide_react_1.AlertTriangle className="h-4 w-4"/>
          <alert_1.AlertDescription className="flex items-center justify-between">
            <span>{selectedItems.length} öğe seçildi</span>
            <div className="flex gap-2">
              <button_1.Button size="sm" onClick={() => handleBulkAction('approve')}>
                <lucide_react_1.CheckCircle className="h-4 w-4 mr-2"/>
                Toplu Onayla
              </button_1.Button>
              <button_1.Button size="sm" variant="destructive" onClick={() => handleBulkAction('reject')}>
                <lucide_react_1.XCircle className="h-4 w-4 mr-2"/>
                Toplu Reddet
              </button_1.Button>
            </div>
          </alert_1.AlertDescription>
        </alert_1.Alert>)}

      {/* Review Items */}
      <card_1.Card>
        <card_1.CardHeader>
          <div className="flex items-center justify-between">
            <card_1.CardTitle>FAQ Listesi</card_1.CardTitle>
            <div className="flex items-center gap-2">
              <checkbox_1.Checkbox checked={selectedItems.length === reviewItems.length && reviewItems.length > 0} onCheckedChange={handleSelectAll}/>
              <label_1.Label>Tümünü Seç</label_1.Label>
            </div>
          </div>
        </card_1.CardHeader>
        <card_1.CardContent>
          <div className="space-y-4">
            {reviewItems.map((item) => (<div key={item.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <checkbox_1.Checkbox checked={selectedItems.includes(item.id)} onCheckedChange={(checked) => handleItemSelect(item.id, checked)}/>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{item.question}</h3>
                        <badge_1.Badge className={getConfidenceColor(item.confidence)}>
                          {item.confidence}% güven
                        </badge_1.Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.answer}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          {getSourceIcon(item.source)}
                          <span className="capitalize">{item.source}</span>
                        </div>
                        
                        {item.category && (<div className="flex items-center gap-1">
                            <lucide_react_1.Tag className="h-4 w-4"/>
                            <span>{item.category}</span>
                          </div>)}
                        
                        <div className="flex items-center gap-1">
                          <lucide_react_1.Calendar className="h-4 w-4"/>
                          <span>{item.createdAt.toLocaleDateString('tr-TR')}</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <lucide_react_1.Eye className="h-4 w-4"/>
                          <span>{item.usageCount} görüntüleme</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {item.keywords.map((keyword) => (<badge_1.Badge key={keyword} variant="outline" className="text-xs">
                            {keyword}
                          </badge_1.Badge>))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button_1.Button size="sm" variant="outline" onClick={() => openReviewModal(item)}>
                      <lucide_react_1.Eye className="h-4 w-4 mr-2"/>
                      İncele
                    </button_1.Button>
                  </div>
                </div>
              </div>))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-muted-foreground">
              Toplam {reviewItems.length} öğe
            </div>
            <div className="flex items-center gap-2">
              <button_1.Button variant="outline" size="sm" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
                <lucide_react_1.ChevronLeft className="h-4 w-4"/>
              </button_1.Button>
              <span className="text-sm">
                Sayfa {currentPage} / {totalPages}
              </span>
              <button_1.Button variant="outline" size="sm" onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
                <lucide_react_1.ChevronRight className="h-4 w-4"/>
              </button_1.Button>
            </div>
          </div>
        </card_1.CardContent>
      </card_1.Card>

      {/* Review Modal */}
      <dialog_1.Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
        <dialog_1.DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <dialog_1.DialogHeader>
            <dialog_1.DialogTitle>FAQ İncelemesi</dialog_1.DialogTitle>
            <dialog_1.DialogDescription>
              Bu FAQ'yı inceleyin ve uygun eylemi seçin
            </dialog_1.DialogDescription>
          </dialog_1.DialogHeader>

          {currentItem && (<div className="space-y-6">
              {/* FAQ Details */}
              <div className="space-y-4">
                <div>
                  <label_1.Label className="text-base font-medium">Soru</label_1.Label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-md">
                    {currentItem.question}
                  </div>
                </div>

                <div>
                  <label_1.Label className="text-base font-medium">Mevcut Cevap</label_1.Label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-md">
                    {currentItem.answer}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label_1.Label>Güven Skoru</label_1.Label>
                    <badge_1.Badge className={getConfidenceColor(currentItem.confidence)}>
                      {currentItem.confidence}%
                    </badge_1.Badge>
                  </div>
                  <div>
                    <label_1.Label>Kaynak</label_1.Label>
                    <div className="flex items-center gap-2">
                      {getSourceIcon(currentItem.source)}
                      <span className="capitalize">{currentItem.source}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Actions */}
              <tabs_1.Tabs value={reviewAction} onValueChange={(value) => setReviewAction(value)}>
                <tabs_1.TabsList className="grid w-full grid-cols-3">
                  <tabs_1.TabsTrigger value="approve">Onayla</tabs_1.TabsTrigger>
                  <tabs_1.TabsTrigger value="edit">Düzenle</tabs_1.TabsTrigger>
                  <tabs_1.TabsTrigger value="reject">Reddet</tabs_1.TabsTrigger>
                </tabs_1.TabsList>

                <tabs_1.TabsContent value="approve" className="space-y-4">
                  <alert_1.Alert>
                    <lucide_react_1.CheckCircle className="h-4 w-4"/>
                    <alert_1.AlertDescription>
                      Bu FAQ onaylanacak ve yayınlanacak.
                    </alert_1.AlertDescription>
                  </alert_1.Alert>
                </tabs_1.TabsContent>

                <tabs_1.TabsContent value="edit" className="space-y-4">
                  <div>
                    <label_1.Label>Düzenlenmiş Cevap</label_1.Label>
                    <textarea_1.Textarea value={editedAnswer} onChange={(e) => setEditedAnswer(e.target.value)} rows={4} className="mt-1"/>
                  </div>

                  <div>
                    <label_1.Label>Kategori</label_1.Label>
                    <input_1.Input value={editedCategory} onChange={(e) => setEditedCategory(e.target.value)} className="mt-1"/>
                  </div>

                  <div>
                    <label_1.Label>Anahtar Kelimeler (virgülle ayırın)</label_1.Label>
                    <input_1.Input value={editedKeywords.join(', ')} onChange={(e) => setEditedKeywords(e.target.value.split(',').map(k => k.trim()))} className="mt-1"/>
                  </div>
                </tabs_1.TabsContent>

                <tabs_1.TabsContent value="reject" className="space-y-4">
                  <alert_1.Alert>
                    <lucide_react_1.XCircle className="h-4 w-4"/>
                    <alert_1.AlertDescription>
                      Bu FAQ reddedilecek ve yayınlanmayacak.
                    </alert_1.AlertDescription>
                  </alert_1.Alert>
                </tabs_1.TabsContent>
              </tabs_1.Tabs>

              {/* Review Reason */}
              <div>
                <label_1.Label>İnceleme Notu (İsteğe bağlı)</label_1.Label>
                <textarea_1.Textarea value={reviewReason} onChange={(e) => setReviewReason(e.target.value)} placeholder="Bu kararın nedenini açıklayın..." rows={3} className="mt-1"/>
              </div>
            </div>)}

          <dialog_1.DialogFooter>
            <button_1.Button variant="outline" onClick={() => setIsReviewModalOpen(false)}>
              İptal
            </button_1.Button>
            <button_1.Button onClick={handleReview}>
              {reviewAction === 'approve' ? 'Onayla' :
            reviewAction === 'edit' ? 'Düzenle ve Onayla' : 'Reddet'}
            </button_1.Button>
          </dialog_1.DialogFooter>
        </dialog_1.DialogContent>
      </dialog_1.Dialog>
    </div>);
}
//# sourceMappingURL=page.js.map