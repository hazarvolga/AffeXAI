"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionImpactLevel = exports.ApprovalPriority = exports.ApprovalStatus = void 0;
exports.default = ApprovalDashboard;
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const textarea_1 = require("@/components/ui/textarea");
const label_1 = require("@/components/ui/label");
const dialog_1 = require("@/components/ui/dialog");
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
const approvalsService_1 = require("@/lib/api/approvalsService");
const use_toast_1 = require("@/hooks/use-toast");
var ApprovalStatus;
(function (ApprovalStatus) {
    ApprovalStatus["PENDING"] = "pending";
    ApprovalStatus["APPROVED"] = "approved";
    ApprovalStatus["REJECTED"] = "rejected";
    ApprovalStatus["AUTO_APPROVED"] = "auto_approved";
    ApprovalStatus["EXPIRED"] = "expired";
})(ApprovalStatus || (exports.ApprovalStatus = ApprovalStatus = {}));
var ApprovalPriority;
(function (ApprovalPriority) {
    ApprovalPriority["LOW"] = "low";
    ApprovalPriority["MEDIUM"] = "medium";
    ApprovalPriority["HIGH"] = "high";
    ApprovalPriority["URGENT"] = "urgent";
})(ApprovalPriority || (exports.ApprovalPriority = ApprovalPriority = {}));
var ActionImpactLevel;
(function (ActionImpactLevel) {
    ActionImpactLevel["LOW"] = "low";
    ActionImpactLevel["MEDIUM"] = "medium";
    ActionImpactLevel["HIGH"] = "high";
    ActionImpactLevel["CRITICAL"] = "critical";
})(ActionImpactLevel || (exports.ActionImpactLevel = ActionImpactLevel = {}));
const statusConfig = {
    [ApprovalStatus.PENDING]: {
        label: 'Bekliyor',
        color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        icon: lucide_react_1.Clock,
    },
    [ApprovalStatus.APPROVED]: {
        label: 'Onaylandı',
        color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        icon: lucide_react_1.CheckCircle,
    },
    [ApprovalStatus.REJECTED]: {
        label: 'Reddedildi',
        color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        icon: lucide_react_1.XCircle,
    },
    [ApprovalStatus.AUTO_APPROVED]: {
        label: 'Otomatik Onaylandı',
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        icon: lucide_react_1.CheckCircle,
    },
    [ApprovalStatus.EXPIRED]: {
        label: 'Süresi Doldu',
        color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
        icon: lucide_react_1.XCircle,
    },
};
const priorityConfig = {
    [ApprovalPriority.URGENT]: {
        label: 'Acil',
        color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    },
    [ApprovalPriority.HIGH]: {
        label: 'Yüksek',
        color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    },
    [ApprovalPriority.MEDIUM]: {
        label: 'Orta',
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    },
    [ApprovalPriority.LOW]: {
        label: 'Düşük',
        color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    },
};
function ApprovalDashboard() {
    const [approvals, setApprovals] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [refreshing, setRefreshing] = (0, react_1.useState)(false);
    const { toast } = (0, use_toast_1.useToast)();
    const [selectedApproval, setSelectedApproval] = (0, react_1.useState)(null);
    const [reviewDialog, setReviewDialog] = (0, react_1.useState)(false);
    const [comment, setComment] = (0, react_1.useState)('');
    // Load approvals on mount
    (0, react_1.useEffect)(() => {
        loadApprovals();
    }, []);
    const loadApprovals = async () => {
        try {
            setLoading(true);
            const data = await approvalsService_1.approvalsService.getPending();
            // Transform API data to component format
            setApprovals(data.map(approval => ({
                id: approval.id,
                ruleName: `Rule ${approval.ruleId.slice(0, 8)}...`, // TODO: Fetch actual rule name
                status: approval.status,
                priority: approval.priority,
                impactLevel: approval.impactLevel,
                requestedBy: approval.requestedBy,
                requestedAt: new Date(approval.createdAt),
                requestReason: approval.requestReason,
                pendingActions: approval.pendingActions.map(action => ({
                    type: action.type,
                    description: action.type, // TODO: Better description formatting
                    estimatedImpact: action.estimatedImpact,
                })),
                requiredApprovals: approval.requiredApprovals,
                currentApprovals: approval.currentApprovals,
                expiresAt: approval.expiresAt ? new Date(approval.expiresAt) : undefined,
                approvalChain: approval.approvalChain?.map(chain => ({
                    userName: chain.userName,
                    action: chain.action,
                    comment: chain.comment,
                    timestamp: new Date(chain.timestamp),
                })),
            })));
        }
        catch (error) {
            console.error('Error loading approvals:', error);
            toast({
                title: 'Hata',
                description: 'Onay talepleri yüklenemedi',
                variant: 'destructive',
            });
        }
        finally {
            setLoading(false);
        }
    };
    const refreshApprovals = async () => {
        setRefreshing(true);
        await loadApprovals();
        setRefreshing(false);
    };
    const handleApprove = async () => {
        if (!selectedApproval)
            return;
        try {
            await approvalsService_1.approvalsService.approve(selectedApproval.id, 'current-user-id', // TODO: Get from auth context
            'Current User', // TODO: Get from auth context
            comment);
            toast({
                title: 'Başarılı',
                description: 'Onay talebi onaylandı',
            });
            setReviewDialog(false);
            setComment('');
            await loadApprovals();
        }
        catch (error) {
            toast({
                title: 'Hata',
                description: 'Onay işlemi başarısız oldu',
                variant: 'destructive',
            });
        }
    };
    const handleReject = async () => {
        if (!selectedApproval)
            return;
        try {
            await approvalsService_1.approvalsService.reject(selectedApproval.id, 'current-user-id', // TODO: Get from auth context
            'Current User', // TODO: Get from auth context
            comment);
            toast({
                title: 'Başarılı',
                description: 'Onay talebi reddedildi',
            });
            setReviewDialog(false);
            setComment('');
            await loadApprovals();
        }
        catch (error) {
            toast({
                title: 'Hata',
                description: 'Red işlemi başarısız oldu',
                variant: 'destructive',
            });
        }
    };
    const getRemainingTime = (expiresAt) => {
        if (!expiresAt)
            return '-';
        const now = new Date();
        const remaining = expiresAt.getTime() - now.getTime();
        if (remaining <= 0)
            return 'Süresi doldu';
        const hours = Math.floor(remaining / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}s ${minutes}dk`;
    };
    const pendingApprovals = approvals.filter(a => a.status === ApprovalStatus.PENDING);
    return (<div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <card_1.Card>
          <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card_1.CardTitle className="text-sm font-medium">Bekleyen Onaylar</card_1.CardTitle>
            <lucide_react_1.Clock className="h-4 w-4 text-muted-foreground"/>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-2xl font-bold">{pendingApprovals.length}</div>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card>
          <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card_1.CardTitle className="text-sm font-medium">Acil Öncelik</card_1.CardTitle>
            <lucide_react_1.AlertTriangle className="h-4 w-4 text-orange-500"/>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-2xl font-bold">
              {pendingApprovals.filter(a => a.priority === ApprovalPriority.URGENT || a.priority === ApprovalPriority.HIGH).length}
            </div>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card>
          <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card_1.CardTitle className="text-sm font-medium">Bugün Onaylanan</card_1.CardTitle>
            <lucide_react_1.CheckCircle className="h-4 w-4 text-green-500"/>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-2xl font-bold">0</div>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card>
          <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card_1.CardTitle className="text-sm font-medium">Reddedilen</card_1.CardTitle>
            <lucide_react_1.XCircle className="h-4 w-4 text-red-500"/>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-2xl font-bold">0</div>
          </card_1.CardContent>
        </card_1.Card>
      </div>

      {/* Approval List */}
      <card_1.Card>
        <card_1.CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <card_1.CardTitle>Onay Bekleyen Otomasyonlar</card_1.CardTitle>
              <card_1.CardDescription>
                Çalıştırılmadan önce onayınızı bekleyen otomasyonlar
              </card_1.CardDescription>
            </div>
            <button_1.Button variant="outline" size="sm" onClick={refreshApprovals} disabled={refreshing || loading}>
              <lucide_react_1.RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`}/>
              Yenile
            </button_1.Button>
          </div>
        </card_1.CardHeader>
        <card_1.CardContent>
          {loading ? (<div className="flex items-center justify-center py-12">
              <lucide_react_1.RefreshCw className="h-8 w-8 animate-spin text-muted-foreground"/>
            </div>) : pendingApprovals.length === 0 ? (<div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <lucide_react_1.CheckCircle className="h-12 w-12 mb-4 opacity-50"/>
              <p className="text-lg font-medium">Bekleyen onay yok</p>
              <p className="text-sm">Tüm onaylar tamamlandı</p>
            </div>) : (<div className="space-y-4">
              {pendingApprovals.map((approval) => {
                const statusCfg = statusConfig[approval.status];
                const priorityCfg = priorityConfig[approval.priority];
                const StatusIcon = statusCfg.icon;
                return (<card_1.Card key={approval.id} className="border-l-4 border-l-yellow-500">
                    <card_1.CardContent className="pt-6">
                      <div className="space-y-4">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <lucide_react_1.Shield className="h-4 w-4 text-muted-foreground"/>
                              <h3 className="font-semibold">{approval.ruleName}</h3>
                            </div>
                            {approval.requestReason && (<p className="text-sm text-muted-foreground">
                                {approval.requestReason}
                              </p>)}
                          </div>
                          <div className="flex gap-2">
                            <badge_1.Badge className={priorityCfg.color}>
                              {priorityCfg.label}
                            </badge_1.Badge>
                            <badge_1.Badge className={statusCfg.color}>
                              <StatusIcon className="h-3 w-3 mr-1"/>
                              {statusCfg.label}
                            </badge_1.Badge>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <lucide_react_1.Users className="h-4 w-4 text-muted-foreground"/>
                            <div>
                              <p className="text-muted-foreground">Talep Eden</p>
                              <p className="font-medium">{approval.requestedBy}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <lucide_react_1.Calendar className="h-4 w-4 text-muted-foreground"/>
                            <div>
                              <p className="text-muted-foreground">Talep Zamanı</p>
                              <p className="font-medium">
                                {approval.requestedAt.toLocaleString('tr-TR', {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <lucide_react_1.Activity className="h-4 w-4 text-muted-foreground"/>
                            <div>
                              <p className="text-muted-foreground">Onay Durumu</p>
                              <p className="font-medium">
                                {approval.currentApprovals}/{approval.requiredApprovals}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <lucide_react_1.Clock className="h-4 w-4 text-muted-foreground"/>
                            <div>
                              <p className="text-muted-foreground">Kalan Süre</p>
                              <p className="font-medium">
                                {getRemainingTime(approval.expiresAt)}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Yapılacak İşlemler:</p>
                          {approval.pendingActions.map((action, idx) => (<div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-lg text-sm">
                              <span>{action.description}</span>
                              {action.estimatedImpact && (<badge_1.Badge variant="outline">
                                  {action.estimatedImpact.affectedUsers && (<span>{action.estimatedImpact.affectedUsers} kullanıcı</span>)}
                                </badge_1.Badge>)}
                            </div>))}
                        </div>

                        {/* Approval Chain */}
                        {approval.approvalChain && approval.approvalChain.length > 0 && (<div className="space-y-2">
                            <p className="text-sm font-medium flex items-center gap-2">
                              <lucide_react_1.MessageSquare className="h-4 w-4"/>
                              Onay Geçmişi:
                            </p>
                            {approval.approvalChain.map((chain, idx) => (<div key={idx} className="flex items-start gap-3 p-3 bg-muted rounded-lg text-sm">
                                {chain.action === 'approved' ? (<lucide_react_1.CheckCircle className="h-4 w-4 text-green-500 mt-0.5"/>) : (<lucide_react_1.XCircle className="h-4 w-4 text-red-500 mt-0.5"/>)}
                                <div className="flex-1">
                                  <p className="font-medium">{chain.userName}</p>
                                  {chain.comment && (<p className="text-muted-foreground">{chain.comment}</p>)}
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {chain.timestamp.toLocaleString('tr-TR')}
                                  </p>
                                </div>
                              </div>))}
                          </div>)}

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <button_1.Button onClick={() => {
                        setSelectedApproval(approval);
                        setReviewDialog(true);
                    }} className="flex-1">
                            <lucide_react_1.CheckCircle className="h-4 w-4 mr-2"/>
                            İncele ve Onayla
                          </button_1.Button>
                        </div>
                      </div>
                    </card_1.CardContent>
                  </card_1.Card>);
            })}
            </div>)}
        </card_1.CardContent>
      </card_1.Card>

      {/* Review Dialog */}
      <dialog_1.Dialog open={reviewDialog} onOpenChange={setReviewDialog}>
        <dialog_1.DialogContent className="max-w-2xl">
          <dialog_1.DialogHeader>
            <dialog_1.DialogTitle>Onay İncelemesi</dialog_1.DialogTitle>
            <dialog_1.DialogDescription>
              {selectedApproval?.ruleName}
            </dialog_1.DialogDescription>
          </dialog_1.DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <label_1.Label>Yorum (İsteğe Bağlı)</label_1.Label>
              <textarea_1.Textarea placeholder="Onay veya red nedeninizi yazın..." value={comment} onChange={(e) => setComment(e.target.value)} rows={3}/>
            </div>
          </div>

          <dialog_1.DialogFooter>
            <button_1.Button variant="outline" onClick={() => setReviewDialog(false)}>
              İptal
            </button_1.Button>
            <button_1.Button variant="destructive" onClick={handleReject}>
              <lucide_react_1.XCircle className="h-4 w-4 mr-2"/>
              Reddet
            </button_1.Button>
            <button_1.Button onClick={handleApprove}>
              <lucide_react_1.CheckCircle className="h-4 w-4 mr-2"/>
              Onayla
            </button_1.Button>
          </dialog_1.DialogFooter>
        </dialog_1.DialogContent>
      </dialog_1.Dialog>
    </div>);
}
//# sourceMappingURL=ApprovalDashboard.js.map