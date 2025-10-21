import React from 'react';
export declare const ProgressBarSingle: React.FC<{
    props?: any;
}>;
export declare const ProgressBarsStacked: React.FC<{
    props?: any;
}>;
export declare const ProgressCircular: React.FC<{
    props?: any;
}>;
export declare const progressBlocks: ({
    id: string;
    component: React.FC<{
        props?: any;
    }>;
    name: string;
    category: string;
    defaultProps: {
        title: string;
        progress: number;
        showPercentage: boolean;
        color: string;
        size: string;
        animated: boolean;
        subtitle?: undefined;
        skills?: undefined;
        stats?: undefined;
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
        skills: {
            name: string;
            progress: number;
            color: string;
        }[];
        progress?: undefined;
        showPercentage?: undefined;
        color?: undefined;
        size?: undefined;
        animated?: undefined;
        stats?: undefined;
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
        stats: {
            label: string;
            progress: number;
            color: string;
            icon: string;
        }[];
        progress?: undefined;
        showPercentage?: undefined;
        color?: undefined;
        size?: undefined;
        animated?: undefined;
        skills?: undefined;
    };
})[];
//# sourceMappingURL=progress-blocks.d.ts.map