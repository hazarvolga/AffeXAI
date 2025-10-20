'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  Shield,
  Users,
  Calendar,
  Activity,
  MessageSquare,
  RefreshCw,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { approvalsService } from '@/lib/api/approvalsService';
import { useToast } from '@/hooks/use-toast';

export enum ApprovalStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  AUTO_APPROVED = 'auto_approved',
  EXPIRED = 'expired',
}

export enum ApprovalPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export enum ActionImpactLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

interface ApprovalRequest {
  id: string;
  ruleName: string;
  status: ApprovalStatus;
  priority: ApprovalPriority;
  impactLevel: ActionImpactLevel;
  requestedBy: string;
  requestedAt: Date;
  requestReason?: string;
  pendingActions: Array<{
    type: string;
    description: string;
    estimatedImpact?: {
      affectedUsers?: number;
      affectedRecords?: number;
    };
  }>;
  requiredApprovals: number;
  currentApprovals: number;
  expiresAt?: Date;
  approvalChain?: Array<{
    userName: string;
    action: 'approved' | 'rejected';
    comment?: string;
    timestamp: Date;
  }>;
}

const statusConfig = {
  [ApprovalStatus.PENDING]: {
    label: 'Bekliyor',
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    icon: Clock,
  },
  [ApprovalStatus.APPROVED]: {
    label: 'Onaylandı',
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    icon: CheckCircle,
  },
  [ApprovalStatus.REJECTED]: {
    label: 'Reddedildi',
    color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    icon: XCircle,
  },
  [ApprovalStatus.AUTO_APPROVED]: {
    label: 'Otomatik Onaylandı',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    icon: CheckCircle,
  },
  [ApprovalStatus.EXPIRED]: {
    label: 'Süresi Doldu',
    color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    icon: XCircle,
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

export default function ApprovalDashboard() {
  const [approvals, setApprovals] = useState<ApprovalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();
  const [selectedApproval, setSelectedApproval] = useState<ApprovalRequest | null>(null);
  const [reviewDialog, setReviewDialog] = useState(false);
  const [comment, setComment] = useState('');

  // Load approvals on mount
  useEffect(() => {
    loadApprovals();
  }, []);

  const loadApprovals = async () => {
    try {
      setLoading(true);
      const data = await approvalsService.getPending();
      
      // Transform API data to component format
      setApprovals(data.map(approval => ({
        id: approval.id,
        ruleName: `Rule ${approval.ruleId.slice(0, 8)}...`, // TODO: Fetch actual rule name
        status: approval.status as ApprovalStatus,
        priority: approval.priority as ApprovalPriority,
        impactLevel: approval.impactLevel as ActionImpactLevel,
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
    } catch (error) {
      console.error('Error loading approvals:', error);
      toast({
        title: 'Hata',
        description: 'Onay talepleri yüklenemedi',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshApprovals = async () => {
    setRefreshing(true);
    await loadApprovals();
    setRefreshing(false);
  };

  const handleApprove = async () => {
    if (!selectedApproval) return;
    
    try {
      await approvalsService.approve(
        selectedApproval.id,
        'current-user-id', // TODO: Get from auth context
        'Current User', // TODO: Get from auth context
        comment
      );
      
      toast({
        title: 'Başarılı',
        description: 'Onay talebi onaylandı',
      });
      
      setReviewDialog(false);
      setComment('');
      await loadApprovals();
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Onay işlemi başarısız oldu',
        variant: 'destructive',
      });
    }
  };

  const handleReject = async () => {
    if (!selectedApproval) return;
    
    try {
      await approvalsService.reject(
        selectedApproval.id,
        'current-user-id', // TODO: Get from auth context
        'Current User', // TODO: Get from auth context
        comment
      );
      
      toast({
        title: 'Başarılı',
        description: 'Onay talebi reddedildi',
      });
      
      setReviewDialog(false);
      setComment('');
      await loadApprovals();
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Red işlemi başarısız oldu',
        variant: 'destructive',
      });
    }
  };

  const getRemainingTime = (expiresAt?: Date): string => {
    if (!expiresAt) return '-';
    
    const now = new Date();
    const remaining = expiresAt.getTime() - now.getTime();
    
    if (remaining <= 0) return 'Süresi doldu';
    
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}s ${minutes}dk`;
  };

  const pendingApprovals = approvals.filter(a => a.status === ApprovalStatus.PENDING);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bekleyen Onaylar</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingApprovals.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Acil Öncelik</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pendingApprovals.filter(a => a.priority === ApprovalPriority.URGENT || a.priority === ApprovalPriority.HIGH).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bugün Onaylanan</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reddedilen</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
      </div>

      {/* Approval List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Onay Bekleyen Otomasyonlar</CardTitle>
              <CardDescription>
                Çalıştırılmadan önce onayınızı bekleyen otomasyonlar
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={refreshApprovals}
              disabled={refreshing || loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Yenile
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : pendingApprovals.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <CheckCircle className="h-12 w-12 mb-4 opacity-50" />
              <p className="text-lg font-medium">Bekleyen onay yok</p>
              <p className="text-sm">Tüm onaylar tamamlandı</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingApprovals.map((approval) => {
                const statusCfg = statusConfig[approval.status];
                const priorityCfg = priorityConfig[approval.priority];
                const StatusIcon = statusCfg.icon;

                return (
                  <Card key={approval.id} className="border-l-4 border-l-yellow-500">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-muted-foreground" />
                              <h3 className="font-semibold">{approval.ruleName}</h3>
                            </div>
                            {approval.requestReason && (
                              <p className="text-sm text-muted-foreground">
                                {approval.requestReason}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Badge className={priorityCfg.color}>
                              {priorityCfg.label}
                            </Badge>
                            <Badge className={statusCfg.color}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {statusCfg.label}
                            </Badge>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-muted-foreground">Talep Eden</p>
                              <p className="font-medium">{approval.requestedBy}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
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
                            <Activity className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-muted-foreground">Onay Durumu</p>
                              <p className="font-medium">
                                {approval.currentApprovals}/{approval.requiredApprovals}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
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
                          {approval.pendingActions.map((action, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-3 bg-muted rounded-lg text-sm"
                            >
                              <span>{action.description}</span>
                              {action.estimatedImpact && (
                                <Badge variant="outline">
                                  {action.estimatedImpact.affectedUsers && (
                                    <span>{action.estimatedImpact.affectedUsers} kullanıcı</span>
                                  )}
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Approval Chain */}
                        {approval.approvalChain && approval.approvalChain.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-sm font-medium flex items-center gap-2">
                              <MessageSquare className="h-4 w-4" />
                              Onay Geçmişi:
                            </p>
                            {approval.approvalChain.map((chain, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-3 p-3 bg-muted rounded-lg text-sm"
                              >
                                {chain.action === 'approved' ? (
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                ) : (
                                  <XCircle className="h-4 w-4 text-red-500 mt-0.5" />
                                )}
                                <div className="flex-1">
                                  <p className="font-medium">{chain.userName}</p>
                                  {chain.comment && (
                                    <p className="text-muted-foreground">{chain.comment}</p>
                                  )}
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {chain.timestamp.toLocaleString('tr-TR')}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button
                            onClick={() => {
                              setSelectedApproval(approval);
                              setReviewDialog(true);
                            }}
                            className="flex-1"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            İncele ve Onayla
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Review Dialog */}
      <Dialog open={reviewDialog} onOpenChange={setReviewDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Onay İncelemesi</DialogTitle>
            <DialogDescription>
              {selectedApproval?.ruleName}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Yorum (İsteğe Bağlı)</Label>
              <Textarea
                placeholder="Onay veya red nedeninizi yazın..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewDialog(false)}>
              İptal
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              <XCircle className="h-4 w-4 mr-2" />
              Reddet
            </Button>
            <Button onClick={handleApprove}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Onayla
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
