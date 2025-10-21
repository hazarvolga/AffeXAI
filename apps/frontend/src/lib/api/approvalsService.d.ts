export interface ApprovalRequest {
    id: string;
    ruleId: string;
    eventId?: string;
    status: 'pending' | 'approved' | 'rejected' | 'expired';
    priority: 'low' | 'medium' | 'high' | 'critical';
    impactLevel: 'low' | 'medium' | 'high' | 'critical';
    pendingActions: Array<{
        type: string;
        config: Record<string, any>;
        estimatedImpact?: {
            affectedUsers?: number;
            affectedRecords?: number;
            externalCalls?: number;
        };
    }>;
    requestedBy: string;
    requestReason?: string;
    requestContext?: Record<string, any>;
    approvedBy?: string;
    approvedAt?: string;
    approvalComment?: string;
    approvalChain?: Array<{
        userId: string;
        userName: string;
        action: 'approved' | 'rejected';
        comment?: string;
        timestamp: string;
        ipAddress?: string;
    }>;
    requiredApprovals: number;
    currentApprovals: number;
    expiresAt: string;
    isExpired: boolean;
    isExecuted: boolean;
    executedAt?: string;
    executionResult?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
}
export interface ApprovalStats {
    pending: number;
    urgent: number;
    approved: number;
    rejected: number;
    expired: number;
    executed: number;
}
export declare const approvalsService: {
    /**
     * Get all approval requests
     */
    getAll(): Promise<ApprovalRequest[]>;
    /**
     * Get pending approval requests
     */
    getPending(): Promise<ApprovalRequest[]>;
    /**
     * Get a single approval request
     */
    getOne(id: string): Promise<ApprovalRequest>;
    /**
     * Approve an approval request
     */
    approve(id: string, userId: string, userName: string, comment?: string): Promise<ApprovalRequest>;
    /**
     * Reject an approval request
     */
    reject(id: string, userId: string, userName: string, comment?: string): Promise<ApprovalRequest>;
    /**
     * Get approval statistics
     */
    getStats(): Promise<ApprovalStats>;
};
//# sourceMappingURL=approvalsService.d.ts.map