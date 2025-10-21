interface ProductRecommendationEmailProps {
    userName?: string;
    recommendations?: {
        name: string;
        description: string;
        imageUrl: string;
        link: string;
    }[];
    siteSettings?: {
        companyName: string;
        logoUrl: string;
        contact: {
            address: string;
            phone: string;
            email: string;
        };
        socialMedia: {
            [key: string]: string;
        };
    };
}
export declare const ProductRecommendationEmail: ({ userName, recommendations, siteSettings, }: ProductRecommendationEmailProps) => JSX.Element;
export default ProductRecommendationEmail;
//# sourceMappingURL=product-recommendation.d.ts.map