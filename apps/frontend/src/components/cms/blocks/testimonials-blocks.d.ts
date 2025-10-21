import React from 'react';
export declare const TestimonialSingleCard: React.FC<{
    props?: any;
}>;
export declare const TestimonialGridThree: React.FC<{
    props?: any;
}>;
export declare const TestimonialCarousel: React.FC<{
    props?: any;
}>;
export declare const TestimonialMinimal: React.FC<{
    props?: any;
}>;
export declare const TestimonialWall: React.FC<{
    props?: any;
}>;
export declare const testimonialsBlocks: ({
    id: string;
    component: React.FC<{
        props?: any;
    }>;
    name: string;
    category: string;
    defaultProps: {
        name: string;
        role: string;
        content: string;
        rating: number;
        avatar: string;
        background: string;
        title?: undefined;
        subtitle?: undefined;
        testimonials?: undefined;
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
        testimonials: {
            name: string;
            role: string;
            content: string;
            rating: number;
            avatar: string;
        }[];
        name?: undefined;
        role?: undefined;
        content?: undefined;
        rating?: undefined;
        avatar?: undefined;
        background?: undefined;
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
        testimonials: {
            name: string;
            role: string;
            company: string;
            content: string;
            rating: number;
            avatar: string;
        }[];
        name?: undefined;
        role?: undefined;
        content?: undefined;
        rating?: undefined;
        avatar?: undefined;
        background?: undefined;
        subtitle?: undefined;
    };
} | {
    id: string;
    component: React.FC<{
        props?: any;
    }>;
    name: string;
    category: string;
    defaultProps: {
        content: string;
        name: string;
        role: string;
        rating?: undefined;
        avatar?: undefined;
        background?: undefined;
        title?: undefined;
        subtitle?: undefined;
        testimonials?: undefined;
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
        testimonials: {
            name: string;
            role: string;
            content: string;
            rating: number;
        }[];
        name?: undefined;
        role?: undefined;
        content?: undefined;
        rating?: undefined;
        avatar?: undefined;
        background?: undefined;
        subtitle?: undefined;
    };
})[];
//# sourceMappingURL=testimonials-blocks.d.ts.map