import type { LucideIcon } from 'lucide-react';
type ResourceItem = {
    title: string;
    description?: string;
    ctaText: string;
    ctaLink: string;
    icon?: LucideIcon;
};
type ResourcesData = {
    tabs: {
        id: string;
        title: string;
        icon: LucideIcon;
    }[];
    content: {
        [key: string]: ResourceItem[];
    };
};
export declare const resourcesData: ResourcesData;
export {};
//# sourceMappingURL=resources-data.d.ts.map