export type HeroSlide = {
    image: string;
    imageHint: string;
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaLink: string;
};
type HeroData = {
    solutions: HeroSlide[];
    products: HeroSlide[];
    successStories: HeroSlide[];
};
export declare const heroData: HeroData;
export {};
//# sourceMappingURL=hero-data.d.ts.map