import React from 'react';
/**
 * Skeleton Base Component Props
 */
interface SkeletonProps {
    className?: string;
    /** Animation style */
    animation?: 'pulse' | 'wave' | 'none';
    /** Border radius */
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}
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
export declare function Skeleton({ className, animation, rounded, }: SkeletonProps): React.JSX.Element;
/**
 * Text Skeleton
 *
 * Skeleton for text lines with configurable width and lines.
 *
 * @example
 * ```tsx
 * <SkeletonText lines={3} />
 * ```
 */
interface SkeletonTextProps {
    /** Number of lines */
    lines?: number;
    /** Width variation for natural look */
    variant?: 'default' | 'equal' | 'random';
    /** Gap between lines */
    gap?: 'sm' | 'md' | 'lg';
    className?: string;
}
export declare function SkeletonText({ lines, variant, gap, className }: SkeletonTextProps): React.JSX.Element;
/**
 * Card Skeleton
 *
 * Skeleton for card components.
 *
 * @example
 * ```tsx
 * <SkeletonCard />
 * ```
 */
interface SkeletonCardProps {
    /** Show image area */
    showImage?: boolean;
    /** Show avatar */
    showAvatar?: boolean;
    /** Number of text lines */
    textLines?: number;
    /** Show action buttons area */
    showActions?: boolean;
    className?: string;
}
export declare function SkeletonCard({ showImage, showAvatar, textLines, showActions, className, }: SkeletonCardProps): React.JSX.Element;
/**
 * Table Skeleton
 *
 * Skeleton for table components.
 *
 * @example
 * ```tsx
 * <SkeletonTable rows={5} columns={4} />
 * ```
 */
interface SkeletonTableProps {
    /** Number of rows */
    rows?: number;
    /** Number of columns */
    columns?: number;
    /** Show header row */
    showHeader?: boolean;
    className?: string;
}
export declare function SkeletonTable({ rows, columns, showHeader, className, }: SkeletonTableProps): React.JSX.Element;
/**
 * List Skeleton
 *
 * Skeleton for list components.
 *
 * @example
 * ```tsx
 * <SkeletonList items={5} />
 * ```
 */
interface SkeletonListProps {
    /** Number of items */
    items?: number;
    /** Show avatar in items */
    showAvatar?: boolean;
    /** Show actions in items */
    showActions?: boolean;
    className?: string;
}
export declare function SkeletonList({ items, showAvatar, showActions, className, }: SkeletonListProps): React.JSX.Element;
/**
 * Form Skeleton
 *
 * Skeleton for form components.
 *
 * @example
 * ```tsx
 * <SkeletonForm fields={4} />
 * ```
 */
interface SkeletonFormProps {
    /** Number of form fields */
    fields?: number;
    /** Show submit button */
    showSubmit?: boolean;
    className?: string;
}
export declare function SkeletonForm({ fields, showSubmit, className, }: SkeletonFormProps): React.JSX.Element;
/**
 * Avatar Group Skeleton
 *
 * Skeleton for avatar groups.
 *
 * @example
 * ```tsx
 * <SkeletonAvatarGroup count={3} />
 * ```
 */
interface SkeletonAvatarGroupProps {
    /** Number of avatars */
    count?: number;
    /** Avatar size */
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}
export declare function SkeletonAvatarGroup({ count, size, className, }: SkeletonAvatarGroupProps): React.JSX.Element;
export {};
//# sourceMappingURL=skeleton.d.ts.map