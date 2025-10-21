"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingOverlay = LoadingOverlay;
exports.LoadingSpinner = LoadingSpinner;
exports.ContainerLoadingOverlay = ContainerLoadingOverlay;
const react_1 = __importDefault(require("react"));
const LoadingContext_1 = require("@/contexts/LoadingContext");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
/**
 * Loading Overlay Component
 *
 * Displays a full-screen or container-level loading overlay with spinner and message.
 * Automatically shows/hides based on global loading state or specific loading ID.
 *
 * @example
 * ```tsx
 * // Global loading overlay (shows when any loading is active)
 * <LoadingOverlay />
 * ```
 *
 * @example
 * ```tsx
 * // Specific loading ID
 * <LoadingOverlay
 *   loadingId="fetch-users"
 *   message="Kullanıcılar yükleniyor..."
 * />
 * ```
 *
 * @example
 * ```tsx
 * // With progress bar
 * <LoadingOverlay
 *   loadingId="upload-file"
 *   showProgress
 *   blur
 * />
 * ```
 */
function LoadingOverlay({ loadingId, message, showProgress = false, blur = true, className, spinnerSize = 'lg', }) {
    const { isLoading, isLoadingId, getLoadingState } = (0, LoadingContext_1.useLoadingContext)();
    // Check if should show overlay
    const shouldShow = loadingId ? isLoadingId(loadingId) : isLoading;
    // Get loading state
    const loadingState = loadingId ? getLoadingState(loadingId) : undefined;
    // Get display message
    const displayMessage = message || loadingState?.message || 'Yükleniyor...';
    // Get progress
    const progress = loadingState?.progress;
    if (!shouldShow) {
        return null;
    }
    // Spinner sizes
    const spinnerSizes = {
        sm: 'h-6 w-6',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
    };
    return (<div className={(0, utils_1.cn)('fixed inset-0 z-50 flex items-center justify-center', blur && 'backdrop-blur-sm', 'bg-background/80', className)} role="status" aria-live="polite" aria-busy="true">
      <div className="flex flex-col items-center gap-4 rounded-lg bg-card p-8 shadow-lg">
        {/* Spinner */}
        <lucide_react_1.Loader2 className={(0, utils_1.cn)('animate-spin text-primary', spinnerSizes[spinnerSize])}/>

        {/* Message */}
        <p className="text-center text-sm font-medium text-foreground">
          {displayMessage}
        </p>

        {/* Progress Bar */}
        {showProgress && typeof progress === 'number' && (<div className="w-64">
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}/>
            </div>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              %{Math.round(progress)}
            </p>
          </div>)}
      </div>
    </div>);
}
function LoadingSpinner({ size = 'md', className }) {
    const sizes = {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
    };
    return (<lucide_react_1.Loader2 className={(0, utils_1.cn)('animate-spin', sizes[size], className)}/>);
}
function ContainerLoadingOverlay({ isLoading, message = 'Yükleniyor...', showProgress = false, progress, blur = true, className, }) {
    if (!isLoading) {
        return null;
    }
    return (<div className={(0, utils_1.cn)('absolute inset-0 z-40 flex items-center justify-center', blur && 'backdrop-blur-sm', 'bg-background/80', className)} role="status" aria-live="polite" aria-busy="true">
      <div className="flex flex-col items-center gap-3 rounded-lg bg-card p-6 shadow-md">
        <lucide_react_1.Loader2 className="h-8 w-8 animate-spin text-primary"/>
        <p className="text-sm font-medium text-foreground">{message}</p>

        {showProgress && typeof progress === 'number' && (<div className="w-48">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }}/>
            </div>
            <p className="mt-1 text-center text-xs text-muted-foreground">
              %{Math.round(progress)}
            </p>
          </div>)}
      </div>
    </div>);
}
//# sourceMappingURL=loading-overlay.js.map