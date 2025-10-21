import type { LucideIcon } from 'lucide-react';
export type SolutionSlide = {
    id: string;
    category: string;
    title: string;
    description: string;
    items: {
        title: string;
        href: string;
    }[];
    imageUrl: string;
    imageHint: string;
    Icon: LucideIcon;
};
export declare const solutionsData: SolutionSlide[];
//# sourceMappingURL=solutions-data.d.ts.map