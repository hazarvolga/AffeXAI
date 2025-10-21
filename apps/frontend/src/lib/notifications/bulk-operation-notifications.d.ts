/**
 * Bulk Operation Notification System
 *
 * Handles user notifications for bulk import/export operations including:
 * - Email notifications for job completion/failure
 * - In-app notifications and alerts
 * - Detailed error logging and reporting
 * - User-friendly error messages and suggestions
 */
import { BulkOperationError } from '../errors/bulk-operation-errors';
export declare enum NotificationType {
    SUCCESS = "success",
    WARNING = "warning",
    ERROR = "error",
    INFO = "info"
}
export declare enum NotificationChannel {
    EMAIL = "email",
    IN_APP = "in_app",
    PUSH = "push",
    SMS = "sms"
}
export interface NotificationTemplate {
    id: string;
    type: NotificationType;
    channels: NotificationChannel[];
    subject: string;
    message: string;
    actionUrl?: string;
    actionText?: string;
}
export interface NotificationContext {
    userId: string;
    jobId: string;
    jobType: 'import' | 'export';
    fileName?: string;
    recordCount?: number;
    successCount?: number;
    failureCount?: number;
    error?: BulkOperationError;
    completedAt?: Date;
    duration?: number;
}
export interface ErrorReport {
    id: string;
    jobId: string;
    jobType: 'import' | 'export';
    userId: string;
    error: BulkOperationError;
    context: any;
    timestamp: Date;
    resolved: boolean;
    resolution?: string;
    reportedBy: 'system' | 'user';
}
export interface NotificationPreferences {
    userId: string;
    emailNotifications: boolean;
    inAppNotifications: boolean;
    pushNotifications: boolean;
    notifyOnSuccess: boolean;
    notifyOnFailure: boolean;
    notifyOnWarning: boolean;
    minimumJobSize: number;
}
export declare class BulkOperationNotificationService {
    private errorReports;
    private userPreferences;
    /**
     * Send notification for job completion
     */
    notifyJobCompletion(context: NotificationContext): Promise<void>;
    /**
     * Send notification for system errors
     */
    notifySystemError(error: BulkOperationError, context: NotificationContext): Promise<void>;
    /**
     * Create detailed error report
     */
    createErrorReport(error: BulkOperationError, context: NotificationContext): Promise<ErrorReport>;
    /**
     * Get error reports for a user
     */
    getErrorReports(userId: string, resolved?: boolean): Promise<ErrorReport[]>;
    /**
     * Mark error report as resolved
     */
    resolveErrorReport(reportId: string, resolution: string): Promise<void>;
    /**
     * Get user notification preferences
     */
    getUserPreferences(userId: string): Promise<NotificationPreferences>;
    /**
     * Update user notification preferences
     */
    updateUserPreferences(userId: string, preferences: Partial<NotificationPreferences>): Promise<void>;
    /**
     * Get user-friendly error suggestions
     */
    getErrorSuggestions(error: BulkOperationError): string[];
    private shouldNotify;
    private sendNotification;
    private renderTemplate;
    private sendEmailNotification;
    private sendInAppNotification;
    private loadUserPreferences;
    private saveUserPreferences;
    private sendToErrorTracking;
}
export declare const bulkOperationNotificationService: BulkOperationNotificationService;
export default bulkOperationNotificationService;
//# sourceMappingURL=bulk-operation-notifications.d.ts.map