import React from 'react';
export declare const StatsFourColumn: React.FC<{
    props?: any;
}>;
export declare const StatsCounterAnimated: React.FC<{
    props?: any;
}>;
export declare const StatsCircularProgress: React.FC<{
    props?: any;
}>;
export declare const StatsMinimal: React.FC<{
    props?: any;
}>;
export declare const StatsWithBackground: React.FC<{
    props?: any;
}>;
export declare const statsBlocks: ({
    id: string;
    component: React.FC<{
        props?: any;
    }>;
    name: string;
    category: string;
    defaultProps: {
        title: string;
        stats: {
            value: string;
            label: string;
            icon: string;
        }[];
        description?: undefined;
    };
} | {
    id: string;
    component: React.FC<{
        props?: any;
    }>;
    name: string;
    category: string;
    defaultProps: {
        stats: {
            value: string;
            label: string;
            suffix: string;
        }[];
        title?: undefined;
        description?: undefined;
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
        stats: {
            value: number;
            label: string;
            color: string;
        }[];
        description?: undefined;
    };
} | {
    id: string;
    component: React.FC<{
        props?: any;
    }>;
    name: string;
    category: string;
    defaultProps: {
        stats: {
            value: string;
            label: string;
        }[];
        title?: undefined;
        description?: undefined;
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
        description: string;
        stats: {
            value: string;
            label: string;
        }[];
    };
})[];
//# sourceMappingURL=stats-blocks.d.ts.map