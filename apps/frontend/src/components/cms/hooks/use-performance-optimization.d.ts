export declare const usePerformanceOptimization: () => {
    useMemoizedComponents: (components: any[]) => any[];
    useMemoizedLayoutOptions: (layoutOptions: any) => any;
    renderComponentCallback: (component: any) => any;
    shouldRenderComponent: (component: any, viewportWidth: number) => boolean;
    getCodeSplittingConfig: (componentType: string) => {
        isLazy: boolean;
        priority: string;
    };
    useMemoizedProps: (props: any) => any;
    shouldVirtualize: (component: any, parentContainer: any) => boolean;
};
//# sourceMappingURL=use-performance-optimization.d.ts.map