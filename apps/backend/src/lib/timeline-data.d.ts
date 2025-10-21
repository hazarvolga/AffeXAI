import type { LucideIcon } from 'lucide-react';
export type TimelineSlide = {
    id: string;
    category: string;
    date: string;
    title: string;
    excerpt: string;
    imageUrl: string;
    imageHint: string;
    author: {
        name: string;
        avatarUrl: string;
    };
    ctaLink: string;
    Icon: LucideIcon;
};
export declare const timelineData: TimelineSlide[];
//# sourceMappingURL=timeline-data.d.ts.map