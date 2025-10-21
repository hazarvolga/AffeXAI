import React from 'react';
export declare const PricingTableThreeColumn: React.FC<{
    props?: any;
}>;
export declare const PricingComparisonDetailed: React.FC<{
    props?: any;
}>;
export declare const PricingToggleSwitch: React.FC<{
    props?: any;
}>;
export declare const pricingBlocks: ({
    id: string;
    component: React.FC<{
        props?: any;
    }>;
    name: string;
    category: string;
    defaultProps: {
        title: string;
        subtitle: string;
        plans: {
            name: string;
            price: string;
            period: string;
            description: string;
            features: {
                text: string;
                included: boolean;
            }[];
            buttonText: string;
            buttonUrl: string;
            highlighted: boolean;
        }[];
        features?: undefined;
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
        plans: {
            name: string;
            price: string;
        }[];
        features: ({
            category: string;
            items: {
                feature: string;
                values: string[];
            }[];
        } | {
            category: string;
            items: {
                feature: string;
                values: boolean[];
            }[];
        })[];
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
        title: string;
        subtitle: string;
        plans: ({
            name: string;
            monthlyPrice: string;
            yearlyPrice: string;
            description: string;
            features: string[];
            buttonText: string;
            highlighted?: undefined;
        } | {
            name: string;
            monthlyPrice: string;
            yearlyPrice: string;
            description: string;
            features: string[];
            buttonText: string;
            highlighted: boolean;
        })[];
        features?: undefined;
    };
})[];
//# sourceMappingURL=pricing-blocks.d.ts.map