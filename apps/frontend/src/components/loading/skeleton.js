"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skeleton = Skeleton;
exports.SkeletonText = SkeletonText;
exports.SkeletonCard = SkeletonCard;
exports.SkeletonTable = SkeletonTable;
exports.SkeletonList = SkeletonList;
exports.SkeletonForm = SkeletonForm;
exports.SkeletonAvatarGroup = SkeletonAvatarGroup;
const react_1 = __importDefault(require("react"));
const utils_1 = require("@/lib/utils");
/**
 * Base Skeleton Component
 *
 * Displays a loading placeholder with animation.
 *
 * @example
 * ```tsx
 * <Skeleton className="h-4 w-32" />
 * ```
 */
function Skeleton({ className, animation = 'pulse', rounded = 'md', }) {
    const roundedClasses = {
        none: '',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
    };
    const animationClasses = {
        pulse: 'animate-pulse',
        wave: 'animate-wave',
        none: '',
    };
    return (<div className={(0, utils_1.cn)('bg-muted', roundedClasses[rounded], animationClasses[animation], className)} role="status" aria-label="Yükleniyor"/>);
}
function SkeletonText({ lines = 1, variant = 'default', gap = 'md', className }) {
    const gapClasses = {
        sm: 'gap-1',
        md: 'gap-2',
        lg: 'gap-3',
    };
    const getWidth = (index) => {
        if (variant === 'equal')
            return 'w-full';
        if (variant === 'random') {
            const widths = ['w-full', 'w-11/12', 'w-10/12', 'w-9/12', 'w-8/12'];
            return widths[Math.floor(Math.random() * widths.length)];
        }
        // Default: last line is shorter
        return index === lines - 1 && lines > 1 ? 'w-4/5' : 'w-full';
    };
    return (<div className={(0, utils_1.cn)('flex flex-col', gapClasses[gap], className)}>
      {Array.from({ length: lines }).map((_, index) => (<Skeleton key={index} className={(0, utils_1.cn)('h-4', getWidth(index))}/>))}
    </div>);
}
function SkeletonCard({ showImage = true, showAvatar = false, textLines = 3, showActions = true, className, }) {
    return (<div className={(0, utils_1.cn)('rounded-lg border bg-card p-4', className)}>
      {/* Image */}
      {showImage && <Skeleton className="mb-4 h-48 w-full"/>}

      {/* Header with Avatar */}
      <div className="mb-3 flex items-center gap-3">
        {showAvatar && <Skeleton className="h-10 w-10" rounded="full"/>}
        <div className="flex-1">
          <Skeleton className="mb-2 h-4 w-32"/>
          <Skeleton className="h-3 w-24"/>
        </div>
      </div>

      {/* Text Lines */}
      <SkeletonText lines={textLines} className="mb-4"/>

      {/* Actions */}
      {showActions && (<div className="flex gap-2">
          <Skeleton className="h-9 w-20"/>
          <Skeleton className="h-9 w-20"/>
        </div>)}
    </div>);
}
function SkeletonTable({ rows = 5, columns = 4, showHeader = true, className, }) {
    return (<div className={(0, utils_1.cn)('w-full', className)}>
      {/* Header */}
      {showHeader && (<div className="mb-2 flex gap-4 border-b pb-2">
          {Array.from({ length: columns }).map((_, index) => (<Skeleton key={index} className="h-4 flex-1"/>))}
        </div>)}

      {/* Rows */}
      <div className="flex flex-col gap-3">
        {Array.from({ length: rows }).map((_, rowIndex) => (<div key={rowIndex} className="flex gap-4">
            {Array.from({ length: columns }).map((_, colIndex) => (<Skeleton key={colIndex} className="h-4 flex-1"/>))}
          </div>))}
      </div>
    </div>);
}
function SkeletonList({ items = 5, showAvatar = true, showActions = false, className, }) {
    return (<div className={(0, utils_1.cn)('flex flex-col gap-3', className)}>
      {Array.from({ length: items }).map((_, index) => (<div key={index} className="flex items-center gap-3 rounded-lg border p-3">
          {showAvatar && <Skeleton className="h-10 w-10" rounded="full"/>}
          
          <div className="flex-1">
            <Skeleton className="mb-2 h-4 w-48"/>
            <Skeleton className="h-3 w-32"/>
          </div>

          {showActions && <Skeleton className="h-8 w-8" rounded="full"/>}
        </div>))}
    </div>);
}
function SkeletonForm({ fields = 4, showSubmit = true, className, }) {
    return (<div className={(0, utils_1.cn)('flex flex-col gap-4', className)}>
      {Array.from({ length: fields }).map((_, index) => (<div key={index} className="space-y-2">
          <Skeleton className="h-4 w-24"/>
          <Skeleton className="h-10 w-full"/>
        </div>))}

      {showSubmit && (<div className="mt-2 flex gap-2">
          <Skeleton className="h-10 w-24"/>
          <Skeleton className="h-10 w-24"/>
        </div>)}
    </div>);
}
function SkeletonAvatarGroup({ count = 3, size = 'md', className, }) {
    const sizes = {
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
    };
    return (<div className={(0, utils_1.cn)('flex -space-x-2', className)}>
      {Array.from({ length: count }).map((_, index) => (<Skeleton key={index} className={(0, utils_1.cn)(sizes[size], 'border-2 border-background')} rounded="full"/>))}
    </div>);
}
//# sourceMappingURL=skeleton.js.map