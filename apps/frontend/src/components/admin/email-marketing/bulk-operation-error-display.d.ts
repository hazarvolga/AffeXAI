/**
 * Bulk Operation Error Display Component
 *
 * User-friendly error display with suggestions and recovery options
 */
import React from 'react';
import { BulkOperationError } from '@/lib/errors/bulk-operation-errors';
interface BulkOperationErrorDisplayProps {
    error: BulkOperationError;
    onRetry?: () => void;
    onDismiss?: () => void;
    showDetails?: boolean;
    showSuggestions?: boolean;
    className?: string;
}
export declare const BulkOperationErrorDisplay: React.FC<BulkOperationErrorDisplayProps>;
export default BulkOperationErrorDisplay;
//# sourceMappingURL=bulk-operation-error-display.d.ts.map