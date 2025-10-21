interface ComponentSelectorProps {
    componentId: string;
    pageUrl: string;
    onComponentIdChange: (id: string) => void;
    onPageUrlChange: (url: string) => void;
    recentComponents?: Array<{
        id: string;
        type: string;
        url: string;
    }>;
}
export declare function ComponentSelector({ componentId, pageUrl, onComponentIdChange, onPageUrlChange, recentComponents, }: ComponentSelectorProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=component-selector.d.ts.map