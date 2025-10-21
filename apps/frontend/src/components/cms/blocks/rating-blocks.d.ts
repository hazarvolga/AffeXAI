import React from 'react';
export declare const RatingStarsInline: React.FC<{
    props?: any;
}>;
export declare const ReviewCardSingle: React.FC<{
    props?: any;
}>;
export declare const ReviewGridThree: React.FC<{
    props?: any;
}>;
export declare const ratingBlocks: ({
    id: string;
    component: React.FC<{
        props?: any;
    }>;
    name: string;
    category: string;
    defaultProps: {
        rating: number;
        totalReviews: number;
        showReviewCount: boolean;
        size: string;
        review?: undefined;
        title?: undefined;
        subtitle?: undefined;
        averageRating?: undefined;
        reviews?: undefined;
    };
} | {
    id: string;
    component: React.FC<{
        props?: any;
    }>;
    name: string;
    category: string;
    defaultProps: {
        review: {
            author: string;
            avatar: string;
            role: string;
            rating: number;
            date: string;
            title: string;
            content: string;
            helpful: number;
            verified: boolean;
        };
        rating?: undefined;
        totalReviews?: undefined;
        showReviewCount?: undefined;
        size?: undefined;
        title?: undefined;
        subtitle?: undefined;
        averageRating?: undefined;
        reviews?: undefined;
    };
} | {
    id: string;
    component: React.FC<{
        props?: any;
    }>;
    name: string;
    category: string;
    defaultProps: {
        title: string;
        subtitle: string;
        averageRating: number;
        totalReviews: number;
        reviews: {
            author: string;
            avatar: string;
            role: string;
            rating: number;
            date: string;
            content: string;
            verified: boolean;
        }[];
        rating?: undefined;
        showReviewCount?: undefined;
        size?: undefined;
        review?: undefined;
    };
})[];
//# sourceMappingURL=rating-blocks.d.ts.map