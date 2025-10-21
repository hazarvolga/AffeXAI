import type { SocialAccount, SocialPlatform, SocialPost } from './types';
export declare const socialAccounts: SocialAccount[];
export declare const getPlatformIcon: (platform: SocialPlatform | string) => import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
export declare const socialPosts: SocialPost[];
export declare const getSourceContentName: (type: "event" | "page" | "blog", id: string) => string;
//# sourceMappingURL=social-media-data.d.ts.map