import { Repository } from 'typeorm';
import { AutomationApproval } from '../entities/automation-approval.entity';
import { AutomationExecutorService } from '../services/automation-executor.service';
/**
 * Approvals Controller
 *
 * Manage automation approval requests.
 */
export declare class ApprovalsController {
    private readonly approvalRepository;
    private readonly executorService;
    constructor(approvalRepository: Repository<AutomationApproval>, executorService: AutomationExecutorService);
    /**
     * Get all approval requests
     */
    findAll(): Promise<AutomationApproval[]>;
    /**
     * Get pending approval requests
     */
    findPending(): Promise<AutomationApproval[]>;
    /**
     * Get approval request by ID
     */
    findOne(id: string): Promise<AutomationApproval | null>;
    /**
     * Approve automation request
     */
    approve(id: string, body: {
        userId: string;
        userName: string;
        comment?: string;
    }): Promise<AutomationApproval>;
    /**
     * Reject automation request
     */
    reject(id: string, body: {
        userId: string;
        userName: string;
        comment?: string;
    }): Promise<AutomationApproval>;
    /**
     * Get approval statistics
     */
    getStats(): Promise<{
        total: number;
        pending: number;
        approved: number;
        rejected: number;
        expired: number;
    }>;
}
//# sourceMappingURL=approvals.controller.d.ts.map