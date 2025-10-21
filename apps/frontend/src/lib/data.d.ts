import type { MegaMenuCategory } from "@/lib/types";
export declare const solutionsMegaMenu: MegaMenuCategory[];
export declare const productsMegaMenu: MegaMenuCategory[];
export declare const educationData: {
    tabs: {
        id: string;
        title: string;
        icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
    }[];
    content: {
        training: {
            title: string;
            date: string;
            description: string;
            ctaText: string;
            ctaLink: string;
        }[];
        downloads: {
            title: string;
            category: string;
            ctaLink: string;
        }[];
        support: {
            id: string;
            title: string;
            description: string;
            ctaText: string;
            ctaLink: string;
            icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
        }[];
        videos: {
            title: string;
            description: string;
            videoId: string;
            thumbnail: string;
        }[];
        students: {
            title: string;
            description: string;
            ctaText: string;
            ctaLink: string;
        }[];
        documents: {
            title: string;
            category: string;
            ctaLink: string;
        }[];
    };
};
//# sourceMappingURL=data.d.ts.map